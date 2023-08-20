import React, { useEffect } from "react";
import MainBG from "components/MainBG";
import useResetFiltersFromUrlForSearchAll from "utils/useResetFiltersFromUrlForSearchAll";
import { useMultipleSearchFilters } from "utils/useSearchFilterForSearchAll";
import useSearchListWithInfntScrollForSearchAll from "utils/useSearchListWithInfntScrollForSearchAll";
import { setSearchList } from "store/clientSlices/filterSlice";
import Spinner from "assets/Spinner";
import SearchForAll from "components/Search/SearchForAll";
import { ColumnDetailList } from "components/NovelListFrame";
import PageNOs from "components/PageNOs";
import { useSearchForAllQuery } from "store/serverAPIs/novelTime";
import FreeTalk from "views/FreeTalkList/FreeTalkList.components";
import Recommend from "views/RecommendList/RecommendList.components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { NovelColumnDetail } from "../../components/Novel";

function matchSearchCategoryName(searchCategory: string) {
  if (searchCategory === "Novel") return "novel";
  if (searchCategory === "Talk") return "T";
  return "R";
}

function matchSearchTypeNameWithCategory(searchCategory: string, searchType: string) {
  if (searchCategory === "Novel") {
    if (searchType === "Title") return "novelTitle";
    if (searchType === "Desc") return "novelDesc";
    if (searchType === "Author") return "novelAuthor";
  }

  if (searchType === "Title") return "writingTitle";
  if (searchType === "Content") return "writingDesc";
  return "userName";
}

export default function SearchPage() {
  const isForPagination = useResetFiltersFromUrlForSearchAll();

  // get filters from url for pagination or get them from state for infinite scroll
  const {
    currentFilters: { currentSearchCategory, currentSearchType, currentSearchWord, currentPageNo },
  } = useMultipleSearchFilters();

  const searchCategoryMatched = matchSearchCategoryName(currentSearchCategory);

  const searchTypeMatched = matchSearchTypeNameWithCategory(
    currentSearchCategory,
    currentSearchType,
  );

  const isSettingTheList = useAppSelector((state) => state.filter.searchAll.isSettingTheList);

  // to get [novel samples] or [writings regardless of search type] when search word isn't there
  const searchTypeWithoutSearchWord =
    !currentSearchWord && (searchCategoryMatched === "novel" ? "sample" : "no");

  const { isFetching, data } = useSearchForAllQuery(
    {
      searchCategory: searchCategoryMatched,
      searchType: searchTypeWithoutSearchWord || searchTypeMatched,
      searchWord: currentSearchWord || "undefined", // it can't be empty string when passing to server
      pageNo: Number(currentPageNo),
    },
    { skip: !isSettingTheList },
  );

  const { list: listForInfntScroll } = useAppSelector((state) => state.filter.searchAll);

  useSearchListWithInfntScrollForSearchAll({
    isForPagination,
    isFetching,
    data,
  });

  const dispatch = useAppDispatch();

  // 유저가 서치 필터 작동하기 전 기존 필터 설정값으로 리스트 불러오기
  useEffect(() => {
    if (!listForInfntScroll) {
      dispatch(setSearchList({ listType: "searchAll", isSettingTheList: true }));
    }
  }, []);

  return (
    <MainBG>
      {isFetching && <Spinner styles="fixed" />}

      <SearchForAll />

      {/* 받아오는 데이터 : 노블/톡/리코멘드 에 따라 컴포넌트 분리 구성 */}

      {listForInfntScroll?.novels?.length && (
        <ColumnDetailList categoryText={!currentSearchWord ? "작품을 검색해 보세요" : "검색 결과"}>
          {listForInfntScroll?.novels?.map((novel) => (
            <NovelColumnDetail key={novel.novelId} novel={novel} />
          ))}
        </ColumnDetailList>
      )}

      {listForInfntScroll?.talks?.map((talk) => (
        <FreeTalk key={talk.talkId} talk={talk} />
      ))}

      {listForInfntScroll?.recommends?.map((recommendInfo) => (
        <Recommend recommendInfo={recommendInfo} />
      ))}

      {/* on desktop */}

      {isForPagination && !!data?.novels?.length && (
        <ColumnDetailList categoryText={!currentSearchWord ? "작품을 검색해 보세요" : "검색 결과"}>
          {data.novels.map((novel) => (
            <NovelColumnDetail key={novel.novelId} novel={novel} />
          ))}
        </ColumnDetailList>
      )}

      {isForPagination && data?.talks?.map((talk) => <FreeTalk key={talk.talkId} talk={talk} />)}

      {isForPagination &&
        data?.recommends?.map((recommendInfo) => <Recommend recommendInfo={recommendInfo} />)}

      {isForPagination && data && (
        <PageNOs selectedNo={Number(currentPageNo)} lastNo={data.lastPageNo} />
      )}
    </MainBG>
  );
}
