/* eslint-disable no-param-reassign */

import { useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";
import MainBG from "components/MainBG";
import { useParams } from "react-router-dom";
import { WriteComment } from "components/Writing";
import {
  MsgRoomContnr,
  MessageContainer,
  UserImg,
  MessageDesc,
  CreateDate,
  MessageContentContnr,
  MarkContnr,
  DateMark,
  LastWatchContnr,
  LastWatchMark,
  ResizingFromMobile,
} from "./MessageRoom.styles";

// server request with (roomIdMobile || roomIdTablet) //

const messageRecord = {
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
}
interface SendMessageProps {
  content: string;
  time: string;
  lastWatch?: boolean;
  lastMessage?: boolean;
  isContinuous: boolean;
  isContinuousLast: boolean;
  dateRecord?: DateRecord;
}

function ReceiveMessage({ message, dateRecord, lastMessage }: ReceiveMessageProps) {
  // show the message which was read last when entering page
  const LastWatchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    LastWatchRef.current?.scrollIntoView();
  }, []);

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
function MessageRecord({ lastMessage, message, dateRecord }: MessageProps) {
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
        dateRecord={dateRecord}
        lastWatch={message.lastWatch}
        isContinuous={message.isContinuous}
        isContinuousLast={message.isContinuousLast}
        content={message.talkContent}
        time={message.talkTime}
      />
    );
  }
  return <ReceiveMessage lastMessage={lastMessage} dateRecord={dateRecord} message={message} />;
}
export default function MessageRoom({ roomIdTablet }: { roomIdTablet?: string }) {
  // server request with (roomIdMobile || roomIdTablet) //
  const { roomId } = useParams();
  const roomIdMobile = roomId;

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
  // ------------------------------------------------------------------//

  //
  // below is for setting realtime
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
    socket.emit("send message", { roomId: roomIdMobile || roomIdTablet, msg: testReceiveM });
  };
  useEffect(() => {
    socket.emit("join room", roomIdMobile || roomIdTablet);
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
      countNewMsg((prev) => prev + 1);
      console.log("newMsgNO: ", newMsgNO);
      console.log("newMessages.current: ", newMessages.current);
    });
  }, []);

  return (
    <ResizingFromMobile roomIdMobile={roomIdMobile}>
      <MsgRoomContnr roomIdMobile={roomIdMobile}>
        {messageRecord.message.map((_, idx) => (
          <MessageRecord
            key={_.userName + idx.toString}
            message={_}
            // following is previous data not realtime
            dateRecord={dateRecord.current}
            lastMessage={idx === messageRecord.message.length - 1}
          />
        ))}

        {newMsgNO > 0 &&
          newMessages.current.map((_, idx) => (
            <MessageRecord key={_.userName + idx.toString} message={_} />
          ))}

        <button onClick={testMessage}>testMessage</button>
      </MsgRoomContnr>
      <WriteComment isMessage />
    </ResizingFromMobile>
  );
}
