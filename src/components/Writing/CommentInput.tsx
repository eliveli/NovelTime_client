import { useRef, useState, useEffect } from "react";
import { useComponentWidth, useWhetherItIsMobile, writeText } from "utils";
import { useAddRootCommentMutation } from "store/serverAPIs/novelTime";
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
  const [addRootComment, addRootCommentResult] = useAddRootCommentMutation();

  const loginUserId = useAppSelector((state) => state.user.loginUserInfo.userId);

  const textRef = useRef<HTMLTextAreaElement>(null);

  const [comment, setComment] = useState("");
  const isTablet = !useWhetherItIsMobile();

  const userNameOnTextAreaRef = useRef<HTMLSpanElement>(null);
  const userNameWidth = useComponentWidth(userNameOnTextAreaRef);

  // for mobile and tablet, get reComment ID and userName
  // then show reCommentID in textarea

  const handleSubmit = async () => {
    if (!loginUserId) {
      alert("먼저 로그인을 해 주세요");
      return;
    }

    if (!textRef.current?.value) return; // when comment content is empty

    if (addRootCommentResult.isLoading) return; // prevent click while loading for prev request

    // * this will be changed for reComment
    await addRootComment({ talkId, novelTitle, commentContent: textRef.current?.value });

    if (addRootCommentResult.isError) {
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
          onChange={(e) => writeText(e, textRef, setComment, isTablet)}
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

  getAllCommentPages,
}: {
  talkId: string;
  novelTitle: string;
  getAllCommentPages: () => void;
}) {
  const [addRootComment, addRootCommentResult] = useAddRootCommentMutation();

  const loginUserId = useAppSelector((state) => state.user.loginUserInfo.userId);

  const textRef = useRef<HTMLTextAreaElement>(null);

  const [comment, setComment] = useState("");
  const isTablet = !useWhetherItIsMobile();
  const userNameOnTextAreaRef = useRef<HTMLSpanElement>(null);
  const userNameWidth = useComponentWidth(userNameOnTextAreaRef);

  // for mobile and tablet, get reComment ID and userName
  // then show reCommentID in textarea

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

    getAllCommentPages();
  };

  const writeCommentRef = useRef<HTMLDivElement>(null);

  return (
    <CommentInputContainerOnTablet ref={writeCommentRef}>
      <WriteTextCntnr>
        <WriteText
          ref={textRef}
          onChange={(e) => writeText(e, textRef, setComment, isTablet)}
          placeholder="Write your comment!"
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

// this is used for both root comment and reComment input
export function CommentInputOnMobile({
  parentForNewReComment,

  talkId,
  novelTitle,

  getAllCommentPages, // it exists when this is a root comment input
}: {
  parentForNewReComment: {
    parentCommentId: string;
    parentCommentUserName: string;
  };
  talkId: string;
  novelTitle: string;
  getAllCommentPages?: () => void;
}) {
  const isRootCommentInput = !parentForNewReComment.parentCommentId;

  const [addRootComment, addRootCommentResult] = useAddRootCommentMutation();

  const loginUserId = useAppSelector((state) => state.user.loginUserInfo.userId);

  const textRef = useRef<HTMLTextAreaElement>(null);

  const [comment, setComment] = useState("");
  const isTablet = !useWhetherItIsMobile();
  const userNameOnTextAreaRef = useRef<HTMLSpanElement>(null);
  const userNameWidth = useComponentWidth(userNameOnTextAreaRef);

  // for mobile and tablet, get reComment ID and userName
  // then show reCommentID in textarea

  const handleSubmit = async () => {
    // server request 1 : provide a root comment to server

    // when it is used as a root comment input
    if (getAllCommentPages) {
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

      getAllCommentPages();
    }
  };

  const writeCommentRef = useRef<HTMLDivElement>(null);

  return (
    <CommentInputContainerOnMobile ref={writeCommentRef} isRootCommentInput={isRootCommentInput}>
      <WriteTextCntnr>
        {isRootCommentInput ? (
          <WriteText
            ref={textRef}
            onChange={(e) => writeText(e, textRef, setComment, isTablet)}
            placeholder="Write your comment!"
            spaceForUserName={userNameWidth}
          />
        ) : (
          <>
            <SpaceForUserNameOnTextArea ref={userNameOnTextAreaRef}>
              {`@${parentForNewReComment.parentCommentUserName}`}
            </SpaceForUserNameOnTextArea>
            <WriteText
              ref={textRef}
              onChange={(e) => writeText(e, textRef, setComment, isTablet)}
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
