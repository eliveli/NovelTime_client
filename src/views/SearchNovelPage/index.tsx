import MainBG from "components/MainBG";
import { ColumnDetailList } from "components/NovelListFrame";
import useResetFiltersFromUrlForNovel from "utils/useResetFiltersFromUrlForNovel";
import { useMultipleSearchFilters } from "utils/useSearchFilterForNovel";
import useSearchListWithInfntScrollForNovel from "utils/useSearchListWithInfntScrollForNovel";
import PageNOs from "components/PageNOs";
import { useSearchForNovelQuery } from "store/serverAPIs/novelTime";
import Spinner from "assets/Spinner";
import { NovelColumnDetail } from "../../components/Novel";
import { useAppSelector } from "../../store/hooks";

import SearchForNovel from "../../components/Search/SearchForNovel";

function matchSearchTypeName(searchType: string) {
  if (searchType === "sample") return searchType; // get several novels at random

  if (searchType === "Title") return "novelTitle";
  if (searchType === "Desc") return "novelDesc";
  if (searchType === "Author") return "novelAuthor";

  throw Error("search type name is not correct");
}

export default function SearchPage() {
  const isForPagination = useResetFiltersFromUrlForNovel();

  // get filters from url for pagination or get them from state for infinite scroll
  const {
    currentFilters: { currentSearchType, currentSearchWord, currentPageNo },
  } = useMultipleSearchFilters();

  const searchTypeMatched = matchSearchTypeName(currentSearchType);

  const { isFetching, data } = useSearchForNovelQuery({
    searchType: !currentSearchWord ? "sample" : searchTypeMatched, // get sample novels when search word is empty
    searchWord: currentSearchWord || "undefined", // it can't be empty string when passing to server
    pageNo: Number(currentPageNo),
  });

  const { list: listForInfntScroll } = useAppSelector((state) => state.filter.novel);

  useSearchListWithInfntScrollForNovel({
    isForPagination,
    isFetching,
    data,
  });
  return (
    <MainBG>
      {isFetching && <Spinner styles="fixed" />}

      <SearchForNovel />

      {!isForPagination && !!listForInfntScroll?.length && (
        <ColumnDetailList
          categoryText={searchTypeMatched === "sample" ? "작품을 검색해 보세요" : "검색 결과"}
        >
          {listForInfntScroll.map((novel) => (
            <NovelColumnDetail key={novel.novelId} novel={novel} />
          ))}
        </ColumnDetailList>
      )}

      {/* on desktop */}
      {isForPagination && !!data?.novels?.length && (
        <ColumnDetailList
          categoryText={searchTypeMatched === "sample" ? "작품을 검색해 보세요" : "검색 결과"}
        >
          {data.novels.map((novel) => (
            <NovelColumnDetail key={novel.novelId} novel={novel} />
          ))}
        </ColumnDetailList>
      )}
      {isForPagination && data && (
        <PageNOs selectedNo={Number(currentPageNo)} lastNo={data.lastPageNo} />
      )}
    </MainBG>
  );
}
