/* eslint-disable no-param-reassign */
import React, { useEffect, useRef } from "react";
import SectionBG from "components/SectionBG";
import { useAppDispatch } from "store/hooks";
import { setOtherUser } from "store/clientSlices/messageSlice";
import { useParams } from "react-router-dom";
import { WriteComment } from "components/Writing";
import {
  MessageContainer,
  UserImg,
  MessageDesc,
  CreateDate,
  MessageContentContnr,
  MarkContnr,
  DateMark,
  LastWatchContnr,
  LastWatchMark,
} from "./MessageRoom.styles";

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
      lastWatch: false,
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "last watch: hello my name is...",
      talkTime: "22.03.03.12:22",
      lastWatch: false,
    },
    {
      userImg: "",
      userName: "ab",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: false,
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: false,
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: false,
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: false,
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: false,
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: false,
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: false,
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: false,
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: false,
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: true,
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: false,
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: false,
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: false,
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: false,
    },
  ],
};

interface MessageProps {
  message: {
    userImg: string;
    userName: string;
    talkContent: string;
    talkTime: string;
    lastWatch: boolean;
  };
  lastMessage: boolean;
  dateRecord: { date: string; isNewDate: boolean };
}
interface ReceiveMessageProps {
  message: {
    userImg: string;
    userName: string;
    talkContent: string;
    talkTime: string;
    lastWatch: boolean;
  };
  lastMessage: boolean;
  dateRecord: { date: string; isNewDate: boolean };
}
interface SendMessageProps {
  content: string;
  time: string;
  lastWatch: boolean;
  lastMessage: boolean;
  dateRecord: { date: string; isNewDate: boolean };
}

function ReceiveMessage({ lastMessage, message, dateRecord }: ReceiveMessageProps) {
  // show the message which was read last when entering page
  const LastWatchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    LastWatchRef.current?.scrollIntoView();
  }, []);
  return (
    <>
      {/* remove time from date later */}
      {dateRecord.isNewDate && (
        <MarkContnr>
          <DateMark>{dateRecord.date}</DateMark>
        </MarkContnr>
      )}
      <MessageContainer>
        <UserImg userImg={message.userImg} />
        <MessageContentContnr>
          <MessageDesc>{message.talkContent}</MessageDesc>
          {/* remove date except for time later */}
          <CreateDate>{message.talkTime}</CreateDate>
        </MessageContentContnr>
      </MessageContainer>
      {message.lastWatch && (
        <LastWatchContnr ref={LastWatchRef}>
          <MarkContnr>
            <LastWatchMark>마지막으로 읽은 메시지입니다</LastWatchMark>
          </MarkContnr>
        </LastWatchContnr>
      )}
    </>
  );
}
function SendMessage({ lastMessage, lastWatch, content, time, dateRecord }: SendMessageProps) {
  // show the message which was read last when entering page
  const LastWatchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    LastWatchRef.current?.scrollIntoView();
  }, []);

  return (
    <>
      {/* remove time from date later */}
      {dateRecord.isNewDate && (
        <MarkContnr>
          <DateMark>{dateRecord.date}</DateMark>
        </MarkContnr>
      )}
      <MessageContainer isMe>
        <MessageContentContnr isMe>
          <MessageDesc isMe>{content}</MessageDesc>
          {/* remove date except for time later */}
          <CreateDate>{time}</CreateDate>
        </MessageContentContnr>
      </MessageContainer>
      {lastWatch && (
        <LastWatchContnr ref={LastWatchRef}>
          <MarkContnr>
            <LastWatchMark>마지막으로 읽은 메시지입니다</LastWatchMark>
          </MarkContnr>
        </LastWatchContnr>
      )}
    </>
  );
}
function MessageRecord({ lastMessage, message, dateRecord }: MessageProps) {
  const loginUserName = "a"; // change later to real login user's name

  // mark new date
  if (dateRecord.date !== message.talkTime) {
    dateRecord.date = message.talkTime;
    dateRecord.isNewDate = true;
  } else if (dateRecord.date === message.talkTime) {
    dateRecord.isNewDate = false;
  }

  if (loginUserName === message.userName) {
    return (
      <SendMessage
        lastMessage={lastMessage}
        dateRecord={dateRecord}
        lastWatch={message.lastWatch}
        content={message.talkContent}
        time={message.talkTime}
      />
    );
  }
  return <ReceiveMessage lastMessage={lastMessage} dateRecord={dateRecord} message={message} />;
}
export default function MessageRoom() {
  // server request with roomId //
  const { roomId } = useParams();
  const dispatch = useAppDispatch();
  dispatch(setOtherUser(messageRecord.user));

  // mark new date
  const dateRecord = useRef({ date: "", isNewDate: false });

  return (
    <SectionBG isMessageRoom>
      {messageRecord.message.map((_, idx) => (
        <MessageRecord
          key={_.userName + idx.toString}
          message={_}
          dateRecord={dateRecord.current}
          lastMessage={idx === messageRecord.message.length - 1}
        />
      ))}
      <WriteComment isMessage />
    </SectionBG>
  );
}
