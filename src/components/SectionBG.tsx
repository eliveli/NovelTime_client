import { styled } from "assets/styles/theme";

export const SectionBG = styled.section`
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
  @media screen and (min-width: 860px) {
    width: 860px;
  }
`;
export default SectionBG;
