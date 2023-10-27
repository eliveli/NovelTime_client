import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TalkInList } from "store/serverAPIs/types";
import { adjustCreateDate, goToUserPage, useComponentHeight, useComponentWidth } from "utils";

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
  TalkDesc,
} from "./FreeTalkList.styles";

// Displayed : screen size >= 600px
function TalkTablet({ talk }: { talk: TalkInList }) {
  const {
    userName,
    userImg,
    createDate,
    likeNO,
    commentNO,
    talkTitle,
    talkDesc,
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
          <UserImg userImg={userImg} onClick={(e) => goToUserPage(navigate, e, userName)} />
          <UserName onClick={(e) => goToUserPage(navigate, e, userName)}>{userName}</UserName>
        </UserInfoTablet>

        <TalkInfoContnrTablet>
          <CommentLabel>
            <Icon.IconBox noPointer size={20} color="rgba(150,150,150,0.4)">
              <Icon.CommentLabel />
            </Icon.IconBox>
          </CommentLabel>

          <TitleContnr ref={titleHeightRef}>
            <TalkTitle isTalkDesc={!!talkDesc}>{talkTitle}</TalkTitle>
            {talkDesc && <TalkDesc>{talkDesc}</TalkDesc>}
            <NovelTitle isTalkDesc={!!talkDesc}>{novelTitle}</NovelTitle>
          </TitleContnr>

          {/* Note. Check or Adjust styles if adding talkImg actually */}

          {talkImg && <TalkImgTablet titleHeight={titleHeight} talkImg={talkImg} />}
        </TalkInfoContnrTablet>
      </TalkMainInfoContnr>

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
function TalkMobile({ talk }: { talk: TalkInList }) {
  const {
    userName,
    userImg,
    createDate,
    likeNO,
    commentNO,
    talkTitle,
    talkDesc,
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
      <UserImg userImg={userImg} onClick={(e) => goToUserPage(navigate, e, userName)} />
      <BesideImgContainer>
        <FirstLineContainer>
          <UserNameBox>
            <UserName onClick={(e) => goToUserPage(navigate, e, userName)}>{userName}</UserName>
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

          <TalkTitle talkImg={talkImg} isTalkDesc={!!talkDesc}>
            {talkTitle}
          </TalkTitle>
          {talkDesc && <TalkDesc>{talkDesc}</TalkDesc>}

          {/* Note. Check or Adjust styles if adding talkImg actually */}

          {talkImg && (
            <TalkImgBox ref={imgWidthRef}>
              <TalkImg imgWidth={imgWidth} talkImg={talkImg} />
            </TalkImgBox>
          )}

          <NovelTitle isTalkDesc={!!talkDesc}>{novelTitle}</NovelTitle>
        </TalkPreview>
      </BesideImgContainer>
    </TalkMobileContnr>
  );
}

export default function FreeTalk({ talk, isLast }: { talk: TalkInList; isLast?: boolean }) {
  const navigate = useNavigate();

  return (
    <Talk
      isLast={isLast}
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();

        navigate(`/talk-detail/${talk.talkId}`);
      }}
    >
      <TalkMobile talk={talk} />
      <TalkTablet talk={talk} />
    </Talk>
  );
}
