import { styled } from "assets/styles/theme";

export const NovelLink = styled.div<{ isBorder?: true }>`
  display: flex;

  padding: 12px 0;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.7;
      color: rgba(100, 100, 100, 0.8);
    }
  }

  /* 태블릿 */
  @media screen and (min-width: 768px) {
  }

  ${({ isBorder }) =>
    isBorder
      ? `
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: 9px;
      padding: 12px;
    `
      : `
      border-bottom: 1px solid rgba(100, 100, 100, 0.2);
      &:last-child { border-bottom: 0; }
  `}
`;
export const NovelInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 10px;

  /* 태블릿 , PC */
  @media screen and (min-width: 768px) {
  }
`;

export const NovelImg = styled.div<{ novelImg: string }>`
  /* 모바일 */
  height: 80px;
  min-width: 70px;
  border-radius: 5%;

  ${({ novelImg }) => !novelImg && `border: 1px solid #e5e5e5;`};

  background-image: url(${({ novelImg }) => novelImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    /* height: 100px; */
  }
  /* PC */
  @media screen and (min-width: 1024px) {
  }
`;
export const NovelTitle = styled.div<{ infoWidth: number }>`
  font-weight: 500;

  // 줄 넘어가면 ... 표시
  display: inline-block;
  width: ${(props) => props.infoWidth || 248}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const NovelSubInfoBox = styled.div`
  color: ${(props) => props.theme.color.textGray};
  font-weight: 500;
  font-size: 14px;
`;
export const NovelInfoLineHeight = styled.div`
  line-height: 1.9;
`;
export const NovelInfo = styled.div``;
