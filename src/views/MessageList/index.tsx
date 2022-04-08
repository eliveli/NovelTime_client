import SectionBG from "components/SectionBG";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useComponentWidth } from "utils";
import MessageRoom from "views/MessageRoom";
import { NavMobileDetail } from "views/Nav/Nav.components";
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
}

function Message({ message, showRoom, crntMsg, stateChanged }: MessageProps) {
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
    >
      <UserImg userImg={otherUserImg} />
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
  const [isShowRoomTablet, handleShowRoomTablet] = useState(false);
  const [roomId, getRoomId] = useState("");
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
  const isTablet = document.documentElement.offsetWidth >= 768;
  const showRoom = (msgRoomId: string) => {
    if (isTablet) {
      handleShowRoomTablet(true);
      handleListOpen(true);
      getRoomId(msgRoomId);
      handleCrntMsg(msgRoomId);
    } else {
      navigate(`/message_room/${msgRoomId}`);
    }
    handleBeforeClickList(false);
  };
  return (
    <SectionBG isMessageList>
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
              // to change width of component used ellipsis
            />
          ))}
        </MsgListCntnr>
        {isShowRoomTablet && (
          <MsgRoomCntnr isListOpen={isListOpen}>
            <NavMobileDetail pathname={window.location.pathname} handleMsgList={handleMsgList} />
            <MessageRoom roomIdTablet={roomId} />
          </MsgRoomCntnr>
        )}
      </MsgListCntnrDevice>
    </SectionBG>
  );
}
