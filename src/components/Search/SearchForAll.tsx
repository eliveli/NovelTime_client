import { useRef, useState } from "react";
import { useCloseOutsideClick, useWhetherItIsMobile } from "utils";
import { useSearchFilter, useMultipleSearchFilters } from "utils/useSearchFilterForSearchAll";
import { useAppDispatch } from "../../store/hooks";
import { openModal } from "../../store/clientSlices/modalSlice";
import {
  SearchBarContainer,
  SearchFilterContainer,
  SearchInput,
  SearchIconBox,
  SearchIcon,
  SearchContainer,
  SearchFilterText,
  SearchCategorySelected,
  SearchCategoryAll,
  SearchCategoryLi,
  DownIconBox,
  DownIcon,
  ContainerWithBtn,
  MobileContainer,
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
  const { setFilters } = useMultipleSearchFilters();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    typeSearchWord(e.target.value); // prevent component rerender as using useRef not useState
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

export function CategoriesToSelectOnMobile() {
  const { currentFilter: currentSearchCategory } = useSearchFilter("searchCategory");

  const dispatch = useAppDispatch();

  return (
    <MobileContainer
      onClick={() => {
        dispatch(openModal("filterContent"));
      }}
    >
      <SearchCategorySelected>{currentSearchCategory}</SearchCategorySelected>

      <DownIconBox>
        <DownIcon />
      </DownIconBox>
    </MobileContainer>
  );
}

export function CategoriesToSelectOnTablet({
  isListOpen,
  handleListOpen,
}: {
  isListOpen: boolean;
  handleListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    currentFilters: { currentSearchCategory },
    setFilters,
  } = useMultipleSearchFilters();
  const searchCategories = ["Novel", "Talk", "Recommend"];
  // close the list when clicking outside
  const listRef = useRef<HTMLUListElement>(null);
  useCloseOutsideClick(listRef, isListOpen, handleListOpen);

  // list closed
  if (!isListOpen) {
    return (
      <ContainerWithBtn
        onClick={() => {
          handleListOpen(true);
        }}
      >
        <SearchCategorySelected>{currentSearchCategory}</SearchCategorySelected>

        <DownIconBox>
          <DownIcon />
        </DownIconBox>
      </ContainerWithBtn>
    );
  }

  // list opened
  return (
    <SearchCategoryAll ref={listRef} isSearchPage>
      {searchCategories.map((_) => (
        <SearchCategoryLi
          key={_}
          selectedCategory={currentSearchCategory}
          category={_}
          onClick={() => {
            setFilters({ searchCategory: _, searchType: "Title" });

            handleListOpen(false);
          }}
        >
          {_}
        </SearchCategoryLi>
      ))}
    </SearchCategoryAll>
  );
}

export function SearchFilter({ searchWordRef }: { searchWordRef: React.MutableRefObject<string> }) {
  const {
    currentFilters: { currentSearchCategory, currentSearchType },
    setFilters,
  } = useMultipleSearchFilters();

  const searchTypesInNovel = ["Title", "Desc", "Author"];
  const searchTypesInWriting = ["Title", "Content", "Writer"];

  const isMobile = useWhetherItIsMobile();

  // open or close the search category list on tablet
  const [isListOpen, handleListOpen] = useState(false);

  return (
    <SearchFilterContainer isListOpen={isListOpen}>
      {isMobile ? (
        <CategoriesToSelectOnMobile />
      ) : (
        <CategoriesToSelectOnTablet isListOpen={isListOpen} handleListOpen={handleListOpen} />
      )}

      {currentSearchCategory === "Novel" &&
        searchTypesInNovel.map((_) => (
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

      {["Talk", "Recommend"].includes(currentSearchCategory) &&
        searchTypesInWriting.map((_) => (
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

export default function SearchForAll() {
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
