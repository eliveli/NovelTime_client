// /* eslint-disable */

import { styled } from "assets/styles/theme";
import { Link } from "react-router-dom";

export const NovelLink = styled(Link)<{ isWidth100?: true }>`
  min-width: 32%;
  max-width: 32%;

  display: flex;
  flex-direction: column;

  padding: 12px 6px 0;
  /* 슬라이드 양끝 좌우 6px 만큼 다른 컨테이너에 적용 */

  ${({ isWidth100 }) => isWidth100 && `max-width:100%;`}

  text-decoration: none;
  color: black;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.7;
      color: rgba(100, 100, 100, 0.8);
    }
  }
  @media screen and (min-width: 560px) {
    min-width: 24%;
    max-width: 24%;
    ${({ isWidth100 }) => isWidth100 && `max-width:100%;`}
  }

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    min-width: 20%;
    max-width: 20%;
    ${({ isWidth100 }) => isWidth100 && `max-width:100%;`}
  }

  /* PC */
  @media screen and (min-width: 1024px) {
    min-width: 16.66%;
    max-width: 16.66%;
    ${({ isWidth100 }) => isWidth100 && `max-width:100%;`}
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
export const NovelImg = styled.div<{ novelImg: string }>`
  /* 모바일 */
  padding-top: 135%;
  border-radius: 5%;
  background-image: url(${({ novelImg }) => novelImg});
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
  font-weight: 500;

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
  font-weight: 500;
  font-size: 14px;
`;
export const NovelInfoLineHeight = styled.div`
  line-height: 1.9;
`;
export const NovelInfo = styled.div``;
