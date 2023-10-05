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
  AllMessageContainer,
  UserAndContentContainer,
  UserImg,
  MessageDesc,
  CreateDate,
  MessageContentContnr,
  MarkContnr,
  DateMark,
  LastWatchMark,
  ChatRoomContainer,
  MessageContainer,
} from "./ChatRoom.styles";
import { MessageInput } from "./ChatRoom.components";

type DateCriterion = React.MutableRefObject<{
  date: string;
  isNewDate: boolean;
}>;
interface MessageProps {
  message: TypeMessage;
  isNeededCreateTime: boolean;
  isNeededPartnerUserImg: boolean;
  isMyMessage: boolean;
  isMessageToRead: boolean;
  dateCriterion: DateCriterion;
  isFirstMessageUnread?: true;
}
interface PartnerMessageProps {
  message: TypeMessage;
  isNeededCreateTime: boolean;
  isNeededPartnerUserImg: boolean;
}
interface MyMessageProps {
  content: string;
  createTime?: string;
}

function PartnerMessage({
  message,
  isNeededCreateTime,
  isNeededPartnerUserImg,
}: PartnerMessageProps) {
  return (
    <UserAndContentContainer>
      <UserImg userImg={{ ...message.senderUserImg }} isShow={isNeededPartnerUserImg} />
      <MessageContentContnr>
        <MessageDesc>{message.content}</MessageDesc>
        {isNeededCreateTime && <CreateDate>{message.createTime}</CreateDate>}
      </MessageContentContnr>
    </UserAndContentContainer>
  );
}

function MyMessage({ content, createTime }: MyMessageProps) {
  return (
    <UserAndContentContainer isMe>
      <MessageContentContnr isMe>
        <MessageDesc isMe>{content}</MessageDesc>
        {createTime && <CreateDate isMe>{createTime}</CreateDate>}
      </MessageContentContnr>
    </UserAndContentContainer>
  );
}

function Message({
  message,
  isMyMessage,
  isFirstMessageUnread,
  isNeededCreateTime,
  isNeededPartnerUserImg,
  isMessageToRead,
  dateCriterion,
}: MessageProps) {
  const dateCriterionRef = dateCriterion;

  if (dateCriterionRef.current.date !== message.createDate) {
    dateCriterionRef.current = { date: message.createDate, isNewDate: true };
  } else {
    dateCriterionRef.current.isNewDate = false;
  }

  // go to the message to read
  const messageToRead = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isMessageToRead) return;

    messageToRead.current?.scrollIntoView();
  }, [isMessageToRead]);

  return (
    <MessageContainer ref={messageToRead}>
      {isFirstMessageUnread && (
        <MarkContnr>
          <LastWatchMark>마지막으로 읽은 메시지입니다</LastWatchMark>
        </MarkContnr>
      )}

      {dateCriterion.current.isNewDate && (
        <MarkContnr>
          <DateMark>{dateCriterion.current.date}</DateMark>
        </MarkContnr>
      )}

      {isMyMessage ? (
        <MyMessage
          content={message.content}
          createTime={isNeededCreateTime ? message.createTime : undefined}
        />
      ) : (
        <PartnerMessage
          message={message}
          isNeededCreateTime={isNeededCreateTime}
          isNeededPartnerUserImg={isNeededPartnerUserImg}
        />
      )}
    </MessageContainer>
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
  } = useAppSelector((state) => state.loginUser.user);

  // to send query by changing arg not to use cache data
  //    when choosing other room in chat room list page on tablet
  const getUniqueValue = () => Math.floor(Date.now() * Math.random());
  const valueForNoCache = useRef(getUniqueValue());
  const prevRoomId = useRef(roomId);
  useEffect(() => {
    if (!roomId) return;

    if (roomId !== prevRoomId.current) {
      valueForNoCache.current = getUniqueValue();
      prevRoomId.current = roomId;
    }
  }, [roomId]);

  const messageResult = useGetMessagesQuery(
    { roomId: roomId as string, valueForNoCache: valueForNoCache.current },
    {
      skip: !loginUserName,
      // - if login user refreshes page, query works after login user info is put in user slice
    },
  );

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
    messageIndex: number,
  ) => {
    if (isNewMessage) return undefined; // not for new message with socket

    // login user is the receiver
    if (loginUserName === senderUserName) return undefined;

    if (isMessageUnread) return undefined;

    // don't display the unread message text
    // when first message in the room was sent by partner and wasn't read by the login user
    if (messageIndex === 0 && !isMessageUnread && !isReadByReceiver) {
      isMessageUnread = true;
      return undefined;
    }

    if (!isMessageUnread && !isReadByReceiver) {
      isMessageUnread = true;
      return true; // first message unread by the login user (not first one in the room)
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

  const checkPartnerUserImgIsNeeded = (
    currentUser: string,
    currentCreateDate: string,

    prevUser?: string,
    prevCreateDate?: string,
    isFirstMessageUnread?: true,
  ) =>
    currentUser !== prevUser ||
    currentCreateDate !== prevCreateDate ||
    isFirstMessageUnread === true;

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
    <ChatRoomContainer>
      {messageResult.isFetching && <Spinner styles="fixed" />}

      <AllMessageContainer>
        {allMessages.map((_, idx) => {
          const previousMessage = idx > 0 ? allMessages[idx - 1] : undefined;

          const nextMessage =
            allMessages && idx < allMessages.length - 1 ? allMessages[idx + 1] : undefined;

          const isNewMessage = !!messageResult.data && messageResult.data.length - 1 < idx;

          const isFirstMessageUnread = checkMessageUnread(
            _.senderUserName,
            _.isReadByReceiver,
            isNewMessage,
            idx,
          );
          const isLastMessage = allMessages.length > 0 && allMessages.length - 1 === idx;

          const isLatestNewMessage = isNewMessage && isLastMessage;

          // last message when there's no message unread by login user and no new message
          const isLastMsgNotUnreadOrNewOne = !isMessageUnread && !isNewMessage && isLastMessage;

          const isMessageToRead =
            isFirstMessageUnread || isLatestNewMessage || isLastMsgNotUnreadOrNewOne;

          return (
            <Message
              key={_.messageId}
              dateCriterion={dateCriterion}
              isFirstMessageUnread={isFirstMessageUnread}
              isMyMessage={loginUserName === _.senderUserName}
              isNeededCreateTime={checkCreateTimeIsNeeded(
                _.senderUserName,
                _.createTime,
                _.createDate,
                nextMessage?.senderUserName,
                nextMessage?.createTime,
                nextMessage?.createDate,
              )}
              isNeededPartnerUserImg={checkPartnerUserImgIsNeeded(
                _.senderUserName,
                _.createDate,
                previousMessage?.senderUserName,
                previousMessage?.createDate,
                isFirstMessageUnread,
              )}
              isMessageToRead={isMessageToRead}
              message={_}
            />
          );
        })}
      </AllMessageContainer>

      <MessageInput sendMessage={sendMessage} />
    </ChatRoomContainer>
  );
}
