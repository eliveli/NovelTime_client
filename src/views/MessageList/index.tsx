import SectionBG from "components/SectionBG";
import { useNavigate } from "react-router-dom";
import {
  CreateDate,
  UserImg,
  UserName,
  MessageContainer,
  UserNameBox,
  MessageDesc,
  NextToImgContainer,
  FirstLineInfoContnr,
  UnreadTalkNoContnr,
  UnreadTalkNO,
} from "./MessageList.styles";

interface MessageProps {
  message: {
    roomId: string;
    otherUserImg: string;
    otherUserName: string;
    recentTalkContent: string;
    recentTalkTime: string;
    unreadTalkNO: number;
  };
}

function Message({ message }: MessageProps) {
  const { roomId, otherUserImg, otherUserName, recentTalkContent, recentTalkTime, unreadTalkNO } =
    message;
  const navigate = useNavigate();
  return (
    <MessageContainer onClick={() => navigate(`/message_room/${roomId}`)}>
      <UserImg userImg={otherUserImg} />
      <NextToImgContainer>
        <FirstLineInfoContnr>
          <UserNameBox>
            <UserName>{otherUserName}</UserName>
            <CreateDate>{recentTalkTime}</CreateDate>
          </UserNameBox>
          <UnreadTalkNoContnr>
            <UnreadTalkNO>{unreadTalkNO}</UnreadTalkNO>
          </UnreadTalkNoContnr>
        </FirstLineInfoContnr>
        <MessageDesc>{recentTalkContent}</MessageDesc>
      </NextToImgContainer>
    </MessageContainer>
  );
}
export default function MessageList() {
  // server request with userId(or userName) for user's message list //
  const messageFromServer = [
    {
      roomId: "abcd",
      otherUserImg: "",
      otherUserName: "lala",
      recentTalkContent: "asdfzxcfds",
      recentTalkTime: "22.01.09",
      unreadTalkNO: 2,
    },
    {
      roomId: "abcde",
      otherUserImg: "",
      otherUserName: "lolo",
      recentTalkContent: "hello we are the...",
      recentTalkTime: "22.01.04",
      unreadTalkNO: 2,
    },
    {
      roomId: "abcdf",
      otherUserImg: "",
      otherUserName: "lili",
      recentTalkContent: "you know what? he is the most popular artist at least...",
      recentTalkTime: "21.04.07",
      unreadTalkNO: 2,
    },
  ];

  return (
    <SectionBG>
      {messageFromServer.map((_) => (
        <Message key={_.roomId} message={_} />
      ))}
    </SectionBG>
  );
}
