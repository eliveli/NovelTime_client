// /* eslint-disable */

import { styled } from "assets/styles/theme";
import { keyframes } from "styled-components";
import Icon from "../assets/Icon";

interface Props {
  theme: { novelImg: string; userImg: string };
}
export const NovelContainer = styled.div`
  display: flex;
  width: 100%;

  padding: 12px 0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  &:last-child {
    border-bottom: 0;
  }

  /* 태블릿 */
  @media screen and (min-width: 768px) {
  }
`;
export const NovelInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: space-evenly;

  position: relative;

  /* 태블릿 , PC */
  @media screen and (min-width: 768px) {
  }
`;

export const NovelImg = styled.div<Props>`
  /* 모바일 */
  height: auto;
  min-width: 70px;
  border-radius: 5%;
  background-image: url(${(props) => props.theme.novelImg});
  /* background-position: center; */
  background-repeat: no-repeat;
  background-size: cover;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    /* height: 100px; */
  }
  /* PC */
  @media screen and (min-width: 1024px) {
  }
`;
export const NovelTitle = styled.div<{ infoWidth: number }>`
  font-weight: 600;

  // 줄 넘어가면 ... 표시
  display: inline-block;
  width: ${(props) => props.infoWidth || 248}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const NovelSubInfoBox = styled.div`
  color: ${(props) => props.theme.color.textGray};
  font-weight: 600;
  font-size: 14px;
`;
export const NovelAuthor = styled.div`
  line-height: 1.9;
`;
export const NovelDescBox = styled.div`
  display: flex;
  align-items: flex-end;
`;
export const NovelDesc = styled.div`
  //2줄 넘어가는 텍스트 ...표시
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  white-space: normal;
  height: 39px; // 화면 표시되는 것 보며 맞춰야 함
  text-align: left;
  word-wrap: break-word;
`;
export const DownIconBox = styled.div`
  z-index: 1;

  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);

  min-width: 30px;
  max-width: 30px;
  min-height: 30px;
  max-height: 30px;
  /* position: absolute;
  right: -${30 / 2 - 6}px;
  top: ${168.22 / 2 - 30 / 2 + 12}px; */

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background-color: rgba(150, 150, 150, 0.3);
    }
  }
`;

export const UpIconBox = styled.div`
  z-index: 1;

  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);

  min-width: 30px;
  max-width: 30px;
  min-height: 30px;
  max-height: 30px;
  /* position: absolute;
  right: -${30 / 2 - 6}px;
  top: ${168.22 / 2 - 30 / 2 + 12}px; */

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background-color: rgba(150, 150, 150, 0.3);
    }
  }
`;
export const DownIcon = styled(Icon.SmallDown)`
  width: 100%;
  height: 100%;
  @media (hover: hover) {
    &:hover {
      color: rgba(0, 0, 0, 0.3);
    }
  }
`;
export const UpIcon = styled(Icon.SmallUp)`
  width: 100%;
  height: 100%;
  @media (hover: hover) {
    &:hover {
      color: rgba(0, 0, 0, 0.3);
    }
  }
`;
// animation for novel desc modal
const descShowOn = keyframes`
  from{
    clip-path:polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
    opacity: 0.1;
  }
  to{
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    opacity: 1;
  }
`;
const descShowOff = keyframes`
  0% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    opacity: 1;
  }

 100%{
    clip-path:polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
    opacity: 0.1;

  }
`;
export const ModalContainerT = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  background-color: rgba(240, 240, 240, 0.9);
  color: black;
  font-weight: 600;

  animation-name: ${descShowOn};
  animation-direction: normal;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
`;
export const ModalContainerF = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  background-color: rgba(240, 240, 240, 0.9);
  color: black;
  font-weight: 600;

  animation-name: ${descShowOn};
  animation-direction: reverse;
  animation-duration: 0.5s;
  animation-fill-mode: forwards; // 애니메이션 종료 후 마지막 keyframe 값 유지(중요!)
`;
