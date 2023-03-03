import { useState, useEffect } from "react";
import { GenresFromFilter, setPageNo } from "store/clientSlices/filterSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { TalkList, WritingList } from "store/serverAPIs/types";
import checkIsNearBottom from "./checkIsNearBottom";

function useInfiniteScroll({
  isForPagination,
  searchFilters,
  isFetching,
  data,
}: {
  isForPagination: boolean;
  searchFilters: {
    currentGenre:
      | "패러디"
      | "로판"
      | "로맨스"
      | "현판"
      | "판타지"
      | "무협"
      | "라이트노벨"
      | "BL"
      | "미스터리"
      | "all"
      | "extra";
    currentSrchType: "no" | "writingTitle" | "writingDesc" | "userName" | "novelTitle";
    // ㄴ"no" can't be there in searchTypeFromState with any previous name before matching
    //    but return value of matchSrchTypeName can be "no"
    //     (see where the arg is used)
    //    so in this react hook "no" is for avoiding type error. actually it won't be used here
    currentSearchWord: string;
    currentSortType:
      | "newDate"
      | "oldDate"
      | "manyComments"
      | "fewComments"
      | "manyLikes"
      | "fewLikes";
    currentPageNo: number;
  };
  isFetching: boolean;
  data: WritingList;
}) {
  const { currentGenre, currentPageNo, currentSearchWord, currentSortType, currentSrchType } =
    searchFilters;

  const dispatch = useAppDispatch();

  const [writingsOfGivenPages, setWritingsOfGivenPages] = useState<TalkList>([]);
  // * change later for other writing list not for TalkList only

  const [prevFilters, setPrevFilters] = useState({
    prevGenre: currentGenre,
    prevSrchType: currentSrchType,
    prevSearchWord: currentSearchWord,
    prevSortType: currentSortType,
    prevPageNo: currentPageNo,
  });

  useEffect(() => {
    if (isForPagination) return;
    if (isFetching) return;
    if (!data) return;
    if (data && data.lastPageNo === currentPageNo) return;
    function handleScroll() {
      const isNearBottom = checkIsNearBottom(50);
      if (data && data?.lastPageNo !== currentPageNo && isNearBottom) {
        dispatch(setPageNo(currentPageNo + 1));
      }
    }
    // * 스크롤y값이 변할 때마다 실행해야 함
    // * throttle 같은 걸로 작동 줄이기?
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // clean up
    };
  }, [data, isFetching, isForPagination]);

  // 서버에서 새로 writings 받아온 후 writing filter를 이전 값과 비교
  //  필터가 같을 때 새로운 data가 undefined라면 아무것도 안 함
  useEffect(() => {
    if (isForPagination) return;

    if (isFetching) return;

    if (!data) {
      // data is null
      setWritingsOfGivenPages([]); // *** 콘텐트 없다는 컴포넌트 보이기 (아래 리턴 구문에서 이 값이 [] 일 때 조건문 넣기)
      // * change later for other writing list not for TalkList only
      return;
    }

    const { prevGenre, prevSrchType, prevSearchWord, prevSortType, prevPageNo } = prevFilters;
    if (data && data.talks) {
      const { talks: talksFromServer } = data;

      if (
        // - 필터 유지, 페이지번호만 증가할 때
        // - 최초 writings 요청할 때
        prevGenre === currentGenre &&
        prevSrchType === currentSrchType &&
        prevSearchWord === currentSearchWord &&
        prevSortType === currentSortType &&
        (prevPageNo === currentPageNo - 1 || // <- 이미 writings 존재, 다음 페이지 요청할 때
          (prevPageNo === 1 && currentPageNo === 1)) // <- 최초 writings 요청 시
        // ㄴstate 재설정에 따라 컴포넌트가 한 번에 연이어 리렌더링될 수 있음
        // ㄴ이 때 allPageWritings에 새로운 writing을 한 번만 추가하기 위해 pageNo 확인 필요
      ) {
        setWritingsOfGivenPages((prev) => [...prev, ...talksFromServer]);
        // * change later for other writing list not for TalkList only

        setPrevFilters((prev) => ({
          ...prev,
          prevPageNo: currentPageNo,
        }));
      } else {
        // 직전과 필터가 다르면 writings 교체
        setWritingsOfGivenPages(talksFromServer);
        // * change later for other writing list not for TalkList only

        // 현재 필터로 교체
        setPrevFilters({
          prevGenre: currentGenre,
          prevSrchType: currentSrchType,
          prevSearchWord: currentSearchWord,
          prevSortType: currentSortType,
          prevPageNo: currentPageNo, // 리듀서에서 이미 1로 교체
        });
      }
    }
  }, [data, isFetching, isForPagination]);
  // data 값이 변할 때만 실행하기 위해 useEffect 활용
  // 그렇지 않으면 한 번 data 받아온 후 리렌더링 몇 차례 되면서 서로 다른 조건문이 연이어 실행됨

  if (isForPagination) return undefined;
  return writingsOfGivenPages;
}

export default useInfiniteScroll;
