import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isThePath, useWhetherItIsTablet } from "utils";
import { CHAT_ROOM_LIST, CHAT_ROOM } from "utils/pathname";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { MessagesWithPartner, Message as TypeMessage } from "store/serverAPIs/types";
import socket from "store/serverAPIs/socket.io";
import { changeMsgsUnread, setMessages } from "store/clientSlices/chatSlice";
import { throttle } from "lodash";
import { handleAlert, openFirstModal } from "store/clientSlices/modalSlice";
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
function checkNearBottom(element: HTMLElement, errorRange: number) {
  if (element.clientHeight + element.scrollTop + errorRange >= element.scrollHeight) {
    return true;
  }

  return false;
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

  const prevRoomId = useRef(""); // to know that the user changed a room to visit
  // note. I didn't use one ref for many refs which have different types in order to avoid ts error

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
        dispatch(openFirstModal("alert"));
        dispatch(handleAlert({ text: "방이 존재하지 않습니다" }));
      }

      if (error.message === "user is not in the room") {
        dispatch(openFirstModal("alert"));
        dispatch(handleAlert({ text: `${loginUserName}님이 참여한 방이 아닙니다` }));
      }

      navigate(-1);
      return;
    }

    if (status === 500) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: `메시지를 불러올 수 없습니다` }));

      navigate(-1);
    }
  };

  useEffect(() => {
    socket.on("messages in the room", setMessagesWithSocket);

    return () => {
      socket.off("messages in the room", setMessagesWithSocket);
    };
  }, [roomId]);

  // Separate existing messages from new ones ----------------------------- //
  const existingMsgLength = useRef(-1); // Set when entering here
  const isNewMessage =
    existingMsgLength.current !== -1 &&
    existingMsgLength.current < messagesInThisRoom?.messages.length;

  // Treat the latest message preview to go there with click -------------- //
  const [isPreviewToGoToNewMsg, handlePreviewToGoToNewMsg] = useState(false);

  const allMessagesRef = useRef<HTMLDivElement>(null);

  // Remove the preview when y-scroll is near bottom
  const throttledScroll = throttle(() => {
    if (!allMessagesRef.current || !isPreviewToGoToNewMsg) return;

    const isNearBottom = checkNearBottom(allMessagesRef.current, 40);

    if (isNearBottom) {
      handlePreviewToGoToNewMsg(false);
    }
  }, 400);

  useEffect(() => {
    if (!isPreviewToGoToNewMsg || !allMessagesRef.current) return;

    allMessagesRef.current.addEventListener("scroll", throttledScroll);

    return () => {
      allMessagesRef.current?.removeEventListener("scroll", throttledScroll); // clean up
    };
  }, [isPreviewToGoToNewMsg]);

  // The preview appears when a new message comes in that was sent by the partner
  //  except when the y-scroll is near the bottom.
  //  As clicking it, the user can go to the latest message automatically.
  // If the message was sent by login user, he/she goes to the message directly without preview.
  useEffect(() => {
    if (!messagesInThisRoom?.messages.length) return;

    if (isNewMessage) {
      if (
        messagesInThisRoom.messages[messagesInThisRoom.messages.length - 1].senderUserName ===
        loginUserName
      ) {
        handlePreviewToGoToNewMsg(false);
        return;
      }

      const isNearBottom = allMessagesRef.current && checkNearBottom(allMessagesRef.current, 40);

      if (!isNearBottom) {
        // Display the preview
        //  when the partner send the message when y-scroll is not near bottom
        handlePreviewToGoToNewMsg(true);
      }
    }
  }, [messagesInThisRoom?.messages, allMessagesRef.current]);

  const handleClosePreview = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!allMessagesRef.current) return;

    event.preventDefault();
    event.stopPropagation();

    handlePreviewToGoToNewMsg(false);

    // Scroll to the bottom
    const scrollY = allMessagesRef.current.scrollHeight;
    allMessagesRef.current.scrollTo(0, scrollY);
    // - This scrollY value is more than one it can be with scrollTo()
    //   but this goes to the bottom of the component
    // - ScrollIntoView doesn't work. so I use this instead
  };

  // Treat first unread message of the current room ----------------------- //
  const idxOfFirstMsgUnread = useRef<number>(-1);

  useEffect(() => {
    if (!roomId || !messagesInThisRoom || prevRoomId.current === roomId) return;
    // - Initialize several data whenever the user changes a room to visit

    prevRoomId.current = roomId; // to know the roomId change

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
    existingMsgLength.current = messagesInThisRoom.messages.length;
    //
  }, [roomId, messagesInThisRoom]);

  // Check before message is displayed -------------------------------------------------- //
  const checkCreateTimeIsNeeded = ({
    currentUser,
    currentTime,
    currentDate,
    nextUser,
    nextTime,
    nextDate,
    isPrevMsgOfFirstUnreadMsg,
  }: {
    currentUser: string;
    currentTime: string;
    currentDate: string;

    nextUser?: string;
    nextTime?: string;
    nextDate?: string;
    isPrevMsgOfFirstUnreadMsg: boolean;
  }) =>
    currentUser !== nextUser ||
    currentTime !== nextTime ||
    currentDate !== nextDate ||
    isPrevMsgOfFirstUnreadMsg;

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

  // Send a new message ---------------------------------------------------------- //
  const sendMessage = (content: string) => {
    socket.emit("send message", {
      roomId,
      content,
      senderUserId: loginUserId,
      senderUserName: loginUserName,
      senderUserImg: loginUserImg,
    });
  };

  // To adjust designs in other components as change in MessageInput height when typing the message
  const [msgInputHeight, getMsgInputHeight] = useState(78); // initial height

  // Handle window resizing -------------------------------------------------- //
  const isTablet = useWhetherItIsTablet();

  useEffect(() => {
    if (isTablet && isThePath(CHAT_ROOM) && roomId) {
      navigate(`${CHAT_ROOM_LIST}?roomId=${roomId}`, { replace: true });
    }
  }, [isTablet]);

  return (
    <ChatRoomContainer>
      <AllMessageContainer ref={allMessagesRef} msgInputHeight={msgInputHeight}>
        {messagesInThisRoom?.messages.map((_, idx) => {
          const { messages } = messagesInThisRoom;
          const previousMessage = idx > 0 ? messages[idx - 1] : undefined;

          const nextMessage = messages && idx < messages.length - 1 ? messages[idx + 1] : undefined;

          const isFirstMessageUnread = idx !== 0 && idxOfFirstMsgUnread.current === idx;
          // (idx !== 0) Except for when an user didn't read any messages before
          //             Don't display unread message mark at the top of all in the room
          //
          // previous message of first message unread
          const isLastReadMsg =
            idxOfFirstMsgUnread.current !== 0 && idxOfFirstMsgUnread.current - 1 === idx;
          // Scroll to the last message read
          // (idxOfFirstMsgUnread.current !== 0) Don't scroll when there's no message read
          //
          // last message in all existing ones and login user read it already
          const isLastAndReadMsgOfAll =
            idxOfFirstMsgUnread.current === -1 && idx === existingMsgLength.current - 1;

          // Scroll to the message to read
          const isExistingMsgToRead = !isNewMessage && (isLastReadMsg || isLastAndReadMsgOfAll);

          const isLatestMsgToRead =
            isNewMessage &&
            idx === messages.length - 1 &&
            messages[messages.length - 1].senderUserName === loginUserName;
          // Scroll if the latest message is sent by the login user when it comes in
          // - Don't use "isPreviewToGoToNewMsg" to scroll to it as it works unexpectedly
          //   : When a new message comes in, it is added to the message array in chatSlice
          //      and isPreviewToGoToNewMsg changes in useEffect.
          //     But actually components rerender and
          //      new message component is added and scroll works there
          //     even before the message is pushed with "treatNewMessage" in chatSlice.
          //      (at least with console check. I don't understand why it does)
          //     In my test, when the partner user sent a new message,
          //      "isPreviewToGoToNewMsg" is set to true first (scrolling works in this moment)
          //       and set to false at last for a second in the flow
          //     To prevent this, I changed how to set "isLatestMsgToRead"
          //       as checking the sender is login user instead of using "isPreviewToGoToNewMsg".
          //       if yes, scrolling works in the latest message.
          //       if not, it means the partner sent the latest message,
          //               scrolling works in the parent component "AllMessageContainer"
          //                (not in this component to avoid an unexpected result)
          //               after the login user clicks the preview

          const isMessageToRead = isExistingMsgToRead || isLatestMsgToRead;

          return (
            <Message
              key={_.messageId}
              dateCriterion={dateCriterion}
              isFirstMessageUnread={isFirstMessageUnread}
              isMyMessage={loginUserName === _.senderUserName}
              isNeededCreateTime={checkCreateTimeIsNeeded({
                currentUser: _.senderUserName,
                currentTime: _.createTime,
                currentDate: _.createDate,
                nextUser: nextMessage?.senderUserName,
                nextTime: nextMessage?.createTime,
                nextDate: nextMessage?.createDate,
                isPrevMsgOfFirstUnreadMsg: idxOfFirstMsgUnread.current === idx + 1,
              })}
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

      {isNewMessage && isPreviewToGoToNewMsg && (
        <NewMsgPreview
          clickToClose={handleClosePreview}
          messageContent={
            messagesInThisRoom?.messages[messagesInThisRoom.messages.length - 1]?.content
          }
          msgInputHeight={msgInputHeight}
        />
      )}
      <MessageInput
        sendMessage={sendMessage}
        getMsgInputHeight={getMsgInputHeight}
        allMessagesRef={allMessagesRef}
      />
    </ChatRoomContainer>
  );
}
