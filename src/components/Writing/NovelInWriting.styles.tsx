import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

export const NovelSpace = styled.div<{ isRecommend?: true }>`
  width: 100%;

  @media (max-width: 767px) {
    padding: ${({ isRecommend }) => (isRecommend ? `0 0 12px 0` : `0 12px`)};
  }

  @media (min-width: 768px) {
    padding: ${({ isRecommend }) => (isRecommend ? "0 0 20px 0" : `0 20px`)};
  }
`;
export const NovelContainer = styled.div<{ isRecommend?: true }>`
  margin: 0 auto;
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 0 3px rgb(0 0 0 / 20%);

  @media screen and (min-width: 500px) {
    ${({ isRecommend }) => !isRecommend && "max-width: 500px;"}
  }
`;

export const NovelDetailContainer = styled.div`
  padding: 0 12px;
  border-top: 1px solid rgba(220, 220, 220, 0.5);
`;
export const NovelTitle = styled.p`
  margin: 0;
  color: rgba(100, 100, 100, 0.8);
  font-weight: 500;
`;
export const NovelTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 6px 6px 12px;

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;`,
  )}
`;
export const DownIconBox = styled(Icon.IconBox)`
  pointer-events: none;
`;
export const DownIcon = Icon.SmallDown;
export const UpIcon = Icon.SmallUp;
