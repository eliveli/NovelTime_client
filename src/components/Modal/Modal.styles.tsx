import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

export const NovelImgBG = styled.div`
  position: fixed;
  z-index: 3;
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;

  ${theme.hideScrollBar}
`;
export const NovelImgContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;

  position: relative;
  ${theme.media.tablet(`
    width: auto;
    height:100%;
  `)}/* position: static; */
`;

export const NovelImgBig = styled.img`
  /* div로 가로세로 비율 맞출 때 */
  /* padding-top: 135%; //카카오페이지 */
  /* padding-top: 146%; //시리즈, 리디북스 */

  width: 100%;
  ${theme.media.tablet(`
    width: auto;
    height: 100%;
 `)}
`;
// export const NovelImgBig = styled.div<{ src: string }>`
//   /* padding-top: 135%; //카카오페이지 */
//   /* padding-top: 146%; //시리즈, 리디북스 */
//   /* padding-top: ${({ src }) => (src.includes("dn-img-page.kakao.com") ? "135%" : "146%")}; */

//   background-image: url(${({ src }) => src});
//   background-position-y: top;
//   background-repeat: no-repeat;
//   background-size: cover;
//   width: 100%;
//   ${theme.media.tablet(`
//     width: auto;
//     height: 100%;
//  `)}
// `;

export const ClosingBox = styled(Icon.IconBox)<{ isSmallWidth?: true }>`
  z-index: 1;

  position: absolute;
  top: 1px;
  right: 1px;

  padding: 4px;
  align-self: flex-end;
  background-color: rgba(255, 255, 255, 0.9);
  border: 3px double rgba(150, 150, 150, 0.2);
  border-radius: 7px;

  min-width: 30px;
  max-width: 30px;
  min-height: 30px;
  max-height: 30px;

  @media screen and (min-width: 768px) {
    padding: 6px;
    min-width: 40px;
    max-width: 40px;
    min-height: 40px;
    max-height: 40px;
    ${({ isSmallWidth }) =>
      isSmallWidth &&
      `
        padding: 4px;
        min-width: 30px;
        max-width: 30px;
        min-height: 30px;
        max-height: 30px;
      `}
  }

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background-color: rgba(150, 150, 150, 0.3);
    }
  }
`;
export const ClosingIcon = styled(Icon.Close)`
  opacity: 0.24;
`;

export const MobileBG = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 3;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;

  ${theme.media.tablet(`
    display: none;
  `)}
`;
export const ClosingSpace = styled.div`
  width: 100%;
  height: 100%;
`;
export const SortBox = styled.div`
  bottom: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
`;
export const SortText = styled.p<{ selectedCategory: string; category: string }>`
  padding: 10px 0;
  ${({ selectedCategory, category }) =>
    selectedCategory === category && `color: ${theme.color.main};`}
`;
export const TranslucentBG = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 54px;
  background-color: white;
  position: relative;
  border-radius: 7px;
`;
export const LoginCategoryContnr = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const LoginCategory = styled.button<{ isKaKao?: true }>`
  padding: 13px 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 20px;
  font-size: 17px;
  font-weight: 500;
  background-color: white;
  /* color: ${theme.color.main}; */
  /* border: 1px solid ${theme.color.mainLight}; */
  /* color: rgba(100, 100, 100, 0.8); */

  /* border: 1px solid rgba(0, 0, 0, 0.2); */
  border: 0;

  ${({ isKaKao }) =>
    isKaKao
      ? `color: rgb(211 185 0 / 76%); box-shadow: 0 0 4px rgb(250 225 0 / 90%);`
      : `    color: rgba(3,199,90,0.7); box-shadow: 0 0 4px rgba(3, 199, 90, 0.5); `};
`;
export const LoginTitle = styled.h3`
  margin: 0;
  text-align: center;
  margin-bottom: 30px;
  color: rgba(100, 100, 100, 0.8);
  font-weight: 500;
`;
export const ContentContnr = styled.div``;
export const LoginIconBox = styled(Icon.IconBox)<{ isKaKao?: true }>`
  margin-right: 10px;

  ${({ isKaKao }) =>
    isKaKao
      ? ` background-color: rgba(250, 225, 0,0.6);
    color: rgba(60, 30, 30,0.7); padding: 2px;
    border-radius: 3px;`
      : `color: rgba(3, 199, 90, 0.6);`}
`;
export const LogoContnr = styled.div`
  opacity: 0.8;
  margin-top: 31px;
`;
export const Logo = styled.img``;
