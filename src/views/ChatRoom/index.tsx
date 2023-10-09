import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isThePath, useWhetherItIsTablet } from "utils";
import { CHAT_ROOM_LIST, CHAT_ROOM } from "utils/pathname";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { MessagesWithPartner, Message as TypeMessage } from "store/serverAPIs/types";
import socket from "store/serverAPIs/socket.io";
import { changeMsgsUnread, setMessages } from "store/clientSlices/chatSlice";
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
import { MessageInput, NewMsgPreview } from "./ChatRoom.components";

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
  isFirstMessageUnread: boolean;
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

  const {
    userId: loginUserId,
    userName: loginUserName,
    userImg: loginUserImg,
  } = useAppSelector((state) => state.loginUser.user);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Don't handle the case where non-login user comes in
  //  because the login user can refresh this page and be a non-login user for a second
  //  and basically non-login user can't enter chatroom or chatroom list
  //     by clicking message icons on nav bar or in an user page

  // Get messages in the room and Handle errors ----------------------------- //
  const messagesInThisRoom = useAppSelector((state) => state.chat.allMessages[String(roomId)]);

  useEffect(() => {
    if (!roomId || !loginUserId) return;

    if (messagesInThisRoom) return;

    socket.emit("get messages", { roomId, userId: loginUserId });
  }, [roomId, loginUserId]);

  type MessagesWithSocket = {
    status: number;
    data?: MessagesWithPartner;
    error?: { message?: string };
  };

  const setMessagesWithSocket = ({ status, data, error }: MessagesWithSocket) => {
    if (status === 200 && data && roomId) {
      dispatch(setMessages({ roomId, data }));
      return;
    }

    if (status === 400 && error) {
      if (error.message === "room doesn't exist") {
        alert("방이 존재하지 않습니다");
      }

      if (error.message === "user is not in the room") {
        alert(`${loginUserName}님이 참여한 방이 아닙니다`);
      }

      navigate(-1);
      return;
    }

    if (status === 500) {
      alert(`메시지를 불러올 수 없습니다`);

      navigate(-1);
    }
  };

  useEffect(() => {
    socket.on("messages in the room", setMessagesWithSocket);

    return () => {
      socket.off("messages in the room", setMessagesWithSocket);
    };
  }, [roomId]);

  // Check if new message came in
  const prevMsgLength = useRef(-1); // set when entering here
  const isNewMessage = prevMsgLength.current < messagesInThisRoom?.messages.length;

  // Treat first unread message of the current room ----------------------- //
  const idxOfFirstMsgUnread = useRef<number>(-1);

  useEffect(() => {
    if (!roomId || !messagesInThisRoom) return;

    // Set the index of first message unread by login user in current room
    const index = messagesInThisRoom.messages.findIndex(
      (message) =>
        message.senderUserName === messagesInThisRoom.partnerUser.userName &&
        message.isReadByReceiver === false,
    );
    idxOfFirstMsgUnread.current = index;

    // Change isReadByReceiver in allMessages and unreadMessageNo in rooms
    dispatch(changeMsgsUnread({ roomId }));

    // Whenever new message comes in, Change isReadByReceiver to true
    //  - This works with treatNewMessage in chatSlice

    // To check when new message came in //
    prevMsgLength.current = messagesInThisRoom.messages.length;
    //
  }, [roomId]);

  // Display messages ------------------------------------------------------ //
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
    isFirstMessageUnread: boolean,

    prevUser?: string,
    prevCreateDate?: string,
  ) =>
    currentUser !== prevUser ||
    currentCreateDate !== prevCreateDate ||
    isFirstMessageUnread === true;

  const dateCriterion = useRef({ date: "", isNewDate: false });

  // Send a new message ----------------------------------------------------- //
  const sendMessage = (content: string) => {
    socket.emit("send message", {
      roomId,
      content,
      senderUserId: loginUserId,
      senderUserName: loginUserName,
      senderUserImg: loginUserImg,
    });
  };

  // Handle window resizing -------------------------------------------------- //
  const isTablet = useWhetherItIsTablet();

  useEffect(() => {
    if (isTablet && isThePath(CHAT_ROOM) && roomId) {
      navigate(`${CHAT_ROOM_LIST}?roomId=${roomId}`, { replace: true });
    }
  }, [isTablet]);

  return (
    <ChatRoomContainer>
      <AllMessageContainer>
        {messagesInThisRoom?.messages.map((_, idx) => {
          const { messages } = messagesInThisRoom;
          const previousMessage = idx > 0 ? messages[idx - 1] : undefined;

          const nextMessage = messages && idx < messages.length - 1 ? messages[idx + 1] : undefined;

          const isFirstMessageUnread = idx !== 0 && idxOfFirstMsgUnread.current === idx;
          // (idx !== 0) Except for when an user didn't read any messages before
          //             Don't display unread message mark at the top of all in the room
          //             and Scrolling doesn't work

          // last message when there's no message unread by login user
          const isLastAndReadInAll =
            idxOfFirstMsgUnread.current === -1 && idx === prevMsgLength.current - 1;

          // Scroll to the message when entering here. not works when new message comes
          const isMessageToRead = !isNewMessage && (isFirstMessageUnread || isLastAndReadInAll);

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
                isFirstMessageUnread,
                previousMessage?.senderUserName,
                previousMessage?.createDate,
              )}
              isMessageToRead={isMessageToRead}
              message={_}
            />
          );
        })}
      </AllMessageContainer>

      <NewMsgPreview
        message={messagesInThisRoom?.messages[messagesInThisRoom.messages.length - 1].content}
      />

      <MessageInput sendMessage={sendMessage} />
    </ChatRoomContainer>
  );
}
