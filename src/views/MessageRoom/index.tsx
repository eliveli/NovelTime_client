/* eslint-disable no-param-reassign */

import React, { useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";
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
      isContinuous: false,
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "last watch: hello my name is...",
      talkTime: "22.03.03.12:22",
      lastWatch: false,
      isContinuous: false,
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: false,
      isContinuous: true,
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: true,
      isContinuous: true,
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: false,
      isContinuous: false,
    },
  ],
};
type DateRecord = { date: string; isNewDate: boolean };
interface MessageProps {
  message: {
    userImg: string;
    userName: string;
    talkContent: string;
    talkTime: string;
    lastWatch?: boolean;
    isContinuous: boolean;
  };
  lastMessage?: boolean;
  dateRecord?: DateRecord;
  // prevTimeSend: { time: string; isNewTime: boolean; user: string };
  // prevTimeReceive: { time: string; isNewTime: boolean; user: string };
}
interface ReceiveMessageProps {
  message: {
    userImg: string;
    userName: string;
    talkContent: string;
    talkTime: string;
    lastWatch?: boolean;
    isContinuous: boolean;
  };
  lastMessage?: boolean;
  dateRecord?: DateRecord;
  // prevTime: { time: string; isNewTime: boolean; user: string };
}
interface SendMessageProps {
  content: string;
  time: string;
  lastWatch?: boolean;
  lastMessage?: boolean;
  isContinuous: boolean;
  dateRecord?: DateRecord;
  // prevTime: { time: string; isNewTime: boolean; user: string };
}

function ReceiveMessage({
  //  prevTime,
  message,
  dateRecord,
  lastMessage,
}: ReceiveMessageProps) {
  // show the message which was read last when entering page
  const LastWatchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    LastWatchRef.current?.scrollIntoView();
  }, []);

  // don't show time if time of previous message is same with current one
  // if (prevTime.time !== message.talkTime) {
  //   prevTime.user = message.userName;
  //   prevTime.time = message.talkTime;
  //   prevTime.isNewTime = true;
  // } else if (prevTime.user !== message.userName) {
  //   prevTime.user = message.userName;
  //   prevTime.isNewTime = true;
  // } else if (prevTime.time === message.talkTime) {
  //   prevTime.isNewTime = false;
  // }

  return (
    <>
      {/* remove time from date later */}
      {dateRecord?.isNewDate && (
        <MarkContnr>
          <DateMark>{dateRecord.date}</DateMark>
        </MarkContnr>
      )}
      <MessageContainer>
        <UserImg userImg={message.userImg} />
        <MessageContentContnr>
          <MessageDesc>{message.talkContent}</MessageDesc>
          {/*  */}
          {/* remove date from time and put it later */}
          {!message.isContinuous && <CreateDate>{message.talkTime}</CreateDate>}
        </MessageContentContnr>
      </MessageContainer>
      {message.lastWatch && !lastMessage && (
        <LastWatchContnr ref={LastWatchRef}>
          <MarkContnr>
            <LastWatchMark>마지막으로 읽은 메시지입니다</LastWatchMark>
          </MarkContnr>
        </LastWatchContnr>
      )}
    </>
  );
}
function SendMessage({
  lastMessage,
  // prevTime,
  lastWatch,
  isContinuous,
  content,
  time,
  dateRecord,
}: SendMessageProps) {
  // show the message which was read last when entering page
  const LastWatchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    LastWatchRef.current?.scrollIntoView();
  }, []);

  const loginUserName = "a"; // change later to real login user's name

  // don't show time if time of previous message is same with current one
  // if (prevTime.time !== time) {
  //   prevTime.user = loginUserName;
  //   prevTime.time = time;
  //   prevTime.isNewTime = true;
  // } else if (prevTime.user !== loginUserName) {
  //   prevTime.user = loginUserName;
  //   prevTime.isNewTime = true;
  // } else {
  //   prevTime.isNewTime = false;
  // }

  return (
    <>
      {/* remove time from date later */}
      {dateRecord?.isNewDate && (
        <MarkContnr>
          <DateMark>{dateRecord.date}</DateMark>
        </MarkContnr>
      )}
      <MessageContainer isMe>
        <MessageContentContnr isMe>
          <MessageDesc isMe>{content}</MessageDesc>
          {/*  */}
          {/* remove date from time and put it later */}
          {!isContinuous && <CreateDate isMe>{time}</CreateDate>}
        </MessageContentContnr>
      </MessageContainer>
      {lastWatch && !lastMessage && (
        <LastWatchContnr ref={LastWatchRef}>
          <MarkContnr>
            <LastWatchMark>마지막으로 읽은 메시지입니다</LastWatchMark>
          </MarkContnr>
        </LastWatchContnr>
      )}
    </>
  );
}
function MessageRecord({
  // prevTimeSend,
  // prevTimeReceive,
  lastMessage,
  message,
  dateRecord,
}: MessageProps) {
  const loginUserName = "a"; // change later to real login user's name

  // mark new date : later, compare to date from talkTime with dateRecord.date
  if (dateRecord && dateRecord.date !== message.talkTime) {
    dateRecord.date = message.talkTime;
    dateRecord.isNewDate = true;
  } else if (dateRecord?.date === message.talkTime) {
    dateRecord.isNewDate = false;
  }

  if (loginUserName === message.userName) {
    return (
      <SendMessage
        lastMessage={lastMessage}
        // prevTime={prevTimeSend}
        dateRecord={dateRecord}
        lastWatch={message.lastWatch}
        isContinuous={message.isContinuous}
        content={message.talkContent}
        time={message.talkTime}
      />
    );
  }
  return (
    <ReceiveMessage
      lastMessage={lastMessage}
      // prevTime={prevTimeReceive}
      dateRecord={dateRecord}
      message={message}
    />
  );
}
export default function MessageRoom() {
  // server request with roomId //
  const { roomId } = useParams();
  const dispatch = useAppDispatch();
  dispatch(setOtherUser(messageRecord.user));

  // mark new date
  const dateRecord = useRef({ date: "", isNewDate: false });

  // for realtime communication
  const socket = io("http://localhost:8082", {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
  });

  // -- it is required
  // -- configure from backend!! : variable isContinuous------------------
  // when user send a message,
  // get one just before the message from database
  // if two are same in userName, createTime,
  // set "isContinuous" of previous message "true"
  // and set "isContinuous" of current message "false"
  // ------------------------------------------------------------------//

  // below might be deleted   //// to compare message to one which is put just before  by time
  // const prevTimeSend = useRef({ time: "", isNewTime: false, user: "" });
  // const prevTimeReceive = useRef({ time: "", isNewTime: false, user: "" });

  //
  // below is test for setting realtime
  type NewMessage = {
    userImg: string;
    userName: string;
    talkContent: string;
    talkTime: string;
    isContinuous: boolean;
  };
  const [newMessages, addMessage] = useState([
    {
      userImg: "",
      userName: "",
      talkContent: "",
      talkTime: "",
      isContinuous: false,
    },
  ]);

  const testReceiveM = {
    userImg: "",
    userName: "ab",
    talkContent: "hello my name is...",
    talkTime: "22.03.04.12:22",
    isContinuous: false,
  };
  const testSendM = {
    userImg: "",
    userName: "a",
    talkContent: "hello my name is...",
    talkTime: "22.03.04.12:22",
    isContinuous: false,
  };
  const testMessage = () => {
    socket.emit("send message", { roomId, msg: testReceiveM });
  };
  socket.emit("join room", roomId);
  socket.on("new message", (currentMsg: NewMessage) => {
    const prevMessage = newMessages[newMessages.length - 1];
    if (newMessages.length === 1 && !newMessages[0].userName) {
      addMessage([currentMsg]);
    }
    // set true of isContinuous : in this message, do not show time
    else if (
      prevMessage.userName === currentMsg.userName &&
      prevMessage.talkTime === currentMsg.talkTime
    ) {
      prevMessage.isContinuous = true;
      addMessage([...newMessages, currentMsg]);
    } else {
      addMessage([...newMessages, currentMsg]);
    }
  });
  return (
    <SectionBG isMessageRoom>
      {messageRecord.message.map((_, idx) => (
        <MessageRecord
          key={_.userName + idx.toString}
          message={_}
          // below is previous data not realtime
          dateRecord={dateRecord.current}
          lastMessage={idx === messageRecord.message.length - 1}
          // below may be deleted //
          // prevTimeSend={prevTimeSend.current}
          // prevTimeReceive={prevTimeReceive.current}
        />
      ))}
      {newMessages[0].userName &&
        newMessages.map((_, idx) => <MessageRecord key={_.userName + idx.toString} message={_} />)}
      <button onClick={testMessage}>testMessage</button>
      <WriteComment isMessage />
    </SectionBG>
  );
}
