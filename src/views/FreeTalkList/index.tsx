import MainBG from "components/MainBG";
import Filter from "components/Filter";
import { useGetWritingsFilteredQuery } from "store/serverAPIs/novelTime";
import { TalkList, WritingList } from "store/serverAPIs/types";
import {
  useSearchListWithInfntScroll,
  useResetFiltersFromUrl,
  useMultipleSearchFilters,
  matchFilterNames,
} from "utils";
import PageNOs from "components/PageNOs";
import { useAppSelector } from "store/hooks";
import FreeTalk from "./FreeTalkList.components";

export default function FreeTalkList() {
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
    listType: "T",
    novelGenre: genreMatched,
    searchType: currentSearchWord === "" ? "no" : searchTypeMatched,
    searchWord: currentSearchWord || "undefined",
    // ㄴwhen searchType is "no" searchWord is not considered
    // ㄴㄴbut searchWord can't be empty string because parameter in path can't be empty
    sortBy: sortTypeMatched,
    pageNo: Number(currentPageNo),
  });

  const { list: listForInfntScroll } = useAppSelector((state) => state.filter.talk);

  useSearchListWithInfntScroll({
    isForPagination,
    isFetching,
    data,
  });

  // 서버에서 데이터 받아올 때 구성
  const dataFromServer = [
    {
      talkId: "abcd", // 좋아요 누르거나 코멘트 작성 시 talkId로 서버 요청

      userName: "나나나",
      userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
      createDate: "22.03.03",

      likeNO: 5,
      commentNO: 7,

      talkTitle: "이 소설 강추",
      talkImg: "", // it can be empty string

      novelTitle: "헌터와 매드 사이언티스트",
    },
  ];

  // *list가 []일 때 콘텐트 없다는 컴포넌트 표시
  // ㄴ페이지네이션 여부에 따라 list 다름
  // ㄴundefined 일 때도 콘텐트 없음 표시?

  return (
    <MainBG>
      <Filter />
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
