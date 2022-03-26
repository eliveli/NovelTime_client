import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

export const NovelSpace = styled.div`
  width: 100%;
  padding: 0 20px;
  ${theme.media.mobile(`
      padding: 0 12px;
  `)}
`;
export const NovelContainer = styled.div<{ isNovelDetail: boolean }>`
  /* border: 1px solid rgba(0, 0, 0, 0.2); */
  margin: 0 auto;
  width: 100%;

  border-radius: 15px;

  /* clip-path: inset(0px -4px 0px 0px); */

  box-shadow: 0 0 3px rgb(0 0 0 / 20%);

  /* border-radius: 30px;
  ${({ isNovelDetail }) =>
    isNovelDetail &&
    `border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;`} */
  @media screen and (min-width: 500px) {
    max-width: 500px;
  }
`;
export const NovelDetailContainer = styled.div`
  padding: 0 12px;
  /* border-top: 1px solid rgba(0, 0, 0, 0.2); */
  border-top: 1px solid rgba(220, 220, 220, 0.5);
`;
export const NovelTitle = styled.p`
  margin: 0 1px 0 0;
  color: rgba(100, 100, 100, 0.8);
  font-weight: 600;
`;
export const NovelTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;

  /* max-width: 500px; */
`;
export const DownIconBox = styled(Icon.IconBox)`
  pointer-events: none;
`;
export const DownIcon = Icon.SmallDown;
export const UpIcon = Icon.SmallUp;
