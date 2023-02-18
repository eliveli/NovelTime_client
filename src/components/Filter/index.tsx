import { useState } from "react";
import { GenresFromFilter, SrchTypeFromFilter } from "views/FreeTalkList";
import Search from "../Search";
import { SearchBtn, Genres, SortMobile, SortTablet } from "./Filter.components";
import {
  CantainerOnlySort,
  CantainerWithSrchBtn,
  SearchAlarm,
  ContainerWithSrchAlarm,
  FilterBG,
} from "./Filter.styles";
// required server request : Filter Genre & Sort for Writing!
export default function Filter({
  genre,
  searchType,
  searchWord,
}: {
  genre: {
    genreDisplayed: GenresFromFilter;
    selectGenre: React.Dispatch<React.SetStateAction<GenresFromFilter>>;
  };

  searchType: {
    srchType: SrchTypeFromFilter;
    selectSrchType: React.Dispatch<React.SetStateAction<SrchTypeFromFilter>>;
  };
  searchWord: {
    srchWord: string;
    handleSrchWord: React.Dispatch<React.SetStateAction<string>>;
  };
}) {
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
      <Genres genre={genre} />
      {/* sort with search-button */}
      <ContainerWithSrchAlarm isSearch={isSearch}>
        {isSearch && <SearchAlarm>{`Search for ${writing} about Novel!`}</SearchAlarm>}
        <CantainerWithSrchBtn>
          <SortMobile />
          <SortTablet isSearch={isSearch} />
          <SearchBtn isSearch={isSearch} handleSearch={handleSearch} />
        </CantainerWithSrchBtn>
      </ContainerWithSrchAlarm>

      {/* search : after clicking search icon */}
      {isSearch && <Search searchType={searchType} searchWord={searchWord} />}
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
    <CantainerOnlySort marginBottom={marginBottom} height={height}>
      <SortMobile borderOpacity={borderOpacity} />
      <SortTablet isSearch={false} borderOpacity={borderOpacity} />
    </CantainerOnlySort>
  );
}
