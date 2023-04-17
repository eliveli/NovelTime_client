import Icon from "assets/Icon";
import { useRef, useState, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getClosingReComnt } from "../../store/clientSlices/writingSlice";
import {
  CommentContainer,
  CommentContent,
  CommentListContainer,
  CommentListProps,
  CommentMark,
  CommentMarkContainer,
  CommentProps,
  CommentSort,
  CommentSortContainer,
  CreateDate,
  EmojiCntnr,
  EmojiIcon,
  MarkParentComment,
  NextToImgContainer,
  ReCommentButtonsContainer,
  ReCommentMark,
  ReCommentMarkContainer,
  ReCommentUser,
  UserImg,
  UserImgBox,
  UserName,
  UserNameContainer,
  WriteCommentContainer,
  WriteCommentSubmit,
  WriteText,
  WriteTextCntnr,
} from "./CommentList.styles";

const htmlWidth = document.documentElement.offsetWidth;
const isTablet = htmlWidth >= 768;
const isPC = htmlWidth >= 1024;
const isFixedComment = htmlWidth <= 820;

export function WriteComment({
  isReComment,
  parentUserNameForNewReComment,
  isMessage,
}: {
  isReComment?: true;
  parentUserNameForNewReComment?: string;
  isMessage?: true;
}) {
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [comment, setComment] = useState("");

  // learn more about useCallback!
  const writeComment = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!textRef.current) return;

    setComment(e.target.value); // store content of comment
    textRef.current.style.height = "28px"; // Default: height of 1 line
    const textHeight = textRef.current.scrollHeight; // current scroll height

    // max-height : 15 lines of 364px - for Tablet, Desktop
    if (isTablet) {
      textRef.current.style.height = `${textHeight <= 364 ? textRef.current.scrollHeight : 364}px`;
      return;
    }
    // max-height : 5 lines of 124px - for Mobile
    textRef.current.style.height = `${textHeight <= 124 ? textRef.current.scrollHeight : 124}px`;
  }, []);

  // for mobile and tablet, get reComment ID and userName
  // then show reCommentID in textarea

  useEffect(() => {
    if (!textRef.current) return;
    if (parentUserNameForNewReComment) {
      textRef.current.value = `@${parentUserNameForNewReComment} `;
    }
  }, [parentUserNameForNewReComment]);
  const handleSubmit = () => {
    // server request 1 : provide comment to server
    // server request 2 : provide message to server : use variable of isMessage
  };
  return (
    <WriteCommentContainer
      isFixedComment={isFixedComment}
      isMessage={isMessage}
      isReComment={isReComment}
    >
      <WriteTextCntnr>
        <WriteText ref={textRef} onChange={writeComment} placeholder="Write your comment!" />
        <EmojiCntnr size={20}>
          <EmojiIcon />
        </EmojiCntnr>
      </WriteTextCntnr>
      <WriteCommentSubmit onClick={handleSubmit}>작성</WriteCommentSubmit>
    </WriteCommentContainer>
  );
}

function CommentWritten({
  isReComment,
  comment,
  commentIdForScroll,
  parentCommentForNewReComment: { parentForNewReComment, setParentForNewReComment },
  parentCommentToMark: { parentToMark, setParentToMark },
  reCommentsOfRootComment,
  rootCommentSelected,
}: CommentProps) {
  const {
    commentId,
    userName,
    userImg,
    commentContent,
    createDate,
    reCommentNo, // * undefined in reComment

    parentCommentId, // * to mark parent comment when clicking its reComment
    // * undefined in rootComment
    parentCommentUserName,
    // * undefined in rootComment

    firstAncestorCommentId, // * 리코멘트 작성 시 서버에 넘겨주기
    // * how to treat this?
  } = comment;
  // * first ancestor comment id, parent comment id, parent comment user name 필요
  // * first ancestor comment id는 isReComment가 true일 때 원본인 코멘트의 commentId 넣기
  // ㄴ isReComment가 undefined일 때는 first ancestor comment id도 undefined 또는 넘겨주지 않음
  // * reCommentUserName -> parent comment user name

  // reComment one by one : can not set two reComment at once ---------------- //
  //
  // go writing reComment
  const [isWriteReComnt, handleWriteReComnt] = useState(!!reCommentsOfRootComment?.length);
  const dispatch = useAppDispatch();
  const handlePrevReComnt = useAppSelector((state) => state.writing.handlePrevReComnt);

  // clicking "답글", then
  const handleReComment = () => {
    // close the previous component for writing re-comment
    handlePrevReComnt(false);

    // open or close the current component for writing reComment
    handleWriteReComnt(!isWriteReComnt);
    // if you click the same "답글" twice, setState do work once, because of 비동기 logic (maybe yes)
    if (parentForNewReComment.parentCommentId) {
      //   alert(
      //     `작성 중인 답글이 존재해요! 이전 답글을 삭제할까요?
      //      - how do I know that? At least previous comment is empty? when and how do I get the state? do not add this feature? If yes, maybe many things necessary`,
      //   );
    }

    // for mobile & tablet, get userName that will be shown in textarea to write re-comment
    // for all devices, store info and after writing comment, send them to the server
    setParentForNewReComment({ parentCommentId: commentId, parentCommentUserName: userName });
    // get function to close the component to write reComment next time
    dispatch(getClosingReComnt({ handleWriteReComnt }));
  };

  const commentRef = useRef<HTMLDivElement>(null);

  const isParentToMark = parentToMark === commentId;

  // scroll to the parent comment of its reComment when clicking "원댓글보기"
  useEffect(() => {
    if (isParentToMark) {
      commentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
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

  return (
    <CommentContainer
      ref={commentRef}
      isWriteReComnt={isWriteReComnt}
      isReComment={isReComment}
      isParentToMark={isParentToMark}
    >
      <UserImgBox>
        <UserImg userImg={userImg} />
      </UserImgBox>
      <NextToImgContainer>
        <UserNameContainer>
          <UserName>{userName}</UserName>
          <CreateDate>{createDate}</CreateDate>
        </UserNameContainer>
        <CommentContent>
          {isReComment && <ReCommentUser>{`@${parentCommentUserName as string} `}</ReCommentUser>}
          {commentContent}
        </CommentContent>

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
                  }}
                >
                  답글 접기
                </ReCommentMark>
              )}

            {isReComment && (
              <ReCommentMark
                onClick={() => {
                  setParentForNewReComment({
                    parentCommentId: commentId,
                    parentCommentUserName: userName,
                  });
                }}
              >
                답글 쓰기
              </ReCommentMark>
            )}
          </ReCommentMarkContainer>

          {isReComment && parentCommentId && (
            <MarkParentComment onClick={() => setParentToMark(parentCommentId)}>
              원댓글보기
            </MarkParentComment>
          )}
        </ReCommentButtonsContainer>

        {!!reCommentsOfRootComment?.length &&
          reCommentsOfRootComment.map((_) => (
            <CommentWritten
              key={_.commentId}
              isReComment
              comment={{ ..._, firstAncestorCommentId: commentId }}
              commentIdForScroll={commentIdForScroll}
              parentCommentForNewReComment={{ parentForNewReComment, setParentForNewReComment }}
              parentCommentToMark={{ parentToMark, setParentToMark }}
            />
          ))}

        {/* write reComment */}
        {isPC && rootCommentSelected?.rootCommentIdToShowReComments === commentId && (
          <WriteComment
            isReComment={isReComment}
            parentUserNameForNewReComment={parentForNewReComment.parentCommentUserName}
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
export function CommentList({
  commentList,
  commentIdForScroll,
  commentSort,
  set1ofCommentPageNo,
  reComments,
  rootCommentSelected,
}: CommentListProps) {
  // when write-comment component is fixed to screen bottom, give comment-list-component margin-bottom

  const [parentForNewReComment, setParentForNewReComment] = useState({
    parentCommentId: "",
    parentCommentUserName: "",
  }); // parent comment of new reComment to write

  const [parentToMark, setParentToMark] = useState(""); // parent comment of selected reComment

  return (
    <CommentListContainer isFixedComment={isFixedComment}>
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
                    set1ofCommentPageNo();
                  }
                }}
              >
                {_}
              </CommentSort>
            );
          })}
        </CommentSortContainer>
      </CommentMarkContainer>
      {commentList.map((_) => (
        <CommentWritten
          key={_.commentId}
          comment={_}
          commentIdForScroll={commentIdForScroll}
          parentCommentForNewReComment={{ parentForNewReComment, setParentForNewReComment }}
          parentCommentToMark={{ parentToMark, setParentToMark }}
          reCommentsOfRootComment={
            rootCommentSelected.rootCommentIdToShowReComments === _.commentId
              ? reComments[_.commentId]
              : undefined
          }
          rootCommentSelected={rootCommentSelected}
        />
      ))}
    </CommentListContainer>
  );
}
