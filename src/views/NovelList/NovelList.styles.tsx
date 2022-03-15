// /* eslint-disable */

import { styled } from "assets/styles/theme";
import Icon from "../../assets/Icon";

export const CategoryContainer = styled.div`
  padding: 0 6px;
  display: flex;
  align-items: flex-end;
`;
export const CategoryDesc = styled.p`
  margin-bottom: 0;
`;
export const ShowAllContainer = styled.div`
  display: flex;
  align-items: center;
  margin: auto 0 0 auto;
`;
export const ShowAllText = styled.span`
  /* margin: auto 0 0 auto; */
`;
export const ShowAllIcon = styled(Icon.BigRight)`
  /* margin: auto 0 0 6px; */
  margin-left: 6px;
`;

export const RowBG = styled.article``;

export const LeftIcon = styled.div`
  // 모바일, 태블릿은 아이콘 없음
  @media screen and (max-width: 1023px) {
    display: none;
  }

  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);

  position: absolute;
  width: 30px;
  height: 30px;
  left: -${30 / 2 - 6}px;
  top: ${168.22 / 2 - 30 / 2 + 12}px; // + 12px 은 이미지 위쪽 패딩임

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background-color: rgba(150, 150, 150, 0.3);
    }
  }
`;
export const RightIcon = styled.div`
  // 모바일, 태블릿은 아이콘 없음
  @media screen and (max-width: 1023px) {
    display: none;
  }

  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);

  position: absolute;
  width: 30px;
  height: 30px;
  right: -${30 / 2 - 6}px;
  top: ${168.22 / 2 - 30 / 2 + 12}px;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background-color: rgba(150, 150, 150, 0.3);
    }
  }
`;
export const SlideLeft = styled(Icon.SmallLeft)`
  width: 100%;
  height: 100%;
  @media (hover: hover) {
    &:hover {
      color: rgba(0, 0, 0, 0.3);
    }
  }
`;
export const SlideRight = styled(Icon.SmallRight)`
  width: 100%;
  height: 100%;
  @media (hover: hover) {
    &:hover {
      color: rgba(0, 0, 0, 0.3);
    }
  }
`;

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
export const RowAlbumContainer = styled.div`
  /* 모바일 */
  overflow-x: scroll;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  /* 태블릿 */
  @media screen and (min-width: 768px) {
    /* position: relative; */
  }
  /* PC */
  @media screen and (min-width: 1024px) {
    overflow: hidden;
  }
`;

// 1.앨범 컨테이너는 자식인 앨범의 위치값이 (0,0) 일 때 (디폴트값) 앨범 전체 스크롤 가능.
// 2.컨테이너 안에 있는 앨범의 위치를 이동할 경우(translate)
//   앨범 컨테이너는 앨범의 이동 위치를 최소값으로 오른쪽으로만 앨범 스크롤 가능
//   - 이동한 위치의 왼쪽은 스크롤 불가
export const RowAlbum = styled.div<{ moveX: number }>`
  /* 모바일 */
  display: flex; // children 요소인 작품을 가로 방향으로 나열

  /* 태블릿 */
  @media screen and (min-width: 768px) {
  }
  /* PC */
  @media screen and (min-width: 1024px) {
    position: relative;

    transition-duration: 0.9s;
    transform: translate(${({ moveX }) => moveX}px, 0);
  }
`;
export const RowSlideContainer = styled.div`
  /* 태블릿 */
  @media screen and (min-width: 768px) {
    position: relative;
  }
  /* PC */
  @media screen and (min-width: 1024px) {
  }
`;
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
