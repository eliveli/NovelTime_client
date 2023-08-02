import { useRef, useState, useEffect } from "react";
import { useComponentWidth, useWhetherItIsMobile, writeText } from "utils";
import { useAddReCommentMutation, useAddRootCommentMutation } from "store/serverAPIs/novelTime";
import { useAppSelector } from "../../store/hooks";
import {
  EmojiCntnr,
  EmojiIcon,
  CommentInputContainerOnTablet,
  CommentInputContainerOnMobile,
  WriteCommentSubmit,
  WriteText,
  WriteTextCntnr,
  SpaceForUserNameOnTextArea,
} from "./CommentList.styles";

export function ReCommentInputOnTablet({
  parentForNewReComment,

  talkId,
  novelTitle,
}: {
  parentForNewReComment: {
    parentCommentId: string;
    parentCommentUserName: string;
  };

  talkId: string;
  novelTitle: string;
}) {
  const [addReComment, addReCommentResult] = useAddReCommentMutation();

  const loginUserId = useAppSelector((state) => state.user.loginUserInfo.userId);

  const textRef = useRef<HTMLTextAreaElement>(null);

  const isTablet = !useWhetherItIsMobile();

  const userNameOnTextAreaRef = useRef<HTMLSpanElement>(null);
  const userNameWidth = useComponentWidth(userNameOnTextAreaRef);

  const handleSubmit = async () => {
    if (!loginUserId) {
      alert("먼저 로그인을 해 주세요");
      return;
    }

    if (!textRef.current?.value) return; // when comment content is empty

    if (addReCommentResult.isLoading) return; // prevent click while loading for prev request

    await addReComment({
      talkId,
      novelTitle,
      commentContent: textRef.current?.value,
      parentCommentId: parentForNewReComment.parentCommentId,
    });

    // and update reComments automatically with the invalidate and provide tags

    if (addReCommentResult.isError) {
      alert("코멘트를 추가할 수 없습니다. 새로고침 후 다시 시도해 보세요");
      return;
    }

    // initialize comment input
    textRef.current.value = "";
    textRef.current.style.height = "28px";
  };

  const writeCommentRef = useRef<HTMLDivElement>(null);

  // for tablet or pc when reComment input is located under the root comment

  // after clicking the "답글 쓰기" for writing a reComment,
  // scroll to the reComment input that is located under the reComments or just under the parent comment
  useEffect(() => {
    writeCommentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [parentForNewReComment.parentCommentUserName]);

  return (
    <CommentInputContainerOnTablet ref={writeCommentRef}>
      <WriteTextCntnr>
        <SpaceForUserNameOnTextArea ref={userNameOnTextAreaRef}>
          {`@${parentForNewReComment.parentCommentUserName}`}
        </SpaceForUserNameOnTextArea>

        <WriteText
          ref={textRef}
          onChange={(e) => writeText(e, textRef, isTablet)}
          spaceForUserName={userNameWidth}
        />
        <EmojiCntnr size={20}>
          <EmojiIcon />
        </EmojiCntnr>
      </WriteTextCntnr>

      <WriteCommentSubmit onClick={handleSubmit}>작성</WriteCommentSubmit>
    </CommentInputContainerOnTablet>
  );
}

export function RootCommentInputOnTablet({
  talkId,
  novelTitle,

  getAllRootCommentPages,
}: {
  talkId: string;
  novelTitle: string;
  getAllRootCommentPages: () => void;
}) {
  const [addRootComment, addRootCommentResult] = useAddRootCommentMutation();

  const loginUserId = useAppSelector((state) => state.user.loginUserInfo.userId);

  const textRef = useRef<HTMLTextAreaElement>(null);

  const isTablet = !useWhetherItIsMobile();

  const handleSubmit = async () => {
    // server request 1 : provide comment to server

    if (!loginUserId) {
      alert("먼저 로그인을 해 주세요");
      return;
    }

    if (!textRef.current?.value) return; // when comment content is empty

    if (addRootCommentResult.isLoading) return; // prevent click while loading for prev request
    await addRootComment({ talkId, novelTitle, commentContent: textRef.current?.value });

    if (addRootCommentResult.isError) {
      alert("코멘트를 추가할 수 없습니다. 새로고침 후 다시 시도해 보세요");
      return;
    }

    // initialize comment input
    textRef.current.value = "";
    textRef.current.style.height = "28px";

    getAllRootCommentPages();
  };

  const writeCommentRef = useRef<HTMLDivElement>(null);

  return (
    <CommentInputContainerOnTablet ref={writeCommentRef}>
      <WriteTextCntnr>
        <WriteText
          ref={textRef}
          onChange={(e) => writeText(e, textRef, isTablet)}
          placeholder="Write your comment!"
        />
        <EmojiCntnr size={20}>
          <EmojiIcon />
        </EmojiCntnr>
      </WriteTextCntnr>

      <WriteCommentSubmit onClick={handleSubmit}>작성</WriteCommentSubmit>
    </CommentInputContainerOnTablet>
  );
}

// this is used for both root comment and reComment input
export function CommentInputOnMobile({
  parentForNewReComment,

  talkId,
  novelTitle,

  getAllRootCommentPages,
}: {
  parentForNewReComment: {
    parentCommentId: string;
    parentCommentUserName: string;
  };
  talkId: string;
  novelTitle: string;
  getAllRootCommentPages: () => void;
}) {
  const isRootCommentInput = !parentForNewReComment.parentCommentId;
  const [addReComment, addReCommentResult] = useAddReCommentMutation();

  const [addRootComment, addRootCommentResult] = useAddRootCommentMutation();

  const loginUserId = useAppSelector((state) => state.user.loginUserInfo.userId);

  const textRef = useRef<HTMLTextAreaElement>(null);

  const isTablet = !useWhetherItIsMobile();
  const userNameOnTextAreaRef = useRef<HTMLSpanElement>(null);
  const userNameWidth = useComponentWidth(userNameOnTextAreaRef, isRootCommentInput);

  const textToEdit = useAppSelector((state) => state.comment.textToEdit);

  const handleSubmit = async () => {
    // provide a rootComment or reComment to server
    if (!loginUserId) {
      alert("먼저 로그인을 해 주세요");
      return;
    }

    if (!textRef.current?.value) return; // when comment content is empty

    if (isRootCommentInput) {
      if (addRootCommentResult.isLoading) return; // prevent click while loading for prev request
      await addRootComment({ talkId, novelTitle, commentContent: textRef.current?.value });

      if (addRootCommentResult.isError) {
        alert("코멘트를 추가할 수 없습니다. 새로고침 후 다시 시도해 보세요");
        return;
      }

      getAllRootCommentPages();
    } else {
      if (addReCommentResult.isLoading) return; // prevent click while loading for prev request

      await addReComment({
        talkId,
        novelTitle,
        commentContent: textRef.current?.value,
        parentCommentId: parentForNewReComment.parentCommentId,
      });
      // and update reComments automatically with the invalidate and provide tags

      if (addReCommentResult.isError) {
        alert("코멘트를 추가할 수 없습니다. 새로고침 후 다시 시도해 보세요");
        return;
      }
    }

    // initialize comment input
    textRef.current.value = "";
    textRef.current.style.height = "28px";
  };

  const writeCommentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    textRef.current.style.height = "28px"; // Default: height of 1 line

    // initialize when finishing or canceling editing comment //
    if (textToEdit === "") {
      textRef.current.value = "";
      return;
    }

    // reset to fit in the comment to edit //

    textRef.current.value = textToEdit;

    const textHeight = textRef.current.scrollHeight; // current scroll height
    // max-height : 15 lines of 364px - for Tablet, Desktop
    if (isTablet) {
      textRef.current.style.height = `${textHeight <= 364 ? textRef.current.scrollHeight : 364}px`;
      return;
    }
    // max-height : 5 lines of 124px - for Mobile
    textRef.current.style.height = `${textHeight <= 124 ? textRef.current.scrollHeight : 124}px`;
  }, [textToEdit]);
  return (
    <CommentInputContainerOnMobile ref={writeCommentRef} isRootCommentInput={isRootCommentInput}>
      <WriteTextCntnr>
        {isRootCommentInput ? (
          <WriteText
            ref={textRef}
            onChange={(e) => writeText(e, textRef, isTablet)}
            placeholder="Write your comment!"
          />
        ) : (
          <>
            <SpaceForUserNameOnTextArea ref={userNameOnTextAreaRef}>
              {`@${parentForNewReComment.parentCommentUserName}`}
            </SpaceForUserNameOnTextArea>
            <WriteText
              ref={textRef}
              onChange={(e) => writeText(e, textRef, isTablet)}
              spaceForUserName={userNameWidth}
            />
          </>
        )}
        <EmojiCntnr size={20}>
          <EmojiIcon />
        </EmojiCntnr>
      </WriteTextCntnr>

      <WriteCommentSubmit onClick={handleSubmit}>작성</WriteCommentSubmit>
    </CommentInputContainerOnMobile>
  );
}
