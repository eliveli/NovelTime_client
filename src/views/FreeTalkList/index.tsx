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
import { useAppSelector } from "store/hooks";
import { WritingButton } from "components/Writing";
import { useNavigate } from "react-router-dom";
import { ADD_WRITING } from "utils/pathname";
import FreeTalk from "./FreeTalkList.components";

export default function FreeTalkList() {
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
    writingType: "T",
    novelGenre: genreMatched,
    searchType: currentSearchWord === "" ? "no" : searchTypeMatched,
    searchWord: currentSearchWord || "undefined",
    // ㄴwhen searchType is "no" searchWord is not considered
    // ㄴㄴbut searchWord can't be empty string because parameter in path can't be empty
    sortBy: sortTypeMatched,
    pageNo: Number(currentPageNo),
  });

  const { list: listForInfntScroll } = useAppSelector((state) => state.filter.talk);

  useSearchListWithInfntScrollForWriting({
    isForPagination,
    isFetching,
    data,
  });

  const navigate = useNavigate();

  // *list가 []일 때 콘텐트 없다는 컴포넌트 표시
  // ㄴ페이지네이션 여부에 따라 list 다름
  // ㄴundefined 일 때도 콘텐트 없음 표시?

  return (
    <MainBG>
      <Filter>
        <WritingButton
          clickToWrite={() => {
            navigate(ADD_WRITING);
          }}
        />
      </Filter>

      {!isForPagination &&
        listForInfntScroll?.map((talk) => <FreeTalk key={talk.talkId} talk={talk} />)}

      {/* for tablet and pc */}
      {isForPagination && data?.talks?.map((talk) => <FreeTalk key={talk.talkId} talk={talk} />)}
      {isForPagination && data && (
        <PageNOs selectedNo={Number(currentPageNo)} lastNo={data.lastPageNo} />
      )}
    </MainBG>
  );
}
