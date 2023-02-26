import { useSearchParams } from "react-router-dom";
import {
  GenresFromFilter,
  SearchTypeFromFilter,
  selectGenre,
  selectSearchType,
  setPageNo,
} from "store/clientSlices/filterSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

export default function useSearchFilter(
  filterType: "genre" | "searchType" | "searchWord" | "sortType" | "pageNo",
) {
  const dispatch = useAppDispatch();

  const genreFromState = useAppSelector((state) => state.filter.genre);
  const searchTypeFromState = useAppSelector((state) => state.filter.searchType);

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

  throw Error("filter type error");
}
