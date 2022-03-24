import theme, { styled } from "assets/styles/theme";
import { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Icon from "../../assets/Icon";

export const NovelLink = styled(Link)`
  display: flex;
  width: 100%;

  padding: 12px 0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  &:last-child {
    border-bottom: 0;
  }

  text-decoration: none;
  color: black;

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;
    color: rgba(100, 100, 100, 0.8);`,
  )}
`;
export const NovelInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: space-evenly;

  position: relative;
`;

export const NovelImg = styled.div<{ novelImg: string }>`
  /* 모바일 */
  height: auto;
  min-width: 70px;
  border-radius: 5%;
  background-image: url(${({ novelImg }) => novelImg});
  /* background-position: center; */
  background-repeat: no-repeat;
  background-size: cover;
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

  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;

  color: rgba(0, 0, 0, 0.3);

  ${theme.media.tablet(`
    margin-top: auto;
    margin-left: 3px;
    `)}

  ${theme.media.hover(`
      cursor: pointer;
      opacity: 0.8;
      background-color: rgba(150, 150, 150, 0.3);
  `)}
`;

export const UpIconBox = styled.div`
  z-index: 1;

  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);

  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;

  color: rgba(0, 0, 0, 0.3);

  ${theme.media.tablet(`
    margin-top: auto;
    margin-left: 3px;
    `)}
  ${theme.media.hover(`
      cursor: pointer;
      opacity: 0.8;
      background-color: rgba(150, 150, 150, 0.3);
    `)}
`;
export const DownIcon = styled(Icon.SmallDown)`
  ${theme.media.hover(`
      color: rgba(100, 100, 100, 0.3);
    `)}
`;
export const UpIcon = styled(Icon.SmallUp)`
  ${theme.media.hover(`
      color: rgba(100, 100, 100, 0.3);
    `)}
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

export const ModalContainerT = styled.div`
  ${theme.media.hover(`
      cursor:default;
      opacity: 1;
      background-color: white;`)}
  white-space: pre-line; // line break 적용(with tab, use pre-wrap)

  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  background-color: rgba(255, 255, 255, 0.9);
  color: black;
  font-weight: 600;

  border: 1px solid rgb(100 100 100 / 20%);
  border-radius: 5px;
  padding: 5px 7px;

  animation-name: ${descShowOn};
  animation-direction: normal;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
`;
export const ModalContainerF = styled.div`
  ${theme.media.hover(`
      cursor:default;
      opacity: 1;
      background-color: white;`)}
  white-space: pre-line; // line break 적용

  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  background-color: rgba(255, 255, 255, 0.9);
  color: black;
  font-weight: 600;

  border: 1px solid rgb(100 100 100 / 20%);
  border-radius: 5px;
  padding: 5px 7px;

  animation-name: ${descShowOn};
  animation-direction: reverse;
  animation-duration: 0.3s;
  animation-fill-mode: forwards; // 애니메이션 종료 후 마지막 keyframe 값 유지(중요!)
`;
