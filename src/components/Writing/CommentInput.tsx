import { useRef, useEffect } from "react";
import { useComponentWidth, useWhetherItIsMobile, writeText } from "utils";
import {
  useAddReCommentMutation,
  useAddRootCommentMutation,
  useEditCommentMutation,
} from "store/serverAPIs/novelTime";
import { setCommentToEdit } from "store/clientSlices/commentSlice";
import { handleAlert, openFirstModal } from "store/clientSlices/modalSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  EmojiCntnr,
  EmojiIcon,
  CommentInputContainerOnTablet,
  CommentInputContainerOnMobile,
  WriteCommentSubmit,
  WriteText,
  WriteTextCntnr,
  SpaceForUserName,
} from "./CommentList.styles";

export function ReCommentInputToCreateOnTablet() {
  const { talkId, novelId, novelTitle } = useAppSelector((state) => state.comment.argsForApis);
  const { parentCommentId, parentCommentUserName } = useAppSelector(
    (state) => state.comment.parentToWriteReComment,
  );

  const [addReComment, addReCommentResult] = useAddReCommentMutation();

  const loginUserId = useAppSelector((state) => state.loginUser.user.userId);

  const textRef = useRef<HTMLTextAreaElement>(null);

  const isNotMobile = !useWhetherItIsMobile();

  const userNameNextToTextArea = useRef<HTMLSpanElement>(null);
  const userNameWidth = useComponentWidth(userNameNextToTextArea, parentCommentId);

  const dispatch = useAppDispatch();

  const handleSubmitToCreate = () => {
    if (!loginUserId) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "먼저 로그인을 해 주세요" }));
      return;
    }

    if (!textRef.current?.value) return; // when comment content is empty

    if (addReCommentResult.isLoading) return; // prevent click while loading for prev request

    if (textRef.current.value.length > 1000) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "1000자까지 입력할 수 있어요" }));
      return;
    }

    addReComment({
      talkId,
      novelId,
      novelTitle,
      commentContent: textRef.current?.value,
      parentCommentId,
    })
      .then(() => {
        // and update reComments automatically with the invalidate and provide tags

        // initialize comment input
        if (!textRef.current) return;
        textRef.current.value = "";
        textRef.current.style.height = "28px";
      })
      .catch(() => {
        dispatch(openFirstModal("alert"));
        dispatch(
          handleAlert({ text: `코멘트를 추가할 수 없습니다.\n새로고침 후 다시 시도해 보세요` }),
        );
      });
  };

  const commentInputRef = useRef<HTMLDivElement>(null);

  // for tablet or pc when reComment input is located under the root comment

  // after clicking the "답글 쓰기" for writing a reComment,
  // scroll to the reComment input that is in the bottom of the reComments section
  useEffect(() => {
    commentInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [parentCommentUserName]);

  return (
    <CommentInputContainerOnTablet ref={commentInputRef}>
      <WriteTextCntnr>
        {parentCommentUserName && (
          <SpaceForUserName ref={userNameNextToTextArea}>
            {`@${parentCommentUserName}`}
          </SpaceForUserName>
        )}

        <WriteText
          ref={textRef}
          onChange={(e) => writeText(e, textRef, isNotMobile)}
          spaceForUserName={userNameWidth}
          placeholder={parentCommentUserName ? "" : "삭제된 댓글입니다"}
          disabled={!parentCommentUserName}
        />
        {/*
         <EmojiCntnr size={20}>
          <EmojiIcon />
         </EmojiCntnr>
        */}
      </WriteTextCntnr>

      <WriteCommentSubmit onClick={handleSubmitToCreate}>작성</WriteCommentSubmit>
    </CommentInputContainerOnTablet>
  );
}

export function ReCommentInputToEditOnTablet() {
  const [editComment, editCommentResult] = useEditCommentMutation();

  const loginUserId = useAppSelector((state) => state.loginUser.user.userId);

  const textRef = useRef<HTMLTextAreaElement>(null);

  const isNotMobile = !useWhetherItIsMobile();

  const userNameNextToTextArea = useRef<HTMLSpanElement>(null);
  const userNameWidth = useComponentWidth(userNameNextToTextArea);

  const commentToEdit = useAppSelector((state) => state.comment.commentToEdit);
  const textToEdit = commentToEdit.commentContent;

  const dispatch = useAppDispatch();

  const handleSubmitToEdit = () => {
    // provide a reComment to server
    if (!loginUserId) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "먼저 로그인을 해 주세요" }));
      return;
    }

    if (!textRef.current?.value) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "내용을 입력해 주세요" }));
      return; // when comment content is empty
    }

    if (editCommentResult.isLoading) return; // prevent click while loading for prev request

    if (textRef.current.value.length > 1000) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "1000자까지 입력할 수 있어요" }));
      return;
    }

    editComment({
      commentId: commentToEdit.commentId,
      commentContent: textRef.current?.value,
    })
      .then(() => {
        // comments will be updated automatically with the invalidate and provide tags

        // initialize states for editing comment
        dispatch(setCommentToEdit({ commentId: "", commentContent: "", parentUserName: "" }));
      })
      .catch(() => {
        dispatch(openFirstModal("alert"));
        dispatch(
          handleAlert({ text: `코멘트를 수정할 수 없습니다.\n새로고침 후 다시 시도해 보세요` }),
        );
      });
  };

  const commentInputRef = useRef<HTMLDivElement>(null);

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
    textRef.current.style.height = `${textHeight <= 364 ? textRef.current.scrollHeight : 364}px`;
  }, [textToEdit]);

  return (
    <CommentInputContainerOnTablet ref={commentInputRef}>
      <WriteTextCntnr>
        <SpaceForUserName ref={userNameNextToTextArea}>
          {`@${commentToEdit.parentUserName}`}
        </SpaceForUserName>

        <WriteText
          ref={textRef}
          onChange={(e) => writeText(e, textRef, isNotMobile)}
          spaceForUserName={userNameWidth}
        />
        {/*
        <EmojiCntnr size={20}>
          <EmojiIcon />
        </EmojiCntnr>
        */}
      </WriteTextCntnr>

      <WriteCommentSubmit onClick={handleSubmitToEdit}>수정</WriteCommentSubmit>
    </CommentInputContainerOnTablet>
  );
}

export function RootCommentInputToCreateOnTablet({
  getAllRootCommentPages,
}: {
  getAllRootCommentPages: () => void;
}) {
  const isNotMobile = !useWhetherItIsMobile();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const loginUserId = useAppSelector((state) => state.loginUser.user.userId);
  const { talkId, novelId, novelTitle } = useAppSelector((state) => state.comment.argsForApis);

  const [addRootComment, addRootCommentResult] = useAddRootCommentMutation();

  const dispatch = useAppDispatch();

  const handleSubmitToCreate = () => {
    if (!loginUserId) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "먼저 로그인을 해 주세요" }));
      return;
    }

    if (!textRef.current?.value) return; // when comment content is empty

    if (addRootCommentResult.isLoading) return; // prevent click while loading for prev request

    if (textRef.current.value.length > 1000) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "1000자까지 입력할 수 있어요" }));
      return;
    }

    addRootComment({
      talkId,
      novelId,
      novelTitle,
      commentContent: textRef.current?.value,
    })
      .then(() => {
        // initialize comment input
        if (!textRef.current) return;
        textRef.current.value = "";
        textRef.current.style.height = "28px";

        getAllRootCommentPages();
      })
      .catch(() => {
        dispatch(openFirstModal("alert"));
        dispatch(
          handleAlert({ text: `코멘트를 추가할 수 없습니다.\n새로고침 후 다시 시도해 보세요` }),
        );
      });
  };

  const commentInputRef = useRef<HTMLDivElement>(null);

  return (
    <CommentInputContainerOnTablet ref={commentInputRef}>
      <WriteTextCntnr>
        <WriteText
          ref={textRef}
          onChange={(e) => writeText(e, textRef, isNotMobile)}
          placeholder="Write your comment!"
        />
        {/*
        <EmojiCntnr size={20}>
          <EmojiIcon />
        </EmojiCntnr>
        */}
      </WriteTextCntnr>

      <WriteCommentSubmit onClick={handleSubmitToCreate}>작성</WriteCommentSubmit>
    </CommentInputContainerOnTablet>
  );
}

export function RootCommentInputToEditOnTablet({
  getAllRootCommentPages,
}: {
  getAllRootCommentPages: () => void;
}) {
  const [editComment, editCommentResult] = useEditCommentMutation();

  const loginUserId = useAppSelector((state) => state.loginUser.user.userId);

  const textRef = useRef<HTMLTextAreaElement>(null);

  const isNotMobile = !useWhetherItIsMobile();

  const commentToEdit = useAppSelector((state) => state.comment.commentToEdit);
  const textToEdit = commentToEdit.commentContent;

  const dispatch = useAppDispatch();

  const handleSubmitToEdit = () => {
    if (!loginUserId) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "먼저 로그인을 해 주세요" }));
      return;
    }

    if (!textRef.current?.value) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "내용을 입력해 주세요" }));
      return; // when comment content is empty
    }

    if (editCommentResult.isLoading) return; // prevent click while loading for prev request

    if (textRef.current.value.length > 1000) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "1000자까지 입력할 수 있어요" }));
      return;
    }

    editComment({
      commentId: commentToEdit.commentId,
      commentContent: textRef.current?.value,
    })
      .then(() => {
        // initialize comment input
        if (!textRef.current) return;
        textRef.current.value = "";
        textRef.current.style.height = "28px";

        getAllRootCommentPages();

        // initialize states for editing comment
        dispatch(setCommentToEdit({ commentId: "", commentContent: "", parentUserName: "" }));
      })
      .catch(() => {
        dispatch(openFirstModal("alert"));
        dispatch(
          handleAlert({ text: `코멘트를 수정할 수 없습니다.\n새로고침 후 다시 시도해 보세요` }),
        );
      });
  };

  const commentInputRef = useRef<HTMLDivElement>(null);

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
    textRef.current.style.height = `${textHeight <= 364 ? textRef.current.scrollHeight : 364}px`;
  }, [textToEdit]);

  return (
    <CommentInputContainerOnTablet ref={commentInputRef}>
      <WriteTextCntnr>
        <WriteText
          ref={textRef}
          onChange={(e) => writeText(e, textRef, isNotMobile)}
          placeholder="Write your comment!"
        />

        {/*
          <EmojiCntnr size={20}>
            <EmojiIcon />
          </EmojiCntnr>
         */}
      </WriteTextCntnr>

      <WriteCommentSubmit onClick={handleSubmitToEdit}>수정</WriteCommentSubmit>
    </CommentInputContainerOnTablet>
  );
}

// this is used for both root comment and reComment input
export function CommentInputOnMobile({
  getAllRootCommentPages,
}: {
  getAllRootCommentPages: () => void;
}) {
  const { talkId, novelId, novelTitle } = useAppSelector((state) => state.comment.argsForApis);
  const parentToWriteReComment = useAppSelector((state) => state.comment.parentToWriteReComment);
  const loginUserId = useAppSelector((state) => state.loginUser.user.userId);
  const [addReComment, addReCommentResult] = useAddReCommentMutation();
  const [addRootComment, addRootCommentResult] = useAddRootCommentMutation();
  const [editComment, editCommentResult] = useEditCommentMutation();

  const isNotMobile = !useWhetherItIsMobile();
  const isRootCommentInput = !parentToWriteReComment.parentCommentId;

  const commentToEdit = useAppSelector((state) => state.comment.commentToEdit);
  const textToEdit = commentToEdit.commentContent;

  const textRef = useRef<HTMLTextAreaElement>(null);
  const userNameNextToTextArea = useRef<HTMLSpanElement>(null);
  const userNameWidth = useComponentWidth(
    userNameNextToTextArea,
    parentToWriteReComment.parentCommentId,
    commentToEdit.commentId,
  );

  const dispatch = useAppDispatch();

  const handleSubmitToCreate = () => {
    // provide a rootComment or reComment to server
    if (!loginUserId) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "먼저 로그인을 해 주세요" }));
      return;
    }

    if (!textRef.current?.value) return; // when comment content is empty

    if (textRef.current.value.length > 1000) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "1000자까지 입력할 수 있어요" }));
      return;
    }

    if (isRootCommentInput) {
      if (addRootCommentResult.isLoading) return; // prevent click while loading for prev request

      addRootComment({
        talkId,
        novelId,
        novelTitle,
        commentContent: textRef.current?.value,
      })
        .then(() => {
          // initialize comment input
          if (!textRef.current) return;
          textRef.current.value = "";
          textRef.current.style.height = "28px";

          getAllRootCommentPages();
        })
        .catch(() => {
          dispatch(openFirstModal("alert"));
          dispatch(
            handleAlert({ text: `코멘트를 추가할 수 없습니다.\n새로고침 후 다시 시도해 보세요` }),
          );
        });
      //
    } else {
      if (addReCommentResult.isLoading) return; // prevent click while loading for prev request

      addReComment({
        talkId,
        novelId,
        novelTitle,
        commentContent: textRef.current?.value,
        parentCommentId: parentToWriteReComment.parentCommentId,
      })
        .then(() => {
          // and update reComments automatically with the invalidate and provide tags

          // initialize comment input
          if (!textRef.current) return;
          textRef.current.value = "";
          textRef.current.style.height = "28px";
        })
        .catch(() => {
          dispatch(openFirstModal("alert"));
          dispatch(
            handleAlert({ text: `코멘트를 추가할 수 없습니다.\n새로고침 후 다시 시도해 보세요` }),
          );
        });
    }
  };

  const handleSubmitToEdit = () => {
    // provide a rootComment or reComment to server
    if (!loginUserId) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "먼저 로그인을 해 주세요" }));
      return;
    }

    if (!textRef.current?.value) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "내용을 입력해 주세요" }));
      return; // when comment content is empty
    }

    if (editCommentResult.isLoading) return; // prevent click while loading for prev request

    if (textRef.current.value.length > 1000) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "1000자까지 입력할 수 있어요" }));
      return;
    }

    editComment({
      commentId: commentToEdit.commentId,
      commentContent: textRef.current?.value,
    })
      .then(() => {
        // comments will be updated depending on whether it is root comment or reComment //
        //  when it is root comment
        if (!commentToEdit.parentUserName) {
          getAllRootCommentPages();
        }
        //  when it is reComment,
        //  the list will be updated automatically with the invalidate and provide tags

        // initialize states for editing comment
        dispatch(setCommentToEdit({ commentId: "", commentContent: "", parentUserName: "" }));
      })
      .catch(() => {
        dispatch(openFirstModal("alert"));
        dispatch(
          handleAlert({ text: `코멘트를 수정할 수 없습니다.\n새로고침 후 다시 시도해 보세요` }),
        );
      });
  };

  const commentInputRef = useRef<HTMLDivElement>(null);

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
    if (isNotMobile) {
      textRef.current.style.height = `${textHeight <= 364 ? textRef.current.scrollHeight : 364}px`;
      return;
    }
    // max-height : 5 lines of 124px - for Mobile
    textRef.current.style.height = `${textHeight <= 124 ? textRef.current.scrollHeight : 124}px`;
  }, [textToEdit]);

  return (
    <CommentInputContainerOnMobile ref={commentInputRef} isRootCommentInput={isRootCommentInput}>
      <WriteTextCntnr>
        {isRootCommentInput ? (
          <WriteText
            ref={textRef}
            onChange={(e) => writeText(e, textRef, isNotMobile)}
            placeholder="Write your comment!"
          />
        ) : (
          <>
            <SpaceForUserName ref={userNameNextToTextArea}>
              {`@${commentToEdit.parentUserName || parentToWriteReComment.parentCommentUserName}`}
            </SpaceForUserName>
            <WriteText
              ref={textRef}
              onChange={(e) => writeText(e, textRef, isNotMobile)}
              spaceForUserName={userNameWidth}
            />
          </>
        )}
        {/*
        <EmojiCntnr size={20}>
          <EmojiIcon />
        </EmojiCntnr>
        */}
      </WriteTextCntnr>

      <WriteCommentSubmit onClick={textToEdit ? handleSubmitToEdit : handleSubmitToCreate}>
        {textToEdit ? "수정" : "작성"}
      </WriteCommentSubmit>
    </CommentInputContainerOnMobile>
  );
}
