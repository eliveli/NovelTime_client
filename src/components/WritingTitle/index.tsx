/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { ThemeProvider } from "styled-components";
import Icon from "../../assets/Icon";
import {
  CreateDate,
  FirstLineContainer,
  UserImg,
  UserName,
  TalkBG,
  Talk,
  UserNameBox,
  IconsBox,
  IconBox,
  TalkTitle,
  NovelTitle,
  TalkImg,
  IconNO,
  TalkPreview,
  BesideImgContainer,
  TalkImgBox,
  // setImgUrl,
} from "./WritingTitle.styles";

interface WritingProps {
  talkId?: string;
  talkTitle?: string;
  recommendId?: string;
  recommendTitle?: string;
  isTalkImg?: boolean;
  isRecommendImg?: boolean;

  userId: string;
  userName: string;
  userImg: string;
  createDate: string;
  likeNO: number;

  commentNO?: number;
}

export function WritingTitle({ writing }: { writing: WritingProps }) {
  // props or default props
  const {
    talkId, // 프리톡 상세페이지 요청 시 필요
    talkTitle,
    recommendId, // 레코멘드 상세페이지 요청 시 필요
    recommendTitle,
    isTalkImg = false,
    isRecommendImg = false,

    userId, // 유저 상세페이지 요청 시 필요
    userName = "유저이름",
    userImg,
    createDate = "작성일",
    likeNO = 0,

    commentNO, // default value (X) : 없을 때 undefined 필요
  } = writing;
  const theme = {};

  return (
    <ThemeProvider theme={theme}>
      <TalkBG>
        <Talk>
          <UserImg userImg={userImg} />
          <BesideImgContainer>
            <FirstLineContainer>
              <UserNameBox>
                <UserName>{userName}</UserName>
                <CreateDate>{createDate}</CreateDate>
              </UserNameBox>
              <IconsBox>
                <IconBox>
                  <Icon.Heart />
                  <IconNO>{likeNO}</IconNO>
                </IconBox>
                {commentNO && (
                  <IconBox>
                    <Icon.Comment />
                    <IconNO>{commentNO}</IconNO>
                  </IconBox>
                )}
              </IconsBox>
            </FirstLineContainer>

            <TalkPreview>
              <TalkTitle>{talkTitle || recommendTitle}</TalkTitle>

              {/* 사진이 있을 경우: 기본 사진 이미지? 또는 글에 쓰인 사진?  */}
              {(isTalkImg || isRecommendImg) && (
                <TalkImgBox>
                  <TalkImg />
                </TalkImgBox>
              )}
            </TalkPreview>
          </BesideImgContainer>
        </Talk>
      </TalkBG>
    </ThemeProvider>
  );
}
