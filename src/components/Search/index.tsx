// import {} from "./Search.components";
import { useEffect, useRef, useState } from "react";
import { useCloseOutsideClick } from "utils";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setSearchWord,
  setSearchTextCtgr,
  setSearchContentCtgr,
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
}: {
  handleSearchFilter: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();

  // server request by srchWord
  const [srchWord, handleSrchWord] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSrchWord(e.target.value);
  };
  const handleSubmit = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    // set client state for server request //
    dispatch(setSearchWord(srchWord));
    // and show search-filter-component
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
      <SearchInput onChange={handleChange} onKeyPress={handleKeyPress} />
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
export function SearchFilter() {
  const dispatch = useAppDispatch();

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
  // open or close all list
  const [isCategoryList, handleCategoryList] = useState(false);
  // when selecting content, close all list if it is open
  useEffect(() => {
    handleCategoryList(false);
  }, [content]);

  const filterContentProps = {
    isCategoryList,
    selectedCategory,
    handleCategory,
    handleCategoryList,
    selectContent,
  };
  // ------------------------------------------------------------- //

  /* in writing page, filter list */
  if (!isSearchPage) {
    return (
      <SearchFilterContainer isCategoryList={isCategoryList}>
        {["Title", "Desc", "Author", "Novel"].map((_) => (
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

  return (
    <SearchContainer>
      <SearchBar handleSearchFilter={handleSearchFilter} />
      {isSearchFilter && <SearchFilter />}
    </SearchContainer>
  );
}
