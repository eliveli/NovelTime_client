import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import { isThePath, useWhetherItIsTablet } from "utils";
import { MESSAGE_LIST, MESSAGE_ROOM } from "utils/pathname";
import { useGetMessagesQuery } from "store/serverAPIs/novelTime";
import { useAppSelector } from "store/hooks";
import { Message } from "store/serverAPIs/types";
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
import { WriteTextMessage } from "./MessageRoom.components";

type DateCriterion = {
  currentOne: { date: string; isNewDate: boolean };
  setCriterion: (date: string, isNewDate: boolean) => void;
};
interface MessageProps {
  message: Message;
  loginUserName?: string;
  isFirstMessageUnread?: true;
  dateCriterion?: DateCriterion;
}
interface ReceiveMessageProps {
  message: Message;
  // {
  //   userImg: string;
  //   userName: string;
  //   talkContent: string;
  //   talkTime: string;
  //   lastWatch?: boolean;
  //
  //   isContinuous: boolean; // when it is true and isContinuousLast is false, do not show createTime
  //   isContinuousFirst: boolean; // when it is true, do not show userImg
  //   isContinuousLast: boolean; // when it is true, show createTime
  // };
  isFirstMessageUnread?: true;
  dateCriterion?: DateCriterion;
}

interface SendMessageProps {
  content: string;
  createdAt: string;
  // isContinuous: boolean;
  // isContinuousLast: boolean;
  dateCriterion?: DateCriterion;
}

function ReceiveMessage({ isFirstMessageUnread, message, dateCriterion }: ReceiveMessageProps) {
  // show the message which was read last when entering page
  const LastWatchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    LastWatchRef.current?.scrollIntoView();
  }, []);

  return (
    <>
      {isFirstMessageUnread && (
        <LastWatchContnr ref={LastWatchRef}>
          <MarkContnr>
            <LastWatchMark>마지막으로 읽은 메시지입니다</LastWatchMark>
          </MarkContnr>
        </LastWatchContnr>
      )}

      {dateCriterion?.currentOne.isNewDate && (
        <MarkContnr>
          <DateMark>{dateCriterion.currentOne.date}</DateMark>
        </MarkContnr>
      )}

      <MessageContainer>
        <UserImg
          userImg={{ ...message.senderUserImg }}
          // isShow={!message.isContinuous || (message.isContinuous && message.isContinuousFirst)}
        />
        <MessageContentContnr>
          <MessageDesc>{message.content}</MessageDesc>
          {/* remove date from time and put it later */}
          {/* {((message.isContinuous && message.isContinuousLast) || !message.isContinuous) && ( */}
          <CreateDate>{message.createdAt}</CreateDate>
          {/* )} */}
        </MessageContentContnr>
      </MessageContainer>
    </>
  );
}

function SendMessage({
  // isContinuous,
  // isContinuousLast,
  content,
  createdAt,
  dateCriterion,
}: SendMessageProps) {
  // show the message which was read last when entering page
  const LastWatchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    LastWatchRef.current?.scrollIntoView();
  }, []);

  return (
    <>
      {/* remove time from date later */}
      {dateCriterion?.currentOne.isNewDate && (
        <MarkContnr>
          <DateMark>{dateCriterion.currentOne.date}</DateMark>
        </MarkContnr>
      )}
      <MessageContainer isMe>
        <MessageContentContnr isMe>
          <MessageDesc isMe>{content}</MessageDesc>

          {/* remove date from time and put it later */}
          {/* {((isContinuous && isContinuousLast) || !isContinuous) && ( */}
          <CreateDate isMe>{createdAt}</CreateDate>
          {/* )} */}
        </MessageContentContnr>
      </MessageContainer>
    </>
  );
}
function MessageRecord({
  message,
  loginUserName,
  isFirstMessageUnread,
  dateCriterion,
}: MessageProps) {
  const yearInCreateDate = message.createdAt.substring(2, 4);
  const monthInCreateDate = message.createdAt.substring(4, 6);
  const dayInCreateDate = message.createdAt.substring(6, 8);
  const dateToShow = `${yearInCreateDate}.${monthInCreateDate}.${dayInCreateDate}`;

  if (dateCriterion && dateCriterion.currentOne.date !== dateToShow) {
    dateCriterion.setCriterion(dateToShow, true);
  } else if (dateCriterion?.currentOne.date === dateToShow) {
    dateCriterion.setCriterion(dateToShow, false);
  }

  // note. "senderUser" means message writer in DB
  //       <SendMessage> means message sent by login user
  if (loginUserName === message.senderUserName) {
    return (
      <SendMessage
        dateCriterion={dateCriterion}
        // isContinuous={message.isContinuous}
        // isContinuousLast={message.isContinuousLast}
        content={message.content}
        createdAt={message.createdAt}
      />
    );
  }
  return (
    <ReceiveMessage
      isFirstMessageUnread={isFirstMessageUnread}
      dateCriterion={dateCriterion}
      message={message}
    />
  );
}

export default function MessageRoom({ roomIdTablet }: { roomIdTablet?: string }) {
  const { roomId: roomIdMobile } = useParams();

  const roomId = roomIdTablet || roomIdMobile;

  const messageResult = useGetMessagesQuery(roomId as string);

  const loginUserName = useAppSelector((state) => state.user.loginUserInfo.userName);

  let isMessageUnread = false;
  const checkMessageUnread = (senderUserName: string, isReadByReceiver: boolean) => {
    // login user is the receiver
    if (loginUserName === senderUserName) return undefined;

    if (isMessageUnread) return undefined;

    if (!isMessageUnread && !isReadByReceiver) {
      isMessageUnread = true;
      return true; // first message unread by the login user
    }
    return undefined;
  };

  // mark new date
  const dateCriterion = useRef({ date: "", isNewDate: false });
  const setCriterion = (date: string, isNewDate: boolean) => {
    dateCriterion.current = { date, isNewDate };
  };

  const contnrRef = useRef<HTMLElement>(null);

  // for realtime communication
  const hostName =
    process.env.REACT_APP_ENV === "production"
      ? "http://www.noveltime.shop"
      : "http://domainfordev.com";
  const socket = io(hostName, {
    path: "/socket.io",
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
    socket.emit("send message", { roomId, msg: testReceiveM });
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
      countNewMsg((prev) => prev + 1);
    });
  }, []);

  const navigate = useNavigate();
  const isTablet = useWhetherItIsTablet();

  useEffect(() => {
    // handle window resizing
    if (isTablet && isThePath(MESSAGE_ROOM) && roomId) {
      navigate(`${MESSAGE_LIST}?roomId=${roomId}`, { replace: true });
    }
  }, [isTablet]);

  return (
    <ResizingFromMobile roomIdMobile={roomId}>
      <MsgRoomContnr roomIdMobile={roomId}>
        {messageResult.data?.map((_, idx) => (
          <MessageRecord
            key={_.messageId}
            message={_}
            dateCriterion={{ currentOne: dateCriterion.current, setCriterion }}
            isFirstMessageUnread={checkMessageUnread(_.senderUserName, _.isReadByReceiver)}
            loginUserName={loginUserName}
          />
        ))}

        {/*
         {newMsgNO > 0 &&
          newMessages.current.map((_) => <MessageRecord key={_.messageId} message={_} />)}
           */}

        <button onClick={testMessage}>testMessage</button>
      </MsgRoomContnr>
      <WriteTextMessage />
    </ResizingFromMobile>
  );
}
