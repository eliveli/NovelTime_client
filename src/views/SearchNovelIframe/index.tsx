import MainBG from "components/MainBG";
import { ColumnDetailList } from "components/NovelListFrame";
import useSearchListWithInfntScrollForNovel from "utils/useSearchListWithInfntScrollForNovel";
import { useSearchForNovelQuery } from "store/serverAPIs/novelTime";
import { useEffect } from "react";
import Spinner from "assets/Spinner";
import { useMultipleSearchFilters } from "utils/useSearchFilterForNovel";
import { setSearchList } from "store/clientSlices/filterSlice";
import { NovelColumnDetail } from "../../components/Novel";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { BtnToGoTo, ContainerToGoTo, TextToGoTo } from "./SearchPage.styles";

import SearchForNovel from "../../components/Search/SearchForNovel";

function matchSearchTypeName(searchType: string) {
  if (searchType === "Title") return "novelTitle";
  if (searchType === "Desc") return "novelDesc";
  if (searchType === "Author") return "novelAuthor";

  throw Error("search type name is not correct");
}

export default function SearchPage() {
  const {
    currentFilters: { currentSearchType, currentSearchWord, currentPageNo },
  } = useMultipleSearchFilters();

  const searchTypeMatched = matchSearchTypeName(currentSearchType);

  const isSettingTheList = useAppSelector((state) => state.filter.novel.isSettingTheList);
  const { isFetching, data } = useSearchForNovelQuery(
    {
      searchType: !currentSearchWord ? "sample" : searchTypeMatched, // get sample novels when search word is empty
      searchWord: currentSearchWord || "undefined", // it can't be empty string when passing to server
      pageNo: Number(currentPageNo),
    },
    { skip: !isSettingTheList },
  );

  const { list: listForInfntScroll } = useAppSelector((state) => state.filter.novel);

  useSearchListWithInfntScrollForNovel({
    isForPagination: false,
    isFetching,
    data,
  });

  const dispatch = useAppDispatch();

  // 유저가 서치 필터 작동하기 전 기존 필터 설정값으로 리스트 불러오기
  useEffect(() => {
    if (!listForInfntScroll) {
      dispatch(setSearchList({ listType: "novel", isSettingTheList: true }));
    }
  }, []);

  //  pass novel info to the parent
  const goToPlatform = () => {
    window.parent.postMessage({ sign: "goToPlatform" }, "*");
  };

  return (
    <MainBG>
      {isFetching && <Spinner styles="fixed" />}

      <SearchForNovel />

      {!!listForInfntScroll?.length && (
        <ColumnDetailList categoryText={!currentSearchWord ? "작품을 검색해 보세요" : "검색 결과"}>
          {listForInfntScroll.map((novel) => (
            <NovelColumnDetail key={novel.novelId} novel={novel} />
          ))}
        </ColumnDetailList>
      )}

      {!data && (
        <ContainerToGoTo>
          <TextToGoTo>찾으시는 소설이 없나요?</TextToGoTo>
          <BtnToGoTo onClick={goToPlatform}>소설 플랫폼에서 찾기</BtnToGoTo>
        </ContainerToGoTo>
      )}
    </MainBG>
  );
}
