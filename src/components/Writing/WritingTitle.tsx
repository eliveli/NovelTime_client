/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from "react";
import { ThemeProvider } from "styled-components";
import { useComponentWidth } from "utils";
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

  talkPhoto?: string;
  recommendPhoto?: string;

  userId: string;
  userName: string;
  userImg: string;
  createDate: string;
  likeNO: number;

  commentNO?: number;
}

export default function WritingTitle({ writing }: { writing: WritingProps }) {
  // props or default props
  const {
    talkId, // 프리톡 상세페이지 요청 시 필요
    talkTitle,
    recommendId, // 레코멘드 상세페이지 요청 시 필요
    recommendTitle,
    talkPhoto,
    recommendPhoto,

    userId, // 유저 상세페이지 요청 시 필요
    userName,
    userImg,
    createDate,
    likeNO,

    commentNO, // default value (X) : 없을 때 undefined 필요
  } = writing;
  const theme = {};

  // configure title ellipsis
  const titleWidthRef = useRef<HTMLDivElement>(null);
  const calcTitleWidth = useComponentWidth(titleWidthRef);
  const titleWidth = calcTitleWidth - 40 - 4; // (component width) - (image width) - (extra)

  return (
    <ThemeProvider theme={theme}>
      <TalkBG>
        <Talk>
          <UserImg userImg={userImg} />
          <BesideImgContainer>
            <FirstLineContainer ref={titleWidthRef}>
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
              <TalkTitle titleWidth={titleWidth}>{talkTitle || recommendTitle}</TalkTitle>

              {/* 사진이 있을 경우: 기본 사진 이미지? 또는 글에 쓰인 사진?  */}
              {(talkPhoto ?? recommendPhoto) && (
                <TalkImgBox>
                  <TalkImg img={talkPhoto ?? recommendPhoto} />
                </TalkImgBox>
              )}
            </TalkPreview>
          </BesideImgContainer>
        </Talk>
      </TalkBG>
    </ThemeProvider>
  );
}
