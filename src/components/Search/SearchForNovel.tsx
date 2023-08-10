import { useRef, useState } from "react";
import { useSearchFilter, useMultipleSearchFilters } from "utils/useSearchFilterForNovel";

import {
  SearchBarContainer,
  SearchFilterContainer,
  SearchInput,
  SearchIconBox,
  SearchIcon,
  SearchContainer,
  SearchFilterText,
} from "./Search.styles";

export function SearchBar({
  typeSearchWord,
  searchWordRef,
}: {
  typeSearchWord: (newWord: string) => void;
  // ㄴ don't : searchWordRef.current = someValue
  //     to avoid warning : Assignment to property of function parameter 'searchWordRef'
  searchWordRef: React.MutableRefObject<string>;
}) {
  const {
    currentFilters: { currentSearchType },
    setFilters,
  } = useMultipleSearchFilters();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    typeSearchWord(e.target.value); // prevent component rerender as using useRef not useState
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    if (currentSearchType === "sample" && searchWordRef.current !== "") {
      // 직전 검색 타입이 없으나 현재 주어진 검색어가 있을 때
      setFilters({ searchType: "Title", searchWord: searchWordRef.current, pageNo: 1 });
    } else if (searchWordRef.current === "") {
      // 주어진 검색어가 없을 때
      setFilters({ searchType: "sample", searchWord: searchWordRef.current, pageNo: 1 });
    } else {
      setFilters({ searchWord: searchWordRef.current, pageNo: 1 });
    }
  };

  // when press "Enter", submit
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  return (
    <SearchBarContainer>
      <SearchInput
        defaultValue={searchWordRef.current}
        // ㄴto show the same keywords when closing the search bar and reopening it
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <SearchIconBox onClick={handleSubmit}>
        <SearchIcon />
      </SearchIconBox>
    </SearchBarContainer>
  );
}

export function SearchFilter({ searchWordRef }: { searchWordRef: React.MutableRefObject<string> }) {
  const {
    currentFilters: { currentSearchType },
    setFilters,
  } = useMultipleSearchFilters();

  const searchTypes = ["Title", "Desc", "Author"];

  return (
    <SearchFilterContainer>
      {searchTypes.map((_) => (
        <SearchFilterText
          key={_}
          contentName={_}
          selectedContent={currentSearchType}
          onClick={() => {
            setFilters({ searchType: _, searchWord: searchWordRef.current, pageNo: 1 });
          }}
        >
          {_}
        </SearchFilterText>
      ))}
    </SearchFilterContainer>
  );
}

export default function SearchForNovel() {
  const { currentFilter: currentSearchWord } = useSearchFilter("searchWord");

  const searchWordRef = useRef(currentSearchWord);
  // ㄴ입력하는 검색어를 기억해두고 submit 할 때만 서버 요청

  const typeSearchWord = (newWord: string) => {
    searchWordRef.current = newWord;
  };

  return (
    <SearchContainer>
      <SearchBar searchWordRef={searchWordRef} typeSearchWord={typeSearchWord} />
      <SearchFilter searchWordRef={searchWordRef} />
    </SearchContainer>
  );
}
