import { useState, useEffect } from "react";
import { GenresFromFilter, setPageNo } from "store/clientSlices/filterSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { TalkList, WritingList } from "store/serverAPIs/types";
import checkIsNearBottom from "./checkIsNearBottom";
import { matchGenreName, matchSortTypeName, matchSrchTypeName } from "./matchName";

const useSearchFilters = () => {
  const genre = useAppSelector((state) => state.filter.genre);
  const currentGenre = matchGenreName(genre);

  const searchType = useAppSelector((state) => state.filter.searchType);
  const currentSrchType = matchSrchTypeName(searchType);

  const searchWord = useAppSelector((state) => state.filter.searchWord);

  // sort type 작업 필요 for pc
  const sortType = useAppSelector((state) => state.modal.sortType);
  const currentSortType = matchSortTypeName(sortType);

  const currentPageNo = useAppSelector((state) => state.filter.pageNo);

  return { currentGenre, currentSrchType, searchWord, currentSortType, currentPageNo };
};

export default useSearchFilters;
