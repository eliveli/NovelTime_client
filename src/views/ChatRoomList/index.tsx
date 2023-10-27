import MainBG from "components/MainBG";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentRoomId, useWhetherItIsMobile, useWhetherItIsTablet } from "utils";
import ChatRoom from "views/ChatRoom";
import { ChatRoomNav } from "views/Nav/Nav.components";
import { CHAT_ROOM, CHAT_ROOM_LIST } from "utils/pathname";
import { ChatRoom as TypeChatRoom } from "store/serverAPIs/types";
import { useAppSelector } from "store/hooks";
import {
  ChatRoomCntnr,
  ChatRoomListCntnr,
  ListAndRoomCntnr,
  CreateDate,
  UserImg,
  UserName,
  ChatRoomPreviewContainer,
  UserNameBox,
  MessageContent,
  NextToImgContainer,
  FirstLineInfoContnr,
  UnreadMessageNoContnr,
  UnreadMessageNumber,
} from "./ChatRoomList.styles";

interface ChatRoomPreviewProps {
  chatRoom: TypeChatRoom;
  isRoomSpread: boolean;
  roomIdSelected: string | null;
}

function getCurrentDate() {
  const date = new Date();
  let year: string = date.getFullYear().toString();
  year = year.substring(2, 4);

  let month: string | number = date.getMonth() + 1;
  month = month < 10 ? `0${month.toString()}` : month.toString();

  let day: string | number = date.getDate();
  day = day < 10 ? `0${day.toString()}` : day.toString();

  return `${year}.${month}.${day}`; // yy.mm.dd
}

// Sort rooms by latest message create time
const sortByMessageCreateTime = (room1: TypeChatRoom, room2: TypeChatRoom) => {
  if (room1.latestMessageDateTime < room2.latestMessageDateTime) return 1;
  if (room1.latestMessageDateTime > room2.latestMessageDateTime) return -1;
  return 0;
};

export function UnreadMessageNo({
  isRoomSpread,
  unreadMessageNo,
  isForMobileNav,
  isForDesktopNav,
}: {
  isRoomSpread?: boolean;
  unreadMessageNo: number;
  isForMobileNav?: true;
  isForDesktopNav?: true;
}) {
  return (
    <UnreadMessageNoContnr
      isRoomSpread={isRoomSpread}
      isForMobileNav={isForMobileNav}
      isForDesktopNav={isForDesktopNav}
    >
      <UnreadMessageNumber isForNav={isForMobileNav || isForDesktopNav}>
        {unreadMessageNo}
      </UnreadMessageNumber>
    </UnreadMessageNoContnr>
  );
}

function ChatRoomPreview({ chatRoom, isRoomSpread, roomIdSelected }: ChatRoomPreviewProps) {
  const {
    roomId,
    partnerUserName,
    partnerUserImg,
    latestMessageContent,
    latestMessageDate,
    latestMessageTime,
    unreadMessageNo,
  } = chatRoom;

  const navigate = useNavigate();

  const currentDate = getCurrentDate();
  const dateToDisplay = currentDate === latestMessageDate ? latestMessageTime : latestMessageDate;

  return (
    <ChatRoomPreviewContainer
      isRoom={!!roomIdSelected}
      isRoomSpread={isRoomSpread}
      isCurrentRoom={roomIdSelected === roomId}
      onClick={() => {
        navigate(`${CHAT_ROOM_LIST}?roomId=${roomId}`);
      }}
    >
      <UserImg userImg={partnerUserImg} />
      <NextToImgContainer isRoomSpread={isRoomSpread}>
        <FirstLineInfoContnr>
          <UserNameBox>
            <UserName>{partnerUserName}</UserName>
            <CreateDate>{dateToDisplay}</CreateDate>
          </UserNameBox>
          {!!unreadMessageNo && (
            <UnreadMessageNo isRoomSpread={isRoomSpread} unreadMessageNo={unreadMessageNo} />
          )}
        </FirstLineInfoContnr>
        <MessageContent>{latestMessageContent}</MessageContent>
      </NextToImgContainer>
    </ChatRoomPreviewContainer>
  );
}
export default function ChatRoomList() {
  const navigate = useNavigate();

  const rooms = useAppSelector((state) => state.chat.rooms);

  // Treat a certain room ------------------------------------------- //
  const currentRoomId = getCurrentRoomId();
  // - if roomId is empty string, display room list only (not with a certain room)

  const [isRoomSpread, handleRoomSpread] = useState(false);
  const roomSpread = { isRoomSpread, spreadRoomOrNot: () => handleRoomSpread(!isRoomSpread) };

  // Handle window resizing ----------------------------------------- //
  const isMobile = useWhetherItIsMobile();
  const isTablet = useWhetherItIsTablet();

  useEffect(() => {
    if (!currentRoomId) {
      handleRoomSpread(false);
      // initialize for when navigating here again from here by clicking the message navigation icon
      return;
    }

    if (isMobile && !isTablet) {
      // don't write "if (!isTablet)" that causes continuous navigating between room and room list
      // "if (isMobile)" works well too
      navigate(`${CHAT_ROOM}/${currentRoomId}`, { replace: true });
    }
  }, [isMobile, isTablet, currentRoomId]);

  return (
    <MainBG isChatRoomList>
      <ListAndRoomCntnr>
        <ChatRoomListCntnr isRoom={!!currentRoomId} isRoomSpread={isRoomSpread}>
          {[...Object.values(rooms)]?.sort(sortByMessageCreateTime).map((_) => (
            <ChatRoomPreview
              key={_.roomId}
              chatRoom={_}
              isRoomSpread={isRoomSpread}
              roomIdSelected={currentRoomId}
            />
          ))}
        </ChatRoomListCntnr>

        {currentRoomId && (
          <ChatRoomCntnr isRoomSpread={isRoomSpread}>
            <ChatRoomNav roomSpread={roomSpread} />
            <ChatRoom roomIdTablet={currentRoomId} />
          </ChatRoomCntnr>
        )}
      </ListAndRoomCntnr>
    </MainBG>
  );
}
