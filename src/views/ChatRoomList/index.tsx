import MainBG from "components/MainBG";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useComponentWidth, useWhetherItIsMobile, useWhetherItIsTablet } from "utils";
import ChatRoom from "views/ChatRoom";
import { NavChatRoom } from "views/Nav/Nav.components";
import { CHAT_ROOM } from "utils/pathname";
import {
  ChatRoomCntnr,
  ChatRoomListCntnr,
  ChatRoomListCntnrDevice,
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
  chatRoom: {
    roomId: string;
    otherUserImg: string;
    otherUserName: string;
    recentTalkContent: string;
    recentTalkTime: string;
    unreadTalkNO: number;
  };
  showRoom: (chatRoomId: string) => void;
  roomSelected: string;
  // state: { state1: boolean; state2: boolean };
  stateChanged: boolean;
  isBeforeClickList: boolean;
}

function ChatRoomPreview({
  chatRoom,
  showRoom,
  roomSelected,
  stateChanged,
  isBeforeClickList,
}: ChatRoomPreviewProps) {
  const { roomId, otherUserImg, otherUserName, recentTalkContent, recentTalkTime, unreadTalkNO } =
    chatRoom;

  // configure ellipsis of contentWidth
  const contnrRef = useRef<HTMLDivElement>(null);
  const contnrWidth = useComponentWidth(contnrRef, stateChanged);

  return (
    <ChatRoomPreviewContainer
      ref={contnrRef}
      onClick={() => {
        showRoom(roomId);
      }}
      isCurrentRoom={roomSelected === roomId}
      isBeforeClickList={isBeforeClickList}
    >
      <UserImg userImg={{ src: otherUserImg, position: "center" }} />
      <NextToImgContainer>
        <FirstLineInfoContnr>
          <UserNameBox>
            <UserName>{otherUserName}</UserName>
            <CreateDate>{recentTalkTime}</CreateDate>
          </UserNameBox>
          <UnreadTalkNoContnr>
            <UnreadTalkNO>{unreadTalkNO}</UnreadTalkNO>
          </UnreadTalkNoContnr>
        </FirstLineInfoContnr>
        <MessageContent contnrWidth={contnrWidth}>{recentTalkContent}</MessageContent>
      </NextToImgContainer>
    </ChatRoomPreviewContainer>
  );
}
export default function ChatRoomList() {
  // server request with userId(or userName) for user's chat room list //
  const chatRoomsFromServer = [
    {
      roomId: "abcd",
      otherUserImg: "",
      otherUserName: "lala",
      recentTalkContent: "asdfzxcfds",
      recentTalkTime: "22.01.09",
      unreadTalkNO: 2,
    },
    {
      roomId: "abcde",
      otherUserImg: "",
      otherUserName: "lolo",
      recentTalkContent: "hello we are the...",
      recentTalkTime: "22.01.04",
      unreadTalkNO: 2,
    },
    {
      roomId: "abcdf",
      otherUserImg: "",
      otherUserName: "lili",
      recentTalkContent:
        "you know what? he is the most popular artist at least I've ever seen. and I think",
      recentTalkTime: "21.04.07",
      unreadTalkNO: 2,
    },
  ];

  // for mobile
  const navigate = useNavigate();

  // for tablet----------------------------------------------------------

  const [searchParam] = useSearchParams();
  const roomIdFromUrl = searchParam.get("roomId");

  const [isShowRoomTablet, handleShowRoomTablet] = useState(false);
  const [roomId, setRoomId] = useState("");
  // highlight room selected
  const [roomSelected, handleRoom] = useState("");
  // open or close massage list
  const [isRoomOpen, handleRoomOpen] = useState(false);
  // before clicking one of the chat room list : do not show the space for chat room
  const [isBeforeClickList, handleBeforeClickList] = useState(true);

  const handleRoomList = { isRoomOpen, handleRoomOpen: () => handleRoomOpen(!isRoomOpen) };
  // show the chat room :
  // - for tablet and desktop, show the section of chat room next to the chat room list
  // - for mobile go to the chat room page
  const isMobile = useWhetherItIsMobile();
  const isTablet = useWhetherItIsTablet();

  const showRoom = (chatRoomId: string) => {
    // when clicking the list at first
    if (isTablet && isBeforeClickList) {
      handleBeforeClickList(false);
      handleShowRoomTablet(true);
      handleRoomOpen(true);
      setRoomId(chatRoomId);
      handleRoom(chatRoomId);
    } else if (isTablet && !isBeforeClickList) {
      // when clicking the list since second
      setRoomId(chatRoomId);
      handleRoom(chatRoomId);
    } else if (isMobile) {
      navigate(`${CHAT_ROOM}/${chatRoomId}`);
    }
  };

  useEffect(() => {
    // handle window resizing
    if (isMobile && roomId) {
      // on tablet and desktop, the path is always chat room list
      // when displaying chat room list only or both chat room and chat room list together

      // on mobile, chat room list and chat room are separated each other in paths and components

      navigate(`${CHAT_ROOM}/${roomId}`, { replace: true });
    }
  }, [isMobile, roomId]);

  useEffect(() => {
    // show chat room list with chat room given
    // when resizing window from chat room page or just navigating here with room id
    if (isTablet && roomIdFromUrl) {
      showRoom(roomIdFromUrl);
    }
  }, [roomIdFromUrl, isTablet]);

  return (
    <MainBG isChatRoomList>
      <ChatRoomListCntnrDevice isTablet={isTablet}>
        <ChatRoomListCntnr
          isShowRoomTablet={isShowRoomTablet}
          isRoomOpen={isRoomOpen}
          isBeforeClickList={isBeforeClickList}
        >
          {chatRoomsFromServer.map((_) => (
            <ChatRoomPreview
              key={_.roomId}
              chatRoom={_}
              showRoom={showRoom}
              roomSelected={roomSelected}
              stateChanged={isRoomOpen}
              isBeforeClickList={isBeforeClickList}
              // to change width of component used ellipsis
            />
          ))}
        </ChatRoomListCntnr>

        {isShowRoomTablet && (
          <ChatRoomCntnr isRoomOpen={isRoomOpen}>
            <NavChatRoom handleRoomList={handleRoomList} />
            <ChatRoom roomIdTablet={roomId} />
          </ChatRoomCntnr>
        )}
      </ChatRoomListCntnrDevice>
    </MainBG>
  );
}
