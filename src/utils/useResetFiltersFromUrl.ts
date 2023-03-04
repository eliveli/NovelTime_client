import { useSearchParams } from "react-router-dom";

type FilterType = "genre" | "searchType" | "searchWord" | "sortType" | "pageNo";

const genres = [
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

const searchTypes = ["no", "Title", "Desc", "Writer", "Novel"];

const sortTypes = ["작성일New", "작성일Old", "댓글Up", "댓글Down", "좋아요Up", "좋아요Down"];

// reset filters for pagination when they are not correct
export default function useResetFiltersFromUrl() {
  const { pathname, search } = window.location;

  const [searchParams, setSearchParams] = useSearchParams();

  let isForPagination = true;

  // for infinite scroll
  if (search === "") {
    isForPagination = false;
    return isForPagination;
  }

  function resetFiltersFromUrl(filters: FilterType[]) {
    let isFilterChanged = false;

    filters.map((filterType) => {
      const filterValue = searchParams.get(filterType); // it can be null

      if (filterType === "genre") {
        if (!genres.includes(filterValue as string)) {
          searchParams.set("genre", "All");
          isFilterChanged = true;
        }
      } else if (filterType === "searchType") {
        if (!searchTypes.includes(filterValue as string)) {
          searchParams.set("searchType", "no");
          isFilterChanged = true;
        }
      } else if (filterType === "searchWord") {
        if (filterValue === null) {
          // note. empty string is okay
          searchParams.set("searchWord", "");
          isFilterChanged = true;
        }
      } else if (filterType === "sortType") {
        if (!sortTypes.includes(filterValue as string)) {
          searchParams.set("sortType", "작성일New");
          isFilterChanged = true;
        }
      } else if (filterType === "pageNo") {
        const pageNoToNumber = Number(filterValue);
        if (
          !(typeof pageNoToNumber === "number" && pageNoToNumber >= 1 && pageNoToNumber % 1 === 0)
        ) {
          searchParams.set("pageNo", "1");
          isFilterChanged = true;
        }
      } else throw Error("filter type error");
    });

    if (isFilterChanged) {
      // prevent infinite renders
      setSearchParams(searchParams);
    }
  }

  if (pathname === "/talk-list") {
    resetFiltersFromUrl(["genre", "searchType", "searchWord", "sortType", "pageNo"]);
  }

  return isForPagination;
}
