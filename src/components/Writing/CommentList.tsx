import Icon from "assets/Icon";
import { useRef, useState, useEffect } from "react";
import { adjustCreateDate, useWhetherItIsMobile } from "utils";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { setCommentToEdit } from "store/clientSlices/commentSlice";
import { useDeleteCommentMutation } from "store/serverAPIs/novelTime";
import {
  CommentContainer,
  CommentContent,
  CommentContentToEdit,
  CommentListContainer,
  CommentListProps,
  CommentMark,
  CommentMarkContainer,
  CommentProps,
  CommentSort,
  CommentSortContainer,
  CreateDate,
  DeletedComment,
  DeletedCommentContainer,
  DeletedCommentFirstLineContainer,
  DeletedCommentNumberContainer,
  LeftSpaceOfDeletedComment,
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
  comment, // it includes both root comment and reComment
  reCommentsOfRootComment,

  isReComment,
  itsRootCommentWasDeleted, // a reComment's root comment was deleted

  // for displaying reComments when clicking "답글 보기(or 몇 개)" in their root comment
  rootCommentSelected,
  // for writing a new reComment
  parentCommentForNewReComment: { parentForNewReComment, setParentForNewReComment },
  // for clicking "원댓글보기" that matches a reComment with its parent
  parentAndChildCommentToMark: { parentAndChildToMark, setParentAndChildToMark },
  //   note. the parent might be a root comment or reComment in a root comment

  // when adding a comment //
  talkId,
  novelTitle,
  commentPageNo,
  isFirstComment,
  getAllRootCommentPages,
  commentSortType,

  commentIdForScroll, // when going to the talk with comment page from user page
}: CommentProps) {
  const {
    commentId,
    userName,
    userImg,
    commentContent,
    createDate,
    reCommentNo, // only for rootComment. it is undefined in reComment

    // only for reComment. below are undefined in rootComment
    parentCommentId, // to mark parent comment when clicking its reComment
    parentCommentUserName,

    isDeleted,
  } = comment;
  // reComment one by one : can not set two reComment at once

  const [deleteComment, deleteCommentResult] = useDeleteCommentMutation();

  const commentRef = useRef<HTMLDivElement>(null);
  const commentContentRef = useRef<HTMLParagraphElement>(null);

  const isParentToMark = parentAndChildToMark.parent === commentId;

  const dateToShow = adjustCreateDate(createDate);

  const isMobile = useWhetherItIsMobile();

  const loginUserName = useAppSelector((state) => state.user.loginUserInfo.userName);
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

    await deleteComment({
      commentId,
      isReComment: isReComment || false,
    });

    if (deleteCommentResult.isError) {
      alert("코멘트를 삭제할 수 없습니다. 새로고침 후 다시 시도해 보세요");
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
    if (commentRef.current && commentIdForScroll === commentId) {
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

                {rootCommentSelected &&
                  rootCommentSelected.rootCommentIdToShowReComments !== commentId && (
                    <ReCommentMark
                      onClick={() => {
                        // display reComments of this root comment
                        rootCommentSelected.setRootCommentIdToShowReComments(commentId);

                        setParentAndChildToMark({ parent: "", child: "" });
                      }}
                    >
                      {`답글 ${reCommentNo}`}
                    </ReCommentMark>
                  )}

                {rootCommentSelected &&
                  rootCommentSelected.rootCommentIdToShowReComments === commentId && (
                    <ReCommentMark
                      onClick={() => {
                        rootCommentSelected.setRootCommentIdToShowReComments("");

                        setParentAndChildToMark({ parent: "", child: "" });
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
                  commentIdForScroll={commentIdForScroll}
                  parentCommentForNewReComment={{ parentForNewReComment, setParentForNewReComment }}
                  parentAndChildCommentToMark={{ parentAndChildToMark, setParentAndChildToMark }}
                  talkId={talkId}
                  novelTitle={novelTitle}
                />
              ))}
          </DeletedCommentNumberContainer>
        )}
      </DeletedCommentContainer>
    );
  }

  if (isReComment) {
    return (
      <CommentContainer ref={commentRef} isReComment={isReComment}>
        <UserImgBox>
          <UserImg userImg={userImg} />
        </UserImgBox>
        <NextToImgContainer>
          <UserNameAndEditContainer>
            <UserNameContainer>
              <UserName
                isParentToWriteReComment={commentId === parentForNewReComment.parentCommentId}
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
              <ReCommentUser>{`@${parentCommentUserName as string} `}</ReCommentUser>
              {commentContent}
            </CommentContent>
          )}

          {isEdit && isMobile && (
            <CommentContentToEdit ref={commentContentRef} isParentToMark={isParentToMark}>
              <ReCommentUser>{`@${parentCommentUserName as string} `}</ReCommentUser>
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
                      setParentForNewReComment({
                        parentCommentId: commentId,
                        parentCommentUserName: userName,
                      });

                      setParentAndChildToMark({ parent: "", child: "" });
                    }}
                  >
                    답글 쓰기
                  </ReCommentMark>
                </>
              )}
            </ReCommentMarkContainer>

            {isReComment && parentCommentId && (
              <MarkParentAndChildComment
                childComment={parentAndChildToMark.child}
                currentComment={commentId}
                onClick={() =>
                  setParentAndChildToMark({ parent: parentCommentId, child: commentId })
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
              isParentToWriteReComment={commentId === parentForNewReComment.parentCommentId}
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

            {rootCommentSelected &&
              rootCommentSelected.rootCommentIdToShowReComments !== commentId && (
                <ReCommentMark
                  onClick={() => {
                    // display reComments of this root comment
                    rootCommentSelected.setRootCommentIdToShowReComments(commentId);

                    setParentForNewReComment({
                      parentCommentId: commentId,
                      parentCommentUserName: userName,
                    });

                    setParentAndChildToMark({ parent: "", child: "" });
                  }}
                >
                  {reCommentNo ? `답글 ${reCommentNo}` : "답글 쓰기"}
                </ReCommentMark>
              )}

            {rootCommentSelected &&
              rootCommentSelected.rootCommentIdToShowReComments === commentId && (
                <ReCommentMark
                  onClick={() => {
                    rootCommentSelected.setRootCommentIdToShowReComments("");

                    setParentForNewReComment({
                      parentCommentId: "",
                      parentCommentUserName: "",
                    });

                    setParentAndChildToMark({ parent: "", child: "" });
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
              commentIdForScroll={commentIdForScroll}
              parentCommentForNewReComment={{ parentForNewReComment, setParentForNewReComment }}
              parentAndChildCommentToMark={{ parentAndChildToMark, setParentAndChildToMark }}
              itsRootCommentWasDeleted={!!isDeleted}
              talkId={talkId}
              novelTitle={novelTitle}
            />
          ))}

        {/* write reComment */}
        {!isMobile && rootCommentSelected?.rootCommentIdToShowReComments === commentId && (
          <ReCommentInputToCreateOnTablet
            parentForNewReComment={{ ...parentForNewReComment }}
            talkId={talkId}
            novelTitle={novelTitle}
          />
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
  commentList,
  commentIdForScroll,
  commentSort,
  set1inCommentPageNo,
  reComments,
  rootCommentSelected,
  parentCommentForNewReComment,
  commentPageNo,
  getAllRootCommentPages,

  talkId,
  novelTitle,
}: CommentListProps) {
  const [parentAndChildToMark, setParentAndChildToMark] = useState({ parent: "", child: "" }); // parent comment of selected reComment

  return (
    <CommentListContainer>
      <CommentMarkContainer>
        <CommentMark>댓글</CommentMark>
        <CommentSortContainer>
          {["NEW", "OLD"].map((_) => {
            const currentSortType = commentSort.sortTypeForComments.toUpperCase();

            return (
              <CommentSort
                key={_}
                isSelected={currentSortType === _}
                onClick={() => {
                  if (currentSortType !== _) {
                    commentSort.setSortTypeForComments(_.toLowerCase() as "new" | "old");
                    set1inCommentPageNo();
                  }
                }}
              >
                {_}
              </CommentSort>
            );
          })}
        </CommentSortContainer>
      </CommentMarkContainer>
      {commentList.map((_, idx) => (
        <CommentWritten
          key={_.commentId}
          comment={_}
          isFirstComment={idx === 0}
          commentPageNo={commentPageNo}
          commentSortType={commentSort.sortTypeForComments}
          commentIdForScroll={commentIdForScroll}
          parentCommentForNewReComment={{ ...parentCommentForNewReComment }}
          parentAndChildCommentToMark={{ parentAndChildToMark, setParentAndChildToMark }}
          reCommentsOfRootComment={
            rootCommentSelected.rootCommentIdToShowReComments === _.commentId
              ? reComments
              : undefined
          }
          rootCommentSelected={rootCommentSelected}
          getAllRootCommentPages={getAllRootCommentPages}
          talkId={talkId}
          novelTitle={novelTitle}
        />
      ))}
    </CommentListContainer>
  );
}
