import React from "react";
import MainBG from "components/MainBG";
import Filter from "components/Filter";
import { useGetWritingsFilteredQuery } from "store/serverAPIs/novelTime";
import {
  useSearchListWithInfntScroll,
  useResetFiltersFromUrl,
  useMultipleSearchFilters,
  matchFilterNames,
} from "utils";
import PageNOs from "components/PageNOs";
import { useAppSelector } from "store/hooks";
import Recommend from "./RecommendList.components";

export default function RecommendList() {
  const isForPagination = useResetFiltersFromUrl();

  // get filters from url for pagination or them from state for infinite scroll
  const {
    currentFilters: {
      currentGenre,
      currentSearchType,
      currentSearchWord,
      currentSortType,
      currentPageNo,
    },
  } = useMultipleSearchFilters();

  const { genreMatched, searchTypeMatched, sortTypeMatched } = matchFilterNames({
    genre: currentGenre,
    searchType: currentSearchType,
    sortType: currentSortType,
  });

  const { isLoading, isFetching, isError, data } = useGetWritingsFilteredQuery({
    listType: "R",
    novelGenre: genreMatched,
    searchType: currentSearchWord === "" ? "no" : searchTypeMatched,
    searchWord: currentSearchWord || "undefined",
    sortBy: sortTypeMatched,
    pageNo: Number(currentPageNo),
  });

  const { list: listForInfntScroll } = useAppSelector((state) => state.filter.recommend);

  useSearchListWithInfntScroll({
    isForPagination,
    isFetching,
    data,
  });

  return (
    <MainBG>
      <Filter />

      {!isForPagination &&
        listForInfntScroll?.map((recommendInfo) => <Recommend recommendInfo={recommendInfo} />)}

      {/* for tablet and pc */}
      {isForPagination &&
        data?.recommends?.map((recommendInfo) => <Recommend recommendInfo={recommendInfo} />)}

      {isForPagination && data && (
        <PageNOs selectedNo={Number(currentPageNo)} lastNo={data.lastPageNo} />
      )}
    </MainBG>
  );
}
