import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

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
export const UserImg = styled.div<{ userImg: string }>`
  border-radius: 50%;
  min-width: 35px;
  height: 35px;
  background-image: url(${({ userImg }) =>
    userImg || "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png"});

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  margin-right: 6px;
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
