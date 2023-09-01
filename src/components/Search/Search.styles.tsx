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
export const SearchFilterContainer = styled.div<{ isListOpen?: boolean }>`
  display: flex;
  height: 38px;
  margin-top: 5px;
  border-radius: 11px;
  border: 1px solid rgba(0, 0, 0, 0.2);

  ${({ isListOpen }) => isListOpen && "border-left-width: 0px;"}//
  // when the search category list opens on tablet device,
  // the left border of this component is put right left in the list component opened
  // because the list overlaps this component.
  // so this style is necessary to remove the left border in this case
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
export const SearchCategoryAll = styled.ul<{ isSearchPage?: true }>`
  width: 100%;
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;

  flex-direction: column;
  padding-left: 0;
  border-radius: 11px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  height: 72px;

  ${({ isSearchPage }) => isSearchPage && "height: 108px;"}

  border-top-width: 0px;

  z-index: 1;

  ${theme.media.mobile(`
    display: none;
  `)}
`;
export const SearchCategoryLi = styled.li<{ selectedCategory: string; category: string }>`
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
  ${({ selectedCategory, category }) =>
    selectedCategory === category && `color: ${theme.color.main};`}
`;
export const SearchFilterText = styled.p<{
  contentName: string;
  selectedContent: string;
  isLeftRadiusSet?: true;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(0, 0, 0, 0.2);

  &:first-child {
    ${({ isLeftRadiusSet }) =>
      isLeftRadiusSet && "border-bottom-left-radius: 8px;"}// to make the left-end of line bend
  }
  &:last-child {
    border-right: 0;
    border-bottom-right-radius: 8px;
    // ㄴto make the right-end of line bend to fit in the border-radius set of parent component
    //      when the last component is selected and colored
  }

  ${({ contentName, selectedContent }) =>
    contentName === selectedContent && `border-bottom: 2px solid ${theme.color.main};`}
`;
export const SearchIconBox = styled(Icon.IconBox)`
  border-radius: 11px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 5px;

  min-width: 38px;
  max-width: 38px;
  min-height: 38px;
  max-height: 38px;
  margin-left: 2px;
`;
export const SearchIcon = styled(Icon.Search)`
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

export const DownIconBox = styled(Icon.IconBox)`
  pointer-events: none;
`;
export const DownIcon = Icon.SmallDown;
