import MainBG from "components/MainBG";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useComponentWidth, useWhetherItIsMobile, useWhetherItIsTablet } from "utils";
import MessageRoom from "views/MessageRoom";
import { NavMessageRoom } from "views/Nav/Nav.components";
import { MESSAGE_ROOM } from "utils/pathname";
import {
  MsgRoomCntnr,
  MsgListCntnr,
  MsgListCntnrDevice,
  CreateDate,
  UserImg,
  UserName,
  MessageContainer,
  UserNameBox,
  MessageContent,
  NextToImgContainer,
  FirstLineInfoContnr,
  UnreadTalkNoContnr,
  UnreadTalkNO,
} from "./MessageList.styles";

interface MessageProps {
  message: {
    roomId: string;
    otherUserImg: string;
    otherUserName: string;
    recentTalkContent: string;
    recentTalkTime: string;
    unreadTalkNO: number;
  };
  showRoom: (msgRoomId: string) => void;
  crntMsg: string;
  // state: { state1: boolean; state2: boolean };
  stateChanged: boolean;
  isBeforeClickList: boolean;
}

function Message({ message, showRoom, crntMsg, stateChanged, isBeforeClickList }: MessageProps) {
  const { roomId, otherUserImg, otherUserName, recentTalkContent, recentTalkTime, unreadTalkNO } =
    message;

  // configure ellipsis of contentWidth
  const contnrRef = useRef<HTMLDivElement>(null);
  const contnrWidth = useComponentWidth(contnrRef, stateChanged);

  return (
    <MessageContainer
      ref={contnrRef}
      onClick={() => {
        showRoom(roomId);
      }}
      isCrntMsg={crntMsg === roomId}
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
    </MessageContainer>
  );
}
export default function MessageList() {
  // server request with userId(or userName) for user's message list //
  const messageFromServer = [
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
  // mark current one of message list
  const [crntMsg, handleCrntMsg] = useState("");
  // open or close massage list
  const [isListOpen, handleListOpen] = useState(false);
  // before clicking one of the message list : do not show the space for message room
  const [isBeforeClickList, handleBeforeClickList] = useState(true);

  const handleMsgList = { isListOpen, handleMsgOpen: () => handleListOpen(!isListOpen) };
  // show the message room :
  // - for tablet and desktop, show the section of message room next to the message list
  // - for mobile go to the message room page
  const isMobile = useWhetherItIsMobile();
  const isTablet = useWhetherItIsTablet();

  const showRoom = (msgRoomId: string) => {
    // when clicking the list at first
    if (isTablet && isBeforeClickList) {
      handleBeforeClickList(false);
      handleShowRoomTablet(true);
      handleListOpen(true);
      setRoomId(msgRoomId);
      handleCrntMsg(msgRoomId);
    } else if (isTablet && !isBeforeClickList) {
      // when clicking the list since second
      setRoomId(msgRoomId);
      handleCrntMsg(msgRoomId);
    } else if (isMobile) {
      navigate(`${MESSAGE_ROOM}/${msgRoomId}`);
    }
  };
  useEffect(() => {
    // handle window resizing
    if (isMobile && roomId) {
      // on tablet and desktop, the path is always message list
      // when displaying message list only or both message room and message list together

      // on mobile, message list and message room are separated each other in paths and components

      navigate(`${MESSAGE_ROOM}/${roomId}`, { replace: true });
    }
  }, [isMobile, roomId]);

  useEffect(() => {
    // show message list with message room given
    // when resizing window from message room page or just navigating here with room id
    if (isTablet && roomIdFromUrl) {
      showRoom(roomIdFromUrl);
    }
  }, [roomIdFromUrl, isTablet]);

  return (
    <MainBG isMessageList>
      <MsgListCntnrDevice isTablet={isTablet}>
        <MsgListCntnr
          isShowRoomTablet={isShowRoomTablet}
          isListOpen={isListOpen}
          isBeforeClickList={isBeforeClickList}
        >
          {messageFromServer.map((_) => (
            <Message
              key={_.roomId}
              message={_}
              showRoom={showRoom}
              crntMsg={crntMsg}
              stateChanged={isListOpen}
              isBeforeClickList={isBeforeClickList}
              // to change width of component used ellipsis
            />
          ))}
        </MsgListCntnr>

        {isShowRoomTablet && (
          <MsgRoomCntnr isListOpen={isListOpen}>
            <NavMessageRoom handleMsgList={handleMsgList} />
            <MessageRoom roomIdTablet={roomId} />
          </MsgRoomCntnr>
        )}
      </MsgListCntnrDevice>
    </MainBG>
  );
}
