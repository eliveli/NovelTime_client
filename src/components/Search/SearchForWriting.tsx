import { useRef, useState } from "react";
import { useSearchFilter, useMultipleSearchFilters } from "utils/useSearchFilterForWriting";
import { SearchTypeFromFilter } from "../../store/clientSlices/filterSlice";
import {
  SearchBarContainer,
  SearchFilterContainer,
  SearchInput,
  SearchIconBox,
  SearchIcon,
  SearchContainer,
  SearchFilterText,
} from "./Search.styles";

function SearchBar({
  handleSearchFilter,
  typeSearchWord,
  searchWordRef,
}: {
  handleSearchFilter: React.Dispatch<React.SetStateAction<boolean>>;
  typeSearchWord: (newWord: string) => void;
  // ㄴ don't : searchWordRef.current = someValue
  //     to avoid warning : Assignment to property of function parameter 'searchWordRef'
  searchWordRef: React.MutableRefObject<string>;
}) {
  const { setFilters } = useMultipleSearchFilters();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    typeSearchWord(e.target.value); // prevent component rerender as using useRef not useState
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();

    setFilters({ searchWord: searchWordRef.current, pageNo: 1 });

    // show search-filter-component
    handleSearchFilter(true);
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

function SearchFilter({ searchWordRef }: { searchWordRef: React.MutableRefObject<string> }) {
  const {
    currentFilters: { currentSearchType },
    setFilters,
  } = useMultipleSearchFilters();

  const searchTypes: SearchTypeFromFilter[] = ["Title", "Desc", "Writer", "Novel"];

  return (
    <SearchFilterContainer>
      {searchTypes.map((_) => (
        <SearchFilterText
          key={_}
          contentName={_}
          selectedContent={currentSearchType}
          onClick={() => {
            setFilters({ searchType: _, searchWord: searchWordRef.current, pageNo: 1 });
            // ㄴ새로 타이핑한 검색어 함께 변경 - 그렇지 않으면 이전 검색어를 필터로 사용함
          }}
        >
          {_}
        </SearchFilterText>
      ))}
    </SearchFilterContainer>
  );
}

export default function SearchForWriting() {
  const { currentFilter: currentSearchWord } = useSearchFilter("searchWord");

  const [isSearchFilter, handleSearchFilter] = useState(!!currentSearchWord);
  // ㄴ뒤로가기로 search list 복귀 시 현재 검색 필터 보이기(!!currentSearchWord as initial value)

  const searchWordRef = useRef(currentSearchWord);
  // ㄴ입력하는 검색어를 기억해두고 submit 할 때만 서버 요청

  const typeSearchWord = (newWord: string) => {
    searchWordRef.current = newWord;
  };

  return (
    <SearchContainer>
      <SearchBar
        searchWordRef={searchWordRef}
        typeSearchWord={typeSearchWord}
        handleSearchFilter={handleSearchFilter}
      />
      {isSearchFilter && <SearchFilter searchWordRef={searchWordRef} />}
    </SearchContainer>
  );
}
