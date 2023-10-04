import MainBG from "components/MainBG";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useComponentWidth, useWhetherItIsMobile, useWhetherItIsTablet } from "utils";
import ChatRoom from "views/ChatRoom";
import { ChatRoomNav } from "views/Nav/Nav.components";
import { CHAT_ROOM, CHAT_ROOM_LIST } from "utils/pathname";
import { useGetChatRoomsQuery } from "store/serverAPIs/novelTime";
import { Message, ChatRoom as TypeChatRoom } from "store/serverAPIs/types";
import { useAppSelector } from "store/hooks";
import Spinner from "assets/Spinner";
import socket from "store/serverAPIs/socket.io";
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
  roomSelected: string | null;
  isRoomSpread: boolean;
  isRoom: boolean;
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

function ChatRoomPreview({ chatRoom, roomSelected, isRoomSpread, isRoom }: ChatRoomPreviewProps) {
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
  const contnrWidth = useComponentWidth(contnrRef, isRoomSpread);

  const navigate = useNavigate();

  const currentDate = getCurrentDate();
  const dateToDisplay = currentDate === latestMessageDate ? latestMessageTime : latestMessageDate;

  return (
    <ChatRoomPreviewContainer
      ref={contnrRef}
      onClick={() => {
        navigate(`${CHAT_ROOM_LIST}?roomId=${roomId}`);
      }}
      isCurrentRoom={roomSelected === roomId}
      isRoom={isRoom}
    >
      <UserImg userImg={partnerUserImg} />
      <NextToImgContainer>
        <FirstLineInfoContnr>
          <UserNameBox>
            <UserName>{partnerUserName}</UserName>
            <CreateDate>{dateToDisplay}</CreateDate>
          </UserNameBox>
          {!!unreadMessageNo && (
            <UnreadTalkNoContnr>
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
  const isLoginUser = !!useAppSelector((state) => state.user.loginUserInfo.userId);

  const chatRoomResult = useGetChatRoomsQuery(undefined, { skip: !isLoginUser });
  // - if login user refreshes page, query works after login user info is put in user slice

  const [chatRooms, handleChatRooms] = useState<TypeChatRoom[]>([]);

  // Treat a certain room ------------------------------------------- //
  const [searchParam] = useSearchParams();
  const currentRoomId = searchParam.get("roomId");
  // - if roomId is null, display room list only (not with a certain room)

  const [isRoomSpread, handleRoomSpread] = useState(false);
  const roomSpread = { isRoomSpread, spreadRoomOrNot: () => handleRoomSpread(!isRoomSpread) };

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
    const roomIDs = chatRoomResult.data.map((room) => room.roomId);

    socket.emit("join rooms", roomIDs);
    //
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
    if (!currentRoomId) return;

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
              roomSelected={currentRoomId}
              isRoomSpread={isRoomSpread} // to change component width where ellipsis is used
              isRoom={!!currentRoomId}
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
