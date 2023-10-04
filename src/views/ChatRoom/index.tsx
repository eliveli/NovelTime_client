import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isThePath, useWhetherItIsTablet } from "utils";
import { CHAT_ROOM_LIST, CHAT_ROOM } from "utils/pathname";
import { useGetMessagesQuery } from "store/serverAPIs/novelTime";
import { useAppSelector } from "store/hooks";
import { Message as TypeMessage } from "store/serverAPIs/types";
import Spinner from "assets/Spinner";
import socket from "store/serverAPIs/socket.io";
import {
  ChatRoomContnr,
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
} from "./ChatRoom.styles";
import { WriteTextMessage } from "./ChatRoom.components";

type DateCriterion = React.MutableRefObject<{
  date: string;
  isNewDate: boolean;
}>;
interface MessageProps {
  message: TypeMessage;
  isNeededCreateTime: boolean;
  isNeededUserImg: boolean;
  isMyMessage: boolean;
  dateCriterion: DateCriterion;
  isFirstMessageUnread?: true;
}
interface PartnerMessageProps {
  message: TypeMessage;
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

      {dateCriterion.current.isNewDate && (
        <MarkContnr>
          <DateMark>{dateCriterion.current.date}</DateMark>
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
      {dateCriterion.current.isNewDate && (
        <MarkContnr>
          <DateMark>{dateCriterion.current.date}</DateMark>
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

function Message({
  message,
  isMyMessage,
  isFirstMessageUnread,
  isNeededCreateTime,
  isNeededUserImg,
  dateCriterion,
}: MessageProps) {
  const dateCriterionRef = dateCriterion;

  if (dateCriterionRef.current.date !== message.createDate) {
    dateCriterionRef.current = { date: message.createDate, isNewDate: true };
  } else {
    dateCriterionRef.current.isNewDate = false;
  }

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

export default function ChatRoom({ roomIdTablet }: { roomIdTablet?: string }) {
  const { roomId: roomIdMobile } = useParams();
  const roomId = roomIdTablet || roomIdMobile;

  const [allMessages, setAllMessages] = useState<TypeMessage[]>([]);

  const {
    userId: loginUserId,
    userName: loginUserName,
    userImg: loginUserImg,
  } = useAppSelector((state) => state.user.loginUserInfo);
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
        //
      } else if (messageResult.error.data.message === "user is not in the room") {
        alert(`${loginUserName}님이 참여한 방이 아닙니다`);
        //
      } else {
        alert(`메시지를 불러올 수 없습니다`);
      }

      navigate(-1);
    }
  }, [messageResult.error]);

  useEffect(() => {
    if (!messageResult.data?.length) return;

    setAllMessages([...messageResult.data]);
  }, [messageResult.data]);

  let isMessageUnread = false;
  const checkMessageUnread = (
    senderUserName: string,
    isReadByReceiver: boolean,
    isNewMessage: boolean,
  ) => {
    if (isNewMessage) return undefined; // not for new message with socket

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

  // for realtime communication //
  const sendMessage = (content: string) => {
    socket.emit("send message", {
      roomId,
      content,
      senderUserId: loginUserId,
      senderUserName: loginUserName,
      senderUserImg: loginUserImg,
    });
  };

  useEffect(() => {
    if (!roomId) return;

    if (isThePath(CHAT_ROOM_LIST)) return; // joined already

    socket.emit("join a room", roomId);
  }, [roomId]);

  const setNewMessage = (newMessage: TypeMessage) => {
    setAllMessages((prev) => [...prev, newMessage]);

    if (newMessage.senderUserName !== loginUserName) {
      socket.emit("change message read", newMessage.messageId);
    }
  };

  useEffect(() => {
    socket.on("new message", setNewMessage);

    // need to remove the event to get "loginUserName" changed
    return () => {
      socket.off("new message", setNewMessage);
    };
  }, [loginUserName]);

  const isTablet = useWhetherItIsTablet();

  useEffect(() => {
    // handle window resizing
    if (isTablet && isThePath(CHAT_ROOM) && roomId) {
      navigate(`${CHAT_ROOM_LIST}?roomId=${roomId}`, { replace: true });
    }
  }, [isTablet]);

  return (
    <ResizingFromMobile roomIdMobile={roomId}>
      {messageResult.isFetching && <Spinner styles="fixed" />}

      <ChatRoomContnr roomIdMobile={roomId}>
        {allMessages.map((_, idx) => {
          const previousMessage = idx > 0 ? allMessages[idx - 1] : undefined;

          const nextMessage =
            allMessages && idx < allMessages.length - 1 ? allMessages[idx + 1] : undefined;

          const isNewMessage = !!messageResult.data && messageResult.data.length - 1 < idx;

          return (
            <Message
              key={_.messageId}
              dateCriterion={dateCriterion}
              isFirstMessageUnread={checkMessageUnread(
                _.senderUserName,
                _.isReadByReceiver,
                isNewMessage,
              )}
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
      </ChatRoomContnr>

      <WriteTextMessage sendMessage={sendMessage} />
    </ResizingFromMobile>
  );
}
