import theme, { styled } from "assets/styles/theme";
import { Link } from "react-router-dom";

import Icon from "../../assets/Icon";

interface Props {
  theme: { novelImg: string; userImg: string };
}

// 패딩 없애고 화면 가로 전체에 늘어나게 해야 함
export const NavTopBG = styled.header`
  border-bottom: 2px solid gray;

  z-index: 1;

  background-color: rgba(255, 255, 255, 0.9);

  width: 100%;
  position: sticky;
  top: 0;
`;
// 패딩 없애고 화면 가로 전체에 늘어나게 해야 함
export const NavBottomBG = styled.header`
  z-index: 1;

  background-color: rgba(255, 255, 255, 0.9);
  width: 100%;
  position: fixed;
  bottom: 0;
`;

// 층별 내비게이션에 배경 입히려면 추가 컴포넌트 필요
// 아래는 컨텐트 정렬용(화면 중앙 또는 전체(모바일,태블릿))
export const NavContentBoxPC = styled.nav`
  @media screen and (max-width: 1023px) {
    display: none;
  }
  width: 100%;
  max-width: 860px;
  margin: auto;
  height: 50px;

  padding: 0 26px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  /* position: relative; */

  /* 태블릿 */
  /* @media screen and (min-width: 768px) { */
  /* max-width: ${860 - 2 * 26}px; */
  /* padding: 0 20px 26px; */
  // 내부 컨테이너와 합해 좌우 26px 설정 : row 이미지 슬라이드 시 양끝 화살표 버튼 공간 필요
  /* } */
`;
// 층별 내비게이션에 배경 입히려면 추가 컴포넌트 필요
// 아래는 컨텐트 정렬용(화면 중앙 또는 전체(모바일,태블릿))
export const NavContentBoxMobile = styled.nav<{ isNotPadding?: boolean }>`
  @media screen and (min-width: 1024px) {
    display: none;
  }

  width: 100%;
  max-width: 860px;
  margin: auto;
  height: 50px;
  padding: 0 16px;
  //하위 컴포넌트인 NovelRow 컴포넌트의 NovelContainer 좌우 양끝 6px 있음. 감안해서 계산
  ${theme.media.tablet(`
    padding: 0 26px; 
  `)}

  // 모바일용 하단 내비게이션 바는 패딩 없음

  ${({ isNotPadding }) =>
    isNotPadding &&
    `padding: 0;
      @media screen and (min-width:768px) {padding: 0;}
   `}
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* position: relative; */

  /* @media screen and (min-width: 768px) { */
  /* max-width: ${860 - 2 * 26}px; */
  /* padding: 0 20px 26px; */
  // 내부 컨테이너와 합해 좌우 26px 설정 : row 이미지 슬라이드 시 양끝 화살표 버튼 공간 필요
  /* } */
`;

export const Logo = styled.div``;
export const NavContentPC = styled.div`
  display: flex;
  /* list-style: none; */
  /* padding-left: 0px; */
  width: 50%;
  height: 100%;
  /* margin: 0; */
`;
export const NavContent = styled(Link)<{ isBorderTop?: boolean; isCurrentPath: boolean }>`
  width: 100%;
  /* text-align: center; */
  display: inline-flex;
  height: 100%;

  ${({ isCurrentPath, isBorderTop }) =>
    isCurrentPath && !isBorderTop && "border-bottom: 2px solid gray;"}
  ${({ isCurrentPath, isBorderTop }) =>
    isCurrentPath && isBorderTop && "border-top: 2px solid gray;"}

  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: black;

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;
    color: rgba(100, 100, 100, 0.8);`,
  )}
`;

export const MyPageBtn = styled(Link)`
  text-decoration: none;
  color: black;

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;
    color: rgba(100, 100, 100, 0.8);`,
  )}
`;
export const LeftIcon = styled(Icon.BigLeft)`
  width: 100%;
  height: 100%;
  color: rgba(100, 100, 100, 0.5);

  /* 태블릿, PC */
  @media screen and (min-width: 768px) {
  }
`;
export const LeftIconBox = styled.div`
  width: 32px;
  height: 32px;
  ${theme.media.tablet(`
    width: 35px;
    height: 35px;
    margin-right: 7px;
  `)}
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;
    color: rgba(100, 100, 100, 0.8);`,
  )}
`;
export const HeartIcon = styled(Icon.NavHeart)`
  width: 100%;
  height: 100%;
  color: rgba(100, 100, 100, 0.5);
  /* margin: auto 0 auto 6px; */

  /* 태블릿, PC */
  @media screen and (min-width: 768px) {
    /* margin-left: 8px; */
  }
`;
export const FillHeartIcon = styled(Icon.NavFillHeart)`
  width: 100%;
  height: 100%;
  color: rgba(100, 100, 100, 0.5);
  /* margin: auto 0 auto 6px; */

  /* 태블릿, PC */
  @media screen and (min-width: 768px) {
    /* margin-left: 8px; */
  }
`;
export const HeartIconBox = styled.div`
  width: 32px;
  height: 32px;
  ${theme.media.tablet(`
    width: 35px;
    height: 35px;
    margin-right: 10px;
  `)}
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 6px;

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;
    color: rgba(100, 100, 100, 0.8);`,
  )}
`;
export const ShareIcon = styled(Icon.Share)`
  padding-top: 2px;
  width: 100%;
  height: 100%;
  color: rgba(100, 100, 100, 0.5);
  /* margin: auto 0 auto 6px; */

  /* 태블릿, PC */
  @media screen and (min-width: 768px) {
    /* margin-left: 8px; */
  }
`;
export const ShareIconBox = styled.div`
  width: 32px;
  height: 32px;
  ${theme.media.tablet(`
    width: 35px;
    height: 35px;
  `)}
  display: flex;
  align-items: center;
  justify-content: center;

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;
    color: rgba(100, 100, 100, 0.8);`,
  )}
`;
export const HomeIcon = styled(Icon.Home)`
  padding-bottom: 2px;
  padding-top: 1px;
  width: 100%;
  height: 100%;
  color: rgba(100, 100, 100, 0.5);
  /* margin: auto 0 auto 6px; */

  /* 태블릿, PC */
  @media screen and (min-width: 768px) {
    /* margin-left: 8px; */
  }
`;
export const HomeIconBox = styled.div`
  width: 32px;
  height: 32px;
  ${theme.media.tablet(`
    width: 35px;
    height: 35px;
  `)}
  display: flex;
  align-items: center;
  justify-content: center;

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;
    color: rgba(100, 100, 100, 0.8);`,
  )}
`;
export const IconsBox = styled.div`
  display: flex;
`;
