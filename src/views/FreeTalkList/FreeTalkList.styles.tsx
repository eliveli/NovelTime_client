import { keyframes } from "styled-components";
import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";
import { Img } from "store/serverAPIs/types";

export const Talk = styled.article<{ isLast?: boolean }>`
  width: 100%;
  display: flex;

  @media screen and (max-width: 599px) {
    flex-direction: column;
  }

  padding: 12px 0;
  border-bottom: 1px solid ${(props) => props.theme.color.lightGray100_2};

  // it does not work when element is article
  &:last-of-type {
    border-bottom: 0;
  }
  // this is used in home page
  ${({ isLast }) => isLast && `border-bottom: 0;`}
`;
export const TalkMobileContnr = styled.div`
  display: flex;

  @media screen and (min-width: 600px) {
    display: none;
  }
`;
export const TalkTabletContnr = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 599px) {
    display: none;
  }
`;
export const TalkMainInfoContnr = styled.div`
  display: flex;
  justify-content: space-between;

  width: 70%;

  @media screen and (max-width: 767px) {
    width: 75%;
  }
`;
export const TalkInfoContnrTablet = styled.div`
  position: relative;
  width: 74%;
  @media screen and (max-width: 767px) {
    width: 73%;
  }
  height: 100%;
  display: flex;
  justify-content: space-between;

  border: 1px dotted lightgray;
  border-radius: 10px;
  padding: 6px 10px;
`;
export const TitleContnr = styled.div`
  width: 100%;
`;
export const FirstLineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  margin-left: 12px;
  padding-bottom: 3px;

  /* border-bottom: 1px dashed rgba(100, 100, 100, 0.1); */
`;
export const BesideImgContainer = styled.div`
  width: 100%;
`;
// export function setImgUrl(img: string) {
//   imgUrl = img;
// }
// let imgUrl = "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png";
export const UserImg = styled.div<{ userImg: Img }>`
  border-radius: 50%;
  min-width: 43px;
  height: 43px;
  background-image: url(${({ userImg }) =>
    userImg.src || "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png"});
  background-position: ${({ userImg }) => userImg.position} || center;
  background-repeat: no-repeat;
  background-size: cover;
  @media screen and (min-width: 600px) {
    min-width: 30px;
    height: 30px;
  }
`;
export const UserInfoTablet = styled.div`
  /* width: 18%; */
  width: 23%;
  @media screen and (min-width: 768px) {
    /* width: 23%; */
  }
  display: flex;
  gap: 9px;
  align-items: center;
  color: rgba(100, 100, 100, 0.9);
`;
export const UserNameBox = styled.div`
  display: flex;
  white-space: nowrap;
  color: rgba(100, 100, 100, 0.9);
  margin-left: 11px;

  @media screen and (min-width: 600px) {
    flex-direction: column;
    margin: 0;
  }
`;

export const UserName = styled.p`
  margin: 0;
`;
export const CreateDate = styled.p`
  margin: 0;
  padding-left: 12px;
  @media screen and (min-width: 600px) {
    padding-left: 0;
    color: rgba(100, 100, 100, 0.9);
    text-align: center;
    width: 10%;
  }
`;
export const CommentLabel = styled.div`
  position: absolute;
  /* border: 1px solid rgba(0, 0, 0, 0.1); */
  /* padding: 1px 1px 2px 2px; */
  background-color: white;
  top: -9px;
  left: -10px;
  transform: scaleY(-1);
  border-radius: 50%;

  @media screen and (min-width: 600px) {
    top: 20px;
    left: -12px;
    transform: none;
  }
`;
export const TalkPreview = styled.div`
  position: relative;
  border: 1px dotted lightgray;
  border-radius: 10px;
  margin: 0 0 0 12px;
  padding: 6px 10px;
  /* padding-left: 12px;
  padding-top: 6px; */
`;
export const TalkImgTablet = styled.div<{ titleHeight: number; talkImg: string }>`
  border-radius: 6px;
  height: auto;
  min-width: ${({ titleHeight }) => titleHeight}px;

  background-image: url(${({ talkImg }) => talkImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
export const TalkImgBox = styled.div`
  width: 100%;

  text-align: center; // 자식이미지 width 100% 아닐 때 가운데 정렬

  position: relative;

  overflow: hidden;

  /* 모바일 */
  height: 150px;
  /* @media screen and (min-width: 768px) {
    height: 200px;
  }
  @media screen and (min-width: 1024px) {
    height: 250px;
  } */

  /* overflow-x: hidden;  // y스크롤 넣을 경우 */
  /* scroll-behavior: smooth; */
`;
const slideImgMobile = keyframes`
  0% {
    top: 0;
  }
  10% {
    top: 0;
  }
  90%{
    top: -110px;
   }
  100%{
    top: -110px;
   }
  `;
// now only this used
const slideImgMobileRow = keyframes`
  0% {
    top: 0;
  }
  10% {
    top: 0;
  }
  90%{
    top: -240px;
   }
  100%{
    top: -240px;
   }
  `;
const slideImgTablet = keyframes`
  0% {
    top: 0;
  }
  10% {
    top: 0;
  }
  90%{
    top: -470px;
   }
  100%{
    top: -470px;
   }
  `;
const slideImgPC = keyframes`
  0% {
    top: 0;
  }
  10% {
    top: 0;
  }
  90%{
    top: -510px;
   }
  100%{
    top: -510px;
   }
  `;
export const TalkImg = styled.div<{ talkImg: string; imgWidth: number }>`
  width: 100%;
  height: ${({ imgWidth }) => imgWidth}px;
  background-image: url(${({ talkImg }) => talkImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  position: absolute;
  left: 0;

  display: inline-block; // 자식이미지 width 100% 아닐 때 가운데 정렬(with parent style)
  border-radius: 6px;

  /* now animation is only used at the device width 500px - 599px */

  /* 모바일 */
  animation-name: ${slideImgMobile};
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-duration: 2s; // 문자열로 넣으면 작동 안 함... (X)"1s"(X)
  /* animation-delay: 1s; */
  /* animation-fill-mode: forwards; // 애니메이션 종료 후 마지막 keyframe 값 유지 */

  /* now the following is only used */
  @media screen and (min-width: 500px) {
    animation-name: ${slideImgMobileRow};
    animation-duration: 2.5s;
  }

  /* 태블릿 : now it is not used */
  @media screen and (min-width: 768px) {
    position: relative;
    animation-name: ${slideImgTablet};
    animation-duration: 3.5s;
  }
  /* PC : now it is not used */
  @media screen and (min-width: 1024px) {
    position: relative;
    animation-name: ${slideImgPC};
    animation-duration: 4s;
  }

  // when mouse hover use animation
  animation-play-state: paused;
  ${theme.media.hover(`
    animation-play-state: running;
  `)}
`;
export const IconsBox = styled.div`
  display: flex;
  /* gap: 18px; */
  align-items: center;
  color: rgba(100, 100, 100, 0.9);

  justify-content: space-between;
  width: 93px;
  gap: 9px;

  @media screen and (min-width: 600px) {
    flex-direction: column;
    width: 8%;
    gap: 0;
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
    width: 13%;
    gap: 7px;
    justify-content: space-between;
  }
`;
export const IconContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;

  @media screen and (min-width: 600px) {
    gap: 6px;
  }
`;
export const IconNO = styled.span`
  font-size: 17px;
`;

export const TalkTitle = styled.div<{ talkImg?: string }>`
  font-weight: 500;
  font-size: 17px;

  @media screen and (max-width: 599px) {
    /* when talkImg is empty string "", */
    ${({ talkImg }) =>
      !talkImg &&
      `
      padding-bottom: 6px;
      border-bottom: 1px dashed rgba(100, 100, 100, 0.1);
    `}
  }
`;
export const NovelTitle = styled.div`
  color: ${(props) => props.theme.color.textGray};
  font-weight: 500;
  @media screen and (max-width: 599px) {
    padding-top: 3px;
  }
`;

// (구분) img vs div의 backgorund-image (하기)
// <img src="" />
// : 받아오는 이미지 소스의 height를 그대로 가져올 때
// <div style={{
//   background-image: url("");
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: cover;
// }} />
// : 이미지 height가 고정되어 있어 받아오는 이미지 소스의 height를 변경해야 할 때
// : 이 때 원본이미지 비율이 변경되지 않도록 유지하면서 position만 맞춰주는 것
