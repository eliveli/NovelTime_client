import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";
import { Img } from "store/serverAPIs/types";

export const ChatRoomContainer = styled.div`
  width: 100%;
  max-width: 860px;
`;

export const AllMessageContainer = styled.div`
  ${theme.media.mobile(`
    padding: 0 16px;
    height: calc(100vh - 51px - 78px);
    `)} // height: calc ( 100vh - top nav - message input component )

  ${theme.media.tablet(`
    padding:0 20px;
    border-top: 2px solid rgba(50,50,50,0.1);
    height: calc(100vh - (71px + 60px) - 50px - 78px);
    `)} // height: calc ( 100vh - (top + bottom nav) - top nav of chat room - message input component )
  
  ${theme.media.desktop(`
    height: calc(100vh - 61px - 50px - 78px);
  `)} // styles for tablet above are used here

  overflow-y: scroll;
  ${theme.hideScrollBar}
`;
export const MessageContainer = styled.div<{ isMe?: true }>`
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: 9px 0;
  ${theme.media.mobile(`
    padding:9px 0;
  `)}

  ${({ isMe }) => isMe && `justify-content: flex-end;`}
`;
export const MessageContentContnr = styled.div<{ isMe?: true }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  ${({ isMe }) => (isMe ? ` align-items: flex-end;` : ` align-items: flex-start;`)}
`;
export const UserImg = styled.div<{ userImg: Img; isShow?: boolean }>`
  border-radius: 50%;
  min-width: 35px;
  height: 35px;

  ${({ userImg }) => !userImg.src && `border: 1px solid #e5e5e5;`};

  background-image: url(${({ userImg }) => userImg.src});
  background-position: ${({ userImg }) => userImg.position || "center"};
  background-repeat: no-repeat;
  background-size: cover;

  margin-right: 6px;

  ${({ isShow }) => isShow === false && `background-image: url("");`}
`;

export const MessageDesc = styled.div<{ isMe?: true }>`
  display: flex;
  align-items: center;

  border-radius: 15px;

  padding: 4px 11px;

  ${({ isMe }) =>
    isMe
      ? `
      box-shadow: 0 0 2px white;
      background-color: ${theme.color.mainLight};
      color: #7c2800;
      `
      : `
      background-color: white;
      box-shadow: 0 0 2px orange;
      color: rgba(0, 0, 0, 0.6);
      font-weight: 500;
      `}
`;
export const CreateDate = styled.span<{ isMe?: true }>`
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;

  ${({ isMe }) => (isMe ? `padding-right: 11px;` : `padding-left: 11px;`)}
`;
export const MarkContnr = styled.div`
  display: flex;

  width: 100%;
  margin: 19px 0;
  line-height: 0.1px;
  justify-content: center;
  border-bottom: 1px solid #000;

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
export const DateMark = styled.span`
  padding: 0 10px;
  background-color: white;

  color: rgba(0, 0, 0, 0.8);
  font-weight: 500;
`;
export const LastWatchContnr = styled.div``;
export const LastWatchMark = styled.span`
  padding: 0 10px;
  background-color: white;

  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
  font-size: 15px;
`;

export const MessageInputBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 8px 14px;
  position: relative;
`;
export const InputForMessage = styled.textarea<{ spaceForUserName: number }>`
  width: 100%;
  border: 0;
  resize: none;
  ${theme.hideScrollBar}
  outline: none;

  font-size: 16px;
  height: 28px;
  line-height: 1.5;

  ${({ spaceForUserName }) => `text-indent: ${spaceForUserName}px;`}

  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;

  font-family: "Californian FB", D2Coding, Arial, sans-serif;
`;

export const EmojiCntnr = styled(Icon.IconBox)`
  display: flex;
  align-items: center;
`;
export const EmojiIcon = styled(Icon.Emoji)``;
export const BtnToSubmit = styled.button`
  min-width: 46px;
  height: 46px;
  border-radius: 14px;
  background-color: transparent;
  white-space: nowrap;
  margin-left: 10px;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: center;

  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
`;

export const WholeContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  padding-right: 13px;

  border: 1px solid rgba(0, 0, 0, 0.1);
  border-top: 2px solid rgba(50, 50, 50, 0.1);
  border-radius: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;

  background-color: rgba(255, 255, 255, 1);

  position: relative;

  z-index: 1;

  // when device is mobile
  @media (max-width: 767px) {
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
  }
`;
