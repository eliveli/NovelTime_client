import { ThemeProvider } from "styled-components";
import { useNavigate } from "react-router-dom";

import Icon from "../../assets/Icon";
import {
  CreateDate,
  FirstLineContainer,
  UserImg,
  UserName,
  Talk,
  UserNameBox,
  IconsBox,
  TalkTitle,
  NovelTitle,
  TalkImg,
  IconNO,
  TalkPreview,
  BesideImgContainer,
  TalkImgBox,
  IconContainer,
  // setImgUrl,
} from "./FreeTalkList.styles";

interface TalkProps {
  talkId: string;
  userImg: string;
  talkImg: string;
}

export default function FreeTalk({ talk }: { talk: TalkProps }) {
  // props or default props
  const {
    userImg = "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
    talkImg = "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
    talkId,
  } = talk;
  const theme = {
    userImg,
    talkImg,
  };

  const navigate = useNavigate();

  // setImgUrl(talkProps.img);
  return (
    <ThemeProvider theme={theme}>
      <Talk
        onClick={() => {
          navigate(`/talk_detail/${talkId}`);
        }}
      >
        <UserImg />
        <BesideImgContainer>
          <FirstLineContainer>
            <UserNameBox>
              <UserName>Nana</UserName>
              <CreateDate>22.01.01</CreateDate>
            </UserNameBox>
            <IconsBox>
              <IconContainer>
                <Icon.IconBox noPointer size={20}>
                  <Icon.Heart />
                </Icon.IconBox>
                <IconNO>7</IconNO>
              </IconContainer>
              <IconContainer>
                <Icon.IconBox noPointer size={20}>
                  <Icon.Comment />
                </Icon.IconBox>
                <IconNO>5</IconNO>
              </IconContainer>
            </IconsBox>
          </FirstLineContainer>

          <TalkPreview>
            <TalkTitle>꾸준히 인기 많은 해포 패러디 계의 탑 작품</TalkTitle>
            <TalkImgBox>
              <TalkImg />
            </TalkImgBox>
            <NovelTitle>[해리포터]지독한 후플푸프 - 곽정언</NovelTitle>
          </TalkPreview>
        </BesideImgContainer>
      </Talk>
    </ThemeProvider>
  );
}
