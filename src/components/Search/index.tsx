// import {} from "./Search.components";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
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

interface SearchProps {
  searchProps: {
    writing: string;
    selectedCategory: string;
    handleCategory: React.Dispatch<React.SetStateAction<string>>;
    content: string;
    selectContent: React.Dispatch<React.SetStateAction<string>>;
  };
}
export function SearchBar({
  handleSearchFilter,
}: {
  handleSearchFilter: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // server request by srchWord
  const [srchWord, handleSrchWord] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSrchWord(e.target.value);
  };
  const handleSubmit = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    // server request : search //
    // and show search filter component
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
  const { filteringContent } = useAppSelector((state) => state.modal);
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
    writing: string;
    handleCategory: React.Dispatch<React.SetStateAction<string>>;
    handleCategoryList: React.Dispatch<React.SetStateAction<boolean>>;
    selectContent: React.Dispatch<React.SetStateAction<string>>;
  };
}
export function ContentFilterTablet({ filterContentProps }: FilterContentProps) {
  const {
    isCategoryList,
    selectedCategory,
    writing,
    handleCategory,
    handleCategoryList,
    selectContent,
  } = filterContentProps;

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
  /* after clicking category : novel or writing */
  return (
    <SearchCategoryAll>
      {["Novel", writing].map((_) => (
        <SearchCategoryLi
          key={_}
          selectedCategory={selectedCategory}
          category={_}
          onClick={() => {
            handleCategory(_);
            handleCategoryList(false);
            selectContent("Title");
            // require server request //
          }}
        >
          {_}
        </SearchCategoryLi>
      ))}
    </SearchCategoryAll>
  );
}
export function SearchFilter({ searchProps }: SearchProps) {
  // props from Filter component
  const { writing, selectedCategory, handleCategory, content, selectContent } = searchProps;

  // --- for tablet ----------- //
  // open or close all list
  const [isCategoryList, handleCategoryList] = useState(false);
  // when selecting content, close all list if it is open
  useEffect(() => {
    handleCategoryList(false);
  }, [content]);

  const filterContentProps = {
    isCategoryList,
    selectedCategory,
    writing,
    handleCategory,
    handleCategoryList,
    selectContent,
  };
  // ------------------------- //

  return (
    <SearchFilterContainer isCategoryList={isCategoryList}>
      {/* filter content : novel or writing */}
      <ContentFilterMobile />
      <ContentFilterTablet filterContentProps={filterContentProps} />

      {/* in the category, filter list */}
      {selectedCategory === "Novel" &&
        ["Title", "Desc", "Author"].map((_) => (
          <SearchFilterText
            key={_}
            contentName={_}
            selectedContent={content}
            onClick={() => {
              selectContent(_);
              // require server request //
            }}
          >
            {_}
          </SearchFilterText>
        ))}
      {selectedCategory === writing &&
        ["Title", "Text", "Writer"].map((_) => (
          <SearchFilterText
            key={_}
            contentName={_}
            selectedContent={content}
            onClick={() => {
              selectContent(_);
              // require server request //
            }}
          >
            {_}
          </SearchFilterText>
        ))}
    </SearchFilterContainer>
  );
}
export default function Search({ searchProps }: SearchProps) {
  const [isSearchFilter, handleSearchFilter] = useState(false);

  return (
    <SearchContainer>
      <SearchBar handleSearchFilter={handleSearchFilter} />
      {isSearchFilter && <SearchFilter searchProps={searchProps} />}
    </SearchContainer>
  );
}
