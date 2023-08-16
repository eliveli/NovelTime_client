import { useSearchParams } from "react-router-dom";
import { setListType, setSearchList } from "store/clientSlices/filterSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { RECOMMEND_LIST, TALK_LIST } from "./pathname";

type FilterType = "genre" | "searchType" | "searchWord" | "sortType" | "pageNo";

type KeyOfFilters =
  | "currentGenre"
  | "currentSearchType"
  | "currentSearchWord"
  | "currentSortType"
  | "currentPageNo";

type CurrentFilters = { [key in KeyOfFilters]: string };

// treat multiple search filter at once for both pagination and infinite scroll
export function useMultipleSearchFilters() {
  const { pathname, search } = window.location;
  const isForPagination = search !== "";

  const talkFiltersFromState = useAppSelector((state) => state.filter.talk.filters);
  const recommendFiltersFromState = useAppSelector((state) => state.filter.recommend.filters);

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // get current filters //
  const currentFilters: CurrentFilters = {
    currentGenre: "",
    currentSearchType: "",
    currentSearchWord: "",
    currentSortType: "",
    currentPageNo: "0",
  };

  const setCurrentFilter = (filter: string, filterValue: string) => {
    const keyOfFilters = `current${filter.charAt(0).toUpperCase()}${filter.slice(
      1,
    )}` as KeyOfFilters;

    currentFilters[keyOfFilters] = filterValue;
  };

  const getFiltersFromUrl = (filters: FilterType[]) => {
    filters.map((filter) => {
      const filterFromUrl = searchParams.get(filter);

      if (filterFromUrl === null) throw Error("filter from url is null");

      setCurrentFilter(filter, filterFromUrl);
    });
  };

  const getFiltersFromState = (filtersFromState: { [key in FilterType]: string | number }) => {
    const filterEntries = Object.entries(filtersFromState);

    filterEntries.forEach(([filter, filterValueFromState]) => {
      setCurrentFilter(filter, String(filterValueFromState));
    });
  };

  if ([TALK_LIST, RECOMMEND_LIST].includes(pathname)) {
    if (isForPagination) {
      getFiltersFromUrl(["genre", "searchType", "searchWord", "sortType", "pageNo"]);
    } else if (TALK_LIST === pathname) {
      getFiltersFromState(talkFiltersFromState);
    } else if (RECOMMEND_LIST === pathname) {
      getFiltersFromState(recommendFiltersFromState);
    }
  }

  // set next filters //
  const setFilterForPagi = (filter: string, nextValue: any) => {
    searchParams.set(filter, String(nextValue));
  };

  const checkForFilterInCertainPath = (filter: string, pathForInfntScroll?: string) => {
    // if pathForInfntScroll exists then check for it
    if ([TALK_LIST, RECOMMEND_LIST].includes(String(pathForInfntScroll))) {
      return ["genre", "searchType", "searchWord", "sortType", "pageNo"].includes(filter);
    }

    if ([TALK_LIST, RECOMMEND_LIST].includes(pathname)) {
      return ["genre", "searchType", "searchWord", "sortType", "pageNo"].includes(filter);
    }
  };

  const setFilterForInfntScroll = (nextFiltersToSet: { [key: string]: any }) => {
    const listType = setListType();

    dispatch(setSearchList({ listType, filters: nextFiltersToSet, isSettingTheList: true }));
  };

  const setFilters = (
    filtersToSet: {
      genre?: string;
      searchType?: string;
      searchWord?: string;
      sortType?: string;
      pageNo?: number;
    },
    pathForInfntScroll?: string,
    // set filters for search list in this path to use later
    // if it is undefined, set filters for current path
  ) => {
    const filterEntriesWithUndefined = Object.entries(filtersToSet);

    const filterEntries = filterEntriesWithUndefined.filter(
      ([filter, filterValue]) => filterValue !== undefined,
    );

    if (isForPagination) {
      filterEntries.map(([filterType, filterValue]) => {
        const filterFromUrl = searchParams.get(filterType);

        if (filterFromUrl !== null) {
          setFilterForPagi(filterType, filterValue);
        }
      });

      setSearchParams(searchParams);
    } else {
      const nextFiltersToSet: { [key: string]: any } = {};

      const nextFilters = filterEntries.filter(([filterType]) =>
        checkForFilterInCertainPath(filterType, pathForInfntScroll),
      );

      nextFilters.forEach(([filterType, filterValue]) => {
        nextFiltersToSet[filterType] = filterValue;
      });

      setFilterForInfntScroll(nextFiltersToSet);
    }
  };
  return { currentFilters, setFilters };
}

export function useSearchFilter(filterType: FilterType) {
  const { pathname, search } = window.location;

  const isForPagination = search !== "";

  const talkFiltersFromState = useAppSelector((state) => state.filter.talk.filters);
  const recommendFiltersFromState = useAppSelector((state) => state.filter.recommend.filters);

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // check whether the filter is correct in current path
  if ([TALK_LIST, RECOMMEND_LIST].includes(pathname)) {
    const isCorrectFilter = ["genre", "searchType", "searchWord", "sortType", "pageNo"].includes(
      filterType,
    );

    if (!isCorrectFilter) throw Error("incorrect filter in current search list");
  }

  // get current filter //
  let currentFilter = "";

  const getFilterFromState = () => {
    if (TALK_LIST === pathname) {
      currentFilter = String(talkFiltersFromState[filterType]);
      return;
    }
    if (RECOMMEND_LIST === pathname) {
      currentFilter = String(recommendFiltersFromState[filterType]);
      return;
    }

    if (currentFilter === "undefined") {
      throw Error("filter was not matched with filters from state");
    }
  };

  const getFilterFromUrl = () => {
    const filterFromUrl = searchParams.get(filterType);

    if (filterFromUrl === null) throw Error("filter from url is null");

    currentFilter = filterFromUrl;
  };

  if (isForPagination) {
    getFilterFromUrl();
  } else {
    getFilterFromState();
  }

  // set next filter //
  const setFilterForPagi = (nextValue: string | number) => {
    searchParams.set(filterType, String(nextValue));
    setSearchParams(searchParams);
  };

  const setFilterForInfntScroll = (nextValue: string | number) => {
    const listType = setListType();

    dispatch(
      setSearchList({ listType, filters: { [filterType]: nextValue }, isSettingTheList: true }),
    );
  };

  const setFilter = (nextValue: string | number) => {
    if (isForPagination) {
      return setFilterForPagi(nextValue);
    }
    return setFilterForInfntScroll(nextValue);
  };

  return { currentFilter, setFilter };
}
