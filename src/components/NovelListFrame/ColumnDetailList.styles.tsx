import { styled } from "assets/styles/theme";

export const ColumnBG = styled.article``;
export const ColumnListContainer = styled.div`
  /* padding-left: 6px; */
  /* padding-right: 6px; */
  // 좌우 6px 추가해 부모 컨테이너(NovelsBG) 내부 padding 최종적으로 16px 적용
  // 부모컨테이너에서 6px 뺐기 때문에
  // (: NovelRow 컴포넌트의 NovelContainer 좌우 양끝 6px 고려한 것)
  // 하위 컴포넌트인 ColumnBG에 좌우 6px padding 추가
`;
