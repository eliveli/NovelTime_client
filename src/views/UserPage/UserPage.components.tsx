/* eslint-disable no-nested-ternary */
import Icon from "assets/Icon";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CommentUserCreated, TalkOrRecommend } from "store/serverAPIs/types";
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
  WritingContnr,
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

interface NoContentParams {
  contentsType: "T" | "R" | "C" | "L"; // talk or recommend or comment or novelList
  isCreatedBy: boolean; // true : createByUser, false: likedByUser
}
export function NoContent({ contentsType, isCreatedBy }: NoContentParams) {
  const part1 = isCreatedBy ? "작성한 " : "좋아요를 누른 ";
  const part2 =
    contentsType === "T"
      ? "프리톡 게시글이"
      : contentsType === "R"
      ? "리코멘드 게시글이"
      : contentsType === "C"
      ? "코멘트가"
      : "소설 리스트가";
  const sentence = `${part1 + part2} 없어요.`;
  return (
    <WritingContnr isNoContent isNovelList={contentsType === "L"}>
      {sentence}
    </WritingContnr>
  );
}
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
      <WritingContnr onClick={() => navigate(`/talk_detail/${talkId}`)}>
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
      </WritingContnr>
    );
  }
  // recommend
  return (
    <WritingContnr
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
    </WritingContnr>
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
    <WritingContnr isComment onClick={() => navigate(`/talk_detail/${talkId}/${commentId}`)}>
      <CommentContentContnr>
        <CommentContent>{commentContent}</CommentContent>
        <CreateDate>{createDate}</CreateDate>
      </CommentContentContnr>
      <CommentTalkTitle>
        <WritingMark>&nbsp;[글]&nbsp;&nbsp;&nbsp;</WritingMark>
        {talkTitle}
      </CommentTalkTitle>
      <CommentNovelTitle>{novelTitle}</CommentNovelTitle>
    </WritingContnr>
  );
}

type FilterType = "프리톡" | "추천" | "댓글";
interface WritingProps {
  writingCategory: string[];
  writingFilter: string;
  selectWritingFilter: React.Dispatch<React.SetStateAction<string>>;
  setParamsForRequest?: React.Dispatch<
    React.SetStateAction<{
      userName: string;
      contentsType: "T" | "R" | "C";
      order: number;
    }>
  >;
  talksUserCreated?: {
    talks: TalkOrRecommend[];
    isNextOrder: boolean;
    currentOrder: number;
  };

  recommendsUserCreated?: {
    recommends: TalkOrRecommend[];
    isNextOrder: boolean;
    currentOrder: number;
  };
  commentsUserCreated?: {
    comments: CommentUserCreated[];
    isNextOrder: boolean;
    currentOrder: number;
  };
}
export function WritingFilter({
  writingCategory,
  writingFilter,
  selectWritingFilter,
  setParamsForRequest,
  talksUserCreated,
  recommendsUserCreated,
  commentsUserCreated,
}: WritingProps) {
  return (
    <FilterContnr>
      {writingCategory.map((_) => (
        <Filter
          category={_ as FilterType}
          selectedCtgr={writingFilter as FilterType}
          onClick={() => {
            selectWritingFilter(_);

            // request content when clicking other filter but the content is empty
            if (setParamsForRequest) {
              if (_ === "프리톡" && !talksUserCreated) {
                setParamsForRequest((paramsForRequest) => ({
                  ...paramsForRequest,
                  contentsType: "T",
                  order: 1,
                }));
              }
              if (_ === "추천" && !recommendsUserCreated) {
                setParamsForRequest((paramsForRequest) => ({
                  ...paramsForRequest,
                  contentsType: "R",
                  order: 1,
                }));
              }
              if (_ === "댓글" && !commentsUserCreated) {
                setParamsForRequest((paramsForRequest) => ({
                  ...paramsForRequest,
                  contentsType: "C",
                  order: 1,
                }));
              }
            }
          }}
        >
          &nbsp;&nbsp;
          {_}
          &nbsp;&nbsp;
        </Filter>
      ))}
    </FilterContnr>
  );
}
