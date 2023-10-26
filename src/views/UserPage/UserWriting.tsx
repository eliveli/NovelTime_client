import MainBG from "components/MainBG";
import { CategoryMark } from "components/CategoryMark";
import { useEffect, useState } from "react";
import Icon from "assets/Icon";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useParams } from "react-router-dom";
import { useGetWritingQuery } from "store/serverAPIs/novelTime";
import ShowMoreContent from "assets/ShowMoreContent";
import Spinner from "assets/Spinner";
import MetaTag from "utils/MetaTag";
import { logoImg, setMetaTags } from "store/clientSlices/modalSlice";
import { TalkOrRecommend, CommentUserCreated } from "../../store/serverAPIs/types";
import { Writing, Comment, WritingFilter, NoContent } from "./UserWriting.components";
import { ShareIconBox, WritingSection } from "./UserPage.styles";
import contentMark from "./utils/contentMark";

export type ContentInfo = {
  type: "T" | "R" | "C";
  isNextOrder: boolean;
  currentOrder: number;
};

export default function UserWriting({ isCreated }: { isCreated: boolean }) {
  const loginUser = useAppSelector((state) => state.loginUser.user);

  const { userName } = useParams();

  const [paramsForRequest, setParamsForRequest] = useState({
    userName: userName as string,
    contentType: "T" as "T" | "R" | "C",
    order: 1,
    isCreated, // is created or is liked
  });

  // it can be different from "paramsForRequest" above
  //  when user doesn't request as choosing content filter which content exists already
  const [currentContentFilter, setCurrentContentFilter] = useState<ContentInfo>({
    type: "T",
    isNextOrder: false,
    currentOrder: 1,
  });

  const writingResult = useGetWritingQuery(paramsForRequest);

  // content from server in my writing page
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

  // content from server in other's writing page
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

  // Get and Set content in my writing page //
  useEffect(() => {
    if (!isCreated) return;

    if (!writingResult.data) return;

    const writingsFromServer = writingResult.data.writingsUserCreated;
    const commentsFromServer = writingResult.data.commentsUserCreated;
    const { isNextOrder } = writingResult.data;

    // save talks
    if (writingsFromServer && paramsForRequest.contentType === "T") {
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
      // set current content summary
      setCurrentContentFilter({
        type: "T",
        isNextOrder,
        currentOrder,
      });

      return;
    }

    // save recommends
    if (writingsFromServer && paramsForRequest.contentType === "R") {
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
      setCurrentContentFilter({
        type: "R",
        isNextOrder,
        currentOrder,
      });

      return;
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
      setCurrentContentFilter({
        type: "C",
        isNextOrder,
        currentOrder,
      });
    }
  }, [writingResult.data]);

  // Get and Set content in other's writing page //
  useEffect(() => {
    if (isCreated) return;

    if (!writingResult.data) return;

    const writingsFromServer = writingResult.data.writingsUserLikes;
    if (!writingsFromServer) return;

    const { isNextOrder } = writingResult.data;

    // save talks
    if (paramsForRequest.contentType === "T") {
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
      // set current content summary
      setCurrentContentFilter({
        type: "T",
        isNextOrder,
        currentOrder,
      });

      return;
    }

    // save recommends
    if (paramsForRequest.contentType === "R") {
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
      setCurrentContentFilter({
        type: "R",
        isNextOrder,
        currentOrder,
      });
    }
  }, [writingResult.data]);

  //
  const contentPageMark = contentMark(userName as string, loginUser.userName, isCreated, true);

  const writingCategory = isCreated ? ["프리톡", "추천", "댓글"] : ["프리톡", "추천"]; // my writing : other's writing

  const [writingFilter, selectWritingFilter] = useState("프리톡");

  // Set meta tags //
  const userImg = useAppSelector((state) => state.userProfile.user.userImg);

  const metaTags = () => {
    const text = isCreated ? "작성한 글 목록" : "좋아하는 글 목록";
    const title = userName ? `${userName}님이 ${text}` : "";

    return {
      title,
      description: "",
      image: userImg.src || logoImg,
      url: window.location.href,
    };
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!writingResult.data) return;

    dispatch(setMetaTags(metaTags()));
  }, [writingResult.data]);

  return (
    <MainBG>
      {writingResult.data && <MetaTag tags={metaTags()} />}
      {writingResult.isFetching && <Spinner styles="fixed" />}

      <CategoryMark categoryText={contentPageMark}>
        <ShareIconBox>
          <Icon.ShareWithArrow />
        </ShareIconBox>
      </CategoryMark>

      <WritingFilter
        writingCategory={writingCategory}
        writingFilter={writingFilter}
        selectWritingFilter={selectWritingFilter}
        setParamsForRequest={setParamsForRequest}
        isCreated={isCreated}
        talksUserCreated={talksUserCreated}
        recommendsUserCreated={recommendsUserCreated}
        commentsUserCreated={commentsUserCreated}
        talksUserLikes={talksUserLikes}
        recommendsUserLikes={recommendsUserLikes}
        setCurrentContentFilter={setCurrentContentFilter}
      />

      {isCreated && (
        <WritingSection
          isNoContent={
            (writingFilter === "프리톡" && !talksUserCreated?.talks?.length) ||
            (writingFilter === "추천" && !recommendsUserCreated?.recommends?.length) ||
            (writingFilter === "댓글" && !commentsUserCreated?.comments?.length)
          }
        >
          {writingFilter === "프리톡" &&
            (talksUserCreated?.talks?.length ? (
              talksUserCreated.talks.map((_) => <Writing key={_.talkId} writingInfo={_} />)
            ) : (
              <NoContent contentType="T" isCreatedBy={!!talksUserCreated} />
            ))}

          {writingFilter === "추천" &&
            (recommendsUserCreated?.recommends?.length ? (
              recommendsUserCreated.recommends.map((_) => (
                <Writing key={_.recommendId} writingInfo={_} />
              ))
            ) : (
              <NoContent contentType="R" isCreatedBy={!!recommendsUserCreated} />
            ))}

          {writingFilter === "댓글" &&
            (commentsUserCreated?.comments?.length ? (
              commentsUserCreated.comments.map((_) => <Comment key={_.commentId} commentInfo={_} />)
            ) : (
              <NoContent contentType="C" isCreatedBy={!!commentsUserCreated} />
            ))}
        </WritingSection>
      )}

      {!isCreated && (
        <WritingSection
          isNoContent={
            (writingFilter === "프리톡" && !talksUserLikes?.talks?.length) ||
            (writingFilter === "추천" && !recommendsUserLikes?.recommends?.length)
          }
        >
          {writingFilter === "프리톡" &&
            (talksUserLikes?.talks?.length ? (
              talksUserLikes.talks.map((_) => <Writing key={_.talkId} writingInfo={_} />)
            ) : (
              <NoContent contentType="T" isCreatedBy={!!talksUserCreated} />
            ))}

          {writingFilter === "추천" &&
            (recommendsUserLikes?.recommends?.length ? (
              recommendsUserLikes.recommends.map((_) => (
                <Writing key={_.recommendId} writingInfo={_} />
              ))
            ) : (
              <NoContent contentType="R" isCreatedBy={!!recommendsUserCreated} />
            ))}
        </WritingSection>
      )}

      {currentContentFilter.isNextOrder && (
        <ShowMoreContent
          _onClick={() => {
            setParamsForRequest({
              ...paramsForRequest,
              contentType: currentContentFilter.type,
              order: currentContentFilter.currentOrder + 1,
            });
          }}
        />
      )}
    </MainBG>
  );
}
