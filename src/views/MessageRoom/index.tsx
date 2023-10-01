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
  date: string;
  isNewDate: boolean;
};
interface MessageProps {
  message: Message;
  isNeededCreateTime: boolean;
  isNeededUserImg: boolean;
  isMyMessage: boolean;
  dateCriterion: DateCriterion;
  isFirstMessageUnread?: true;
}
interface PartnerMessageProps {
  message: Message;
  dateCriterion: DateCriterion;
  isNeededCreateTime: boolean;
  isNeededUserImg: boolean;
  isFirstMessageUnread?: true;
}
interface MyMessageProps {
  content: string;
  dateCriterion: DateCriterion;
  createTime?: string;
}

function PartnerMessage({
  isFirstMessageUnread,
  message,
  dateCriterion,
  isNeededCreateTime,
  isNeededUserImg,
}: PartnerMessageProps) {
  // go to the message which was read last when entering page
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

      {dateCriterion.isNewDate && (
        <MarkContnr>
          <DateMark>{dateCriterion.date}</DateMark>
        </MarkContnr>
      )}

      <MessageContainer>
        <UserImg userImg={{ ...message.senderUserImg }} isShow={isNeededUserImg} />
        <MessageContentContnr>
          <MessageDesc>{message.content}</MessageDesc>
          {isNeededCreateTime && <CreateDate>{message.createTime}</CreateDate>}
        </MessageContentContnr>
      </MessageContainer>
    </>
  );
}

function MyMessage({ content, createTime, dateCriterion }: MyMessageProps) {
  // go to the message which was read last when entering page
  const LastWatchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    LastWatchRef.current?.scrollIntoView();
  }, []);

  return (
    <>
      {dateCriterion.isNewDate && (
        <MarkContnr>
          <DateMark>{dateCriterion.date}</DateMark>
        </MarkContnr>
      )}
      <MessageContainer isMe>
        <MessageContentContnr isMe>
          <MessageDesc isMe>{content}</MessageDesc>
          {createTime && <CreateDate isMe>{createTime}</CreateDate>}
        </MessageContentContnr>
      </MessageContainer>
    </>
  );
}

function MessageStored({
  message,
  isMyMessage,
  isFirstMessageUnread,
  isNeededCreateTime,
  isNeededUserImg,
  dateCriterion,
}: MessageProps) {
  if (isMyMessage) {
    return (
      <MyMessage
        dateCriterion={dateCriterion}
        content={message.content}
        createTime={isNeededCreateTime ? message.createTime : undefined}
      />
    );
  }

  return (
    <PartnerMessage
      message={message}
      dateCriterion={dateCriterion}
      isFirstMessageUnread={isFirstMessageUnread}
      isNeededCreateTime={isNeededCreateTime}
      isNeededUserImg={isNeededUserImg}
    />
  );
}

export default function MessageRoom({ roomIdTablet }: { roomIdTablet?: string }) {
  const { roomId: roomIdMobile } = useParams();
  const roomId = roomIdTablet || roomIdMobile;

  const loginUserName = useAppSelector((state) => state.user.loginUserInfo.userName);
  const messageResult = useGetMessagesQuery(roomId as string, {
    skip: !loginUserName,
    // if login user refreshes page, query works after login user info is put in user slice
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!messageResult.error) return;

    if ("data" in messageResult.error && "message" in messageResult.error.data) {
      if (messageResult.error.data.message === "room doesn't exist") {
        alert("방이 존재하지 않습니다");
        navigate(-1);
        return;
      }

      if (messageResult.error.data.message === "user is not in the room") {
        alert(`${loginUserName}님이 참여한 방이 아닙니다`);
        navigate(-1);
      }
    }
  }, [messageResult.error]);

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

  const checkCreateTimeIsNeeded = (
    currentUser: string,
    currentTime: string,
    currentDate: string,

    nextUser?: string,
    nextTime?: string,
    nextDate?: string,
  ) => currentUser !== nextUser || currentTime !== nextTime || currentDate !== nextDate;

  const checkUserImgIsNeeded = (currentUser: string, prevUser?: string) => currentUser !== prevUser;

  const dateCriterion = useRef({ date: "", isNewDate: false });

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
  // below is for setting realtime // * need to change
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
        {messageResult.data?.map((_, idx) => {
          const previousMessage =
            messageResult.data && idx > 0 ? messageResult.data[idx - 1] : undefined;

          const nextMessage =
            messageResult.data && idx < messageResult.data.length - 1
              ? messageResult.data[idx + 1]
              : undefined;

          if (dateCriterion.current.date !== _.createDate) {
            dateCriterion.current = { date: _.createDate, isNewDate: true };
          } else {
            dateCriterion.current.isNewDate = false;
          }

          return (
            <MessageStored
              key={_.messageId}
              dateCriterion={dateCriterion.current}
              isFirstMessageUnread={checkMessageUnread(_.senderUserName, _.isReadByReceiver)}
              isMyMessage={loginUserName === _.senderUserName}
              isNeededCreateTime={checkCreateTimeIsNeeded(
                _.senderUserName,
                _.createTime,
                _.createDate,
                nextMessage?.senderUserName,
                nextMessage?.createTime,
                nextMessage?.createDate,
              )}
              isNeededUserImg={checkUserImgIsNeeded(
                _.senderUserName,
                previousMessage?.senderUserName,
              )}
              message={_}
            />
          );
        })}

        {/*
         {newMsgNO > 0 &&
          newMessages.current.map((_) => <MessageStored key={_.messageId} message={_} />)}
           */}

        <button onClick={testMessage}>testMessage</button>
      </MsgRoomContnr>
      <WriteTextMessage />
    </ResizingFromMobile>
  );
}
