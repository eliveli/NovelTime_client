// import {} from "./Search.components";
import { useEffect, useRef, useState } from "react";
import { useCloseOutsideClick, useMultipleSearchFilters, useSearchFilter } from "utils";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setSearchTextCtgr,
  setSearchContentCtgr,
  SearchTypeFromFilter,
} from "../../store/clientSlices/filterSlice";
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

// interface SearchProps {
//   searchProps: {
//     writing: string;
//     selectedCategory: string;
//     handleCategory: React.Dispatch<React.SetStateAction<string>>;
//     content: string;
//     selectContent: React.Dispatch<React.SetStateAction<string>>;
//   };
// }
export function SearchBar({
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
    if (currentSearchType === "no" && searchWordRef.current !== "") {
      // 직전 검색 타입이 없으나 현재 주어진 검색어가 있을 때
      setFilters({ searchType: "Title", searchWord: searchWordRef.current });
    } else if (searchWordRef.current === "") {
      // 주어진 검색어가 없을 때
      setFilters({ searchType: "no", searchWord: searchWordRef.current });
    } else {
      setFilters({ searchWord: searchWordRef.current });
    }

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

export function ContentFilterMobile() {
  const dispatch = useAppDispatch();
  const filteringContent = useAppSelector((state) => state.modal.filteringContent);
  // when clicking, in Modal component,
  // require server request in this component!

  return (
    <MobileContainer
      onClick={() => {
        dispatch(openModal("filterContent"));
      }}
    >
      <SearchCategorySelected>{filteringContent}</SearchCategorySelected>
      {/* down arrow icon */}
      <DownIconBox>
        <DownIcon />
      </DownIconBox>
    </MobileContainer>
  );
}
interface FilterContentProps {
  filterContentProps: {
    isCategoryList: boolean;
    selectedCategory: string;
    handleCategory: React.Dispatch<React.SetStateAction<string>>;
    handleCategoryList: React.Dispatch<React.SetStateAction<boolean>>;
    selectContent: React.Dispatch<React.SetStateAction<string>>;
  };
}
export function ContentFilterTablet({ filterContentProps }: FilterContentProps) {
  const dispatch = useAppDispatch();

  const { isCategoryList, selectedCategory, handleCategory, handleCategoryList, selectContent } =
    filterContentProps;

  // close list when clicking outside
  const listRef = useRef<HTMLUListElement>(null);
  useCloseOutsideClick(listRef, isCategoryList, handleCategoryList);

  /* before clicking category : novel or writing */
  if (!isCategoryList) {
    return (
      <ContainerWithBtn
        onClick={() => {
          handleCategoryList(true);
        }}
      >
        <SearchCategorySelected>{selectedCategory}</SearchCategorySelected>
        {/* down arrow icon */}
        <DownIconBox>
          <DownIcon />
        </DownIconBox>
      </ContainerWithBtn>
    );
  }
  /* after clicking category : show list - novel or free talk or recommend */
  return (
    <SearchCategoryAll ref={listRef} isSearchPage>
      {["Novel", "FreeTalk", "Recommend"].map((_) => (
        <SearchCategoryLi
          key={_}
          selectedCategory={selectedCategory}
          category={_}
          onClick={() => {
            handleCategory(_);
            handleCategoryList(false);
            selectContent("Title");

            dispatch(setSearchTextCtgr(_));

            // require server request //
          }}
        >
          {_}
        </SearchCategoryLi>
      ))}
    </SearchCategoryAll>
  );
}
export function SearchFilter({ searchWordRef }: { searchWordRef: React.MutableRefObject<string> }) {
  const dispatch = useAppDispatch();

  const {
    currentFilters: { currentSearchType },
    setFilters,
  } = useMultipleSearchFilters();

  // // props from Filter component
  // const { writing, selectedCategory, handleCategory, content, selectContent } = searchProps;

  // at search page , content filter is necessary
  const { pathname } = window.location;

  const isSearchPage = pathname.includes("search");
  // at the novel-search
  const isNovelSearch = pathname.includes("search/novel");

  // which category will be shown : novel or writing
  const [selectedCategory, handleCategory] = useState("Novel");

  // in category, which type of content will be shown : title or desc or author
  const [content, selectContent] = useState("Title");

  // --- for tablet ---------------------------------------------- //
  // *** writing list 페이지 작업 필요 for tablet
  // *** ㄴ 바로 위의 content from useState는 writing list에서 더이상 사용 X
  // open or close all list
  const [isCategoryList, handleCategoryList] = useState(false);
  // when selecting content, close all list if it is open
  useEffect(() => {
    handleCategoryList(false);
  }, [content, currentSearchType]);

  const filterContentProps = {
    isCategoryList,
    selectedCategory,
    handleCategory,
    handleCategoryList,
    selectContent,
  };
  // ------------------------------------------------------------- //
  /* with novel-search, filter list */
  if (isNovelSearch) {
    return (
      <SearchFilterContainer isCategoryList={isCategoryList}>
        {["Title", "Desc", "Author"].map((_) => (
          <SearchFilterText
            key={_}
            contentName={_}
            selectedContent={content}
            onClick={() => {
              selectContent(_);
              dispatch(setSearchContentCtgr(_));

              // require server request //
            }}
          >
            {_}
          </SearchFilterText>
        ))}
      </SearchFilterContainer>
    );
  }

  /* in writing page, filter list */
  if (!isSearchPage) {
    const searchTypes: SearchTypeFromFilter[] = ["Title", "Desc", "Writer", "Novel"];

    return (
      <SearchFilterContainer isCategoryList={isCategoryList}>
        {searchTypes.map((_) => (
          <SearchFilterText
            key={_}
            contentName={_}
            selectedContent={currentSearchType}
            onClick={() => {
              setFilters({ searchType: _, searchWord: searchWordRef.current });
              // ㄴ새로 타이핑한 검색어 함께 변경 - 그렇지 않으면 이전 검색어를 필터로 사용함

              dispatch(setSearchContentCtgr(_));
            }}
          >
            {_}
          </SearchFilterText>
        ))}
      </SearchFilterContainer>
    );
  }

  /* in search page */
  return (
    <SearchFilterContainer isCategoryList={isCategoryList}>
      {/* filter content : novel or writing */}
      <ContentFilterMobile />
      <ContentFilterTablet filterContentProps={filterContentProps} />

      {/* filter list - novel */}
      {selectedCategory === "Novel" &&
        ["Title", "Desc", "Author"].map((_) => (
          <SearchFilterText
            key={_}
            contentName={_}
            selectedContent={content}
            onClick={() => {
              selectContent(_);
              dispatch(setSearchContentCtgr(_));

              // require server request //
            }}
          >
            {_}
          </SearchFilterText>
        ))}

      {/* filter list - writing */}
      {["FreeTalk", "Recommend"].includes(selectedCategory) &&
        ["Title", "Text", "Writer"].map((_) => (
          <SearchFilterText
            key={_}
            contentName={_}
            selectedContent={content}
            onClick={() => {
              selectContent(_);
              dispatch(setSearchContentCtgr(_));

              // require server request //
            }}
          >
            {_}
          </SearchFilterText>
        ))}
    </SearchFilterContainer>
  );
}

export default function Search() {
  const [isSearchFilter, handleSearchFilter] = useState(false);

  const { currentFilter: currentSearchWord } = useSearchFilter("searchWord");

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
