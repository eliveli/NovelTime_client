/* eslint-disable no-param-reassign */
/* eslint-disable-next-line no-param-reassign */
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

export function MessageInput({
  sendMessage,
  getMsgInputHeight,
}: {
  sendMessage: (content: string) => void;
  getMsgInputHeight: React.Dispatch<React.SetStateAction<number>>;
}) {
  const loginUserId = useAppSelector((state) => state.loginUser.user.userId);

  const isNotMobile = !useWhetherItIsMobile();

  const msgInputCntnrRef = useRef<HTMLDivElement>(null);
  const msgInputRef = useRef<HTMLTextAreaElement>(null);

  const userNameOnTextAreaRef = useRef<HTMLSpanElement>(null);
  const userNameWidth = useComponentWidth(userNameOnTextAreaRef);

  const handleSubmit = async () => {
    if (!loginUserId) {
      alert("먼저 로그인을 해 주세요");
      return;
    }

    if (!msgInputRef.current?.value || !msgInputCntnrRef.current) return;

    sendMessage(msgInputRef.current.value);

    // initialize text and height
    msgInputRef.current.value = "";
    msgInputRef.current.style.height = "28px";
    getMsgInputHeight(78);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!msgInputCntnrRef.current || !msgInputRef.current) return;

    writeText(e, msgInputRef, isNotMobile);
    getMsgInputHeight(msgInputCntnrRef.current.offsetHeight);
  };

  return (
    <MsgInputWholeContainer ref={msgInputCntnrRef}>
      <MessageInputBox>
        <InputForMessage
          ref={msgInputRef}
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
