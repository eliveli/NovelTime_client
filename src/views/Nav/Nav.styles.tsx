import theme, { styled } from "assets/styles/theme";
import { Link } from "react-router-dom";

import Icon from "../../assets/Icon";

interface Props {
  theme: { novelImg: string; userImg: string };
}

// 패딩 없애고 화면 가로 전체에 늘어나게 해야 함
export const NavTopBG = styled.header`
  border-bottom: 1px solid lightgray;

  z-index: 2;

  background-color: rgba(255, 255, 255, 0.9);

  width: 100%;
  position: sticky;
  top: 0;
`;
// 패딩 없애고 화면 가로 전체에 늘어나게 해야 함
export const NavBottomBG = styled.header`
  z-index: 2;

  box-shadow: 0 0 2px rgb(100 100 100 / 40%);

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
  height: 60px;

  padding: 0 20px;

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
export const NavContentBoxMobile = styled.nav<{
  isMainBottom?: true;
  isDetail?: true;
  isMsgList?: true;
}>`
  @media screen and (min-width: 1024px) {
    ${({ isMsgList }) => !isMsgList && `display: none;`}
  }

  width: 100%;
  max-width: 860px;
  margin: auto;
  height: 70px;

  ${({ isDetail }) => isDetail && `height: 50px;`}

  padding: 0 16px;

  // at tablet
  @media (min-width: 768px) {
    padding: 0 20px;
    ${({ isMsgList }) => isMsgList && `padding: 0 8px;`}
  }

  // 모바일용 하단 내비게이션 바는 패딩 없음

  ${({ isMainBottom }) =>
    isMainBottom &&
    ` padding: 0 0 2px 0;
      @media screen and (min-width:768px) {padding: 0 0 2px 0;}
      height: 60px;
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

export const CatWalkingContainer = styled.div`
  @media screen and (max-width: 1023px) {
    width: 30%;
    padding-right: 32px;
  }
  display: flex;
  overflow: hidden;
  justify-content: flex-end;
  align-items: center;
  ${document.body.offsetWidth > 512 && "justify-content: flex-start;"}
`;
export const CatWalking = styled.img`
  height: 50px;
`;

export const PageTitle = styled.div`
  display: flex;
  align-items: center;
`;
export const LogoContainer = styled.div`
  @media screen and (max-width: 1023px) {
    width: 40%;
    display: flex;
    justify-content: center;

    margin-right: 0;
    /* margin-right: -15px; */
  }
`;
export const Logo = styled.img`
  padding-top: 3px;
  @media screen and (max-width: 1023px) {
    padding-bottom: 3px;
    height: 60px;
  }
`;
export const NavContentPC = styled.div`
  display: flex;
  /* list-style: none; */
  /* padding-left: 0px; */
  width: 50%;
  height: 100%;
  /* margin: 0; */
`;
export const NavContent = styled.span<{ isCurrentPath?: boolean }>`
  width: 100%;
  /* text-align: center; */
  display: inline-flex;
  height: 100%;

  /* for PC Nav */
  ${({ isCurrentPath }) => isCurrentPath && `border-bottom: 2px solid ${theme.color.main};`}

  gap: 2px;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: black;
  justify-content: flex-end;

  @media screen and (min-width: 1024px) {
    justify-content: center;
  }

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;
    color: rgba(100, 100, 100, 0.8);`,
  )}
`;

export const NavImg = styled.img`
  width: 23px;
  height: 23px;
`;
export const NavText = styled.span<{ isActive: boolean }>`
  display: block;
  font-size: 13px;
  padding-bottom: 4px;
  ${({ isActive }) => isActive && `color:${theme.color.main};`}
`;

export const MyPageBtn = styled.button`
  text-decoration: none;
  color: black;

  padding: 3px 6px;
  /* padding: 7px 10px; */
  white-space: nowrap;
  font-size: 15px;
  font-weight: 600;

  margin-left: 5px;

  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  color: rgba(0, 0, 0, 0.6);

  @media screen and (min-width: 768px) {
    padding: 6px 8px;
  }

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;
    color: rgba(100, 100, 100, 0.8);`,
  )}
`;
export const LoginText = styled.button`
  text-decoration: none;
  color: black;

  margin-left: 8px;

  /* padding: 7px 10px; */
  padding: 6px 8px;

  font-size: 15px;
  font-weight: 600;

  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  color: rgba(0, 0, 0, 0.6);

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;
    color: rgba(100, 100, 100, 0.8);`,
  )}
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
export const LoginIconBox = styled(Icon.IconBox)`
  min-width: 27px;
  max-width: 27px;
  min-height: 27px;
  max-height: 27px;

  margin-left: 7px;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
export const BackIcon = styled(Icon.BigLeft)``;
export const ForwardIcon = styled(Icon.BigRight)``;
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

  color: rgba(100, 100, 100, 0.5);

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;
    color: rgba(100, 100, 100, 0.8);`,
  )}
`;
export const HeartIcon = styled(Icon.NavHeart)`
  color: rgba(100, 100, 100, 0.5);
`;
export const FillHeartIcon = styled(Icon.NavFillHeart)`
  color: rgba(100, 100, 100, 0.5);
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
  color: rgba(100, 100, 100, 0.5);
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
  color: rgba(100, 100, 100, 0.5);
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
export const IconsBox = styled.div<{ isLeft?: true; isRight?: true }>`
  display: flex;

  ${({ isLeft }) => isLeft && `margin-left: -6px; margin-top: -1px;`}
  ${({ isRight }) => isRight && `margin-right: -3px; margin-top: -2px;`}
`;
export const SubmitBtn = styled.button`
  padding: 7px 10px;
  font-size: 16px;
  font-weight: 600;
  /* margin-right: 1px; */

  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  color: rgba(0, 0, 0, 0.6);

  /* reset margin - from parent container of IconBox as isRight- */
  margin-right: 3px;
  margin-top: 2px;
`;
export const RightSideContnr = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 1023px) {
    width: 30%;
    display: flex;
    justify-content: flex-end;
  }
`;
export const SearchIconBox = styled(Icon.IconBox)`
  min-width: 27px;
  max-width: 27px;
  min-height: 27px;
  max-height: 27px;
`;
export const UserImg = styled.div<{ userImg: string }>`
  border-radius: 50%;
  min-width: 30px;
  height: 30px;
  background-image: url(${({ userImg }) =>
    userImg || "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png"});

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
export const UserName = styled.span`
  padding-left: 12px;
`;
