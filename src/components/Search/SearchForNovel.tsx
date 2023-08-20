import { useRef } from "react";
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
  searchWordRef: React.MutableRefObject<string>;
}) {
  const { setFilters } = useMultipleSearchFilters();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    typeSearchWord(e.target.value);
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    setFilters({ searchWord: searchWordRef.current, pageNo: 1 });
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
