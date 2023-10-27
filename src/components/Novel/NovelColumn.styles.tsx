import theme, { styled } from "assets/styles/theme";

export const NovelLink = styled.div<{ isBorder?: true }>`
  display: flex;

  ${({ isBorder }) =>
    isBorder
      ? `
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 9px;
        padding: 12px;
    `
      : `
        padding: 12px 0;
        border-bottom: 1px solid rgba(100, 100, 100, 0.2);
        &:last-child { border-bottom: 0; }
  `}

  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      opacity: 0.7;
      color: rgba(100, 100, 100, 0.8);
    }
  }
`;

export const NovelInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  width: calc(100% - 70px); // 100% - (width in NovelImg)
  padding-left: 10px;
`;

export const NovelImg = styled.div<{ novelImg: string }>`
  height: 80px;
  min-width: 70px;
  border-radius: 5%;

  ${({ novelImg }) => !novelImg && `border: 1px solid #e5e5e5;`};

  background-image: url(${({ novelImg }) => novelImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
export const NovelTitle = styled.div`
  font-weight: 500;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  // To set ellipsis to grid item,
  //  "minmax(0, 1fr)" was set in "grid-template-columns: repeat(NUMBER, minmax(0, 1fr));" in its Grid Container <WritingSection>
`;
export const NovelSubInfoBox = styled.div`
  color: ${theme.color.textGray};
  font-weight: 500;
  font-size: 14px;
`;
export const NovelInfoLineHeight = styled.div`
  line-height: 1.9;
`;
export const NovelInfo = styled.div``;
