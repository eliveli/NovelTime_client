import { useSearchParams } from "react-router-dom";
import { setTalkList } from "store/clientSlices/filterSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

type FilterType = "genre" | "searchType" | "searchWord" | "sortType" | "pageNo";

type KeyOfFilters =
  | "currentGenre"
  | "currentSearchType"
  | "currentSearchWord"
  | "currentSortType"
  | "currentPageNo";

type CurrentFilters = { [key in KeyOfFilters]: string | number };

type FiltersInState = { [key in FilterType]: string | number };

// treat multiple search filter at once for both pagination and infinite scroll
export function useMultipleSearchFilters() {
  const { pathname, search } = window.location;

  const isForPagination = search !== "";

  const talkFiltersFromState = useAppSelector((state) => state.filter.talk.filters);

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // get current filters //
  const currentFilters: CurrentFilters = {
    currentGenre: "",
    currentSearchType: "",
    currentSearchWord: "",
    currentSortType: "",
    currentPageNo: 0,
  };

  const setCurrentFilter = (filter: string, filterValue: string | number) => {
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

    filterEntries.map(([filter, filterValueFromState]) => {
      setCurrentFilter(filter, filterValueFromState);
    });
  };

  if (pathname === "/talk-list") {
    if (isForPagination) {
      getFiltersFromUrl(["genre", "searchType", "searchWord", "sortType", "pageNo"]);
    } else {
      getFiltersFromState(talkFiltersFromState);
    }
  }

  // set next filters //
  const setFilterForPagi = (filter: string, nextValue: any) => {
    searchParams.set(filter, String(nextValue));
  };

  const checkForFilterInCertainPath = (filter: string) => {
    if (pathname === "/talk-list") {
      return ["genre", "searchType", "searchWord", "sortType", "pageNo"].includes(filter);
    }
  };

  const setFilterForInfntScroll = (nextFiltersToSet: { [key: string]: any }) => {
    if (pathname === "/talk-list") {
      dispatch(setTalkList({ filters: nextFiltersToSet }));
    }
  };

  const setFilters = (filtersToSet: {
    genre?: string;
    searchType?: string;
    searchWord?: string;
    sortType?: string;
    pageNo?: number;
  }) => {
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
        checkForFilterInCertainPath(filterType),
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

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // check whether the filter is correct in current path
  if (pathname === "/talk-list") {
    const isCorrectFilter = ["genre", "searchType", "searchWord", "sortType", "pageNo"].includes(
      filterType,
    );

    if (!isCorrectFilter) throw Error("incorrect filter in current search list");
  }

  // get current filter //
  let currentFilter: string | number | undefined;

  const getFilterFromState = () => {
    if (pathname === "/talk-list") {
      currentFilter = talkFiltersFromState[filterType];
    }

    if (currentFilter === undefined) {
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
    if (pathname === "/talk-list") {
      dispatch(setTalkList({ filters: { [filterType]: nextValue } }));
    }
  };

  const setFilter = (nextValue: string | number) => {
    if (isForPagination) {
      return setFilterForPagi(nextValue);
    }
    return setFilterForInfntScroll(nextValue);
  };

  return { currentFilter, setFilter };
}
