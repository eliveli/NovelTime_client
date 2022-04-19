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
   `}

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    padding: 0 20px 20px;
    ${({ isMessageList }) => isMessageList && `padding-bottom:0;`}
  }

  @media screen and (max-width: 1023px) {
    // at mobile and tablet, 메인리스트 페이지에서 하단 내비게이션 만큼 margin-bottom 설정
    ${["/", "/talk_list", "/recommend_list", "/novel_list", "/message_list"].includes(pathname) &&
    "margin-bottom: 60px;"}
  }

  max-width: 860px;
`;
export default MainBG;
