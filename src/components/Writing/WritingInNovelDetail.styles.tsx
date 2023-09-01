import { styled } from "assets/styles/theme";
import { Img } from "store/serverAPIs/types";

// interface Props {
//   theme: { userImg: string; talkImg: string };
// }
export const WritingBG = styled.article`
  /* 모바일 */
  width: 100%;
  margin: 0 auto;
  /* padding: 0 16px; */
  /* padding: 0 6px; */
  background-color: white;
  border-bottom: 1px solid rgba(150, 150, 150, 0.2);

  /* 태블릿 */
  @media screen and (min-width: 768px) {
  }
  /* PC - 모바일,태블릿과 뷰를 다르게 구성 */
  @media screen and (min-width: 1024px) {
  }
`;

export const Writing = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  /* padding: 12px 0; */
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray100_2};
  &:last-child {
    border-bottom: 0;
  }
`;
export const FirstLineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  margin-left: 12px;
  padding-bottom: 3px;
  padding-top: 10px;

  border-bottom: 1px solid ${(props) => props.theme.color.lightGray100_1};
`;
export const BesideImgContainer = styled.div`
  width: 100%;
`;

export const UserImg = styled.div<{ userImg: Img }>`
  border-radius: 50%;
  min-width: 55px;
  height: 55px;
  margin-top: -4px;

  ${({ userImg }) => !userImg.src && `border: 1px solid #e5e5e5;`};

  background-image: url(${({ userImg }) => userImg.src});
  background-position: ${({ userImg }) => userImg.position || "center"};
  background-repeat: no-repeat;
  background-size: cover;
`;
export const UserNameBox = styled.div`
  display: flex;
`;

export const UserName = styled.p`
  margin: 0;
`;
export const CreateDate = styled.p`
  margin: 0;
  padding-left: 12px;
`;
export const WritingPreview = styled.div`
  padding-left: 12px;
  padding-top: 5px;
  padding-bottom: 5px;

  display: flex;
  justify-content: space-between;
  align-items: center;
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
export const IconsBox = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
`;
export const IconBox = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;
export const IconNO = styled.span`
  font-size: 17px;
`;

export const WritingTitleToShow = styled.div<{ titleWidth: number }>`
  font-weight: 500;
  font-size: 16px;

  // 1줄 엘립시스 ...
  display: inline-block;
  width: ${({ titleWidth }) => titleWidth || 205}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
