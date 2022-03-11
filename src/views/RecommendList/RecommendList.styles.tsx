/* eslint-disable */

import styled, { keyframes } from "styled-components";

export const RecommendBG = styled.section`
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

export const Text = styled.article`
  /* 모바일 */
  width: 100%;
  padding: 12px 0 3px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  &:last-child {
    border-bottom: 0;
  }

  display: flex;
  flex-direction: column;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    flex-direction: row;
    padding: ${16 - 2}px 0 16px; // children인 두 컨테이너에 margin-top 2px임. 합하면 위쪽 간격 16px로써 아래 간격과 같음
  }
  /* PC */
  @media screen and (min-width: 1024px) {
  }
`;
export const FirstLineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  /* border-bottom: 1px solid rgba(100, 100, 100, 0.1); */
`;
export const UserContainer = styled.div`
  width: 100%;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    margin-top: 2px;
    padding-left: 16px;

    border-left: 8px dashed rgba(0, 0, 0, 0.1);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  /* PC  */
  @media screen and (min-width: 1024px) {
  }
`;

export const NovelContainer = styled.div`
  display: flex;
  width: 100%;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    margin-top: 2px;
    box-shadow: 0 0 2px rgb(0 0 0 / 10%);
    /* border-right: 8px solid gray; */
  }
`;
export const NovelInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 6px;

  /* 태블릿 , PC */
  @media screen and (min-width: 768px) {
    padding-left: 10px;
    justify-content: space-evenly;
  }
`;

export const NovelImg = styled.div`
  /* 모바일 */
  height: 80px;
  min-width: 70px;
  border-radius: 5%;
  background-image: url(${(props) => props.theme.novelImg});
  /* background-position: center; */
  background-repeat: no-repeat;
  background-size: cover;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    height: 100px;
  }
  /* PC */
  @media screen and (min-width: 1024px) {
  }
`;
export const UserImg = styled.div`
  border-radius: 50%;
  min-width: 20px;
  height: 20px;
  background-image: url(${(props) => props.theme.userImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
export const UserNameBox = styled.div`
  display: flex;

  /* 태블릿, PC */
  @media screen and (min-width: 768px) {
    border-bottom: 1px dotted #80808085;
  }
`;

export const UserName = styled.p`
  margin: 0;
  padding-left: 6px;
`;
export const CreateDate = styled.p`
  margin: 0;
  padding-left: 12px;
`;
export const TalkPreview = styled.div`
  border-radius: 5px;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);

  padding: 0 6px;
  margin-bottom: 7px;
  margin-top: 8px;

  display: flex;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    margin: 0;
    margin-bottom: 10px;
    padding: 6px 8px;
  }
  /* PC */
  @media screen and (min-width: 1024px) {
  }
`;
export const TalkTitle = styled.div`
  border-right: 1px solid ${(props) => props.theme.color.lightGray0_1};
  padding: 3px 1px;

  font-weight: 600;
  /* font-size: 17px; */
  /* 태블릿 */
  @media screen and (min-width: 768px) {
  }
  /* PC */
  @media screen and (min-width: 1024px) {
  }
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
  /* PC */
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
  /* PC */
  @media screen and (min-width: 1024px) {
    animation-name: ${slideImgPC};
    animation-duration: 4s;
  }

  &:hover {
    animation-play-state: paused;
  }
`;

export const IconBox = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;
export const IconNO = styled.span``;
export const NovelTitle = styled.div`
  /* color: gray; */
  font-weight: 600;
`;
export const NovelSubInfoBox = styled.div`
  color: ${(props) => props.theme.color.textGray};
  font-weight: 600;
  font-size: 14px;
`;
export const NovelInfoLineHeight = styled.div`
  line-height: 1.9;
`;
export const NovelInfo = styled.div``;

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
