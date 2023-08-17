import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainBG from "components/MainBG";
import {
  WritingDetailContainer,
  TalkDetail,
  NovelInWriting,
  BoardMark,
  LikeAndShare,
  CommentList,
  CommentInputOnMobile,
  RootCommentInputToCreateOnTablet,
  EditAndDelete,
} from "components/Writing";
import { ContentAnimation } from "views/RecommendDetail/RecommendDetail.styles";
import {
  useDeleteWritingMutation,
  useGetReCommentsQuery,
  useGetRootCommentsQuery,
  useGetTalkDetailQuery,
} from "store/serverAPIs/novelTime";
import ShowMoreContent from "assets/ShowMoreContent";
import { Comment } from "store/serverAPIs/types";
import { useWhetherItIsDesktop, useWhetherItIsMobile } from "utils";
import { EditAndDeleteContainer } from "components/Writing/WritingDetail.styles";
import { EDIT_WRITING, NOVEL_DETAIL, TALK_LIST } from "utils/pathname";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { handleWritingToEdit } from "store/clientSlices/writingSlice";
import { setSearchList } from "store/clientSlices/filterSlice";
import Spinner from "assets/Spinner";

export default function FreeTalkDetail() {
  const { talkId, commentId } = useParams();

  const [sortTypeForComments, setSortTypeForComments] = useState<"old" | "new">("old");

  const talk = useGetTalkDetailQuery(talkId as string);

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

  const getAllRootCommentPages = () => {
    if (commentPageNo === 0) {
      commentPerPage.refetch();
    } else {
      setCommentPageNo(0);
    }
  };

  // simple way to update comments after adding a root comment //
  // - request comments manually. don't do automatically by using provide and invalidate tags
  //    => to avoid unnecessary api calls several times with different args
  //       in the way that didn't direct and tidy and sometimes led to the wrong result
  // - make it possible to get all comments in all comment pages at once
  //     - when page number is 0, refetch
  //     - when page number is not 0, just set 0 and fetch
  //    => to make code simple to treat
  //        : when I try to get all comments from page 1 to the last in order continuously
  //           code was so much prolonged and segmented with different args and results of the api
  //    => to always run the useEffect
  //        : previously it could not run
  //          because comments of page 1 that was just given from server
  //                                     would possibly be the same with the previous
  //              and commentPerPage.data in useEffect deps couldn't trigger to run the useEffect
  //          but now it can as the whole comments without being separated in each pages
  //                                               will be always different from the previous

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

    // replace comment
    //  . when comment page is 0 it's updating root comments right after adding one
    //  . when comment page is 1 it's getting comments at first or getting with other sort type

    if ([0, 1].includes(commentPageNo) && commentList) {
      if (commentPageNo === 1 && !!rootComments.length) {
        // refetch comments when changing comment sort type
        //  because the cache data may exist if user got comments with this sort type previously
        commentPerPage.refetch();
      }

      setRootComments(commentList);

      setRootCommentIdToShowReComments("");

      return;
    }

    setRootCommentIdToShowReComments("");

    // accumulate root comments
    setRootComments((prev) => [...prev, ...commentList]);
  }, [commentPerPage.data]);

  // parent comment to write its reComment
  const [parentForNewReComment, setParentForNewReComment] = useState({
    parentCommentId: "",
    parentCommentUserName: "",
  });

  // not to color parent user name when updating root comments
  useEffect(() => {
    if (!rootCommentIdToShowReComments) {
      setParentForNewReComment({ parentCommentId: "", parentCommentUserName: "" });
    }
  }, [rootCommentIdToShowReComments]);

  // change reComment number of its root comment after adding/editing/deleting one
  //  it can run when getting reComments without adding new one
  //    then any won't change
  useEffect(() => {
    const reCommentNo = reCommentsFromServer.data?.length || 0;

    for (let i = 0; i < rootComments.length; i += 1) {
      const rootComment = rootComments[i];

      if (rootComment.commentId === rootCommentIdToShowReComments) {
        // replace reCommentNo of current rootComment to show reComments
        // when reCommentNo is different from previous one
        if (rootComment.reCommentNo !== reCommentNo) {
          const beforeTargetComment = rootComments.slice(0, i);
          const afterTargetComment = rootComments.slice(i + 1);

          setRootComments([
            ...beforeTargetComment,
            { ...rootComment, reCommentNo },
            ...afterTargetComment,
          ]);
        }

        break;
      }
    }
  }, [reCommentsFromServer.data]);

  const isMobile = useWhetherItIsMobile();

  const loginUserName = useAppSelector((state) => state.user.loginUserInfo.userName);
  const isWriter = loginUserName && loginUserName === talk.data?.talk.userName;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    if (!talk.data) return;

    dispatch(
      handleWritingToEdit({
        writingId: talk.data.talk.talkId,
        writingTitle: talk.data.talk.talkTitle,
        writingDesc: talk.data.talk.talkDesc,
        writingType: "FreeTalk",
        novelId: talk.data.novel.novelId,
        novelTitle: talk.data.novel.novelTitle,
      }),
    );
    navigate(EDIT_WRITING);
  };

  const isDesktop = useWhetherItIsDesktop();

  const [deleteWriting, deleteWritingResult] = useDeleteWritingMutation();

  async function handleDelete() {
    if (!talk.data) return;

    // * ask whether you really want to delete the comment
    // * change this after making the modal
    if (deleteWritingResult.isLoading) return; // prevent click while loading for prev request

    await deleteWriting({
      writingId: talk.data.talk.talkId,
      writingType: "T",
      novelId: talk.data.novel.novelId,
    });

    if (deleteWritingResult.isError) {
      alert("글을 삭제할 수 없습니다. 새로고침 후 다시 시도해 보세요");
    }

    // back to the novel-detail page
    const { search } = window.location;
    if (search === "?is-from-novel-detail=true") {
      navigate(`${NOVEL_DETAIL}/${talk.data.novel.novelId}`, { replace: true });
      return;
    }

    // back to the talk list page
    if (isDesktop) {
      navigate(`${TALK_LIST}?genre=All&searchType=no&searchWord=&sortType=작성일New&pageNo=1`, {
        replace: true,
      });
      return;
    }

    // on mobile
    dispatch(
      setSearchList({
        listType: "talk",
        list: "reset",
      }),
    );
    navigate(TALK_LIST, { replace: true });
  }

  if (!talkId || talk.isError) return <div>***에러 페이지 띄우기</div>;

  // 댓글은 프리톡만. 리코멘드는 댓글 없고 좋아요만 있음.
  //                - 대신 유저 그레이드 점수 반영은 리코멘드가 더 높음

  return (
    <>
      {talk.isFetching && <Spinner styles="fixed" />}
      {talk.data && (
        <MainBG isWritingDetail>
          <WritingDetailContainer>
            <EditAndDeleteContainer>
              {isWriter && (
                <EditAndDelete
                  clickToEdit={handleEdit}
                  clickToDelete={async () => handleDelete()}
                />
              )}
            </EditAndDeleteContainer>

            <BoardMark>Let's Free Talk about Novel!</BoardMark>
            <TalkDetail detailTalk={talk.data.talk} />
            <NovelInWriting novel={talk.data.novel} />
            <LikeAndShare
              isLike={talk.data.talk.isLike}
              likeNO={talk.data.talk.likeNO}
              writingId={talk.data.talk.talkId}
              writingType="T"
              novelId={talk.data.novel.novelId}
            />
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
                parentCommentForNewReComment={{ parentForNewReComment, setParentForNewReComment }}
                commentPageNo={commentPageNo}
                getAllRootCommentPages={getAllRootCommentPages}
                // for creating reComment
                talkId={talk.data.talk.talkId}
                novelId={talk.data.novel.novelId}
                novelTitle={talk.data.novel.novelTitle}
              />
            )}
            {!!commentPerPage.data?.hasNext && (
              <ShowMoreContent _onClick={() => setCommentPageNo((prev) => prev + 1)} />
            )}

            {isMobile ? (
              <CommentInputOnMobile
                talkId={talk.data.talk.talkId}
                novelId={talk.data.novel.novelId}
                novelTitle={talk.data.novel.novelTitle}
                parentForNewReComment={parentForNewReComment}
                getAllRootCommentPages={getAllRootCommentPages}
              />
            ) : (
              <RootCommentInputToCreateOnTablet
                talkId={talk.data.talk.talkId}
                novelId={talk.data.novel.novelId}
                novelTitle={talk.data.novel.novelTitle}
                getAllRootCommentPages={getAllRootCommentPages}
              />
            )}
          </ContentAnimation>
        </MainBG>
      )}
    </>
  );
}
