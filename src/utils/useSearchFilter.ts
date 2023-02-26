import { useSearchParams } from "react-router-dom";
import { GenresFromFilter, selectGenre, setPageNo } from "store/clientSlices/filterSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";

export default function useSearchFilter(
  filterType: "genre" | "searchType" | "searchWord" | "sortType" | "pageNo",
) {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  function setFilterForPagi(nextValue: any) {
    searchParams.set(filterType, nextValue as string);
    setSearchParams(searchParams);
  }

  if (filterType === "genre") {
    const genreFromUrl = searchParams.get("genre");
    const genreFromState = useAppSelector((state) => state.filter.genre);
    const currentFilter = genreFromUrl ?? genreFromState;

    const setFilterForInfntScroll = (nextValue: GenresFromFilter) => {
      dispatch(selectGenre(nextValue));
    };

    const setFilter = (nextValue: GenresFromFilter) => {
      if (genreFromUrl) return setFilterForPagi(nextValue);
      return setFilterForInfntScroll(nextValue);
    };

    return { currentFilter, setFilter };
  }

  throw Error("filter type error");
}
