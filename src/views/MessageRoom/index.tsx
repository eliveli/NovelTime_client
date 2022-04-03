import React from "react";
import SectionBG from "components/SectionBG";
import { useAppDispatch } from "store/hooks";
import { setOtherUser } from "store/clientSlices/messageSlice";
import { useParams } from "react-router-dom";
import { MessageContainer, UserImg, MessageDesc, CreateDate } from "./MessageRoom.styles";

// server request with roomId //

const messageRecord = {
  user: {
    userName: "ab",
    userImg: "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png",
  },
  message: [
    {
      userImg: "",
      userName: "ab",
      talkContent: "hello my name is...",
      talkTime: "22.03.03.12:22",
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "hello my name is...",
      talkTime: "22.03.03.12:22",
    },
    {
      userImg: "",
      userName: "ab",
      talkContent: "hello my name is...",
      talkTime: "22.03.03.12:22",
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "hello my name is...",
      talkTime: "22.03.03.12:22",
    },
  ],
};

interface MessageProps {
  message: {
    userImg: string;
    userName: string;
    talkContent: string;
    talkTime: string;
  };
}
interface SendMessageProps {
  content: string;
  time: string;
}

function WriteMessage() {
  return <div />;
}
function ReceiveMessage({ message }: MessageProps) {
  return (
    <MessageContainer>
      <UserImg userImg={message.userImg} />
      <MessageDesc>{message.talkContent}</MessageDesc>
      <CreateDate>{message.talkTime}</CreateDate>
    </MessageContainer>
  );
}
function SendMessage({ content, time }: SendMessageProps) {
  return (
    <MessageContainer isMe>
      <MessageDesc>{content}</MessageDesc>
      <CreateDate>{time}</CreateDate>
    </MessageContainer>
  );
}
function MessageRecord({ message }: MessageProps) {
  const loginUserName = "a";
  if (loginUserName === message.userName) {
    return <SendMessage content={message.talkContent} time={message.talkTime} />;
  }
  return <ReceiveMessage message={message} />;
}
export default function MessageRoom() {
  // server request with roomId //
  const { roomId } = useParams();
  const dispatch = useAppDispatch();
  dispatch(setOtherUser(messageRecord.user));

  return (
    <SectionBG>
      {messageRecord.message.map((_, idx) => (
        <MessageRecord key={_.userName + idx.toString} message={_} />
      ))}
      <WriteMessage />
    </SectionBG>
  );
}
