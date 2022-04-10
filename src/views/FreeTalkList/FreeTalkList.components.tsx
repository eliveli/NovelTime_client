import React from "react";
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

  userName: string;
  userImg: string;
  createDate: string;

  likeNO: number;
  commentNO: number;

  talkTitle: string;
  talkImg: string;

  novelTitle: string;
}

export default function FreeTalk({ talk }: { talk: TalkProps }) {
  // props or default props
  const {
    talkId,

    userName,
    userImg,
    createDate,

    likeNO,
    commentNO,

    talkTitle,
    talkImg,

    novelTitle,
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
        <UserImg
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
            navigate(`/user_page/${userName}`);
          }}
        />
        <BesideImgContainer>
          <FirstLineContainer>
            <UserNameBox>
              <UserName
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  event.stopPropagation();
                  navigate(`/user_page/${userName}`);
                }}
              >
                {userName}
              </UserName>
              <CreateDate>{createDate}</CreateDate>
            </UserNameBox>
            <IconsBox>
              <IconContainer>
                <Icon.IconBox noPointer size={20}>
                  <Icon.Heart />
                </Icon.IconBox>
                <IconNO>{likeNO}</IconNO>
              </IconContainer>
              <IconContainer>
                <Icon.IconBox noPointer size={20}>
                  <Icon.Comment />
                </Icon.IconBox>
                <IconNO>{commentNO}</IconNO>
              </IconContainer>
            </IconsBox>
          </FirstLineContainer>

          <TalkPreview>
            <TalkTitle>{talkTitle}</TalkTitle>
            <TalkImgBox>
              <TalkImg />
            </TalkImgBox>
            <NovelTitle>{novelTitle}</NovelTitle>
          </TalkPreview>
        </BesideImgContainer>
      </Talk>
    </ThemeProvider>
  );
}
