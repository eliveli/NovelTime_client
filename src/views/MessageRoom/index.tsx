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
      isContinuousFirst: false,
      isContinuousLast: false,
    },
    {
      userImg: "",
      userName: "a",
      talkContent: "last watch: hello my name is...",
      talkTime: "22.03.03.12:22",
      lastWatch: false,
      isContinuous: false,
      isContinuousFirst: false,
      isContinuousLast: false,
    },
    {
      userImg: "",
      userName: "ab",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: false,
      isContinuous: true,
      isContinuousFirst: true,
      isContinuousLast: false,
    },
    {
      userImg: "",
      userName: "ab",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: true,
      isContinuous: true,
      isContinuousFirst: false,
      isContinuousLast: false,
    },
    {
      userImg: "",
      userName: "ab",
      talkContent: "hello my name is...",
      talkTime: "22.03.04.12:22",
      lastWatch: false,
      isContinuous: true,
      isContinuousFirst: false,
      isContinuousLast: true,
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
    isContinuousFirst: boolean;
    isContinuousLast: boolean;
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
    isContinuous: boolean; // when it is true and isContinuousLast is false, do not show createTime
    isContinuousFirst: boolean; // when it is true, do not show userImg
    isContinuousLast: boolean; // when it is true, show createTime
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
  isContinuousLast: boolean;
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
        <UserImg
          userImg={message.userImg}
          isShow={!message.isContinuous || (message.isContinuous && message.isContinuousFirst)}
        />
        <MessageContentContnr>
          <MessageDesc>{message.talkContent}</MessageDesc>
          {/*  */}
          {/* remove date from time and put it later */}
          {((message.isContinuous && message.isContinuousLast) || !message.isContinuous) && (
            <CreateDate>{message.talkTime}</CreateDate>
          )}
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
  isContinuousLast,
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
          {((isContinuous && isContinuousLast) || !isContinuous) && (
            <CreateDate isMe>{time}</CreateDate>
          )}
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
        isContinuousLast={message.isContinuousLast}
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

  const contnrRef = useRef<HTMLElement>(null);

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
  //
  // look at the socket event handler
  // the process of setting states about continuous messages
  //                   (states of isContinuous, isContinuousFirst, isContinuousLast of two messages)
  //         might should be done in backend when receiving the socket message
  //
  //

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
    isContinuousFirst: boolean;
    isContinuousLast: boolean;
  };
  const newMessages = useRef([
    {
      userImg: "",
      userName: "",
      talkContent: "",
      talkTime: "",
      isContinuous: false, // when it is true, do not show createTime
      isContinuousFirst: false, // when it is true, do not show userImg
      isContinuousLast: false, // when it is true, show createTime
    },
  ]);

  const [newMsgNO, countNewMsg] = useState(0);

  const testReceiveM = {
    userImg: "",
    userName: "ab",
    talkContent: "hello my name is...",
    talkTime: "22.03.04.12:22",
    isContinuous: false,
    isContinuousFirst: false,
    isContinuousLast: false,
  };
  const testSendM = {
    userImg: "",
    userName: "a",
    talkContent: "hello my name is...",
    talkTime: "22.03.04.12:22",
    isContinuous: false,
    isContinuousFirst: false,
    isContinuousLast: false,
  };
  const testMessage = () => {
    socket.emit("send message", { roomId, msg: testReceiveM });
    // countNewMsg(newMsgNO + 1);
  };
  useEffect(() => {
    socket.emit("join room", roomId);
  }, []);
  useEffect(() => {
    socket.on("new message", (currentMsg: NewMessage) => {
      const prevMessage = newMessages.current[newMessages.current.length - 1];
      if (newMessages.current.length === 1 && !newMessages.current[0].userName) {
        newMessages.current = [currentMsg];
      } else if (
        prevMessage.userName === currentMsg.userName &&
        prevMessage.talkTime === currentMsg.talkTime &&
        prevMessage.isContinuous === false
      ) {
        // previous message is the first of continuous messages
        prevMessage.isContinuousFirst = true;
        prevMessage.isContinuous = true;

        currentMsg.isContinuous = true;
        currentMsg.isContinuousLast = true;

        newMessages.current.push(currentMsg);
      } else if (
        prevMessage.userName === currentMsg.userName &&
        prevMessage.talkTime === currentMsg.talkTime &&
        prevMessage.isContinuous === true &&
        prevMessage.isContinuousLast === true
      ) {
        // previous message is between first and last continuous messages
        prevMessage.isContinuousLast = false;

        currentMsg.isContinuous = true;
        currentMsg.isContinuousLast = true;

        newMessages.current.push(currentMsg);
      } else {
        newMessages.current.push(currentMsg);
      }
      // contnrRef.current?.append(<MessageRecord message={currentMsg} />);
      countNewMsg((prev) => prev + 1);
      console.log("newMsgNO: ", newMsgNO);
      console.log("newMessages.current: ", newMessages.current);
    });
  }, []);
  return (
    <SectionBG isMessageRoom ref={contnrRef}>
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

      {newMsgNO > 0 &&
        newMessages.current.map((_, idx) => (
          <MessageRecord key={_.userName + idx.toString} message={_} />
        ))}

      <button onClick={testMessage}>testMessage</button>
      <WriteComment isMessage />
    </SectionBG>
  );
}