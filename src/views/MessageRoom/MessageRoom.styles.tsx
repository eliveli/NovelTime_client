import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

export const MessageContainer = styled.div<{ isMe?: true }>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px 0;
  ${theme.media.mobile(`
    padding:12px 0;
  `)}
  ${({ isMe }) => isMe && `justify-content: flex-end;`}
`;
export const UserImg = styled.div<{ userImg: string }>`
  border-radius: 50%;
  min-width: 50px;
  height: 50px;
  background-image: url(${({ userImg }) =>
    userImg || "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png"});

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const MessageDesc = styled.div`
  margin: 0;
  padding-left: 12px;
`;
export const CreateDate = styled.p`
  margin: 0;
  padding-left: 12px;
`;
