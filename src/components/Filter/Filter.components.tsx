import { useEffect, useRef, useState } from "react";
import { useCloseOutsideClick } from "utils";
import { GenresFromFilter } from "views/FreeTalkList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { openModal } from "../../store/clientSlices/modalSlice";
import {
  SortMobileContainer,
  SortTabletContainer,
  SortTabletContainer2,
  SortTab,
  Genre,
  GenreBox,
  DownIconBox,
  DownIcon,
  CustomArrowBox,
  OpenSearchIcon,
  CloseSearchIcon,
  SearchIconBox,
  SortCategorySelected,
  SortCategoryAll,
  SortCategoryLi,
  ContainerWithBtn,
} from "./Filter.styles";

export function Genres({
  genre,
}: {
  genre: {
    genreDisplayed: GenresFromFilter;
    selectGenre: React.Dispatch<React.SetStateAction<GenresFromFilter>>;
  };
}) {
  const genres: GenresFromFilter[] = [
    "All",
    "로판",
    "판타지",
    "로맨스",
    "현판",
    "무협",
    "패러디",
    "라이트노벨",
    "미스터리",
    "BL",
    "그 외",
  ];
  return (
    <GenreBox>
      {genres.map((_) => (
        <Genre
          key={_}
          genreName={_}
          selectedGenre={genre.genreDisplayed}
          onClick={() => {
            genre.selectGenre(_);
            // require server request //
          }}
        >
          {_}
        </Genre>
      ))}
    </GenreBox>
  );
}
export function SearchBtn({
  isSearch,
  handleSearch,
}: {
  isSearch: boolean;
  handleSearch: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <SearchIconBox onClick={() => handleSearch(!isSearch)}>
      {!isSearch && <OpenSearchIcon />}
      {isSearch && <CloseSearchIcon />}
    </SearchIconBox>
  );
}
export function SortMobile({ borderOpacity }: { borderOpacity?: number }) {
  const dispatch = useAppDispatch();
  const sortingText = useAppSelector((state) => state.modal.sortingText);
  // when clicking, in Modal component,
  // require server request in this component!
  console.log("in sort only");

  return (
    <SortMobileContainer>
      <ContainerWithBtn
        borderOpacity={borderOpacity}
        onClick={() => {
          dispatch(openModal("sortWriting"));
          console.log("clicked in sort only");
        }}
      >
        <SortCategorySelected>{sortingText}</SortCategorySelected>
        <DownIconBox>
          <DownIcon />
        </DownIconBox>
      </ContainerWithBtn>
    </SortMobileContainer>
  );
}
export function SortTablet({
  isSearch,
  borderOpacity,
}: {
  isSearch: boolean;
  borderOpacity?: number;
}) {
  // open or close all list
  const [isCategoryList, handleCategoryList] = useState(false);

  // which category will be shown
  const [selectedCategory, handleCategory] = useState("작성일New");

  // when opening or closing search bar, close all list if it is open
  useEffect(() => {
    handleCategoryList(false);
  }, [isSearch]);

  // close the sorting list when clicking outside it
  const sortRef = useRef<HTMLUListElement>(null);
  useCloseOutsideClick(sortRef, isCategoryList, handleCategoryList);

  console.log("in sort tablet");

  // deps list is required. if it is empty, click event don't work...
  // maybe because in useEffect, state is read only once at first render, if deps list is empty
  // but it is mouse event, why didn't it work..?

  return (
    <SortTabletContainer>
      {/* before clicking category */}
      {!isCategoryList && (
        <ContainerWithBtn
          borderOpacity={borderOpacity}
          onClick={() => {
            handleCategoryList(true);
          }}
        >
          <SortCategorySelected>{selectedCategory}</SortCategorySelected>
          {/* down arrow icon */}
          <DownIconBox>
            <DownIcon />
          </DownIconBox>
        </ContainerWithBtn>
      )}
      {/* after clicking category */}
      {isCategoryList && (
        <SortCategoryAll ref={sortRef}>
          {["작성일New", "작성일Old", "댓글Up", "댓글Down", "좋아요Up", "좋아요Down"].map((_) => (
            <SortCategoryLi
              key={_}
              selectedCategory={selectedCategory}
              category={_}
              onClick={() => {
                handleCategory(_);
                handleCategoryList(false);
                // require server request //
              }}
            >
              {_}
            </SortCategoryLi>
          ))}
        </SortCategoryAll>
      )}
    </SortTabletContainer>
  );
}
// now below is not used
export function SortTablet2() {
  return (
    <CustomArrowBox>
      <SortTabletContainer2>
        {["작성일New", "작성일Old", "댓글Up", "댓글Down", "좋아요Up", "좋아요Down"].map((_) => (
          <SortTab
            key={_}
            onClick={() => {
              // require server request //
            }}
          >
            {_}
          </SortTab>
        ))}
      </SortTabletContainer2>
    </CustomArrowBox>
  );
}
