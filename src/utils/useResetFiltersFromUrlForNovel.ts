import { useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import { SEARCH_NOVEL } from "./pathname";

type FilterType = "searchType" | "searchWord" | "pageNo";

const searchTypes = ["Title", "Desc", "Author"];

// reset filters for pagination when they are not correct
export default function useResetFiltersFromUrlForNovel() {
  const { pathname, search } = window.location;

  const [searchParams, setSearchParams] = useSearchParams();

  const isForPagination = search !== "";

  function resetFiltersFromUrl(filters: FilterType[]) {
    let isFilterChanged = false;

    filters.map((filterType) => {
      const filterValue = searchParams.get(filterType); // it can be null

      if (filterType === "searchType") {
        if (filterValue === null || !searchTypes.includes(filterValue)) {
          searchParams.set("searchType", "Title");
          isFilterChanged = true;
        }
      } else if (filterType === "searchWord") {
        if (filterValue === null) {
          searchParams.set("searchWord", "");
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

  useEffect(() => {
    if (!isForPagination) return;

    if (SEARCH_NOVEL === pathname) {
      resetFiltersFromUrl(["searchType", "searchWord", "pageNo"]);
    }
  }, [isForPagination, pathname]);

  return isForPagination;
}
