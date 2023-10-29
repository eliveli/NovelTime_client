import Icon from "assets/Icon";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CommentUserCreated, TalkOrRecommend } from "store/serverAPIs/types";
import { adjustCreateDate, useComponentHeight } from "utils";
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
import { ContentInfo } from "./UserWriting";

interface NoContentParams {
  contentType: "T" | "R" | "C" | "L"; // talk or recommend or comment or novelList
  isCreatedBy: boolean; // true : createByUser, false: likedByUser
}
export function NoContent({ contentType, isCreatedBy }: NoContentParams) {
  const part1 = isCreatedBy ? "작성한 " : "좋아요를 누른 ";
  const part2 =
    contentType === "T"
      ? "프리톡 게시글이"
      : contentType === "R"
      ? "리코멘드 게시글이"
      : contentType === "C"
      ? "코멘트가"
      : "소설 리스트가";
  const sentence = `${part1 + part2} 없어요.`;
  return (
    <WritingContnr isNoContent isNovelList={contentType === "L"}>
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
export const Writing = React.memo(({ writingInfo }: WritingInfo) => {
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
  const dateToShow = adjustCreateDate(createDate);

  // talk
  if (talkId) {
    return (
      <WritingContnr onClick={() => navigate(`/talk-detail/${talkId}`)}>
        <ContnrNearImg isTalk>
          <WritingTitle talkId={talkId}>{talkTitle}</WritingTitle>
          <UserContnr talkId={talkId}>
            {userName && <WritingUserName talkId={talkId}>{` : ${userName}`}</WritingUserName>}
            <CreateDate>
              {!userName && ` : `}
              {dateToShow}
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
          navigate(`/recommend-detail/${recommendId}`);
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
            {dateToShow}
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
});
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
export const Comment = React.memo(({ commentInfo }: CommentInfo) => {
  const { commentId, commentContent, createDate, talkId, talkTitle, novelTitle } = commentInfo;
  const dateToShow = adjustCreateDate(createDate);

  const navigate = useNavigate();

  return (
    <WritingContnr isComment onClick={() => navigate(`/talk-detail/${talkId}/${commentId}`)}>
      <CommentContentContnr>
        <CommentContent>{commentContent}</CommentContent>
        <CreateDate>{dateToShow}</CreateDate>
      </CommentContentContnr>
      <CommentTalkTitle>
        <WritingMark>[글]</WritingMark>
        {talkTitle}
      </CommentTalkTitle>
      <CommentNovelTitle>{novelTitle}</CommentNovelTitle>
    </WritingContnr>
  );
});

interface WritingProps {
  writingCategory: string[];
  writingFilter: string;
  selectWritingFilter: React.Dispatch<React.SetStateAction<string>>;
  setParamsForRequest?: React.Dispatch<
    React.SetStateAction<{
      userName: string;
      contentType: "T" | "R" | "C";
      order: number;
      isCreated: boolean;
    }>
  >;
  isCreated?: boolean;
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
  talksUserLikes?: {
    talks: TalkOrRecommend[];
    isNextOrder: boolean;
    currentOrder: number;
  };

  recommendsUserLikes?: {
    recommends: TalkOrRecommend[];
    isNextOrder: boolean;
    currentOrder: number;
  };
  setCurrentContentFilter?: React.Dispatch<React.SetStateAction<ContentInfo>>;
}
export function WritingFilter({
  writingCategory,
  writingFilter,
  selectWritingFilter,
  setParamsForRequest,
  isCreated,
  talksUserCreated,
  recommendsUserCreated,
  commentsUserCreated,
  talksUserLikes,
  recommendsUserLikes,
  setCurrentContentFilter,
}: WritingProps) {
  return (
    <FilterContnr category="contentInUserPage">
      {writingCategory.map((_) => (
        <Filter
          category={_} // "프리톡" | "추천" | "댓글"
          selectedCtgr={writingFilter}
          onClick={() => {
            selectWritingFilter(_);

            // Used in my writing, <UserWriting>
            // -- request content when clicking other filter which content is empty
            if (isCreated && setParamsForRequest) {
              if (_ === "프리톡" && !talksUserCreated) {
                setParamsForRequest((paramsForRequest) => ({
                  ...paramsForRequest,
                  contentType: "T",
                  order: 1,
                }));
              } else if (_ === "추천" && !recommendsUserCreated) {
                setParamsForRequest((paramsForRequest) => ({
                  ...paramsForRequest,
                  contentType: "R",
                  order: 1,
                }));
              } else if (_ === "댓글" && !commentsUserCreated) {
                setParamsForRequest((paramsForRequest) => ({
                  ...paramsForRequest,
                  contentType: "C",
                  order: 1,
                }));
              }
              // -- set current content when changing writing filter without request
              else if (setCurrentContentFilter) {
                const getContentTypeOfWritingFilter = (currentFilter: string) =>
                  currentFilter === "프리톡" ? "T" : currentFilter === "추천" ? "R" : "C";

                const contentType = getContentTypeOfWritingFilter(_);
                const isNextOrder =
                  contentType === "T"
                    ? (talksUserCreated?.isNextOrder as boolean)
                    : contentType === "R"
                    ? (recommendsUserCreated?.isNextOrder as boolean)
                    : (commentsUserCreated?.isNextOrder as boolean);
                const currentOrder =
                  contentType === "T"
                    ? (talksUserCreated?.currentOrder as number)
                    : contentType === "R"
                    ? (recommendsUserCreated?.currentOrder as number)
                    : (commentsUserCreated?.currentOrder as number);

                setCurrentContentFilter({ type: contentType, isNextOrder, currentOrder });
              }
            }

            // Used in other's writing, <UserWriting>
            // -- request content when clicking other filter which content is empty
            if (!isCreated && setParamsForRequest) {
              if (_ === "프리톡" && !talksUserLikes) {
                setParamsForRequest((paramsForRequest) => ({
                  ...paramsForRequest,
                  contentType: "T",
                  order: 1,
                }));
              } else if (_ === "추천" && !recommendsUserLikes) {
                setParamsForRequest((paramsForRequest) => ({
                  ...paramsForRequest,
                  contentType: "R",
                  order: 1,
                }));
              }
              // -- set current content when changing writing filter without request
              else if (setCurrentContentFilter) {
                const getContentTypeOfWritingFilter = (currentFilter: string) =>
                  currentFilter === "프리톡" ? "T" : "R";

                const contentType = getContentTypeOfWritingFilter(_);
                const isNextOrder =
                  contentType === "T"
                    ? (talksUserLikes?.isNextOrder as boolean)
                    : (recommendsUserLikes?.isNextOrder as boolean);

                const currentOrder =
                  contentType === "T"
                    ? (talksUserLikes?.currentOrder as number)
                    : (recommendsUserLikes?.currentOrder as number);

                setCurrentContentFilter({ type: contentType, isNextOrder, currentOrder });
              }
            }
          }}
        >
          {_}
        </Filter>
      ))}
    </FilterContnr>
  );
}
