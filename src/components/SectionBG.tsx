import { styled } from "assets/styles/theme";

const { pathname } = window.location;
export const SectionBG = styled.main<{ isWritingDetail?: true; isMessageRoom?: true }>`
  /* 모바일 */
  width: 100%;
  margin: 0 auto;
  padding: 0 ${16}px 16px;

  background-color: white;
  border-top: 2px solid gray;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    padding: 0 20px 20px;
  }

  ${({ isWritingDetail }) =>
    isWritingDetail &&
    ` padding: 10px;
      @media screen and (min-width: 768px) {
        padding: 20px;
      }
   `}
  ${({ isMessageRoom }) =>
    isMessageRoom &&
    `  margin-bottom: 88px; 
   `}// it is for the space of textarea of message

  @media screen and (max-width: 1023px) {
    // 데스크탑 제외, 메인리스트 페이지에서 하단 내비게이션 만큼 margin-bottom 설정
    ${["/talk_list", "/recommend_list", "/novel_list", "/message_list"].includes(pathname) &&
    "margin-bottom: 50px;"}
  }
  /* PC - 모바일,태블릿과 뷰를 다르게 구성 */
  max-width: 860px;
`;
export default SectionBG;
