import { styled } from "assets/styles/theme";
// import { Link } from "react-router-dom";
import Icon from "../../assets/Icon";

interface Props {
  theme: { novelImg: string; userImg: string };
}

export const NovelsBG = styled.section`
  /* 모바일 */
  width: 100%;
  margin: 0 auto;
  padding: 0 ${16 - 6}px 16px;
  //하위 컴포넌트인 NovelRow 컴포넌트의 NovelContainer 좌우 양끝 6px 있음. 감안해서 계산

  background-color: white;
  border-top: 2px solid gray;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    padding: 0 20px 26px;
    // 내부 컨테이너와 합해 좌우 26px 설정 : row 이미지 슬라이드 시 양끝 화살표 버튼 공간 필요
  }
  /* PC - 모바일,태블릿과 뷰를 다르게 구성 */
  @media screen and (min-width: 1024px) {
    width: 860px;
  }
`;
export const NovelContainer = styled.div`
  width: 100%;

  padding: 12px 6px;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
  }
`;

export const NovelMainInfo = styled.div`
  display: flex;
  width: 100%;

  padding: 3px 0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);

  /* 태블릿 */
  @media screen and (min-width: 768px) {
  }
`;
export const NovelDescBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 3px 0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
`;
export const NovelDescPart = styled.div`
  padding: 5px 3px 5px 7px;

  //2줄 넘어가는 텍스트 ...표시
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  white-space: normal;
  height: 58px; //화면 보며 조정
  text-align: left;
  word-wrap: break-word;
`;
export const NovelDescAll = styled.div`
  width: 100%;
  padding: 5px 3px 5px 7px;

  overflow: scroll;
  height: 120px; //화면 보며 조정

  white-space: pre-line; // line break 적용

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    white-space: pre-wrap; // line break with tab
  }

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const DownIconBox = styled.div`
  margin-top: 8px;
  z-index: 1;

  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);

  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;

  @media screen and (min-width: 768px) {
    margin-top: auto;
    margin-left: 3px;
  }

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background-color: rgba(150, 150, 150, 0.3);
    }
  }
`;

export const UpIconBox = styled.div`
  margin-top: 8px;
  z-index: 1;

  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);

  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;

  @media screen and (min-width: 768px) {
    margin-top: auto;
    margin-left: 3px;
  }
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
export const NovelPlatformBox = styled.div`
  padding: 3px 0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
`;
export const NovelInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 10px;
  width: 100%;

  /* 태블릿 , PC */
  @media screen and (min-width: 768px) {
  }
`;

export const NovelImg = styled.div<Props>`
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
export const NovelInfoLineHeight = styled.div`
  line-height: 1.9;
`;
export const NovelInfo = styled.div``;

export const ColumnBG = styled.article`
  /* 모바일 */

  /* 태블릿 */
  @media screen and (min-width: 768px) {
  }
  /* PC - 모바일,태블릿과 뷰를 다르게 구성 */
  @media screen and (min-width: 1024px) {
  }
`;
export const ColumnListContainer = styled.div`
  padding-left: 6px;
  padding-right: 6px;
  // 좌우 6px 추가해 부모 컨테이너(NovelsBG) 내부 padding 최종적으로 16px 적용
  // 부모컨테이너에서 6px 뺐기 때문에
  // (: NovelRow 컴포넌트의 NovelContainer 좌우 양끝 6px 고려한 것)
  // 하위 컴포넌트인 ColumnBG에 좌우 6px padding 추가
`;
