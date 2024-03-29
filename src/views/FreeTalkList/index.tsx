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
import { NoContent, WritingButton } from "components/Writing";
import { useNavigate } from "react-router-dom";
import { ADD_WRITING } from "utils/pathname";
import { setSearchList } from "store/clientSlices/filterSlice";
import Spinner from "assets/Spinner";
import { useEffect } from "react";
import { handleAlert, openFirstModal } from "store/clientSlices/modalSlice";
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

  const isSettingTheList = useAppSelector((state) => state.filter.talk.isSettingTheList);

  const { isFetching, data } = useGetWritingsFilteredQuery(
    {
      writingType: "T",
      novelGenre: genreMatched,
      searchType: searchTypeMatched,
      isSearchWord: !!currentSearchWord,
      searchWord: currentSearchWord || "undefined",
      // ㄴwhen isSearchWord is "false", user gets writings regardless of search type
      // ㄴin this case, searchType is only used for getting desc when searchType is "writingDesc"
      // ㄴsearchWord can't be empty string as parameter in path can't be empty
      sortBy: sortTypeMatched,
      pageNo: Number(currentPageNo),
    },
    { skip: !isSettingTheList },
  );

  const { list: listForInfntScroll } = useAppSelector((state) => state.filter.talk);

  useSearchListWithInfntScrollForWriting({
    isForPagination,
    isFetching,
    data,
  });

  const isLoginUser = !!useAppSelector((state) => state.loginUser.user.userId);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 기존에 받아온 리스트 없이 최초 페이지 진입 시 기본 필터 설정값으로 리스트 불러옴
  // 유저가 처음 서치 필터 작동하기 전 동작
  // 기존에 받아온 리스트 있고 뒤로가기로 페이지 진입 시 제외
  useEffect(() => {
    if (!listForInfntScroll) {
      dispatch(setSearchList({ listType: "talk", isSettingTheList: true }));
    }
  }, []);

  return (
    <MainBG isWritingList>
      {isFetching && <Spinner styles="fixed" />}

      <Filter>
        <WritingButton
          clickToWrite={() => {
            if (!isLoginUser) {
              dispatch(openFirstModal("alert"));
              dispatch(handleAlert({ text: "로그인이 필요합니다" }));
              return;
            }

            dispatch(
              setSearchList({
                listType: "novel",
                list: "reset",
              }), // to see the fresh novel list when searching for novels with iframe
            );

            navigate(ADD_WRITING);
          }}
        />
      </Filter>

      {((!isForPagination && listForInfntScroll?.length === 0) || (isForPagination && !data)) && (
        <NoContent />
      )}

      {listForInfntScroll?.map((talk) => (
        <FreeTalk
          key={talk.talkId}
          talk={talk}
          searchWord={searchTypeMatched === "writingDesc" ? currentSearchWord : undefined}
        />
      ))}

      {/* on desktop */}
      {isForPagination &&
        data?.talks?.map((talk) => (
          <FreeTalk
            key={talk.talkId}
            talk={talk}
            searchWord={searchTypeMatched === "writingDesc" ? currentSearchWord : undefined}
          />
        ))}
      {isForPagination && data && (
        <PageNOs selectedNo={Number(currentPageNo)} lastNo={data.lastPageNo} />
      )}
    </MainBG>
  );
}
