import { useRef } from "react";
import { useComponentWidth, useWhetherItIsMobile, writeText } from "utils";
import { useAppSelector } from "../../store/hooks";
import {
  EmojiCntnr,
  EmojiIcon,
  BtnToSubmit,
  InputForMessage,
  MessageInputBox,
  MsgInputWholeContainer,
  NewMsgPreviewContainer,
  NewMsgContent,
} from "./ChatRoom.styles";

// eslint-disable-next-line import/prefer-default-export
export function MessageInput({
  sendMessage,
  elementRef,
  getMsgInputHeight,
}: {
  sendMessage: (content: string) => void;
  elementRef: React.MutableRefObject<{
    [key: string]: HTMLElement | null;
  }>;
  getMsgInputHeight: React.Dispatch<React.SetStateAction<number>>;
}) {
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

    if (!elementRef.current.msgInputContainer) return;

    sendMessage(textRef.current.value);

    // initialize text and height
    textRef.current.value = "";
    textRef.current.style.height = "28px";
    getMsgInputHeight(78);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!elementRef.current.msgInputContainer) return;

    writeText(e, textRef, isNotMobile);
    getMsgInputHeight(elementRef.current.msgInputContainer.offsetHeight);
  };

  return (
    <MsgInputWholeContainer
      ref={(el) => {
        // eslint-disable-next-line no-param-reassign
        elementRef.current.msgInputContainer = el;
      }}
    >
      <MessageInputBox>
        <InputForMessage
          ref={textRef}
          onChange={handleChange}
          placeholder="Write your text!"
          spaceForUserName={userNameWidth}
        />
        <EmojiCntnr size={20}>
          <EmojiIcon />
        </EmojiCntnr>
      </MessageInputBox>

      <BtnToSubmit onClick={handleSubmit}>작성</BtnToSubmit>
    </MsgInputWholeContainer>
  );
}

export function NewMsgPreview({
  clickToClose,
  messageContent,
  msgInputHeight,
}: {
  clickToClose: (event: React.MouseEvent<HTMLDivElement>) => void;
  messageContent: string;
  msgInputHeight: number;
}) {
  return (
    <NewMsgPreviewContainer msgInputHeight={msgInputHeight} onClick={clickToClose}>
      <NewMsgContent>{messageContent}</NewMsgContent>
    </NewMsgPreviewContainer>
  );
}
