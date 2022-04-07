import { styled } from "assets/styles/theme";

const { pathname } = window.location;
export const SectionBG = styled.main<{
  isWritingDetail?: true;
  isMessageList?: true;
}>`
  /* 모바일 */
  width: 100%;
  margin: 0 auto;
  padding: 0 ${16}px 16px;
  ${({ isMessageList }) => isMessageList && `padding-bottom:0;`}

  background-color: white;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    padding: 0 20px 20px;
    ${({ isMessageList }) => isMessageList && `padding-bottom:0;`}
  }

  ${({ isWritingDetail }) =>
    isWritingDetail &&
    ` padding: 10px;
      @media screen and (min-width: 768px) {
        padding: 20px;
      }
   `}

  @media screen and (max-width: 1023px) {
    // at mobile and tablet, 메인리스트 페이지에서 하단 내비게이션 만큼 margin-bottom 설정
    ${["/talk_list", "/recommend_list", "/novel_list", "/message_list"].includes(pathname) &&
    "margin-bottom: 60px;"}
  }
  /* PC - 모바일,태블릿과 뷰를 다르게 구성 */
  max-width: 860px;
`;
export default SectionBG;
