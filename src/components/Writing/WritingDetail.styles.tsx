import theme, { styled } from "assets/styles/theme";
import { Img } from "store/serverAPIs/types";

export const WritingDetailContainer = styled.div`
  border-radius: 20px;
  border: 1px solid lightgray;
  /* margin-top: 10px; */
  padding: 10px 0;
  /* padding: 10px 20px 20px 20px; */

  position: relative;
`;
export const EditAndDeleteContainer = styled.div`
  position: absolute;
  top: 9px;
  right: 14px;
`;

export const Writing = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* border-bottom: 1px solid ${(props) => props.theme.color.lightGray100_2}; */
`;
export const NextToImgContainer = styled.div`
  margin-left: 12px;
`;
export const UserContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px dotted rgba(0, 0, 0, 0.1);
  /* padding-bottom: 9px; */
  padding-bottom: 16px;
  padding-left: 20px;
  padding-right: 20px;
  ${theme.media.mobile(`
    padding: 0 12px 14px;
  `)}
`;

export const UserImg = styled.div<{ userImg: Img }>`
  border-radius: 50%;
  min-width: 50px;
  height: 50px;

  // when image doesn't exist
  ${({ userImg }) => !userImg.src && `border: 1px solid #e5e5e5;`};

  background-image: url(${({ userImg }) => userImg.src});
  background-position: ${({ userImg }) => userImg.position || "center"};
  background-repeat: no-repeat;
  background-size: cover;
`;

export const UserNameBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  margin-left: 0;
  padding: 0;

  /* border-bottom: 1px solid ${(props) => props.theme.color.lightGray100_1}; */
`;

export const UserName = styled.p`
  margin: 0;
`;
export const CreateDate = styled.p`
  margin: 0;
  padding-left: 12px;
`;
export const WritingImgBox = styled.div`
  min-width: 40px;
`;
export const WritingImg = styled.div<{ img?: string }>`
  padding-top: 100%;

  background-image: url(${({ img }) => img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  border-radius: 10%;
`;

export const WritingTitle = styled.h3`
  font-size: 19px;
  margin: 0;
  font-weight: 500;
`;
export const WritingDesc = styled.p`
  margin-bottom: 12px;
  padding-left: 20px;
  padding-right: 20px;
  ${theme.media.mobile(`
    margin-top: 14px;
    padding: 0 12px;
    margin-bottom: 14px;
  `)}

  white-space: pre-wrap; // allow the line break
`;
