import theme, { styled } from "assets/styles/theme";

import Icon from "../../assets/Icon";

export const SearchBarContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  height: 38px;
  position: sticky;
`;
export const SearchInput = styled.input`
  width: 100%;
  border-radius: 11px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0 10px;
  font-size: 16px;
`;
export const SearchSubmit = styled.button`
  white-space: nowrap;
`;
export const SearchFilterContainer = styled.div<{ isCategoryList: boolean }>`
  display: flex;
  height: 38px;
  margin-top: 5px;
  border-radius: 11px;
  border: 1px solid rgba(0, 0, 0, 0.2);

  ${({ isCategoryList }) => isCategoryList && "border-left-width: 0px;"}
`;
export const SearchCategorySelected = styled.p`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;

  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;
export const SearchCategoryAll = styled.ul`
  width: 100%;
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;

  flex-direction: column;
  padding-left: 0;
  height: 72px;
  border-radius: 11px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;

  border-top-width: 0px;

  z-index: 1;

  ${theme.media.mobile(`
    display: none;
  `)}
`;
export const SearchCategoryLi = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  &:last-child {
    border-bottom: 0;
  }
`;
export const SearchFilterText = styled.p<{ contentName: string; selectedContent: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  &:last-child {
    border-right: 0;
  }

  ${({ contentName, selectedContent }) =>
    contentName === selectedContent && "border-bottom: 2px solid rgba(100,100,100,0.5);"}
`;
export const SearchIconBox = styled.div`
  z-index: 1;

  background-color: white;

  border-radius: 11px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 5px;
  color: rgba(0, 0, 0, 0.3);

  min-width: 38px;
  max-width: 38px;
  min-height: 38px;
  max-height: 38px;
  margin-left: 2px;

  ${theme.media.hover(`
      cursor: pointer;
      opacity: 0.8;
    `)}
`;
export const SearchIcon = styled(Icon.Search)`
  width: 100%;
  height: 100%;
  ${theme.media.hover(`
      color: rgba(0, 0, 0, 0.3);
    `)}
`;
export const SearchContainer = styled.div``;

export const MobileContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(0, 0, 0, 0.2);

  ${theme.media.hover(`
      cursor: pointer;
      opacity: 0.8;
    `)}

  ${theme.media.tablet(`
    display: none;
  `)}

  white-space: nowrap;
  z-index: 1;
`;

export const ContainerWithBtn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(0, 0, 0, 0.2);

  ${theme.media.hover(`
      cursor: pointer;
      opacity: 0.8;
    `)}

  ${theme.media.mobile(`
      display: none;
    `)}
`;

export const DownIconBox = styled.div`
  z-index: 1;

  background-color: white;

  min-width: 25px;
  max-width: 25px;
  min-height: 25px;
  max-height: 25px;

  color: rgba(0, 0, 0, 0.3);

  pointer-events: none;
`;
export const DownIcon = styled(Icon.SmallDown)`
  width: 100%;
  height: 100%;
  ${theme.media.hover(`
      color: rgba(0, 0, 0, 0.2);
    `)}
`;
