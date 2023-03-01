import { useState } from "react";
import Search from "../Search";
import { SearchBtn, Genres, SortMobile, SortTablet } from "./Filter.components";
import {
  ContainerOnlySort,
  ContainerWithSrchBtn,
  SearchAlarm,
  ContainerWithSrchAlarm,
  FilterBG,
} from "./Filter.styles";

export default function Filter() {
  // get writing name
  const { pathname } = window.location;
  const writing = pathname.includes("talk") ? "FreeTalk" : "Recommend";
  // show or not search component
  const [isSearch, handleSearch] = useState(false);
  // // which category will be shown : novel or writing
  // const [selectedCategory, handleCategory] = useState("Novel");

  // // in category, which type of content will be shown : title or desc or author
  // const [content, selectContent] = useState("Title");

  // // props to search Component
  // const searchProps = {
  //   writing,
  //   selectedCategory,
  //   handleCategory,
  //   content,
  //   selectContent,
  // };
  return (
    <FilterBG>
      <Genres />
      {/* sort with search-button */}
      <ContainerWithSrchAlarm isSearch={isSearch}>
        {isSearch && <SearchAlarm>{`Search for ${writing} about Novel!`}</SearchAlarm>}
        <ContainerWithSrchBtn>
          <SortMobile />
          <SortTablet isSearch={isSearch} />
          <SearchBtn isSearch={isSearch} handleSearch={handleSearch} />
        </ContainerWithSrchBtn>
      </ContainerWithSrchAlarm>

      {/* search : after clicking search icon */}
      {isSearch && <Search />}
    </FilterBG>
  );
}

export function SortOnly({
  marginBottom,
  height,
  borderOpacity,
}: {
  marginBottom?: number;
  height?: number;
  borderOpacity?: number;
}) {
  return (
    <ContainerOnlySort marginBottom={marginBottom} height={height}>
      <SortMobile borderOpacity={borderOpacity} />
      <SortTablet isSearch={false} borderOpacity={borderOpacity} />
    </ContainerOnlySort>
  );
}
