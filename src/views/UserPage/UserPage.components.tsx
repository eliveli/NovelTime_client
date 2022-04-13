import Icon from "assets/Icon";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useComponentHeight } from "utils";
import {
  CommntIcon,
  ContnrNearImg,
  CreateDate,
  HeartIcon,
  IconInfoContnr,
  IconNoInfo,
  IconsContnr,
  NovelImg,
  NovelTitle,
  UserContnr,
  WiringContnr,
  WritingTitle,
  WritingUserName,
  Filter,
  FilterContnr,
  CommentContent,
  CommentNovelTitle,
  CommentTalkTitle,
  CommentContentContnr,
  WritingMark,
} from "./UserPage.styles";

interface WritingInfo {
  writingInfo: {
    talkId?: string;
    recommendId?: string;
    novelImg: string;
    talkTitle?: string;
    recommendTitle?: string;
    userName?: string;
    createDate: string;
    likeNO: number;
    commentNO?: number;
    novelTitle: string;
  };
}
export function Writing({ writingInfo }: WritingInfo) {
  const {
    talkId,
    recommendId,
    novelImg,
    talkTitle,
    recommendTitle,
    userName,
    createDate,
    likeNO,
    commentNO,
    novelTitle,
  } = writingInfo;
  const imgRef = useRef<HTMLDivElement>(null);
  const imgHeight = useComponentHeight(imgRef);

  const navigate = useNavigate();

  // talk
  if (talkId) {
    return (
      <WiringContnr onClick={() => navigate(`/talk_detail/${talkId}`)}>
        <ContnrNearImg isTalk>
          <WritingTitle talkId={talkId}>{talkTitle}</WritingTitle>
          <UserContnr talkId={talkId}>
            {userName && <WritingUserName talkId={talkId}>{` : ${userName}`}</WritingUserName>}
            <CreateDate>
              {!userName && ` : `}
              {createDate}
            </CreateDate>
            <IconsContnr>
              <IconInfoContnr>
                <Icon.IconBox size={15}>
                  <HeartIcon />
                </Icon.IconBox>
                <IconNoInfo>{likeNO}</IconNoInfo>
              </IconInfoContnr>
              <IconInfoContnr>
                <Icon.IconBox size={15}>
                  <CommntIcon />
                </Icon.IconBox>
                <IconNoInfo>{commentNO}</IconNoInfo>
              </IconInfoContnr>
            </IconsContnr>
          </UserContnr>
          <NovelTitle talkId={talkId}>{novelTitle}</NovelTitle>
        </ContnrNearImg>
        <NovelImg ref={imgRef} novelImg={novelImg} imgHeight={imgHeight} />
      </WiringContnr>
    );
  }
  // recommend
  return (
    <WiringContnr
      onClick={() => {
        if (recommendId) {
          navigate(`/recommend_detail/${recommendId}`);
        }
      }}
    >
      <NovelImg ref={imgRef} novelImg={novelImg} imgHeight={imgHeight} />
      <ContnrNearImg>
        <NovelTitle>{novelTitle}</NovelTitle>
        <WritingTitle>{recommendTitle}</WritingTitle>
        <UserContnr>
          {userName && <WritingUserName>{` : ${userName}`}</WritingUserName>}
          <CreateDate>
            {!userName && ` : `}
            {createDate}
          </CreateDate>
          <IconsContnr>
            <IconInfoContnr>
              <Icon.IconBox size={15}>
                <HeartIcon />
              </Icon.IconBox>
              <IconNoInfo>{likeNO}</IconNoInfo>
            </IconInfoContnr>
          </IconsContnr>
        </UserContnr>
      </ContnrNearImg>
    </WiringContnr>
  );
}

interface CommentInfo {
  commentInfo: {
    commentId: string;
    commentContent: string;
    createDate: string;

    talkId: string;
    talkTitle: string;
    novelTitle: string;
  };
}
export function Comment({ commentInfo }: CommentInfo) {
  const { commentId, commentContent, createDate, talkId, talkTitle, novelTitle } = commentInfo;
  const navigate = useNavigate();

  return (
    <WiringContnr isComment onClick={() => navigate(`/talk_detail/${talkId}/${commentId}`)}>
      <CommentContentContnr>
        <CommentContent>{commentContent}</CommentContent>
        <CreateDate>{createDate}</CreateDate>
      </CommentContentContnr>
      <CommentTalkTitle>
        <WritingMark>&nbsp;[글]&nbsp;&nbsp;&nbsp;</WritingMark>
        {talkTitle}
      </CommentTalkTitle>
      <CommentNovelTitle>{novelTitle}</CommentNovelTitle>
    </WiringContnr>
  );
}

type FilterType = "프리톡" | "추천" | "댓글";
interface WritingProps {
  writingCategory: string[];
  writingFilter: string;
  selectWritingFilter: React.Dispatch<React.SetStateAction<string>>;
}
export function WritingFilter({
  writingCategory,
  writingFilter,
  selectWritingFilter,
}: WritingProps) {
  return (
    <FilterContnr>
      {writingCategory.map((_) => (
        <Filter
          category={_ as FilterType}
          selectedCtgr={writingFilter as FilterType}
          onClick={() => selectWritingFilter(_)}
        >
          &nbsp;&nbsp;
          {_}
          &nbsp;&nbsp;
        </Filter>
      ))}
    </FilterContnr>
  );
}
