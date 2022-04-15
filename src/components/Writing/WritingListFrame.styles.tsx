import theme, { styled } from "assets/styles/theme";

export const ColumnBG = styled.article`
  margin-bottom: 14px; // 나중에 페이지 전체적으로 파트 별 간격 맞추기

  position: relative;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
  }
  /* PC - 모바일,태블릿과 뷰를 다르게 구성 */
  @media screen and (min-width: 1024px) {
  }
`;
export const ColumnListContainer = styled.div`
  padding: 0;
  /* padding-left: 6px; */
  /* padding-right: 6px; */
  // 부모컨테이너에서 6px 뺐기 때문에
  // (: NovelRow 컴포넌트의 NovelContainer 좌우 양끝 6px 고려한 것)
  // 하위 컴포넌트인 ColumnBG에 좌우 6px padding 추가
`;
export const AddWritingContainer = styled.div`
  position: absolute;
  top: 14px;
  left: 162px;
`;
export const AddWriting = styled.img`
  width: 35px;
  height: 35px;
`;
export const WritingTabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 0 6px; // bottom 6px, WritingTab's box-shadow 6px
  /* margin: 12px 6px 6px; // bottom 6px, WritingTab's box-shadow 6px */
`;
export const WritingTab = styled.div<{ isTalk: boolean }>`
  width: 50%;
  text-align: center;
  padding: 5px 0;

  ${({ isTalk }) => isTalk && "box-shadow: 0 0 6px rgb(0 0 0 / 14%);"}
  ${({ isTalk }) =>
    !isTalk &&
    "border-top: 1px solid rgba(100, 100, 100, 0.2); border-bottom: 1px solid rgba(100, 100, 100, 0.2); "}

  @media screen and (min-width: 768px) {
    padding: 10px 0;
    /* ${({ isTalk }) => isTalk && "box-shadow: 0 0 6px rgb(0 0 0 / 14%); "} */
  }

  ${theme.media.hover(`
    cursor: pointer;
    color: rgb(72 72 72);
    opacity: 0.8;
    background-color: rgba(200, 200, 200, 0.2);
  `)}
`;
export const WritingTabText = styled.h3`
  display: inline;
  font-size: 18px;
  text-align: center;
  border-bottom: 2px dashed rgba(150, 150, 150, 0.3);
  margin: 18px 0;

  ${theme.media.tablet(`
    font-size: 20px;
  `)}
`;
