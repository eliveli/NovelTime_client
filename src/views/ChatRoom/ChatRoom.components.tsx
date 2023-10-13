/* eslint-disable no-param-reassign */
/* eslint-disable-next-line no-param-reassign */
import { useRef, useState, useEffect } from "react";
import { useComponentWidth, useWhetherItIsMobile, writeText } from "utils";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import theme from "assets/styles/theme";
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
  MsgAndBtnCntnr,
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

  // Treat the emoji picker
  const [showEmojiPicker, handleEmojiPicker] = useState(false);

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    if (!msgInputCntnrRef.current || !msgInputRef.current) return;

    msgInputRef.current.value += emojiObject.emoji; // add the selected emoji

    writeText(undefined, msgInputRef, isNotMobile); // change the hight in textarea if needed
    getMsgInputHeight(msgInputCntnrRef.current.offsetHeight);
  };

  useEffect(() => {
    if (!msgInputCntnrRef.current) return;

    getMsgInputHeight(msgInputCntnrRef.current.offsetHeight);
  }, [showEmojiPicker]);

  // Treat message
  const handleSubmit = async () => {
    if (!loginUserId) {
      alert("먼저 로그인을 해 주세요");
      return;
    }

    if (!msgInputRef.current?.value || !msgInputCntnrRef.current) return;

    sendMessage(msgInputRef.current.value);

    // initialize
    msgInputRef.current.value = "";
    msgInputRef.current.style.height = "28px";
    getMsgInputHeight(78);
    handleEmojiPicker(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!msgInputCntnrRef.current || !msgInputRef.current) return;

    writeText(e, msgInputRef, isNotMobile);
    getMsgInputHeight(msgInputCntnrRef.current.offsetHeight);
  };

  return (
    <MsgInputWholeContainer ref={msgInputCntnrRef}>
      <MsgAndBtnCntnr>
        <MessageInputBox>
          <InputForMessage
            ref={msgInputRef}
            onChange={handleChange}
            placeholder="Write your text!"
            spaceForUserName={userNameWidth}
          />

          <EmojiCntnr
            size={20}
            styles={showEmojiPicker ? `color: ${theme.color.main}; opacity: 0.8;` : undefined}
            onClick={() => {
              if (!showEmojiPicker) {
                getMsgInputHeight(318); // with EmojiPicker
                // = height in MessageInputBox 46
                //   + top padding, bottom padding, gap in MsgInputWholeContainer 15 + 15 + 15
                //   + height in EmojiPicker 225
                //   + border-top in MsgInputWholeContainer 2
              } else {
                getMsgInputHeight(78); // without EmojiPicker
              }

              handleEmojiPicker(!showEmojiPicker);
            }}
          >
            <EmojiIcon />
          </EmojiCntnr>
        </MessageInputBox>

        <BtnToSubmit onClick={handleSubmit}>작성</BtnToSubmit>
      </MsgAndBtnCntnr>

      {showEmojiPicker && (
        <EmojiPicker
          onEmojiClick={onEmojiClick}
          width="100%"
          height="225px"
          searchDisabled
          previewConfig={{ showPreview: false }}
          lazyLoadEmojis
        />
      )}
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
