import MainBG from "components/MainBG";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useComponentWidth, useWhetherItIsMobile, useWhetherItIsTablet } from "utils";
import ChatRoom from "views/ChatRoom";
import { ChatRoomNav } from "views/Nav/Nav.components";
import { CHAT_ROOM, CHAT_ROOM_LIST } from "utils/pathname";
import { useGetChatRoomsQuery } from "store/serverAPIs/novelTime";
import { Message, ChatRoom as TypeChatRoom } from "store/serverAPIs/types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import Spinner from "assets/Spinner";
import socket from "store/serverAPIs/socket.io";
import { setMultipleRoomsUserJoined } from "store/clientSlices/chatSlice";
import {
  ChatRoomCntnr,
  ChatRoomListCntnr,
  ListAndRoomCntnr,
  CreateDate,
  UserImg,
  UserName,
  ChatRoomPreviewContainer,
  UserNameBox,
  MessageContent,
  NextToImgContainer,
  FirstLineInfoContnr,
  UnreadTalkNoContnr,
  UnreadTalkNO,
} from "./ChatRoomList.styles";

interface ChatRoomPreviewProps {
  chatRoom: TypeChatRoom;
  isRoomSpread: boolean;
  roomIdSelected: string | null;
}

function getCurrentDate() {
  const date = new Date();
  let year: string = date.getFullYear().toString();
  year = year.substring(2, 4);

  let month: string | number = date.getMonth() + 1;
  month = month < 10 ? `0${month.toString()}` : month.toString();

  let day: string | number = date.getDate();
  day = day < 10 ? `0${day.toString()}` : day.toString();

  return `${year}.${month}.${day}`; // yy.mm.dd
}

const sortByMessageCreateTime = (room1: TypeChatRoom, room2: TypeChatRoom) => {
  if (room1.latestMessageDateTime < room2.latestMessageDateTime) return 1;
  if (room1.latestMessageDateTime > room2.latestMessageDateTime) return -1;
  return 0;
};

function ChatRoomPreview({ chatRoom, isRoomSpread, roomIdSelected }: ChatRoomPreviewProps) {
  const {
    roomId,
    partnerUserName,
    partnerUserImg,
    latestMessageContent,
    latestMessageDate,
    latestMessageTime,
    unreadMessageNo,
  } = chatRoom;

  // set ellipsis with component width
  const contnrRef = useRef<HTMLDivElement>(null);
  const contnrWidth = useComponentWidth(contnrRef, !!roomIdSelected, isRoomSpread);

  const navigate = useNavigate();

  const currentDate = getCurrentDate();
  const dateToDisplay = currentDate === latestMessageDate ? latestMessageTime : latestMessageDate;

  return (
    <ChatRoomPreviewContainer
      ref={contnrRef}
      isRoom={!!roomIdSelected}
      isRoomSpread={isRoomSpread}
      isCurrentRoom={roomIdSelected === roomId}
      onClick={() => {
        navigate(`${CHAT_ROOM_LIST}?roomId=${roomId}`);
      }}
    >
      <UserImg userImg={partnerUserImg} />
      <NextToImgContainer isRoomSpread={isRoomSpread}>
        <FirstLineInfoContnr>
          <UserNameBox>
            <UserName>{partnerUserName}</UserName>
            <CreateDate>{dateToDisplay}</CreateDate>
          </UserNameBox>
          {!!unreadMessageNo && (
            <UnreadTalkNoContnr isRoomSpread={isRoomSpread}>
              <UnreadTalkNO>{unreadMessageNo}</UnreadTalkNO>
            </UnreadTalkNoContnr>
          )}
        </FirstLineInfoContnr>
        <MessageContent contnrWidth={contnrWidth}>{latestMessageContent}</MessageContent>
      </NextToImgContainer>
    </ChatRoomPreviewContainer>
  );
}
export default function ChatRoomList() {
  const isLoginUser = !!useAppSelector((state) => state.loginUser.user.userId);

  // not to use cache data as sending an always unique arg
  const valueForNoCache = useRef(Math.floor(Date.now() * Math.random()));

  const chatRoomResult = useGetChatRoomsQuery(valueForNoCache.current, { skip: !isLoginUser });
  // - if login user refreshes page, query works after login user info is put in user slice

  const [chatRooms, handleChatRooms] = useState<TypeChatRoom[]>([]);

  // Treat a certain room ------------------------------------------- //
  const [searchParam] = useSearchParams();
  const currentRoomId = searchParam.get("roomId");
  // - if roomId is null, display room list only (not with a certain room)

  const [isRoomSpread, handleRoomSpread] = useState(false);
  const roomSpread = { isRoomSpread, spreadRoomOrNot: () => handleRoomSpread(!isRoomSpread) };

  const roomIDsUserJoins = useAppSelector((state) => state.chat.roomIDsLoginUserJoins);
  const dispatch = useAppDispatch();

  // Display new messages (just received ones) ---------------------- //
  useEffect(() => {
    if (!chatRoomResult.data?.length) return;
    if (chatRooms.length) return;

    // set rooms at first //
    if (!currentRoomId) {
      // navigating here without roomId
      handleChatRooms(chatRoomResult.data);
      //
    } else {
      // navigating here with roomId
      const rooms = chatRoomResult.data.map((room) => {
        // change "unreadMessageNo" to 0 in current room
        if (room.roomId === currentRoomId) {
          return {
            ...room,
            unreadMessageNo: 0,
          };
        }
        return room;
      });

      handleChatRooms(rooms);
    }

    // join the rooms with socket io //
    const allRoomIDs = chatRoomResult.data.map((room) => room.roomId);

    const roomIDsToJoin = allRoomIDs.filter((roomId) => !roomIDsUserJoins.includes(roomId));

    if (!roomIDsToJoin.length) return; // user already joined the all rooms

    socket.emit("join rooms", roomIDsToJoin);

    dispatch(setMultipleRoomsUserJoined(roomIDsToJoin));
  }, [chatRoomResult.data, !!chatRooms.length]);

  // change "unreadMessageNo" of current room //
  // : a room or rooms exist and no room changes. just user selects a room
  useEffect(() => {
    if (!currentRoomId) return;
    if (!chatRooms.length) return;

    handleChatRooms((rooms) =>
      rooms.map((room) => {
        if (room.roomId === currentRoomId) {
          return {
            ...room,
            unreadMessageNo: 0,
          };
        }
        return room;
      }),
    );
  }, [currentRoomId, !!chatRooms.length]);

  // save a new message in the room //
  const setNewMessage = (newMessage: Message) => {
    const roomsChanged = chatRooms.map((room) => {
      if (room.roomId === newMessage.roomId) {
        // unread message no is 0 when it was sent in the current room
        const unreadMessageNo = currentRoomId === newMessage.roomId ? 0 : room.unreadMessageNo + 1;

        return {
          ...room,
          latestMessageDateTime: newMessage.createDateTime,
          latestMessageDate: newMessage.createDate,
          latestMessageTime: newMessage.createTime,
          latestMessageContent: newMessage.content,
          unreadMessageNo,
        };
      }
      return room;
    });

    const roomsSorted = roomsChanged.sort(sortByMessageCreateTime);

    handleChatRooms(roomsSorted);
  };
  useEffect(() => {
    socket.on("new message", setNewMessage);

    return () => {
      socket.off("new message", setNewMessage);
    };
  }, [currentRoomId]);

  // Handle window resizing ----------------------------------------- //
  const navigate = useNavigate();
  const isMobile = useWhetherItIsMobile();
  const isTablet = useWhetherItIsTablet();

  useEffect(() => {
    if (!currentRoomId) {
      handleRoomSpread(false);
      // initialize for when navigating here again from here by clicking the message navigation icon
      return;
    }

    if (isMobile && !isTablet) {
      // don't write "if (!isTablet)" that causes continuous navigating between room and room list
      // "if (isMobile)" works well too
      navigate(`${CHAT_ROOM}/${currentRoomId}`, { replace: true });
    }
  }, [isMobile, isTablet, currentRoomId]);

  return (
    <MainBG isChatRoomList>
      <ListAndRoomCntnr>
        {chatRoomResult.isFetching && <Spinner styles="fixed" />}

        <ChatRoomListCntnr isRoom={!!currentRoomId} isRoomSpread={isRoomSpread}>
          {chatRooms.map((_) => (
            <ChatRoomPreview
              key={_.roomId}
              chatRoom={_}
              isRoomSpread={isRoomSpread}
              roomIdSelected={currentRoomId}
            />
          ))}
        </ChatRoomListCntnr>

        {currentRoomId && (
          <ChatRoomCntnr isRoomSpread={isRoomSpread}>
            <ChatRoomNav roomSpread={roomSpread} />
            <ChatRoom roomIdTablet={currentRoomId} />
          </ChatRoomCntnr>
        )}
      </ListAndRoomCntnr>
    </MainBG>
  );
}
