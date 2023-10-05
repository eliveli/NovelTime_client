import { useRef } from "react";
import { useComponentWidth, useWhetherItIsMobile, writeText } from "utils";
import { useAppSelector } from "../../store/hooks";
import {
  EmojiCntnr,
  EmojiIcon,
  BtnToSubmit,
  InputForMessage,
  MessageInputBox,
  WholeContainer,
} from "./ChatRoom.styles";

// eslint-disable-next-line import/prefer-default-export
export function MessageInput({ sendMessage }: { sendMessage: (content: string) => void }) {
  const loginUserId = useAppSelector((state) => state.loginUser.user.userId);

  const textRef = useRef<HTMLTextAreaElement>(null);

  const isNotMobile = !useWhetherItIsMobile();

  const userNameOnTextAreaRef = useRef<HTMLSpanElement>(null);
  const userNameWidth = useComponentWidth(userNameOnTextAreaRef);

  const handleSubmit = async () => {
    if (!loginUserId) {
      alert("먼저 로그인을 해 주세요");
      return;
    }

    if (!textRef.current?.value) return; // when text is empty

    sendMessage(textRef.current.value);

    // initialize text input
    textRef.current.value = "";
    textRef.current.style.height = "28px";
  };

  const writeCommentRef = useRef<HTMLDivElement>(null);
  return (
    <WholeContainer ref={writeCommentRef}>
      <MessageInputBox>
        <InputForMessage
          ref={textRef}
          onChange={(e) => writeText(e, textRef, isNotMobile)}
          placeholder="Write your text!"
          spaceForUserName={userNameWidth}
        />
        <EmojiCntnr size={20}>
          <EmojiIcon />
        </EmojiCntnr>
      </MessageInputBox>

      <BtnToSubmit onClick={handleSubmit}>작성</BtnToSubmit>
    </WholeContainer>
  );
}
