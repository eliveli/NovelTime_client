import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Img } from "store/serverAPIs/types";
import { adjustCreateDate, useComponentHeight, useComponentWidth } from "utils";

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
  TalkMobileContnr,
  TalkTabletContnr,
  TitleContnr,
  TalkImgTablet,
  TalkInfoContnrTablet,
  UserInfoTablet,
  CommentLabel,
  TalkMainInfoContnr,
} from "./FreeTalkList.styles";

interface TalkProps {
  talkId: string;

  userName: string;
  userImg: Img;
  createDate: string;

  likeNO: number;
  commentNO: number;

  talkTitle: string;
  talkImg: string;

  novelTitle: string;
}

function TalkTablet({ talk }: { talk: TalkProps }) {
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
  const navigate = useNavigate();

  // to set the image width as title height
  // : when title height is long, image width should be long too
  const titleHeightRef = useRef<HTMLDivElement>(null);
  const titleHeight = useComponentHeight(titleHeightRef);

  const dateToShow = adjustCreateDate(createDate);

  return (
    <TalkTabletContnr>
      <TalkMainInfoContnr>
        <UserInfoTablet>
          <UserImg
            userImg={userImg}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              event.stopPropagation();
              navigate(`/user-page/${userName}`);
            }}
          />
          {/* <UserNameBox> */}
          <UserName
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              event.stopPropagation();
              navigate(`/user-page/${userName}`);
            }}
          >
            {userName}
          </UserName>
        </UserInfoTablet>

        <TalkInfoContnrTablet>
          <CommentLabel>
            <Icon.IconBox noPointer size={20} color="rgba(150,150,150,0.4)">
              <Icon.CommentLabel />
            </Icon.IconBox>
          </CommentLabel>
          <TitleContnr ref={titleHeightRef}>
            <TalkTitle>{talkTitle}</TalkTitle>
            <NovelTitle>{novelTitle}</NovelTitle>
          </TitleContnr>
          {talkImg && <TalkImgTablet titleHeight={titleHeight} talkImg={talkImg} />}
        </TalkInfoContnrTablet>
      </TalkMainInfoContnr>
      {/* </UserNameBox> */}
      <CreateDate>{dateToShow}</CreateDate>

      <IconsBox>
        <IconContainer>
          <Icon.IconBox noPointer size={20}>
            <Icon.SmallHeart />
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
    </TalkTabletContnr>
  );
}
function TalkMobile({ talk }: { talk: TalkProps }) {
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
  const navigate = useNavigate();

  // set image height as image width : for animation at screen size 500-599px
  const imgWidthRef = useRef<HTMLDivElement>(null);
  const imgWidth = useComponentWidth(imgWidthRef);

  const dateToShow = adjustCreateDate(createDate);

  return (
    <TalkMobileContnr>
      <UserImg
        userImg={userImg}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.stopPropagation();
          navigate(`/user-page/${userName}`);
        }}
      />
      <BesideImgContainer>
        <FirstLineContainer>
          <UserNameBox>
            <UserName
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.stopPropagation();
                navigate(`/user-page/${userName}`);
              }}
            >
              {userName}
            </UserName>
            <CreateDate>{dateToShow}</CreateDate>
          </UserNameBox>
          <IconsBox>
            <IconContainer>
              <Icon.IconBox noPointer size={17}>
                <Icon.SmallHeart />
              </Icon.IconBox>
              <IconNO>{likeNO}</IconNO>
            </IconContainer>
            <IconContainer>
              <Icon.IconBox noPointer size={17}>
                <Icon.Comment />
              </Icon.IconBox>
              <IconNO>{commentNO}</IconNO>
            </IconContainer>
          </IconsBox>
        </FirstLineContainer>

        <TalkPreview>
          <CommentLabel>
            <Icon.IconBox noPointer size={20} color="rgba(150,150,150,0.4)">
              <Icon.CommentLabel />
            </Icon.IconBox>
          </CommentLabel>
          <TalkTitle talkImg={talkImg}>{talkTitle}</TalkTitle>
          {talkImg && (
            <TalkImgBox ref={imgWidthRef}>
              <TalkImg imgWidth={imgWidth} talkImg={talkImg} />
            </TalkImgBox>
          )}
          <NovelTitle>{novelTitle}</NovelTitle>
        </TalkPreview>
      </BesideImgContainer>
    </TalkMobileContnr>
  );
}
export default function FreeTalk({ talk, isLast }: { talk: TalkProps; isLast?: boolean }) {
  const navigate = useNavigate();

  return (
    <Talk
      isLast={isLast}
      onClick={() => {
        navigate(`/talk-detail/${talk.talkId}`);
      }}
    >
      <TalkMobile talk={talk} />
      <TalkTablet talk={talk} />
    </Talk>
  );
}
