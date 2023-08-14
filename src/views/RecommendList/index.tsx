import MainBG from "components/MainBG";
import Filter from "components/FilterForWriting";
import { useGetWritingsFilteredQuery } from "store/serverAPIs/novelTime";
import {
  useSearchListWithInfntScrollForWriting,
  useResetFiltersFromUrlForWriting,
  matchFilterNames,
} from "utils";
import { useMultipleSearchFilters } from "utils/useSearchFilterForWriting";

import PageNOs from "components/PageNOs";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setSearchList } from "store/clientSlices/filterSlice";
import { WritingButton } from "components/Writing";
import { useNavigate } from "react-router-dom";
import { ADD_WRITING } from "utils/pathname";
import Recommend from "./RecommendList.components";

export default function RecommendList() {
  const isForPagination = useResetFiltersFromUrlForWriting();

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
    writingType: "R",
    novelGenre: genreMatched,
    searchType: currentSearchWord === "" ? "no" : searchTypeMatched,
    searchWord: currentSearchWord || "undefined",
    sortBy: sortTypeMatched,
    pageNo: Number(currentPageNo),
  });

  const { list: listForInfntScroll } = useAppSelector((state) => state.filter.recommend);

  useSearchListWithInfntScrollForWriting({
    isForPagination,
    isFetching,
    data,
  });

  const isLoginUser = !!useAppSelector((state) => state.user.loginUserInfo.userId);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <MainBG>
      <Filter>
        <WritingButton
          clickToWrite={() => {
            if (!isLoginUser) {
              alert("로그인이 필요합니다");
              return;
            }

            dispatch(
              setSearchList({
                listType: "novel",
                list: "reset",
              }),
            );

            navigate(`${ADD_WRITING}?board=Recommend`);
          }}
        />
      </Filter>

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
