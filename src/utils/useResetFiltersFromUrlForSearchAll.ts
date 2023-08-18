import { useEffect } from "react";

import { useSearchParams } from "react-router-dom";
import { SEARCH_ALL } from "./pathname";

type FilterType = "searchCategory" | "searchType" | "searchWord" | "pageNo";

const searchCategories = ["Novel", "Talk", "Recommend"];
const searchTypesInNovel = ["Title", "Desc", "Author"];
const searchTypesInWriting = ["Title", "Content", "Writer"];

const searchTypes = ["Title", "Desc", "Author", "Content", "Writer"];

// reset filters for pagination when they are not correct
export default function useResetFiltersFromUrlForSearchAll() {
  const { pathname, search } = window.location;

  const [searchParams, setSearchParams] = useSearchParams();

  const isForPagination = search !== "";

  function resetFiltersFromUrl(filters: FilterType[]) {
    let isFilterChanged = false;

    let searchCategory: string;

    filters.map((filterType) => {
      const filterValue = searchParams.get(filterType); // it can be null

      if (filterType === "searchCategory") {
        if (filterValue === null || !searchCategories.includes(filterValue)) {
          searchParams.set("searchCategory", "Novel");
          isFilterChanged = true;

          searchCategory = "Novel";
        } else {
          searchCategory = filterValue;
        }
      } else if (filterType === "searchType") {
        if (
          // set "Title" to default
          //  when the search type is not correct
          filterValue === null ||
          !searchTypes.includes(filterValue) ||
          //  when search category is not connected with search type
          (searchCategory === "Novel" && !searchTypesInNovel.includes(filterValue)) ||
          (["Talk", "Recommend"].includes(searchCategory) &&
            !searchTypesInWriting.includes(filterValue))
        ) {
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

    if (SEARCH_ALL === pathname) {
      resetFiltersFromUrl(["searchCategory", "searchType", "searchWord", "pageNo"]);
    }
  }, [isForPagination, pathname]);

  return isForPagination;
}
