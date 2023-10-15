import Icon from "assets/Icon";
import { useRef, useEffect } from "react";
import { adjustCreateDate, useWhetherItIsMobile } from "utils";

import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  setCommentPageNo,
  setCommentSortType,
  setCommentToEdit,
  setParentAndChildConnected,
  setParentToWriteReComment,
  setRootCommentIdToShowReComments,
} from "store/clientSlices/commentSlice";
import { useDeleteCommentMutation } from "store/serverAPIs/novelTime";
import { Comment, Img, ReCommentList } from "store/serverAPIs/types";
import { handleAlert, openModal } from "store/clientSlices/modalSlice";
import {
  CommentContainer,
  CommentContent,
  CommentContentToEdit,
  CommentListContainer,
  CommentMark,
  CommentMarkContainer,
  CommentSort,
  CommentSortContainer,
  CreateDate,
  DeletedComment,
  DeletedCommentContainer,
  DeletedCommentFirstLineContainer,
  DeletedCommentNumberContainer,
  LeftSpaceOfDeletedComment,
  MarkForEdited,
  MarkParentAndChildComment,
  NextToImgContainer,
  ReCommentButtonsContainer,
  ReCommentMark,
  ReCommentMarkContainer,
  ReCommentUser,
  UserImg,
  UserImgBox,
  UserName,
  UserNameAndEditContainer,
  UserNameContainer,
} from "./CommentList.styles";
import {
  ReCommentInputToCreateOnTablet,
  ReCommentInputToEditOnTablet,
  RootCommentInputToEditOnTablet,
} from "./CommentInput";
import { CancelWhenEditing, EditAndDelete } from "./EditAndDelete";

function CommentWritten({
  comment, // used for both root comment and reComment

  // used for root comment
  isFirstComment,
  reCommentsOfRootComment,
  getAllRootCommentPages,

  // used for reComment
  isReComment,
  itsRootCommentWasDeleted, // a reComment's root comment was deleted
}: {
  comment: {
    commentId: string;
    userName: string;
    userImg: Img;
    commentContent: string;
    createDate: string;
    isDeleted: 0 | 1;
    isEdited: 0 | 1;

    reCommentNo?: number; // for rootComment
    parentCommentId?: string; // for reComment
    parentCommentUserName?: string; // for reComment
  };

  isFirstComment?: boolean;
  reCommentsOfRootComment?: ReCommentList;
  getAllRootCommentPages?: () => void;

  isReComment?: true;
  itsRootCommentWasDeleted?: boolean;
}) {
  const {
    commentId,
    userName,
    userImg,
    commentContent,
    createDate,
    isDeleted,
    isEdited,
    reCommentNo,
    parentCommentId, // to highlight parent comment when clicking its reComment
    parentCommentUserName,
  } = comment;
  // can not set two reComment at once

  const commentSortType = useAppSelector((state) => state.comment.commentSortType);
  const commentPageNo = useAppSelector((state) => state.comment.commentPageNo);
  const commentIdFromUserPageForScroll = useAppSelector(
    (state) => state.comment.commentIdFromUserPageForScroll,
  );
  const parentToWriteReComment = useAppSelector((state) => state.comment.parentToWriteReComment);
  const parentAndChildConnected = useAppSelector((state) => state.comment.parentAndChildConnected);
  const rootCommentIdToShowReComments = useAppSelector(
    (state) => state.comment.rootCommentIdToShowReComments,
  );
  const argsForApis = useAppSelector((state) => state.comment.argsForApis);

  const [deleteComment, deleteCommentResult] = useDeleteCommentMutation();

  const commentRef = useRef<HTMLDivElement>(null);
  const commentContentRef = useRef<HTMLParagraphElement>(null);

  const isParentToMark = parentAndChildConnected.parent === commentId;

  const dateToShow = adjustCreateDate(createDate);

  const isMobile = useWhetherItIsMobile();

  const loginUserName = useAppSelector((state) => state.loginUser.user.userName);
  const commentToEdit = useAppSelector((state) => state.comment.commentToEdit);

  const isWriter = loginUserName === userName;
  const isEdit = commentToEdit.commentId === commentId;

  const dispatch = useAppDispatch();

  const handleEdit = () => {
    dispatch(
      setCommentToEdit({
        commentId,
        commentContent,
        parentUserName: parentCommentUserName || "",
        // "" -> when it is root comment
      }),
    );
  };

  const handleCancelEdit = () => {
    dispatch(
      setCommentToEdit({
        commentId: "",
        commentContent: "",
        parentUserName: "",
      }),
    );
  };

  async function handleDelete() {
    // * ask whether you really want to delete the comment
    // * change this after making the modal
    if (deleteCommentResult.isLoading) return; // prevent click while loading for prev request

    await deleteComment({ commentId, novelId: argsForApis.novelId });

    if (deleteCommentResult.isError) {
      dispatch(openModal("alert"));
      dispatch(handleAlert("코멘트를 삭제할 수 없습니다. 새로고침 후 다시 시도해 보세요"));
      return;
    }

    if (getAllRootCommentPages) {
      getAllRootCommentPages(); // when deleting a root comment
    }
  }

  // scroll to the parent comment of its reComment when clicking "원댓글보기"
  useEffect(() => {
    if (isParentToMark) {
      commentContentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isParentToMark]);

  // scroll to exact comment component when clicking the comment in user page
  useEffect(() => {
    if (commentRef.current && commentIdFromUserPageForScroll === commentId) {
      // first useEffect in ScrollToTop executes after rendering nav component : see the App.tsx
      // and page renders
      // if you clicked the comment from user page,
      // after comment rendering the following code will be executed if it is the comment you clicked in user page
      commentRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    // after adding a comment,
    // scroll to the comment that the user just created

    if (commentPageNo !== 0) return;

    if (commentSortType === "new" && isFirstComment === true) {
      commentRef.current?.scrollIntoView({
        behavior: "instant" as ScrollBehavior,
        block: "center",
      });
      return;
    }

    if (commentSortType === "old" && commentRef.current?.nextSibling === null) {
      commentRef.current?.scrollIntoView({
        behavior: "instant" as ScrollBehavior,
        block: "start",
      });
    }
  }, [commentPageNo]);

  if (isDeleted === 1) {
    return (
      <DeletedCommentContainer ref={commentRef} isReComment={isReComment}>
        <DeletedCommentFirstLineContainer>
          <LeftSpaceOfDeletedComment />
          <DeletedComment isParentToMark={isParentToMark} hasReComment={!!reCommentNo}>
            삭제된 코멘트입니다
          </DeletedComment>
        </DeletedCommentFirstLineContainer>

        {!!reCommentNo && (
          <DeletedCommentNumberContainer>
            <ReCommentButtonsContainer>
              <ReCommentMarkContainer>
                <Icon.IconBox size={15}>
                  <Icon.Comment />
                </Icon.IconBox>

                {rootCommentIdToShowReComments !== commentId && (
                  <ReCommentMark
                    onClick={() => {
                      // display reComments of this root comment
                      dispatch(setRootCommentIdToShowReComments(commentId));

                      dispatch(setParentAndChildConnected({ parent: "", child: "" }));
                    }}
                  >
                    {`답글 ${reCommentNo}`}
                  </ReCommentMark>
                )}

                {rootCommentIdToShowReComments === commentId && (
                  <ReCommentMark
                    onClick={() => {
                      dispatch(setRootCommentIdToShowReComments(""));

                      dispatch(setParentAndChildConnected({ parent: "", child: "" }));
                    }}
                  >
                    답글 접기
                  </ReCommentMark>
                )}
              </ReCommentMarkContainer>
            </ReCommentButtonsContainer>

            {!!reCommentsOfRootComment?.length &&
              reCommentsOfRootComment.map((_) => (
                <CommentWritten key={_.commentId} isReComment comment={{ ..._ }} />
              ))}
          </DeletedCommentNumberContainer>
        )}
      </DeletedCommentContainer>
    );
  }

  if (isReComment && parentCommentUserName) {
    return (
      <CommentContainer ref={commentRef} isReComment={isReComment}>
        <UserImgBox>
          <UserImg userImg={userImg} />
        </UserImgBox>
        <NextToImgContainer>
          <UserNameAndEditContainer>
            <UserNameContainer>
              <UserName
                isParentToWriteReComment={commentId === parentToWriteReComment.parentCommentId}
              >
                {userName}
              </UserName>
              <CreateDate>{dateToShow}</CreateDate>
            </UserNameContainer>
            {isWriter && !isEdit && (
              <EditAndDelete clickToEdit={handleEdit} clickToDelete={async () => handleDelete()} />
            )}
            {isWriter && isEdit && <CancelWhenEditing clickToCancel={handleCancelEdit} />}
          </UserNameAndEditContainer>

          {!isEdit && (
            <CommentContent ref={commentContentRef} isParentToMark={isParentToMark}>
              <ReCommentUser>{`@${parentCommentUserName} `}</ReCommentUser>
              {commentContent}
              {!!isEdited && <MarkForEdited>수정됨</MarkForEdited>}
            </CommentContent>
          )}

          {isEdit && isMobile && (
            <CommentContentToEdit ref={commentContentRef} isParentToMark={isParentToMark}>
              <ReCommentUser>{`@${parentCommentUserName} `}</ReCommentUser>
              {commentContent}
            </CommentContentToEdit>
          )}

          {isEdit && !isMobile && <ReCommentInputToEditOnTablet />}

          <ReCommentButtonsContainer>
            <ReCommentMarkContainer>
              {/* not allow to write reComment when its root comment was deleted */}
              {itsRootCommentWasDeleted === false && (
                <>
                  <Icon.IconBox size={15}>
                    <Icon.Comment />
                  </Icon.IconBox>
                  <ReCommentMark
                    onClick={() => {
                      dispatch(
                        setParentToWriteReComment({
                          parentCommentId: commentId,
                          parentCommentUserName: userName,
                        }),
                      );

                      dispatch(setParentAndChildConnected({ parent: "", child: "" }));
                    }}
                  >
                    답글 쓰기
                  </ReCommentMark>
                </>
              )}
            </ReCommentMarkContainer>

            {isReComment && parentCommentId && (
              <MarkParentAndChildComment
                childComment={parentAndChildConnected.child}
                currentComment={commentId}
                onClick={() =>
                  dispatch(
                    setParentAndChildConnected({ parent: parentCommentId, child: commentId }),
                  )
                }
              >
                원댓글보기
              </MarkParentAndChildComment>
            )}
          </ReCommentButtonsContainer>
        </NextToImgContainer>
      </CommentContainer>
    );
  }

  return (
    <CommentContainer ref={commentRef} isReComment={isReComment}>
      <UserImgBox>
        <UserImg userImg={userImg} />
      </UserImgBox>
      <NextToImgContainer>
        <UserNameAndEditContainer>
          <UserNameContainer>
            <UserName
              isParentToWriteReComment={commentId === parentToWriteReComment.parentCommentId}
            >
              {userName}
            </UserName>
            <CreateDate>{dateToShow}</CreateDate>
          </UserNameContainer>
          {isWriter && !isEdit && (
            <EditAndDelete clickToEdit={handleEdit} clickToDelete={async () => handleDelete()} />
          )}
          {isWriter && isEdit && <CancelWhenEditing clickToCancel={handleCancelEdit} />}
        </UserNameAndEditContainer>

        {!isEdit && (
          <CommentContent ref={commentContentRef} isParentToMark={isParentToMark}>
            {commentContent}
            {isEdited === 1 && <MarkForEdited>수정됨</MarkForEdited>}
          </CommentContent>
        )}

        {isEdit && isMobile && (
          <CommentContentToEdit ref={commentContentRef} isParentToMark={isParentToMark}>
            {commentContent}
          </CommentContentToEdit>
        )}

        {isEdit && !isMobile && getAllRootCommentPages && (
          <RootCommentInputToEditOnTablet getAllRootCommentPages={getAllRootCommentPages} />
        )}

        <ReCommentButtonsContainer>
          <ReCommentMarkContainer>
            <Icon.IconBox size={15}>
              <Icon.Comment />
            </Icon.IconBox>

            {rootCommentIdToShowReComments !== commentId && (
              <ReCommentMark
                onClick={() => {
                  // display reComments of this root comment
                  dispatch(setRootCommentIdToShowReComments(commentId));

                  dispatch(
                    setParentToWriteReComment({
                      parentCommentId: commentId,
                      parentCommentUserName: userName,
                    }),
                  );

                  dispatch(setParentAndChildConnected({ parent: "", child: "" }));
                }}
              >
                {reCommentNo ? `답글 ${reCommentNo}` : "답글 쓰기"}
              </ReCommentMark>
            )}

            {rootCommentIdToShowReComments === commentId && (
              <ReCommentMark
                onClick={() => {
                  dispatch(setRootCommentIdToShowReComments(""));

                  dispatch(
                    setParentToWriteReComment({
                      parentCommentId: "",
                      parentCommentUserName: "",
                    }),
                  );

                  dispatch(setParentAndChildConnected({ parent: "", child: "" }));
                }}
              >
                답글 접기
              </ReCommentMark>
            )}
          </ReCommentMarkContainer>
        </ReCommentButtonsContainer>

        {!!reCommentsOfRootComment?.length &&
          reCommentsOfRootComment.map((_) => (
            <CommentWritten
              key={_.commentId}
              isReComment
              comment={{ ..._ }}
              itsRootCommentWasDeleted={!!isDeleted}
            />
          ))}

        {/* write reComment */}
        {!isMobile && rootCommentIdToShowReComments === commentId && (
          <ReCommentInputToCreateOnTablet />
        )}
      </NextToImgContainer>
    </CommentContainer>
  );
}

// trouble shooting //
// 1. goal : prevent multiple comment components open
// 2. tried but failed :
//    from parent component, pass useRef or useState to children.
//    they will store functions that close comment in its component.
//    but type(it means type-script) for them is very difficult,
//    when clicked the "답글", first set false all the comment component, but it didn't work,
//    and in the process, things work unexpectedly
//     - in useEffect, ref.current, the idea itself - and it occured - multiple useState in one ref or state, so on...
// 3. solved : to use global client state.
//    first clicked "답글", get the function to close comment and set global state
//    second clicked other "답글", use the function to close comment.
//    that's it! // I got this over half day long struggled....
// 4. ps : well, although there is better UI design, something important is go to next step - making next page..
//    detail will be set later. (and from now, I have changed various things that I had worked hard...)
//    many things is best at that time, but time is gone, it is not...
export default function CommentList({
  rootComments,
  reComments,
  getAllRootCommentPages,
}: {
  rootComments: Comment[];
  reComments?: ReCommentList;
  getAllRootCommentPages: () => void;
}) {
  const commentSortType = useAppSelector((state) => state.comment.commentSortType);
  const rootCommentIdToShowReComments = useAppSelector(
    (state) => state.comment.rootCommentIdToShowReComments,
  );

  const dispatch = useAppDispatch();

  return (
    <CommentListContainer>
      <CommentMarkContainer>
        <CommentMark>댓글</CommentMark>
        <CommentSortContainer>
          {["NEW", "OLD"].map((_) => {
            const commentSortTypeWithUpperCase = commentSortType.toUpperCase();

            return (
              <CommentSort
                key={_}
                isSelected={commentSortTypeWithUpperCase === _}
                onClick={() => {
                  if (commentSortTypeWithUpperCase !== _) {
                    dispatch(setCommentSortType(_.toLowerCase() as "new" | "old"));
                    dispatch(setCommentPageNo(1));
                  }
                }}
              >
                {_}
              </CommentSort>
            );
          })}
        </CommentSortContainer>
      </CommentMarkContainer>
      {rootComments.map((_, idx) => (
        <CommentWritten
          key={_.commentId}
          comment={_}
          isFirstComment={idx === 0}
          reCommentsOfRootComment={
            rootCommentIdToShowReComments === _.commentId ? reComments : undefined
          }
          getAllRootCommentPages={getAllRootCommentPages}
        />
      ))}
    </CommentListContainer>
  );
}
