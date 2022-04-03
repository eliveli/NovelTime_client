import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

export const MessageContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px dotted rgba(0, 0, 0, 0.1);
  padding: 16px 0;
  ${theme.media.mobile(`
    padding:12px 0;
  `)}
`;
export const NextToImgContainer = styled.div`
  width: 100%;
  margin-left: 12px;
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

export const UserNameBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  margin-left: 0;
  padding: 0;
`;

export const UserName = styled.p`
  margin: 0;
`;
export const CreateDate = styled.p`
  margin: 0;
  padding-left: 12px;
`;
export const MessageImgBox = styled.div`
  min-width: 40px;
`;
export const MessageImg = styled.div<{ img?: string }>`
  padding-top: 100%;

  background-image: url(${({ img }) => img});
  /* background-position: center; */
  background-repeat: no-repeat;
  background-size: cover;

  border-radius: 10%;
`;

export const MessageTitle = styled.h3`
  font-size: 19px;
  margin: 0;
  font-weight: 600;
`;
export const MessageDesc = styled.p`
  margin: 0;
`;
