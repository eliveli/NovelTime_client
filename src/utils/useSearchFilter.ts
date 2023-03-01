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
export function useMultipleSearchFilter(
  filter1: FilterType,
  filter2: FilterType,
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

  const currentFilters = { genre: "", searchType: "", searchWord: "" };

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
      currentFilters.genre = currentFilter;
      //
    } else if (filter === "searchType") {
      currentFilters.searchType = currentFilter;
      //
    } else if (filter === "searchWord") {
      currentFilters.searchWord = currentFilter;
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

export default function useSearchFilter(
  filterType: "genre" | "searchType" | "searchWord" | "sortType" | "pageNo",
) {
  const dispatch = useAppDispatch();

  const genreFromState = useAppSelector((state) => state.filter.genre);
  const searchTypeFromState = useAppSelector((state) => state.filter.searchType);
  const searchWordFromState = useAppSelector((state) => state.filter.searchWord);

  const [searchParams, setSearchParams] = useSearchParams();

  const setFilterForPagi = (nextValue: any) => {
    searchParams.set(filterType, nextValue as string);
    setSearchParams(searchParams);
  };

  if (filterType === "genre") {
    const genreFromUrl = searchParams.get("genre");

    const currentFilter = genreFromUrl ?? genreFromState;

    const setFilterForInfntScroll = (nextValue: GenresFromFilter) => {
      dispatch(selectGenre(nextValue));
    };

    // this parameter type of setFilter must be any to deal with all them in if-conditions
    const setFilter = (nextValue: any) => {
      if (genreFromUrl) return setFilterForPagi(nextValue);
      return setFilterForInfntScroll(nextValue as GenresFromFilter);
    };

    return { currentFilter, setFilter };
  }

  if (filterType === "searchType") {
    const searchTypeFromUrl = searchParams.get("searchType");

    const currentFilter = searchTypeFromUrl ?? searchTypeFromState;

    const setFilterForInfntScroll = (nextValue: SearchTypeFromFilter) => {
      dispatch(selectSearchType(nextValue));
    };

    const setFilter = (nextValue: any) => {
      if (searchTypeFromUrl) return setFilterForPagi(nextValue);
      return setFilterForInfntScroll(nextValue as SearchTypeFromFilter);
    };

    return { currentFilter, setFilter };
  }

  if (filterType === "searchWord") {
    const searchWordFromUrl = searchParams.get("searchWord");

    const currentFilter = searchWordFromUrl ?? searchWordFromState;
    // search params in url (represented as query string) can be empty string or null
    //   null means that search parameter doesn't exist in url
    //   then get the filter from state for infinite scroll

    const setFilterForInfntScroll = (nextValue: string) => {
      dispatch(setSearchWord(nextValue));
    };

    const setFilter = (nextValue: any) => {
      if (searchWordFromUrl !== null) return setFilterForPagi(nextValue);
      return setFilterForInfntScroll(nextValue as string);
    };

    return { currentFilter, setFilter };
  }

  throw Error("filter type error");
}
