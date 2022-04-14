import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useComponentHeight, useComponentWidth } from "utils";

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

  return (
    <TalkTabletContnr>
      <UserInfoTablet>
        <UserImg
          userImg={userImg}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
            navigate(`/user_page/${userName}`);
          }}
        />
        {/* <UserNameBox> */}
        <UserName
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
            navigate(`/user_page/${userName}`);
          }}
        >
          {userName}
        </UserName>
      </UserInfoTablet>

      <TalkInfoContnrTablet>
        <TitleContnr ref={titleHeightRef}>
          <TalkTitle>{talkTitle}</TalkTitle>
          <NovelTitle>{novelTitle}</NovelTitle>
        </TitleContnr>
        <TalkImgTablet titleHeight={titleHeight} talkImg={talkImg} />
      </TalkInfoContnrTablet>
      {/* </UserNameBox> */}
      <CreateDate>{createDate}</CreateDate>

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

  return (
    <TalkMobileContnr>
      <UserImg
        userImg={userImg}
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
        </FirstLineContainer>

        <TalkPreview>
          <TalkTitle>{talkTitle}</TalkTitle>
          <TalkImgBox ref={imgWidthRef}>
            <TalkImg imgWidth={imgWidth} talkImg={talkImg} />
          </TalkImgBox>
          <NovelTitle>{novelTitle}</NovelTitle>
        </TalkPreview>
      </BesideImgContainer>
    </TalkMobileContnr>
  );
}
export default function FreeTalk({ talk }: { talk: TalkProps }) {
  const navigate = useNavigate();
  return (
    <Talk
      onClick={() => {
        navigate(`/talk_detail/${talk.talkId}`);
      }}
    >
      <TalkMobile talk={talk} />
      <TalkTablet talk={talk} />
    </Talk>
  );
}
