import React, { useState, useEffect } from "react";
import { useSearchFilter } from "utils";
import Search from "../Search";
import { SearchBtn, Genres, SortMobile, SortTablet } from "./Filter.components";
import {
  ContainerOnlySort,
  ContainerWithSrchBtn,
  SearchAlarm,
  ContainerWithSrchAlarm,
  FilterBG,
} from "./Filter.styles";

export default function Filter({ children }: { children?: React.ReactNode }) {
  // get writing name
  const { pathname } = window.location;
  const writing = pathname.includes("talk") ? "FreeTalk" : "Recommend";

  const { currentFilter: currentSearchWord } = useSearchFilter("searchWord");

  // show or not search component
  const [isSearch, handleSearch] = useState(!!currentSearchWord);
  // ㄴ뒤로가기로 search list 복귀 시 검색어가 존재한다면 인풋 보이기(!!currentSearchWord as initial value)

  // 현재 활성화된 카테고리(i.e.프리톡리스트)를 다시 눌러 필터 초기화할 때 검색 인풋 지우기
  useEffect(() => {
    if (currentSearchWord === "") {
      handleSearch(false);
    }
  }, [currentSearchWord]);

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
          {children}
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
