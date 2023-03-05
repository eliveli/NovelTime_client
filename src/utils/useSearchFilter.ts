import { useSearchParams } from "react-router-dom";
import {
  GenresFromFilter,
  SearchTypeFromFilter,
  selectGenre,
  selectSearchType,
  setPageNo,
  setSearchWord,
  setTalkList,
} from "store/clientSlices/filterSlice";
import { SortTypeFromFilter, sortWriting } from "store/clientSlices/modalSlice";
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

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const talkFiltersFromState = useAppSelector((state) => state.filter.talk.filters);

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

  //
  // set next filters //
  const setFilterForPagi = (filter: string, nextValue: any) => {
    searchParams.set(filter, String(nextValue));
  };

  const checkForFilter = (filter: string) => {
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
      //
    } else {
      const nextFiltersToSet: { [key: string]: any } = {};

      const nextFilters = filterEntries.filter(([filterType]) => checkForFilter(filterType));

      nextFilters.forEach(([filterType, filterValue]) => {
        nextFiltersToSet[filterType] = filterValue;
      });

      setFilterForInfntScroll(nextFiltersToSet);
    }
  };

  // undefined가 아닌 한 주어진 필터들은 모두가 url에 존재하거나 존재하지 않음. 일부만 존재 X
  // ㄴ함수 useResetFiltersFromUrl가 writing list component (i.e.FreeTalkList) 에서 동작하면서
  // ㄴ일부 필터가 없다면 재설정하기 때문
  // -> 따라서 페이지네이션 또는 무한스크롤 둘 중 하나만 실행됨. 어떤 필터는 페이지네이션, 어떤 필터는 무한스크롤을 하진 않음

  return { currentFilters, setFilters };
}

export function useSearchFilter(filter: FilterType) {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const genreFromState = useAppSelector((state) => state.filter.genre);
  const searchTypeFromState = useAppSelector((state) => state.filter.searchType);
  const searchWordFromState = useAppSelector((state) => state.filter.searchWord);
  const sortTypeFromState = useAppSelector((state) => state.modal.sortType);
  const pageNoFromState = String(useAppSelector((state) => state.filter.pageNo));

  // get current filter //
  const getFilterFromState = (filterForState: FilterType) => {
    if (filterForState === "genre") return genreFromState;
    if (filterForState === "searchType") return searchTypeFromState;
    if (filterForState === "searchWord") return searchWordFromState;
    if (filterForState === "sortType") return sortTypeFromState;
    if (filterForState === "pageNo") return pageNoFromState;

    throw Error("filterForState was not matched in getFilterFromState");
  };

  const filterFromUrl = searchParams.get(filter);
  let currentFilter = filterFromUrl;

  if (currentFilter === null) {
    currentFilter = getFilterFromState(filter);
  }

  //
  // set next filter //
  const setFilterForPagi = (nextValue: any) => {
    searchParams.set(filter, String(nextValue));
    setSearchParams(searchParams);
  };

  const setFilterForInfntScroll = (filterForInfntScroll: FilterType, nextValue: any) => {
    if (filterForInfntScroll === "genre") {
      dispatch(selectGenre(nextValue as GenresFromFilter));
      //
    } else if (filterForInfntScroll === "searchType") {
      dispatch(selectSearchType(nextValue as SearchTypeFromFilter));
      //
    } else if (filterForInfntScroll === "searchWord") {
      dispatch(setSearchWord(nextValue as string));
      //
    } else if (filter === "sortType") {
      dispatch(sortWriting(nextValue as SortTypeFromFilter));
      //
    } else if (filter === "pageNo") {
      dispatch(setPageNo(nextValue as number));
    }
  };

  const setFilter = (nextValue: any) => {
    // type of nextValue must be any to deal with all them in if-conditions
    if (filterFromUrl !== null) return setFilterForPagi(nextValue);
    return setFilterForInfntScroll(filter, nextValue);
  };

  // ㄴ search params in url (represented as query string) can be empty string or null
  //    null means that search parameter doesn't exist in url
  //    then get the filter from state for infinite scroll

  return { currentFilter, setFilter };
}
