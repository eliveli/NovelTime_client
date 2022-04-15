// /* eslint-disable */

import { styled } from "assets/styles/theme";

// interface Props {
//   theme: { userImg: string; talkImg: string };
// }
export const TalkBG = styled.article`
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

export const Talk = styled.div`
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

// export function setImgUrl(img: string) {
//   imgUrl = img;
// }
// let imgUrl = "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png";
export const UserImg = styled.div<{ userImg: string }>`
  border-radius: 50%;
  min-width: 55px;
  height: 55px;
  margin-top: -4px;
  background-image: url(${({ userImg }) =>
    userImg || "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png"});

  background-position: center;
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
export const TalkPreview = styled.div`
  padding-left: 12px;
  padding-top: 5px;
  padding-bottom: 5px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const TalkImgBox = styled.div`
  min-width: 40px;
`;

export const TalkImg = styled.div<{ img?: string }>`
  padding-top: 100%;

  background-image: url(${({ img }) => img});
  /* background-position: center; */
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
export const IconNO = styled.span``;

export const TalkTitle = styled.div<{ titleWidth: number }>`
  font-weight: 500;
  font-size: 17px;

  // 1줄 엘립시스 ...
  display: inline-block;
  width: ${({ titleWidth }) => titleWidth || 205}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
