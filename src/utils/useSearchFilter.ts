import { useSearchParams } from "react-router-dom";
import {
  GenresFromFilter,
  SearchTypeFromFilter,
  selectGenre,
  selectSearchType,
  setPageNo,
  setSearchWord,
} from "store/clientSlices/filterSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

type FilterType = "genre" | "searchType" | "searchWord" | "sortType" | "pageNo";

// ** 아래 코드 제작 중 to treat multiple search filter at once for both pagination and infinite scroll
export function useMultipleSearchFilters(
  filter1: FilterType, // also I can get one filter not only multiple them
  filter2?: FilterType,
  filter3?: FilterType,
  filter4?: FilterType,
  filter5?: FilterType,
) {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const genreFromState = useAppSelector((state) => state.filter.genre);
  const searchTypeFromState = useAppSelector((state) => state.filter.searchType);
  const searchWordFromState = useAppSelector((state) => state.filter.searchWord);

  // get current filters //
  const filtersWithUndefined = [filter1, filter2, filter3, filter4, filter5];
  const filters = filtersWithUndefined.filter((_) => _ !== undefined) as FilterType[];

  const currentFilters = { currentGenre: "", currentSearchType: "", currentSearchWord: "" };

  const getFilterFromState = (filterForState: FilterType) => {
    if (filterForState === "genre") return genreFromState;
    if (filterForState === "searchType") return searchTypeFromState;
    if (filterForState === "searchWord") return searchWordFromState;

    throw Error("filterForState was not matched in getFilterFromState");
  };

  filters.map((filter) => {
    const filterFromUrl = searchParams.get(filter);
    let currentFilter = filterFromUrl;

    if (currentFilter === null) {
      currentFilter = getFilterFromState(filter);
    }

    if (filter === "genre") {
      currentFilters.currentGenre = currentFilter;
      //
    } else if (filter === "searchType") {
      currentFilters.currentSearchType = currentFilter;
      //
    } else if (filter === "searchWord") {
      currentFilters.currentSearchWord = currentFilter;
    }
  });

  //
  // set next filters //
  const setFilterForPagi = (filter: string, nextValue: any) => {
    searchParams.set(filter, nextValue as string);
  };

  const setFilterForInfntScroll = (filter: string, nextValue: any) => {
    if (filter === "genre") {
      dispatch(selectGenre(nextValue as GenresFromFilter));
      //
    } else if (filter === "searchType") {
      dispatch(selectSearchType(nextValue as SearchTypeFromFilter));
      //
    } else if (filter === "searchWord") {
      dispatch(setSearchWord(nextValue as string));
    }
  };

  const setFilters = (filtersToSet: {
    genre?: any;
    searchType?: any;
    searchWord?: any;
    sortType?: any;
    pageNo?: any;
  }) => {
    const filterEntries = Object.entries(filtersToSet);

    let isForPagination = false;

    filterEntries.map(([filter, filterValue]) => {
      if (filterValue !== undefined) {
        const filterFromUrl = searchParams.get(filter);

        if (filterFromUrl !== null) {
          isForPagination = true;
          setFilterForPagi(filter, filterValue);
        } else {
          setFilterForInfntScroll(filter, filterValue);
        }
      }
    });

    if (isForPagination) {
      setSearchParams(searchParams);
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

  // get current filter //
  const getFilterFromState = (filterForState: FilterType) => {
    if (filterForState === "genre") return genreFromState;
    if (filterForState === "searchType") return searchTypeFromState;
    if (filterForState === "searchWord") return searchWordFromState;

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
    searchParams.set(filter, nextValue as string);
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
