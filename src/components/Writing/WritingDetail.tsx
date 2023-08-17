import { useState } from "react";
import Icon from "assets/Icon";
import { Img } from "store/serverAPIs/types";
import { goToUserPage } from "utils";
import { useNavigate } from "react-router-dom";
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
    userImg: Img;
    createDate: string;

    likeNO: number;
    commentNO: number;
    isLike: boolean;

    talkTitle: string;
    talkDesc: string;
    talkImg: string;
  };
}
interface RecommendProps {
  detailRecommend: {
    recommendId: string;

    userName: string;
    userImg: Img;
    createDate: string;

    likeNO: number;
    isLike: boolean;

    recommendTitle: string;
    recommendDesc: string;
    recommendImg: string;
  };
}

export function TalkDetail({ detailTalk }: TalkProps) {
  const {
    talkId,

    userName,
    userImg,
    createDate,

    talkTitle,
    talkDesc,
    talkImg,
  } = detailTalk;

  const navigate = useNavigate();

  return (
    <Writing>
      <UserContainer>
        <UserImg userImg={userImg} onClick={(e) => goToUserPage(navigate, e, userName)} />
        <NextToImgContainer>
          <WritingTitle>{talkTitle}</WritingTitle>
          <UserNameBox>
            <UserName onClick={(e) => goToUserPage(navigate, e, userName)}>{userName}</UserName>
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
export function RecommendDetail({ detailRecommend }: RecommendProps) {
  const {
    recommendId,

    userName,
    userImg,
    createDate,

    recommendTitle,
    recommendDesc,
    recommendImg,
  } = detailRecommend;

  const navigate = useNavigate();

  return (
    <Writing>
      <UserContainer>
        <UserImg userImg={userImg} onClick={(e) => goToUserPage(navigate, e, userName)} />
        <NextToImgContainer>
          <WritingTitle>{recommendTitle}</WritingTitle>
          <UserNameBox>
            <UserName onClick={(e) => goToUserPage(navigate, e, userName)}>{userName}</UserName>
            <CreateDate>{createDate}</CreateDate>
          </UserNameBox>
        </NextToImgContainer>
      </UserContainer>
      <WritingDesc>{recommendDesc}</WritingDesc>
      {/* 유저 글 작성 시 넣은 사진 위치를 그대로 글 사이에 넣을 수 있나? */}
      {/* <WritingImgBox>
              <WritingImg img={talkPhoto ?? recommendPhoto} />
            </WritingImgBox> */}
    </Writing>
  );
}
