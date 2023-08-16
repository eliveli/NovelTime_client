import React, { useRef } from "react";
import { ThemeProvider } from "styled-components";
import { useComponentWidth } from "utils";
import { WritingWithoutGenre } from "store/serverAPIs/types";
import Icon from "../../assets/Icon";
import {
  CreateDate,
  FirstLineContainer,
  UserImg,
  UserName,
  WritingBG,
  Writing,
  UserNameBox,
  IconsBox,
  IconBox,
  WritingTitleToShow,
  WritingImg,
  IconNO,
  WritingPreview,
  BesideImgContainer,
  WritingImgBox,
} from "./WritingInNovelDetail.styles";

export default function WritingInNovelDetail({ writing }: { writing: WritingWithoutGenre }) {
  const {
    writingId, // 글 상세페이지 요청 시 필요
    writingTitle,
    writingImg,

    userId, // 유저 상세페이지 요청 시 필요
    userName,
    userImg,
    createDate,
    likeNO,

    commentNO,

    talkOrRecommend,
  } = writing;
  const theme = {};

  // configure title ellipsis
  const titleWidthRef = useRef<HTMLDivElement>(null);
  const calcTitleWidth = useComponentWidth(titleWidthRef);
  const titleWidth = calcTitleWidth - 40 - 4; // (component width) - (image width) - (extra)

  return (
    <ThemeProvider theme={theme}>
      <WritingBG>
        <Writing>
          <UserImg userImg={userImg} />
          <BesideImgContainer>
            <FirstLineContainer ref={titleWidthRef}>
              <UserNameBox>
                <UserName>{userName}</UserName>
                <CreateDate>{createDate}</CreateDate>
              </UserNameBox>
              <IconsBox>
                <IconBox>
                  <Icon.IconBox noPointer size={20}>
                    <Icon.SmallHeart />
                  </Icon.IconBox>
                  <IconNO>{likeNO}</IconNO>
                </IconBox>
                {talkOrRecommend === "T" && (
                  <IconBox>
                    <Icon.IconBox noPointer size={20}>
                      <Icon.Comment />
                    </Icon.IconBox>
                    <IconNO>{commentNO}</IconNO>
                  </IconBox>
                )}
              </IconsBox>
            </FirstLineContainer>

            <WritingPreview>
              <WritingTitleToShow titleWidth={titleWidth}>{writingTitle}</WritingTitleToShow>

              {writingImg && (
                <WritingImgBox>
                  <WritingImg img={writingImg} />
                </WritingImgBox>
              )}
            </WritingPreview>
          </BesideImgContainer>
        </Writing>
      </WritingBG>
    </ThemeProvider>
  );
}
