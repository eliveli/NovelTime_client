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
  allMessagesRef,
}: {
  sendMessage: (content: string) => void;
  getMsgInputHeight: React.Dispatch<React.SetStateAction<number>>;
  allMessagesRef: React.RefObject<HTMLDivElement>;
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

    // change designs if lines in message input increase
    writeText(undefined, msgInputRef, isNotMobile); // for the hight in textarea
    getMsgInputHeight(msgInputCntnrRef.current.offsetHeight); // for other components' layout
  };

  const [scrollTop, setScrollTop] = useState(-1);

  useEffect(() => {
    if (scrollTop === -1) return;

    // in a certain case with EmojiPicker (See the code with EmojiCntnr below)
    // there will be a little delay in scroll right after displaying EmojiPicker
    //  but it can exactly scroll to the bottom message in previous screen view
    allMessagesRef.current?.scrollTo(0, scrollTop);
    setScrollTop(-1);
  }, [scrollTop]);

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
              if (!allMessagesRef.current) return;

              // height difference in MsgInputWholeContainer when opening EmojiPicker
              const heightDifference = 225 + 15;
              // = height in EmojiPicker + gap in MsgInputWholeContainer

              const allMsgs = allMessagesRef.current;
              const possibleDownScrollHeight =
                allMsgs.scrollHeight - allMsgs.scrollTop - allMsgs.clientHeight;

              if (!showEmojiPicker) {
                getMsgInputHeight((prev) => prev + heightDifference); // with EmojiPicker
                // [note] height in MsgInputWholeContainer can be different
                //         with the change in InputForMessage when writing a message
                //
                // Keep the scroll in messages when opening emoji picker
                //  : the bottom message in the current screen view is the criterion
                if (possibleDownScrollHeight < heightDifference) {
                  setScrollTop(allMsgs.scrollTop + heightDifference);
                  // - scroll after component rerender.
                  //   if not, can't scroll to the bottom message with EmojiPicker
                } else {
                  allMsgs.scrollTo(0, allMsgs.scrollTop + heightDifference);
                }
              } else {
                getMsgInputHeight((prev) => prev - heightDifference); // without EmojiPicker
                //
                // Keep the scroll in messages when closing emoji picker
                allMsgs.scrollTo(0, allMsgs.scrollTop - heightDifference);
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
