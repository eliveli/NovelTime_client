/* eslint-disable no-nested-ternary */
import MainBG from "components/MainBG";
import { CategoryMark } from "components/CategoryMark";
import { useEffect, useRef, useState } from "react";
import Icon from "assets/Icon";
import { useAppSelector } from "store/hooks";
import { useParams } from "react-router-dom";
import {
  useGetContentsForUserPageMyWritingQuery,
  useGetContentsForUserPageOthersWritingQuery,
} from "store/serverAPIs/novelTime";
import { ContentsForUserPageWriting } from "store/serverAPIs/types";
import { TalkOrRecommend, CommentUserCreated } from "../../store/serverAPIs/types";
import { Writing, Comment, WritingFilter, NoContent } from "./UserPage.components";
import { NextContentsBtn, ShareIconBox, WritingSection } from "./UserPage.styles";
import contentMark from "./utils/contentMark";

export type ContentInfo = {
  type: "T" | "R" | "C";
  isNextOrder: boolean;
  currentOrder: number;
};
export default function UserPageWriting({ isMyWriting }: { isMyWriting: boolean }) {
  const loginUserInfo = useAppSelector((state) => state.user.loginUserInfo);

  const { userName } = useParams();

  const [paramsForRequest, setParamsForRequest] = useState({
    userName: userName as string,
    contentsType: "T" as "T" | "R" | "C",
    order: 1,
  });

  // to set this is required because
  //   it can be done that user don't request content but do change writing filter(content)
  // (so it is not always correct to get the current content value from "paramsForRequest")
  const currentContentRef = useRef<ContentInfo>({ type: "T", isNextOrder: false, currentOrder: 1 });

  const handleCurrentContent = (currentContent: ContentInfo) => {
    currentContentRef.current = currentContent;
  };

  // divide these two results
  // don't destructure like this : const { data, isLoading, ... }
  // just get it as variables to avoid getting same name
  const myWritingResult = useGetContentsForUserPageMyWritingQuery(paramsForRequest, {
    skip: !isMyWriting,
  });
  const othersWritingResult = useGetContentsForUserPageOthersWritingQuery(paramsForRequest, {
    skip: isMyWriting,
  });

  // states for saving contents from server in my writing page
  const [talksUserCreated, setTalksUserCreated] = useState<{
    talks: TalkOrRecommend[];
    isNextOrder: boolean;
    currentOrder: number;
  }>();
  const [recommendsUserCreated, setRecommendsUserCreated] = useState<{
    recommends: TalkOrRecommend[];
    isNextOrder: boolean;
    currentOrder: number;
  }>();
  const [commentsUserCreated, setCommentsUserCreated] = useState<{
    comments: CommentUserCreated[];
    isNextOrder: boolean;
    currentOrder: number;
  }>();

  // states for saving contents from server in other's writing page
  const [talksUserLikes, setTalksUserLikes] = useState<{
    talks: TalkOrRecommend[];
    isNextOrder: boolean;
    currentOrder: number;
  }>();
  const [recommendsUserLikes, setRecommendsUserLikes] = useState<{
    recommends: TalkOrRecommend[];
    isNextOrder: boolean;
    currentOrder: number;
  }>();

  // get and save the contents in my writing page
  useEffect(() => {
    // don't save cached data for other's writing
    // it may remain because of rtk query trait
    if (!isMyWriting) return;

    if (!myWritingResult.data) return;

    const writingsFromServer = myWritingResult.data.writingsUserCreated;
    const commentsFromServer = myWritingResult.data.commentsUserCreated;
    const { isNextOrder } = myWritingResult.data;

    // save talks
    if (writingsFromServer && writingsFromServer[0]?.talkId) {
      const currentOrder = talksUserCreated ? talksUserCreated.currentOrder + 1 : 1;
      if (!talksUserCreated) {
        setTalksUserCreated({
          talks: writingsFromServer,
          isNextOrder,
          currentOrder,
        });
      } else {
        setTalksUserCreated({
          talks: [...talksUserCreated.talks, ...writingsFromServer],
          isNextOrder,
          currentOrder,
        });
      }
      // set current content info
      currentContentRef.current = {
        type: "T",
        isNextOrder,
        currentOrder,
      };
    }

    // save recommends
    if (writingsFromServer && writingsFromServer[0]?.recommendId) {
      const currentOrder = recommendsUserCreated ? recommendsUserCreated.currentOrder + 1 : 1;

      if (!recommendsUserCreated) {
        setRecommendsUserCreated({
          recommends: writingsFromServer,
          isNextOrder,
          currentOrder,
        });
      } else {
        setRecommendsUserCreated({
          recommends: [...recommendsUserCreated.recommends, ...writingsFromServer],
          isNextOrder,
          currentOrder,
        });
      }
      // set current content info
      currentContentRef.current = {
        type: "R",
        isNextOrder,
        currentOrder,
      };
    }

    // save comments
    if (commentsFromServer) {
      const currentOrder = commentsUserCreated ? commentsUserCreated.currentOrder + 1 : 1;
      if (!commentsUserCreated) {
        setCommentsUserCreated({
          comments: commentsFromServer,
          isNextOrder,
          currentOrder,
        });
      } else {
        setCommentsUserCreated({
          comments: [...commentsUserCreated.comments, ...commentsFromServer],
          isNextOrder,
          currentOrder,
        });
      }
      // set current content info
      currentContentRef.current = {
        type: "C",
        isNextOrder,
        currentOrder,
      };
    }
  }, [myWritingResult.data]);

  // get and save the contents in other's writing page
  useEffect(() => {
    // don't save cached data for my writing
    // it may remain because of rtk query trait
    if (isMyWriting) return;

    if (!othersWritingResult.data) return;

    const writingsFromServer = othersWritingResult.data.writingsUserLikes;
    const { isNextOrder } = othersWritingResult.data;

    // save talks
    if (writingsFromServer && writingsFromServer[0]?.talkId) {
      const currentOrder = talksUserLikes ? talksUserLikes.currentOrder + 1 : 1;
      if (!talksUserLikes) {
        setTalksUserLikes({
          talks: writingsFromServer,
          isNextOrder,
          currentOrder,
        });
      } else {
        setTalksUserLikes({
          talks: [...talksUserLikes.talks, ...writingsFromServer],
          isNextOrder,
          currentOrder,
        });
      }
      // set current content info
      currentContentRef.current = {
        type: "T",
        isNextOrder,
        currentOrder,
      };
    }

    // save recommends
    if (writingsFromServer && writingsFromServer[0]?.recommendId) {
      const currentOrder = recommendsUserLikes ? recommendsUserLikes.currentOrder + 1 : 1;

      if (!recommendsUserLikes) {
        setRecommendsUserLikes({
          recommends: writingsFromServer,
          isNextOrder,
          currentOrder,
        });
      } else {
        setRecommendsUserLikes({
          recommends: [...recommendsUserLikes.recommends, ...writingsFromServer],
          isNextOrder,
          currentOrder,
        });
      }
      // set current content info
      currentContentRef.current = {
        type: "R",
        isNextOrder,
        currentOrder,
      };
    }
  }, [othersWritingResult.data]);

  // get the content page mark
  const contentPageMark = contentMark(
    userName as string,
    loginUserInfo.userName,
    isMyWriting,
    true,
  );
  // writing category array : my writing or other's writing
  const writingCategory = isMyWriting ? ["프리톡", "추천", "댓글"] : ["프리톡", "추천"];
  // set filter category
  const [writingFilter, selectWritingFilter] = useState("프리톡");

  return (
    <MainBG>
      <CategoryMark categoryText={contentPageMark}>
        <ShareIconBox>
          <Icon.SharePC />
        </ShareIconBox>
      </CategoryMark>

      <WritingFilter
        writingCategory={writingCategory}
        writingFilter={writingFilter}
        selectWritingFilter={selectWritingFilter}
        setParamsForRequest={setParamsForRequest}
        isMyWriting={isMyWriting}
        talksUserCreated={talksUserCreated}
        recommendsUserCreated={recommendsUserCreated}
        commentsUserCreated={commentsUserCreated}
        talksUserLikes={talksUserLikes}
        recommendsUserLikes={recommendsUserLikes}
        handleCurrentContent={handleCurrentContent}
      />
      <WritingSection
        isNoContent={
          (writingFilter === "프리톡" && !talksUserCreated && !talksUserLikes) ||
          (writingFilter === "추천" && !recommendsUserCreated && !recommendsUserLikes) ||
          (writingFilter === "댓글" && !commentsUserCreated)
        }
      >
        {writingFilter === "프리톡" &&
          // return talks for my writing or talks for other's writing or no-content-mark
          (talksUserCreated ? (
            talksUserCreated.talks.map((_) => <Writing key={_.talkId} writingInfo={_} />)
          ) : talksUserLikes ? (
            talksUserLikes.talks.map((_) => <Writing key={_.talkId} writingInfo={_} />)
          ) : (
            <NoContent contentsType="T" isCreatedBy={!!talksUserCreated} />
          ))}
        {writingFilter === "추천" &&
          // return recommends for my writing or recommends for other's writing or no-content-mark
          (recommendsUserCreated ? (
            recommendsUserCreated.recommends.map((_) => (
              <Writing key={_.recommendId} writingInfo={_} />
            ))
          ) : recommendsUserLikes ? (
            recommendsUserLikes.recommends.map((_) => (
              <Writing key={_.recommendId} writingInfo={_} />
            ))
          ) : (
            <NoContent contentsType="R" isCreatedBy={!!recommendsUserCreated} />
          ))}
        {writingFilter === "댓글" &&
          // return comments or no-content-mark
          (commentsUserCreated ? (
            commentsUserCreated.comments.map((_) => <Comment key={_.commentId} commentInfo={_} />)
          ) : (
            <NoContent contentsType="C" isCreatedBy={!!commentsUserCreated} />
          ))}
      </WritingSection>
      {currentContentRef.current.isNextOrder && (
        <NextContentsBtn
          onClick={() => {
            setParamsForRequest({
              ...paramsForRequest,
              contentsType: currentContentRef.current.type,
              order: currentContentRef.current.currentOrder + 1,
            });
          }}
        >
          <Icon.IconBox noPointer>
            <Icon.SmallDown />
          </Icon.IconBox>
          더보기
        </NextContentsBtn>
      )}
    </MainBG>
  );
}
