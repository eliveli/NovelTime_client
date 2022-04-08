import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

export const MsgRoomContnr = styled.div<{ roomIdMobile?: string }>`
  // for mobile
  height: calc(100vh - 51px - 88px);
  // 100vh - top nav - message write component
  ${theme.media.mobile(`
    padding: 0 16px;
  `)}

  ${theme.media.tablet(`
    padding:0 20px;
    border-top: 1px solid rgba(0,0,0,0.1);
    height: calc(100vh - (71px + 60px) - 50px - 88px);
    `)} // 100vh - (top + bottom nav) - top nav of message room - message write component
  ${theme.media.desktop(`
    height: calc(100vh - 61px - 50px - 88px);
  `)}

  // when only message room exists without message list because of resizing browser
  ${({ roomIdMobile }) =>
    roomIdMobile &&
    theme.media.tablet(`
    padding:0 20px;
    border-top: 0;
    height: calc(100vh - 51px - 88px);

    width: 100%;
    max-width: 860px;
    margin: auto;
    `)}
  ${({ roomIdMobile }) =>
    roomIdMobile &&
    theme.media.desktop(`
    height: calc(100vh - 61px - 88px);

    width: 100%;
    max-width: 860px;
    margin: auto;
  `)}

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
export const UserImg = styled.div<{ userImg: string; isShow?: boolean }>`
  border-radius: 50%;
  min-width: 35px;
  height: 35px;
  background-image: url(${({ userImg }) =>
    userImg || "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png"});

  background-position: center;
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
      font-weight: 600;
      `}
`;
export const CreateDate = styled.span<{ isMe?: true }>`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  font-weight: 600;
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

  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;
`;
export const LastWatchContnr = styled.div`
  /* margin-bottom: 31px; */
`;
export const LastWatchMark = styled.span`
  padding: 0 10px;
  background-color: white;

  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;
  font-size: 15px;
`;
