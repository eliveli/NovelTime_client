import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainBG from "components/MainBG";
import {
  WritingDetailContainer,
  TalkDetail,
  NovelInWriting,
  BoardMark,
  LikeAndShare,
  CommentList,
  WriteComment,
} from "components/Writing";
import { ContentAnimation } from "views/RecommendDetail/RecommendDetail.styles";
import {
  useGetReCommentsQuery,
  useGetRootCommentsQuery,
  useGetTalkDetailQuery,
} from "store/serverAPIs/novelTime";
import ShowMoreContent from "assets/ShowMoreContent";
import { Comment, ReCommentList } from "store/serverAPIs/types";

export default function FreeTalkDetail() {
  const { talkId, commentId } = useParams();

  const [sortTypeForComments, setSortTypeForComments] = useState<"old" | "new">("old");

  const talk = useGetTalkDetailQuery({
    writingType: "T",
    writingId: talkId as string,
  });
  const [commentPageNo, setCommentPageNo] = useState(1);

  const commentPerPage = useGetRootCommentsQuery({
    talkId: talkId as string,
    commentSortType: sortTypeForComments,
    commentPageNo,
  });
  // - isLoading, isFetching, isError, data in comment

  const set1inCommentPageNo = () => {
    setCommentPageNo(1);
  };

  const getAllCommentPages = () => {
    if (commentPageNo === 0) {
      commentPerPage.refetch();
    } else {
      setCommentPageNo(0);
    }
  };

  // simple way to update comments after adding a root comment //
  // - request comments manually. don't do automatically by using provide and invalidate tags
  //    => to avoid unnecessary api calls several times with different args
  //       in the way that didn't direct and tidy and sometimes led in the wrong direction
  // - make it possible to get all comments in all comment pages at once (by changing server code)
  //     - when page number is 0, refetch
  //     - when page number is not 0, just set 0 and fetch
  //    => . to avoid the situation that useEffect would not run
  //         because the data just received from server would possibly be the same with the previous
  //         sometimes when comment page number is 1 and sort type is old
  //                       and hasNext of data is false and the comments data were not changed,
  //         so commentPerPage.data in the useEffect deps couldn't trigger to run the useEffect
  //       ㄴ but in the new way I wrote above, useEffect can always run
  //          because the whole comments will always different and new after adding a comment
  //          in previous code, it was not possible because I just could get comments in one page
  //      .  to avoid quite segmented and continuous situations
  //            where the things kept going on in long and complex way
  //            as getting comments from page 1 to the last in order (in the previous way)
  const [rootComments, setRootComments] = useState<Comment[]>([]);

  const [rootCommentIdToShowReComments, setRootCommentIdToShowReComments] = useState<string>("");

  const reCommentsFromServer = useGetReCommentsQuery(
    {
      rootCommentId: rootCommentIdToShowReComments,
      commentSortType: sortTypeForComments,
    },
    { skip: !rootCommentIdToShowReComments },
  );
  useEffect(() => {
    const commentList = commentPerPage.data?.commentList;

    if (!commentList || !commentList?.length) return;

    // exchange comment
    //  . when comment page is 0 updating root comments right after adding one
    //  . when comment page is 1 getting comments at first or sorting comments

    if ([0, 1].includes(commentPageNo) && commentList) {
      setRootComments(commentList);

      setRootCommentIdToShowReComments("");

      return;
    }

    setRootCommentIdToShowReComments("");

    // accumulate root comments
    setRootComments((prev) => [...prev, ...commentList]);
  }, [commentPerPage.data]);

  if (!talkId || talk.isError || !talk.data) return <div>***에러 페이지 띄우기</div>;

  // 서버에서 데이터 받아올 때 구성 // dataFromServer = { talk, novel }
  const dataFromServer = {
    talk: {
      talkId: "asdsasdssa", // 좋아요 누르거나 코멘트 작성 시 talkId로 서버 요청

      userName: "나나나",
      // if login user name is the same with this, login user can remove or edit this content
      userImg: "",
      // change this to { src : "", position : ""}

      createDate: "22.03.03",

      likeNO: 5,
      commentNO: 7,
      isLike: true, // 유저의 좋아요 여부 //비로그인 시 false

      talkTitle: "이 소설 강추",
      talkDesc: `나는 이 부분이 정말 재미있었어. 주인공이 위기 상황을 모면하기 위해 이렇게 행동하는데,
    그게 오히려 개그 요소로 작용해.... 그래서.... `,
      talkImg: "",
      // its type is string. not {src:"", position:""}
    },

    novel: {
      novelId: "20220225082010201",
      novelImg:
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
      novelTitle: "헌터와 매드 사이언티스트",
      novelAuthor: "델마르",
      novelGenre: "로판",
      novelDesc: `[에이번데일 백작의 저택]

    “누구세요……?”
    “그건 내가 할 말인 것 같은데.”
    
    히든 에피소드를 열고 들어간 폐가에서 만난 금발의 미남자.
    알고 보니 그는 이미 죽었어야 할 천재 마도 공학자였다.
    
    가상 현실 게임 ‘황금 발톱’의 배경으로부터 13년 전에 떨어진 에스페란사.
    졸지에 몬스터도 없는 세상에서 세계 최강이 되고 말았다.
    원래 세상으로 돌아가기 위해선 '황금 발톱'을 찾아 퀘스트를 클리어해야 하는데…!
    
    “당신을 왜 해부하겠어요? 살아 있는 채로 연구할 수 있는 게 훨씬 많은데.”
    
    유일한 조력자는 이런 소름 돋는 소리를 아무렇지 않게 하질 않나,
    
    “그럼 피 한 방울만 주지 않을래요? 딱 한 방울만.”
    
    피까지 뽑아 가려고 한다.
    
    이 퀘스트… 성공할 수 있을까?`,
    },
  };

  // 백엔드에서 comment 테이블에서 talkID로 코멘트 찾기.
  // 코멘트 작성자는 userID로 구분, user 테이블에서 현재 user Name을 가져오기

  const commentList = [
    {
      commentId: "zzzabc",
      userName: "리리리",
      userImg: {
        src: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
        position: "",
      },
      commentContent: "코멘트 작성 중",
      createDate: "22.01.05",
      reCommentNo: 2,
      // * ㄴit was added for root comments
      reComments: [
        // * 처음 루트코멘트만 받아오면 이 속성이 undefined
        // * 답글 보는 버튼을 눌러 답글을 서버에서 받아온 후
        // * 해당 루트 코멘트에 reComments 속성으로 넣어주고 사용
        {
          commentId: "zzabssssscde",
          parentCommentId: "zzzabc",
          parentCommentUserName: "lala",
          userName: "fff",
          userImg: {
            src: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
            position: "",
          },
          commentContent: "그러하오",
          createDate: "22.01.05",
        },
        {
          commentId: "azzzzbcdef",
          reCommentUserName: "lala",
          userName: "zxcv",
          userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
          commentContent: "그러하오",
          createDate: "22.01.05",
        },
      ],
    },
    {
      commentId: "absdfcaaad",
      userName: "리리리",
      userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
      commentContent: "코멘트 작성 중",
      createDate: "22.01.05",
      reComments: [
        {
          commentId: "assssbcerede",
          reCommentUserName: "lala",
          userName: "fff",
          userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
          commentContent: "그러하오",
          createDate: "22.01.05",
        },
        {
          commentId: "abdfdfcdef",
          reCommentUserName: "lala",
          userName: "zxcv",
          userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
          commentContent: "유저페이지에서 클릭할 코멘트(테스트)",
          createDate: "22.01.05",
        },
      ],
    },
  ];
  // 답글은 어떻게?
  // - comment : comment 테이블에서 같은 talkID의 코멘트 리스트 가져오기
  // - reCommentID : if it is not "", it is reComments for it - commentID
  // - re-re-comment : reCommentID is not "", reReCommentUserID is not ""
  // in comment table : talkID, commentID, reCommentID, reReCommentUserID
  //                    - reCommentID, reReCommentUserID can be ""

  // 댓글은 프리톡만. 리코멘드는 댓글 없고 좋아요만 있음.
  //                - 대신 유저 그레이드 점수 반영은 리코멘드가 더 높음

  return (
    <MainBG isWritingDetail>
      <WritingDetailContainer>
        <BoardMark>Let's Free Talk about Novel!</BoardMark>
        <TalkDetail detailTalk={talk.data.talk} />
        <NovelInWriting novel={talk.data.novel} />
        <LikeAndShare isLike={talk.data.talk.isLike} likeNO={talk.data.talk.likeNO} />
      </WritingDetailContainer>
      <ContentAnimation isTalkComnt>
        {!!rootComments.length && (
          <CommentList
            commentList={rootComments}
            commentIdForScroll={commentId}
            commentSort={{ sortTypeForComments, setSortTypeForComments }}
            set1inCommentPageNo={set1inCommentPageNo}
            reComments={reCommentsFromServer?.data}
            rootCommentSelected={{
              rootCommentIdToShowReComments,
              setRootCommentIdToShowReComments,
            }}
            // for creating reComment
            talkId={talk.data.talk.talkId}
            novelTitle={talk.data.novel.novelTitle}
          />
        )}
        {!!commentPerPage.data?.hasNext && (
          <ShowMoreContent _onClick={() => setCommentPageNo((prev) => prev + 1)} />
        )}
        <WriteComment
          talkId={talk.data.talk.talkId}
          novelTitle={talk.data.novel.novelTitle}
          getAllCommentPages={getAllCommentPages}
        />
      </ContentAnimation>
    </MainBG>
  );
}
