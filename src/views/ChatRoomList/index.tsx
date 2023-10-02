import MainBG from "components/MainBG";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useComponentWidth, useWhetherItIsMobile, useWhetherItIsTablet } from "utils";
import ChatRoom from "views/ChatRoom";
import { ChatRoomNav } from "views/Nav/Nav.components";
import { CHAT_ROOM, CHAT_ROOM_LIST } from "utils/pathname";
import { useGetChatRoomsQuery } from "store/serverAPIs/novelTime";
import { ChatRoom as TypeChatRoom } from "store/serverAPIs/types";
import { useAppSelector } from "store/hooks";
import Spinner from "assets/Spinner";
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
  UnreadTalkNoContnr,
  UnreadTalkNO,
} from "./ChatRoomList.styles";

interface ChatRoomPreviewProps {
  chatRoom: TypeChatRoom;
  roomSelected: string | null;
  isRoomSpread: boolean;
  isRoom: boolean;
}

function ChatRoomPreview({ chatRoom, roomSelected, isRoomSpread, isRoom }: ChatRoomPreviewProps) {
  const {
    roomId,
    partnerUserName,
    partnerUserImg,
    latestMessageContent,
    latestMessageDate,
    unreadMessageNo,
  } = chatRoom;

  // set ellipsis with component width
  const contnrRef = useRef<HTMLDivElement>(null);
  const contnrWidth = useComponentWidth(contnrRef, isRoomSpread);

  const navigate = useNavigate();

  return (
    <ChatRoomPreviewContainer
      ref={contnrRef}
      onClick={() => {
        navigate(`${CHAT_ROOM_LIST}?roomId=${roomId}`);
      }}
      isCurrentRoom={roomSelected === roomId}
      isRoom={isRoom}
    >
      <UserImg userImg={partnerUserImg} />
      <NextToImgContainer>
        <FirstLineInfoContnr>
          <UserNameBox>
            <UserName>{partnerUserName}</UserName>
            <CreateDate>{latestMessageDate}</CreateDate>
          </UserNameBox>
          {!!unreadMessageNo && (
            <UnreadTalkNoContnr>
              <UnreadTalkNO>{unreadMessageNo}</UnreadTalkNO>
            </UnreadTalkNoContnr>
          )}
        </FirstLineInfoContnr>
        <MessageContent contnrWidth={contnrWidth}>{latestMessageContent}</MessageContent>
      </NextToImgContainer>
    </ChatRoomPreviewContainer>
  );
}
export default function ChatRoomList() {
  const isLoginUser = !!useAppSelector((state) => state.user.loginUserInfo.userId);

  const chatRoomResult = useGetChatRoomsQuery(undefined, { skip: !isLoginUser });
  // if login user refreshes page, query works after login user info is put in user slice

  const navigate = useNavigate();

  const [searchParam] = useSearchParams();
  const roomId = searchParam.get("roomId");
  // if roomId is null, display room list only (not with a certain room)

  const [isRoomSpread, handleRoomSpread] = useState(false);
  const roomSpread = { isRoomSpread, spreadRoomOrNot: () => handleRoomSpread(!isRoomSpread) };

  const isMobile = useWhetherItIsMobile();
  const isTablet = useWhetherItIsTablet();

  useEffect(() => {
    if (!roomId) return;

    // handle window resizing //
    if (isMobile && !isTablet) {
      // don't write "if (!isTablet)" that causes continuous navigating between room and room list
      // "if (isMobile)" works well too
      navigate(`${CHAT_ROOM}/${roomId}`, { replace: true });
    }
  }, [isMobile, isTablet, roomId]);

  return (
    <MainBG isChatRoomList>
      <ListAndRoomCntnr>
        {chatRoomResult.isFetching && <Spinner styles="fixed" />}

        <ChatRoomListCntnr isRoom={!!roomId} isRoomSpread={isRoomSpread}>
          {chatRoomResult.data?.map((_) => (
            // * connect socket io
            // * to get and display the change from each room
            <ChatRoomPreview
              key={_.roomId}
              chatRoom={_}
              roomSelected={roomId}
              isRoomSpread={isRoomSpread} // to change component width where ellipsis is used
              isRoom={!!roomId}
            />
          ))}
        </ChatRoomListCntnr>

        {roomId && (
          <ChatRoomCntnr isRoomSpread={isRoomSpread}>
            <ChatRoomNav roomSpread={roomSpread} />
            <ChatRoom roomIdTablet={roomId} />
          </ChatRoomCntnr>
        )}
      </ListAndRoomCntnr>
    </MainBG>
  );
}
