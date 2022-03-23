import theme, { styled } from "assets/styles/theme";
import { Link } from "react-router-dom";

import Icon from "../../assets/Icon";

export const FilterBG = styled.div`
  width: 100%;
  padding: 0;
`;

export const GenreBox = styled.div`
  display: flex;
  overflow-x: scroll;
  ${theme.hideScrollBar}
  justify-content: space-between;
`;
export const Genre = styled.p<{ genreName: string; selectedGenre: string }>`
  padding: 10px;
  white-space: nowrap;

  ${({ genreName, selectedGenre }) =>
    genreName === selectedGenre && "border-bottom: 2px solid rgba(100,100,100,0.5);"}
`;

export const SortMobileContainer = styled.div`
  display: inline-block;
  text-align: right;
  ${theme.media.tablet(`
        display: none;
    `)}
`;
export const SortCategorySelected = styled.p`
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;

  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;
export const SortTabletContainer = styled.div`
  position: relative;
  height: 40px;

  ${theme.media.mobile(`
        display: none;
    `)}
`;
export const SortCategoryAll = styled.ul`
  position: relative;

  width: 135px;
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;

  flex-direction: column;
  padding-left: 0;
  border-radius: 11px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;

  z-index: 1;
`;
export const SortCategoryLi = styled.li`
  width: 100%;
  height: 40px;
  display: flex;
  /* margin: 0; */
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  &:last-child {
    border-bottom: 0;
  }
`;
export const ContainerWithBtn = styled.div`
  /* ${theme.media.mobile(`
  display: none;
`)} */

  width: 135px;
  height: 40px;
  display: inline-flex;
  //   margin: 0;
  justify-content: center;
  align-items: center;

  border-radius: 11px;
  border: 1px solid rgba(0, 0, 0, 0.2);

  ${theme.media.hover(`
      cursor: pointer;
      opacity: 0.8;
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

  /* ${theme.media.tablet(`
    margin-top: auto;
    margin-left: 3px;
    `)}
  ${theme.media.hover(`
      cursor: pointer;
      opacity: 0.8;
    `)} */
`;
export const DownIcon = styled(Icon.SmallDown)`
  width: 100%;
  height: 100%;
  ${theme.media.hover(`
      color: rgba(0, 0, 0, 0.2);
    `)}
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
export const OpenSearchIcon = styled(Icon.Search)`
  width: 100%;
  height: 100%;
  color: rgba(0, 0, 0, 0.3);
  ${theme.media.hover(`
      color: rgba(0, 0, 0, 0.2);
    `)};
`;
export const CloseSearchIcon = styled(Icon.SmallUp)`
  width: 100%;
  height: 100%;
  color: rgba(0, 0, 0, 0.3);
  ${theme.media.hover(`
      color: rgba(0, 0, 0, 0.2);
    `)};
`;

export const ContainerWithSearch = styled.div<{ isSearch: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ isSearch }) => (isSearch ? "space-between" : "flex-end")};
`;
export const SearchAlarm = styled.p`
  margin: auto;
`;
export const CantainerWithSrchBtn = styled.div`
  display: flex;
`;
export const CantainerOnlySort = styled.div<{ marginBottom: number | undefined }>`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ marginBottom }) => marginBottom || "-39"}px;
`;

// below is now not used
// : just see that how to customize arrow in select tag

export const SortTabletContainer2 = styled.select`
  height: 40px;
  padding: 0 0 0 15px;
  border-radius: 11px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 135px;

  display: flex;
  margin: auto;
  margin-right: 0;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* IE11 hide native button */
  &::-ms-expand {
    display: none;
  }
`;
export const CustomArrowBox = styled.div`
  display: inline-block;

  ${theme.media.mobile(`
    display: none;
  `)}
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: 13px;
    right: 13px;

    transform: rotate(45deg);
    width: 11px;
    height: 11px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-left: 0;
    border-top: 0;

    pointer-events: none;
    // inActive POINTER-EVENTS!!
    // 클릭 비활성화. 뒤에 있는 요소가 선택됨..!!
  }

  /* &:after {
    content: "\f078"; // font awesome icon //
    font: normal normal normal 17px/1 FontAwesome;
    color: #0ebeff;
    right: 11px;
    top: 6px;
    height: 34px;
    padding: 15px 0px 0px 8px;
    border-left: 1px solid #0ebeff;
    position: absolute;
    pointer-events: none;
  } */
`;

export const SortTab = styled.option``;
