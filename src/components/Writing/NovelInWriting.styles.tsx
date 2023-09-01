import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

export const NovelSpace = styled.div<{ recommend: boolean }>`
  width: 100%;
  padding: 0 20px;
  ${theme.media.mobile(`
      padding: 0 12px;
  `)}

  ${({ recommend }) => recommend && "padding:0 0 20px 0;"}
  ${({ recommend }) =>
    recommend &&
    theme.media.mobile(`
      padding: 0 0 12px 0;
  `)}
`;
export const NovelContainer = styled.div<{ recommend: boolean }>`
  margin: 0 auto;
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 0 3px rgb(0 0 0 / 20%);

  @media screen and (min-width: 500px) {
    ${({ recommend }) => !recommend && "max-width: 500px;"}
  }
`;

export const NovelDetailContainer = styled.div`
  padding: 0 12px;
  border-top: 1px solid rgba(220, 220, 220, 0.5);
`;
export const NovelTitle = styled.p`
  margin: 0 1px 0 0;
  color: rgba(100, 100, 100, 0.8);
  font-weight: 500;
`;
export const NovelTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
`;
export const DownIconBox = styled(Icon.IconBox)`
  pointer-events: none;
`;
export const DownIcon = Icon.SmallDown;
export const UpIcon = Icon.SmallUp;
