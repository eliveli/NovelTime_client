/* eslint-disable */

import { styled } from "assets/styles/theme";

interface Props {
  theme: { novelImg: string; userImg: string };
}

export const NovelContainer = styled.div`
  min-width: 32%;
  max-width: 32%;

  display: flex;
  flex-direction: column;

  padding: 12px 6px;
  /* 슬라이드 양끝 좌우 6px 만큼 다른 컨테이너 적용 */

  &:last-child {
  }

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    min-width: 20%;
    max-width: 20%;
  }

  /* PC */
  @media screen and (min-width: 1024px) {
    min-width: 16.66%;
    max-width: 16.66%;
  }
`;
export const NovelInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /* 태블릿 , PC */
  @media screen and (min-width: 768px) {
    /* padding-left: 10px; */
    /* justify-content: space-evenly; */
  }
`;

export const NovelImgBox = styled.div`
  width: 100%;
`;
export const NovelImg = styled.div<Props>`
  /* 모바일 */
  /* height: 80px; */
  /* min-width: 70px; */
  padding-top: 130%;
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
export const NovelTitle = styled.div`
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
