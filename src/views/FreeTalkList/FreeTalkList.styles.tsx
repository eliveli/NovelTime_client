// /* eslint-disable */

import styled, { keyframes } from "styled-components";

export const TalkBG = styled.section`
  /* 모바일 */
  width: 100%;
  margin: 0 auto;
  padding: 0 16px 16px;
  background-color: white;
  border-top: 2px solid gray;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
  }
  /* PC - 모바일,태블릿과 뷰를 다르게 구성 */
  @media screen and (min-width: 1024px) {
    width: 860px;
  }
`;

export const Talk = styled.article`
  width: 100%;
  display: flex;
  padding: 12px 0;
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

  border-bottom: 1px solid ${(props) => props.theme.color.lightGray100_1};
`;
export const BesideImgContainer = styled.div`
  width: 100%;
`;

// export function setImgUrl(img: string) {
//   imgUrl = img;
// }
// let imgUrl = "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png";
export const UserImg = styled.div`
  border-radius: 50%;
  min-width: 50px;
  height: 50px;
  background-image: url(${(props) => props.theme.userImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
export const UserNameBox = styled.div`
  display: flex;
  /* padding-left: 12px; */
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
  padding-top: 6px;
`;
export const TalkImgBox = styled.div`
  width: 100%;

  text-align: center; // 자식이미지 width 100% 아닐 때 가운데 정렬

  position: relative;

  overflow: hidden;

  /* 모바일 */
  height: 150px;
  /* 태블릿 */
  @media screen and (min-width: 768px) {
    height: 200px;
  }
  /* PC - 모바일,태블릿과 뷰를 다르게 구성 */
  @media screen and (min-width: 1024px) {
    height: 250px;
  }

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
export const TalkImg = styled.img`
  position: absolute;
  left: 0;

  /* padding-top: 50%; */
  width: 100%;
  display: inline-block; // 자식이미지 width 100% 아닐 때 가운데 정렬

  border-radius: 10%;

  content: url(${(props) => props.theme.talkImg});

  /* 모바일 */
  animation-name: ${slideImgMobile};
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-duration: 2s; // 문자열로 넣으면 작동 안 함... (X)"1s"(X)
  /* animation-delay: 1s; */
  /* animation-fill-mode: forwards; //애니메이션 종료 후 마지막 keyframe 값 유지(중요!) */

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    animation-name: ${slideImgTablet};
    animation-duration: 3.5s;
  }
  /* PC - 모바일,태블릿과 뷰를 다르게 구성 */
  @media screen and (min-width: 1024px) {
    animation-name: ${slideImgPC};
    animation-duration: 4s;
  }

  &:hover {
    animation-play-state: paused;
  }
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

export const TalkTitle = styled.div`
  font-weight: 600;
  font-size: 17px;
`;
export const NovelTitle = styled.div`
  color: ${(props) => props.theme.color.textGray};
  font-weight: 600;
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
