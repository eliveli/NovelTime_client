import { useState } from "react";
import Icon from "assets/Icon";
import {
  CreateDate,
  UserImg,
  UserName,
  Writing,
  UserNameBox,
  WritingTitle,
  WritingImg,
  UserContainer,
  WritingImgBox,
  WritingDesc,
  NextToImgContainer,
} from "./WritingDetail.styles";

// import { UpIcon } from "components/Novel/NovelColumnDetail.styles";

interface TalkProps {
  detailTalk: {
    talkId: string;

    userName: string;
    userImg: string;
    createDate: string;

    likeNO: number;
    commentNO: number;
    isLike: boolean;

    talkTitle: string;
    talkDesc: string;
    talkImg: string;
  };
}
function Comment() {}

export default function WritingDetail({ detailTalk }: TalkProps) {
  const {
    talkId,

    userName,
    userImg,
    createDate,

    likeNO,
    commentNO,
    isLike,

    talkTitle,
    talkDesc,
    talkImg,
  } = detailTalk;
  const recommendTitle = "";
  return (
    <Writing>
      <UserContainer>
        <UserImg userImg={userImg} />
        <NextToImgContainer>
          <WritingTitle>{talkTitle || recommendTitle}</WritingTitle>
          <UserNameBox>
            <UserName>{userName}</UserName>
            <CreateDate>{createDate}</CreateDate>
          </UserNameBox>
        </NextToImgContainer>
      </UserContainer>
      <WritingDesc>{talkDesc}</WritingDesc>
      {/* 유저 글 작성 시 넣은 사진 위치를 그대로 글 사이에 넣을 수 있나? */}
      {/* <WritingImgBox>
              <WritingImg img={talkPhoto ?? recommendPhoto} />
            </WritingImgBox> */}
    </Writing>
  );
}
