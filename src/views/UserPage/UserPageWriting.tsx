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
import { Writing, Comment, WritingFilter } from "./UserPage.components";
import { NextContentsBtn, ShareIconBox, WritingSection } from "./UserPage.styles";
import contentMark from "./utils/contentMark";

// - server request -------------important----------------------------
// - when entering this page at first,
//   - request with userName, isMyWriting
//            isMyWriting is true, it will be the my writing
//                        is false, other's writing
//   - received two userName : in talk and in recommend data from server
//          in my writing, get the value of "". in fact no matter what it is except type
//
// server request with userName
const dataFromServerForTest = {
  talk: [
    {
      talkId: "12",

      novelImg:
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈

      talkTitle: "이 소설 강추",

      userName: "나나a",
      // how to set userName from server : exist or not
      // 1. exist or not : myWriting -> userName exists, othersWriting -> don't exist
      createDate: "22.03.03",
      likeNO: 5,
      commentNO: 7,

      novelTitle: "헌터와 매드 사이언티스트",
    },
  ],
  recommend: [
    {
      recommendId: "34",

      novelImg:
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈

      recommendTitle: "이 소설 강추",

      userName: "나나나",
      // how to set userName from server
      // 1. exist or not : myWriting -> userName exists, othersWriting -> don't exist
      //  2. always exist, but if it is the same in the userName of useParams(), set myWriting,
      //                       if not othersWriting

      createDate: "22.03.03",
      likeNO: 5,

      novelTitle: "헌터와 매드 사이언티스트",
    },
  ],
  comment: [
    {
      commentId: "abdfdfcdef",
      commentContent: "코멘트 작성 중",
      createDate: "22.01.05",
      talkId: "as",
      talkTitle: "it is the best novel I've ever read",
      novelTitle: "헌터와 매드 사이언티스트",
    },
  ],
};
export default function UserPageWriting({ isMyWriting }: { isMyWriting: boolean }) {
  const loginUserInfo = useAppSelector((state) => state.user.loginUserInfo);

  const { userName } = useParams();

  const [paramsForRequest, setParamsForRequest] = useState({
    userName: userName as string,
    contentsType: "T" as "T" | "R" | "C",
    order: 1,
  });

  // to divide these two results don't destructure at first like : const { data, isLoading, ... }
  // just get it as variables
  const myWritingResult = useGetContentsForUserPageMyWritingQuery(paramsForRequest, {
    skip: !userName && !isMyWriting,
  });
  const othersWritingResult = useGetContentsForUserPageOthersWritingQuery(paramsForRequest, {
    skip: !userName && isMyWriting,
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
  // get and save the contents in my writing page
  useEffect(() => {
    if (!myWritingResult.data) return;

    const writingsFromServer = myWritingResult.data.writingsUserCreated;
    const commentsFromServer = myWritingResult.data.commentsUserCreated;

    // save talks
    if (writingsFromServer && writingsFromServer[0]?.talkId) {
      if (!talksUserCreated) {
        setTalksUserCreated({
          talks: writingsFromServer,
          isNextOrder: myWritingResult.data.isNextOrder,
          currentOrder: 1,
        });
      } else {
        setTalksUserCreated({
          talks: [...talksUserCreated.talks, ...writingsFromServer],
          isNextOrder: myWritingResult.data.isNextOrder,
          currentOrder: talksUserCreated.currentOrder + 1,
        });
      }
    }

    // save recommends
    if (writingsFromServer && writingsFromServer[0]?.recommendId) {
      if (!recommendsUserCreated) {
        setRecommendsUserCreated({
          recommends: writingsFromServer,
          isNextOrder: myWritingResult.data.isNextOrder,
          currentOrder: 1,
        });
      } else {
        setRecommendsUserCreated({
          recommends: [...recommendsUserCreated.recommends, ...writingsFromServer],
          isNextOrder: myWritingResult.data.isNextOrder,
          currentOrder: recommendsUserCreated.currentOrder + 1,
        });
      }
    }

    // save comments
    if (commentsFromServer) {
      if (!commentsUserCreated) {
        setCommentsUserCreated({
          comments: commentsFromServer,
          isNextOrder: myWritingResult.data.isNextOrder,
          currentOrder: 1,
        });
      } else {
        setCommentsUserCreated({
          comments: [...commentsUserCreated.comments, ...commentsFromServer],
          isNextOrder: myWritingResult.data.isNextOrder,
          currentOrder: commentsUserCreated.currentOrder + 1,
        });
      }
    }
  }, [myWritingResult.data]);

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

  // type, isNextOrder, currentOrder of current contents
  const typeOfCurrentContents = paramsForRequest.contentsType;
  // to decide whether display show-more button of current contents or not
  const isNextOrderOfCurrentContents =
    typeOfCurrentContents === "T"
      ? talksUserCreated?.isNextOrder
      : typeOfCurrentContents === "R"
      ? recommendsUserCreated?.isNextOrder
      : commentsUserCreated?.isNextOrder;
  // to set next order
  const currentOrderOfCurrentContents =
    typeOfCurrentContents === "T"
      ? (talksUserCreated?.currentOrder as number)
      : typeOfCurrentContents === "R"
      ? (recommendsUserCreated?.currentOrder as number)
      : (commentsUserCreated?.currentOrder as number);

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
      />
      <WritingSection>
        {writingFilter === "프리톡" &&
          talksUserCreated?.talks?.map((_) => <Writing key={_.talkId} writingInfo={_} />)}
        {writingFilter === "추천" &&
          recommendsUserCreated?.recommends?.map((_) => (
            <Writing key={_.recommendId} writingInfo={_} />
          ))}
        {writingFilter === "댓글" &&
          commentsUserCreated?.comments?.map((_) => <Comment key={_.commentId} commentInfo={_} />)}
      </WritingSection>
      {isNextOrderOfCurrentContents && (
        <NextContentsBtn
          onClick={() => {
            setParamsForRequest({
              ...paramsForRequest,
              order: currentOrderOfCurrentContents + 1,
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
