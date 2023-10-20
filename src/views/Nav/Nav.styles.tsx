import theme, { styled } from "assets/styles/theme";
import { Img } from "store/serverAPIs/types";
import Icon from "../../assets/Icon";

export const NavTopBG = styled.header<{ isChatRoom?: true }>`
  border-bottom: ${({ isChatRoom }) =>
    isChatRoom ? "2px solid rgba(50,50,50,0.1)" : "1px solid lightgray"};

  z-index: 2;

  background-color: rgba(255, 255, 255, 0.9);

  width: 100%;
  position: sticky;
  top: 0;
`;

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
`;

// 층별 내비게이션에 배경 입히려면 추가 컴포넌트 필요
// 아래는 컨텐트 정렬용(화면 중앙 또는 전체(모바일,태블릿))
export const NavContentBoxMobile = styled.nav<{
  isMainBottom?: true;
  isDetail?: true;
}>`
  @media screen and (min-width: 1024px) {
    display: none;
  }

  width: 100%;
  max-width: 860px;
  margin: auto;

  height: ${({ isDetail, isMainBottom }) => {
    if (isDetail) return 50;
    if (isMainBottom) return 60;
    return 70;
  }}px;

  padding: ${({ isMainBottom }) => (isMainBottom ? `0 0 2px 0` : `0 16px`)};

  // on tablet
  @media screen and (min-width: 768px) {
    padding: ${({ isMainBottom }) => (isMainBottom ? "0 0 2px 0" : "0 20px")};
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ChatRoomNavContainer = styled.nav`
  width: 100%;
  max-width: 860px;
  margin: auto;
  height: 50px;

  padding: 0 16px;

  // on tablet
  @media (min-width: 768px) {
    padding: 0 8px;
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
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

export const PageTitle = styled.div<{ isHover?: true }>`
  display: flex;
  align-items: center;

  ${({ isHover }) =>
    isHover &&
    theme.media.hover(
      `cursor: pointer;
      opacity: 0.7;`,
    )}
`;
export const LogoContainer = styled.div`
  @media screen and (max-width: 1023px) {
    width: 40%;
    display: flex;
    justify-content: center;

    margin-right: 0;
  }
`;
export const Logo = styled.img`
  padding-top: 3px;
  @media screen and (max-width: 1023px) {
    padding-bottom: 3px;
    height: 60px;
  }

  ${theme.media.hover(
    `cursor: pointer;
     opacity: 0.7;`,
  )}
`;
export const NavContentPC = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
`;
export const NavContent = styled.span<{
  isCurrentPath?: boolean;
  isMessageCategory: boolean;
  isPostPage?: boolean;
}>`
  width: 100%;
  display: inline-flex;
  height: 100%;

  /* for PC Nav */
  ${({ isCurrentPath }) => isCurrentPath && `border-bottom: 2px solid ${theme.color.main};`}

  ${({ isMessageCategory }) => isMessageCategory && `position: relative;`}

  gap: 2px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  @media screen and (min-width: 1024px) {
    justify-content: center;
  }

  ${({ isPostPage }) =>
    !isPostPage &&
    theme.media.hover(
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

export const MyPageTablet = styled.button`
  padding: 3px 6px;
  white-space: nowrap;
  font-size: 15px;
  font-weight: 500;

  margin-left: 5px;

  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  color: rgba(0, 0, 0, 0.6);

  @media screen and (min-width: 768px) {
    padding: 6px 8px;
  }

  @media screen and (max-width: 767px) {
    display: none;
  }

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;
    color: rgba(100, 100, 100, 0.8);`,
  )}
`;
export const LoginText = styled.button`
  margin-left: 8px;

  padding: 6px 8px;

  font-size: 15px;
  font-weight: 500;

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

  min-width: 34px;

  ${({ isLeft }) => isLeft && `margin-left: -6px; margin-top: -1px;`}
  ${({ isRight }) => isRight && `margin-right: -3px; margin-top: -2px;`}
`;
export const SubmitBtn = styled.button`
  padding: 7px 10px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  color: rgba(0, 0, 0, 0.6);

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;`,
  )}

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

export const UserImg = styled.div<{ userImg: Img }>`
  border-radius: 50%;
  min-width: 30px;
  height: 30px;

  ${({ userImg }) => !userImg.src && `border: 1px solid #e5e5e5;`};

  background-image: url(${({ userImg }) => userImg.src});
  background-position: ${({ userImg }) => userImg.position || "center"};
  background-repeat: no-repeat;
  background-size: cover;
`;

export const MyPageMobile = styled.div<{ userImg: Img }>`
  min-width: 27px;
  max-width: 27px;
  min-height: 27px;
  max-height: 27px;

  margin-left: 7px;

  border-radius: 50%;

  ${({ userImg }) => !userImg.src && `border: 1px solid #e5e5e5;`};

  background-image: url(${({ userImg }) => userImg.src});
  background-position: ${({ userImg }) => userImg.position || "center"};
  background-repeat: no-repeat;
  background-size: cover;

  @media screen and (min-width: 768px) {
    display: none;
  }

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;
    color: rgba(100, 100, 100, 0.8);`,
  )}
`;

export const UserName = styled.span`
  padding-left: 4px;
`;
