import { styled } from "assets/styles/theme";

const { pathname } = window.location;
export const MainBG = styled.main<{
  isWritingDetail?: true;
  isMessageList?: true;
}>`
  /* 모바일 */
  width: 100%;
  margin: 0 auto;
  padding: 0 ${16}px 16px;
  ${({ isMessageList }) => isMessageList && `padding-bottom:0;`}

  background-color: white;

  ${({ isWritingDetail }) =>
    isWritingDetail &&
    ` padding: 10px;

      @media screen and (min-width: 768px) {
        padding: 20px;
      }

      // * this doesn't work
      // *     @media screen and (max-width: 820px) {
      // *       padding-bottom: 0px;
      // *     }
      // *  for a component for writing comment in free-talk detail page in mobile and some tablet screen
      // *
      // * I wanted to fit the component to the bottom of the screen, but I couldn't
      // * it only worked when scroll-y bar existed
      // * it couldn't work
      // *   when scroll-y bar didn't exist
      // *        and the height of canvas element that I never created but existed and was the first child of html element
      // *                       was longer than html element
   `}

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    padding: 0 20px 20px;
    ${({ isMessageList }) => isMessageList && `padding-bottom:0;`}
  }

  @media screen and (max-width: 1023px) {
    // at mobile and tablet, 메인리스트 페이지에서 하단 내비게이션 만큼 margin-bottom 설정
    ${["/", "/talk-list", "/recommend-list", "/novel-list", "/message-list"].includes(pathname) &&
    "margin-bottom: 60px;"}
  }

  max-width: 860px;
`;
export default MainBG;
