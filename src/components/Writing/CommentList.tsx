import Icon from "assets/Icon";
import { useRef, useState, useCallback, useEffect } from "react";
import { useComponentWidth } from "utils";
import { useAddRootCommentMutation } from "store/serverAPIs/novelTime";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
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
  MarkParentAndChildComment,
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
  SpaceForUserNameOnTextArea,
} from "./CommentList.styles";

const htmlWidth = document.documentElement.offsetWidth;
const isTablet = htmlWidth >= 768;
const isPC = htmlWidth >= 1024;

export function WriteComment({
  isReComment,
  parentUserNameForNewReComment,
  talkId,
  novelTitle,

  isMessage, // for message page. not for comment
}: {
  isReComment?: true;
  parentUserNameForNewReComment?: string;
  talkId?: string;
  novelTitle?: string;

  isMessage?: true;
}) {
  const [addRootComment, addRootCommentResult] = useAddRootCommentMutation();

  const loginUserId = useAppSelector((state) => state.user.loginUserInfo.userId);

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

  const userNameOnTextAreaRef = useRef<HTMLSpanElement>(null);
  const userNameWidth = useComponentWidth(userNameOnTextAreaRef);

  // for mobile and tablet, get reComment ID and userName
  // then show reCommentID in textarea

  const handleSubmit = async () => {
    // server request 1 : provide comment to server

    if (!isMessage) {
      if (!loginUserId) {
        alert("먼저 로그인을 해 주세요");
        return;
      }

      if (!talkId || !novelTitle) {
        alert("코멘트를 추가할 수 없습니다");
        return;
      }

      if (!textRef.current?.value) return; // when comment content is empty

      if (addRootCommentResult.isLoading) return; // prevent click while loading for prev request

      await addRootComment({ talkId, novelTitle, commentContent: textRef.current?.value });

      if (addRootCommentResult.isError) {
        alert("코멘트를 추가할 수 없습니다");
      }

      // return; // * uncomment when working on message below
    }
    // server request 2 : provide message to server : use variable of isMessage
  };

  const writeCommentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentUserNameForNewReComment) {
      writeCommentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  return (
    <WriteCommentContainer ref={writeCommentRef} isMessage={isMessage} isReComment={isReComment}>
      <WriteTextCntnr>
        {parentUserNameForNewReComment && (
          <SpaceForUserNameOnTextArea ref={userNameOnTextAreaRef}>
            {`@${parentUserNameForNewReComment}`}
          </SpaceForUserNameOnTextArea>
        )}
        <WriteText
          ref={textRef}
          onChange={writeComment}
          placeholder="Write your comment!"
          spaceForUserName={userNameWidth}
        />
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

  parentAndChildCommentToMark: { parentAndChildToMark, setParentAndChildToMark },

  reCommentsOfRootComment,
  rootCommentSelected,

  talkId,
  novelTitle,
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

  const commentRef = useRef<HTMLDivElement>(null);
  const commentContentRef = useRef<HTMLParagraphElement>(null);

  const isParentToMark = parentAndChildToMark.parent === commentId;

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

  return (
    <CommentContainer ref={commentRef} isReComment={isReComment}>
      <UserImgBox>
        <UserImg userImg={userImg} />
      </UserImgBox>
      <NextToImgContainer>
        <UserNameContainer>
          <UserName isParentToWriteReComment={commentId === parentForNewReComment.parentCommentId}>
            {userName}
          </UserName>
          <CreateDate>{createDate}</CreateDate>
        </UserNameContainer>
        <CommentContent ref={commentContentRef} isParentToMark={isParentToMark}>
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

            {isReComment && (
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
            )}
          </ReCommentMarkContainer>

          {isReComment && parentCommentId && (
            <MarkParentAndChildComment
              childComment={parentAndChildToMark.child}
              currentComment={commentId}
              onClick={() => setParentAndChildToMark({ parent: parentCommentId, child: commentId })}
            >
              원댓글보기
            </MarkParentAndChildComment>
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
              parentAndChildCommentToMark={{ parentAndChildToMark, setParentAndChildToMark }}
              talkId={talkId}
              novelTitle={novelTitle}
            />
          ))}

        {/* write reComment */}
        {isPC && rootCommentSelected?.rootCommentIdToShowReComments === commentId && (
          <WriteComment
            isReComment={isReComment}
            parentUserNameForNewReComment={parentForNewReComment.parentCommentUserName}
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
export function CommentList({
  commentList,
  commentIdForScroll,
  commentSort,
  set1ofCommentPageNo,
  reComments,
  rootCommentSelected,

  talkId,
  novelTitle,
}: CommentListProps) {
  // when write-comment component is fixed to screen bottom, give comment-list-component margin-bottom

  const [parentForNewReComment, setParentForNewReComment] = useState({
    parentCommentId: "",
    parentCommentUserName: "",
  }); // parent comment of new reComment to write

  const [parentAndChildToMark, setParentAndChildToMark] = useState({ parent: "", child: "" }); // parent comment of selected reComment

  // not to color parent user name after adding a new root comment and updating comments
  useEffect(() => {
    if (!rootCommentSelected.rootCommentIdToShowReComments) {
      setParentForNewReComment({ parentCommentId: "", parentCommentUserName: "" });
    }
  }, [rootCommentSelected.rootCommentIdToShowReComments]);

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
          parentAndChildCommentToMark={{ parentAndChildToMark, setParentAndChildToMark }}
          reCommentsOfRootComment={
            rootCommentSelected.rootCommentIdToShowReComments === _.commentId
              ? reComments
              : undefined
          }
          rootCommentSelected={rootCommentSelected}
          talkId={talkId}
          novelTitle={novelTitle}
        />
      ))}
    </CommentListContainer>
  );
}
