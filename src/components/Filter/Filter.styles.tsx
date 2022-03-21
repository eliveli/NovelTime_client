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
  text-align: right;
  ${theme.media.tablet(`
        display: none;
    `)}
`;
export const SortMobileContent = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  padding: 0 0px 0 15px;
  border-radius: 13px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
export const SortText = styled.p`
  display: flex;
  margin: 0;
  padding-right: 9px;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  align-items: center;
`;
export const SortTabletContainer = styled.select`
  ${theme.media.mobile(`
    display: none;
`)}

  height: 40px;
  padding: 0 0 0 15px;
  border-radius: 13px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 135px;

  display: flex;
  margin: auto;
  margin-right: 0;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* IE11 hide native button (thanks Matt!) */
  &::-ms-expand {
    display: none;
  }

  /* &:after {
    content: "\f078";
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
export const CustomArrowBox = styled.div`
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: 13px;
    right: 13px;

    transform: rotate(45deg);
    width: 11px;
    height: 11px;
    border: 2px solid #d1d1d1;
    border-left: 0;
    border-top: 0;

    pointer-events: none;
    // inActive POINTER-EVENTS!!
    // 클릭 비활성화. 뒤에 있는 요소가 선택됨..!!
  }
`;

export const SortTab = styled.option``;

export const DownIconBox = styled.div`
  z-index: 1;

  background-color: white;

  min-width: 25px;
  max-width: 25px;
  min-height: 25px;
  max-height: 25px;

  ${theme.media.tablet(`
    margin-top: auto;
    margin-left: 3px;
    `)}
  ${theme.media.hover(`
      cursor: pointer;
      opacity: 0.8;
    `)}
`;
export const DownIcon = styled(Icon.SmallDown)`
  width: 100%;
  height: 100%;
  ${theme.media.hover(`
      color: rgba(0, 0, 0, 0.3);
    `)}
`;
