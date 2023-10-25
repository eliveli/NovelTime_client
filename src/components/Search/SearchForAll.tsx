import { useRef, useState, useEffect } from "react";
import { useCloseOutsideClick, useWhetherItIsMobile } from "utils";
import { useSearchFilter, useMultipleSearchFilters } from "utils/useSearchFilterForSearchAll";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { openFirstModal } from "../../store/clientSlices/modalSlice";
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
  searchWord,
  setSearchWord,
}: {
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
}) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // initialize search input //
  // if a user searches for something with pagination on desktop
  //    and clicks "search-all" icon on top nav bar for the page that the user stay now,
  // search params in url initializes
  //    but the previous search word remains in input if the following code was not wrote
  // so following is necessary to initialize the search input in the case
  const [searchParams] = useSearchParams();
  const searchWordInURL = searchParams.get("searchWord");

  useEffect(() => {
    if (
      searchInputRef.current &&
      searchWordInURL === "" &&
      searchInputRef.current.value !== searchWordInURL
    ) {
      searchInputRef.current.value = searchWordInURL; // initialize search input to ""
    }
  }, [searchWordInURL]);

  //
  const { setFilters } = useMultipleSearchFilters();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    setFilters({ searchWord, pageNo: 1 });
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
        ref={searchInputRef}
        defaultValue={searchWord}
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
        dispatch(openFirstModal("filterContent"));
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
            setFilters({ searchCategory: _, searchType: "Title", pageNo: 1 });

            handleListOpen(false);
          }}
        >
          {_}
        </SearchCategoryLi>
      ))}
    </SearchCategoryAll>
  );
}

export function SearchFilter({ searchWord }: { searchWord: string }) {
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
              setFilters({ searchType: _, searchWord, pageNo: 1 });
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
              setFilters({ searchType: _, searchWord, pageNo: 1 });
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

  const [searchWord, setSearchWord] = useState(currentSearchWord);

  return (
    <SearchContainer>
      <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
      <SearchFilter searchWord={searchWord} />
    </SearchContainer>
  );
}
