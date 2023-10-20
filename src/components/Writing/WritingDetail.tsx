import { Img } from "store/serverAPIs/types";
import { adjustCreateDate, goToUserPage } from "utils";
import { useNavigate } from "react-router-dom";
import {
  CreateDate,
  UserImg,
  UserName,
  Writing,
  UserNameBox,
  WritingTitle,
  UserContainer,
  WritingDesc,
  NextToImgContainer,
} from "./WritingDetail.styles";

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

  const dateToShow = adjustCreateDate(createDate);

  const navigate = useNavigate();

  return (
    <Writing>
      <UserContainer>
        <UserImg userImg={userImg} onClick={(e) => goToUserPage(navigate, e, userName)} />
        <NextToImgContainer>
          <WritingTitle>{talkTitle}</WritingTitle>
          <UserNameBox>
            <UserName onClick={(e) => goToUserPage(navigate, e, userName)}>{userName}</UserName>
            <CreateDate>{dateToShow}</CreateDate>
          </UserNameBox>
        </NextToImgContainer>
      </UserContainer>
      <WritingDesc>{talkDesc}</WritingDesc>
      {/* 만약 포스트에 사진 추가 시 유저가 넣은 사진 위치 고려 */}
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

  const dateToShow = adjustCreateDate(createDate);

  const navigate = useNavigate();

  return (
    <Writing>
      <UserContainer>
        <UserImg userImg={userImg} onClick={(e) => goToUserPage(navigate, e, userName)} />
        <NextToImgContainer>
          <WritingTitle>{recommendTitle}</WritingTitle>
          <UserNameBox>
            <UserName onClick={(e) => goToUserPage(navigate, e, userName)}>{userName}</UserName>
            <CreateDate>{dateToShow}</CreateDate>
          </UserNameBox>
        </NextToImgContainer>
      </UserContainer>
      <WritingDesc>{recommendDesc}</WritingDesc>
      {/* <WritingImgBox>
              <WritingImg img={talkPhoto ?? recommendPhoto} />
            </WritingImgBox> */}
    </Writing>
  );
}
