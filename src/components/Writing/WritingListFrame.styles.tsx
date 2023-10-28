import theme, { styled } from "assets/styles/theme";

export const ColumnBG = styled.article`
  margin-bottom: 14px; // 나중에 페이지 전체적으로 파트 별 간격 맞추기
  position: relative;
`;
export const ColumnListContainer = styled.div`
  padding: 0;
`;
export const WritingTabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 0 6px; // bottom 6px, WritingTab's box-shadow 6px
`;
export const WritingTab = styled.div<{ isTalk: boolean }>`
  width: 50%;
  text-align: center;

  ${({ isTalk }) => isTalk && "box-shadow: 0 0 6px rgb(0 0 0 / 14%);"}
  ${({ isTalk }) =>
    !isTalk &&
    "border-top: 1px solid rgba(100, 100, 100, 0.2); border-bottom: 1px solid rgba(100, 100, 100, 0.2);"}

  @media screen and (max-width: 767px) {
    padding: 5px 0;
  }
  @media screen and (min-width: 768px) {
    padding: 10px 0;
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
  text-align: center;
  border-bottom: 2px dashed rgba(150, 150, 150, 0.3);
  margin: 18px 0;

  ${theme.media.mobile(`
    font-size: 18px;
  `)}

  ${theme.media.tablet(`
    font-size: 20px;
  `)}
`;

export const ButtonsContainer = styled.div`
  position: absolute;
  top: 17px;
  left: 203px;
  display: flex;
  gap: 8px;
`;

export const ButtonContainer = styled.div<{ isForMyList?: true }>`
  border-radius: 11px;
  gap: 5px;

  display: flex;
  justify-content: center;

  height: 34px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  align-items: flex-end;

  ${({ isForMyList }) =>
    isForMyList &&
    `padding: 4px 7px 4px 3px;  
  `}

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;`,
  )}

  @media (max-width: 767px) {
    ${({ isForMyList }) =>
      isForMyList
        ? `padding: 4px 3px;
          `
        : `padding: 4px 7px;`}
  }

  @media (min-width: 768px) {
    padding: 4px 7px;
  }
`;
export const ButtonText = styled.span`
  color: #808080c4;
  font-size: 14px;
  font-weight: 500;
  margin-top: 1px;
`;
