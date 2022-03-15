// /* eslint-disable */

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
  /* 슬라이드 양끝 좌우 6px 만큼 다른 컨테이너에 적용 */

  &:last-child {
  }

  @media screen and (min-width: 560px) {
    min-width: 24%;
    max-width: 24%;
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

  line-height: 1.4;
  margin-top: 3px;

  /* 태블릿 , PC */
  @media screen and (min-width: 768px) {
  }
`;
export const NovelImgBox = styled.div`
  width: 100%;
`;
export const NovelImg = styled.div<Props>`
  /* 모바일 */
  padding-top: 135%;
  border-radius: 5%;
  background-image: url(${(props) => props.theme.novelImg});
  background-repeat: no-repeat;
  background-size: cover;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
  }
  /* PC */
  @media screen and (min-width: 1024px) {
  }
`;
export const NovelTitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* height: 100%; */
  height: 50px; // child인 Title 대신 적용. title에서 한 줄 제목 정렬 위해.
  margin-bottom: 7px;

  /* 태블릿 , PC */
  @media screen and (min-width: 768px) {
  }
`;
export const NovelTitle = styled.div`
  font-weight: 600;

  //2줄 넘어가는 텍스트 ...표시
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  white-space: normal;
  /* height: 50px;  // parent에 적용 */
  text-align: left;
  word-wrap: break-word;
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
