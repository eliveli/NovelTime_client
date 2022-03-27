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

export const ClosingBox = styled(Icon.IconBox)`
  z-index: 1;

  align-self: flex-end;
  /* border-radius: 50%; */
  background-color: rgba(255, 255, 255, 0.9);
  border: 3px double rgba(150, 150, 150, 0.3);
  border-radius: 7px;
  padding: 4px;

  position: absolute;
  top: 0;
  right: 0;

  min-width: 30px;
  max-width: 30px;
  min-height: 30px;
  max-height: 30px;

  ${theme.media.tablet(`
    padding: 6px;
    min-width: 40px;
    max-width: 40px;
    min-height: 40px;
    max-height: 40px;
`)}

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background-color: rgba(150, 150, 150, 0.3);
    }
  }
`;
export const ClosingIcon = styled(Icon.Close)`
  opacity: 0.3;
  @media (hover: hover) {
    &:hover {
      color: rgba(0, 0, 0, 0.3);
    }
  }
`;

export const SortMobileBG = styled.div`
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
    selectedCategory === category && "border: 2px solid rgba(0,0,0,0.2);"}
`;
