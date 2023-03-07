import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { setTalkList } from "store/clientSlices/filterSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { TalkList, WritingList } from "store/serverAPIs/types";
import checkIsNearBottom from "./checkIsNearBottom";
import { TALK_LIST } from "./pathname";

function useSearchListWithInfntScroll({
  isForPagination,
  isFetching,
  data,
}: {
  isForPagination: boolean;
  isFetching: boolean;
  data: WritingList;
}) {
  const location = useLocation();
  const navigationType = useNavigationType();

  const { pathname } = window.location;

  const dispatch = useAppDispatch();

  const isBackPageRef = useRef(false);

  const { filters: talkFilters, list: talkList } = useAppSelector((state) => state.filter.talk);

  const getCurrentFiltersAndList = () => {
    if (pathname === TALK_LIST) {
      return {
        currentFilters: talkFilters,
        currentList: talkList,
      };
    }

    throw Error("pathname was not matched for infinite scroll");
  };

  const {
    currentFilters: { genre, searchType, searchWord, sortType, pageNo },
    currentList,
  } = getCurrentFiltersAndList();

  const [prevFilters, setPrevFilters] = useState({
    prevGenre: genre,
    prevSrchType: searchType,
    prevSearchWord: searchWord,
    prevSortType: sortType,
    prevPageNo: pageNo,
  });

  const setNextPageNo = () => {
    if (pathname === TALK_LIST) {
      dispatch(setTalkList({ filters: { pageNo: pageNo + 1 } }));
      return;
    }

    throw Error("pathname was not matched for infinite scroll");
  };

  const setNextList = (searchList: any[]) => {
    if (pathname === TALK_LIST) {
      dispatch(setTalkList({ list: searchList }));
      return;
    }

    throw Error("pathname was not matched for infinite scroll");
  };

  // for infinite scroll
  useEffect(() => {
    if (isForPagination) return;
    if (isFetching) return;
    if (!data) return;
    if (data && data.lastPageNo === pageNo) return;
    function handleScroll() {
      const isNearBottom = checkIsNearBottom(50);
      if (data && data?.lastPageNo !== pageNo && isNearBottom) {
        setNextPageNo();

        isBackPageRef.current = false;
      }
    }
    // * 스크롤y값이 변할 때마다 실행해야 함
    // * throttle 같은 걸로 작동 줄이기?
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // clean up
    };
  }, [data, isFetching, isForPagination]);

  // 뒤로가기로 검색 목록 페이지 돌아올 때 표시
  useEffect(() => {
    if (navigationType === "POP") {
      isBackPageRef.current = true;
    }
  }, [location]);

  // 필터를 이전 값과 비교해 list 교체 또는 이어붙이기
  useEffect(() => {
    if (isForPagination) return;

    if (isBackPageRef.current && currentList !== undefined) {
      // . 저장된 리스트가 존재하면 뒤로가기 직후 list 재설정 안 함
      // . 이후 스크롤을 내려 새로운 list 요청할 때 isBackPageRef.current가 false로 바뀜
      //    그러면 이 조건문 패스, 이후 코드 라인에서 list 재설정
      // . 뒤로가기 후 새로고침하면 뒤로가기로 분류되나 currentList는 undefined (이 조건문 만족X)
      return;
    }

    if (isFetching) return;

    if (!data) {
      // data is null
      setNextList([]);
      return;
    }

    const { prevGenre, prevSrchType, prevSearchWord, prevSortType, prevPageNo } = prevFilters;

    // * 다른 search list 적용 필요
    if (data && data.talks) {
      const { talks: talksFromServer } = data;

      // - 최초 writings 요청할 때
      if (currentList === undefined && pageNo === 1) {
        setNextList(talksFromServer);
        // * change later for other writing list not for TalkList only

        // 현재 필터로 교체
        setPrevFilters({
          prevGenre: genre,
          prevSrchType: searchType,
          prevSearchWord: searchWord,
          prevSortType: sortType,
          prevPageNo: pageNo, // 리듀서에서 이미 1로 교체
        });
      } else if (
        // - 다른 필터 유지하고 페이지번호만 증가할 때
        prevGenre === genre &&
        prevSrchType === searchType &&
        prevSearchWord === searchWord &&
        prevSortType === sortType &&
        currentList !== undefined &&
        (prevPageNo === pageNo - 1 || // <- 이미 writings 존재, 다음 페이지 요청할 때
          (prevPageNo === 1 && pageNo === 1)) // <- 최초 writings 요청 시
        // ㄴstate 재설정에 따라 컴포넌트가 한 번에 연이어 리렌더링될 수 있음
        // ㄴ이 때 allPageWritings에 새로운 writing을 한 번만 추가하기 위해 pageNo 확인 필요
      ) {
        setNextList([...currentList, ...talksFromServer]);
        // * change later for other writing list not for TalkList only

        setPrevFilters((prev) => ({
          ...prev,
          prevPageNo: pageNo,
        }));
      } else {
        // 직전과 필터가 다르면 writings 교체
        setNextList(talksFromServer);
        // * change later for other writing list not for TalkList only

        // 현재 필터로 교체
        setPrevFilters({
          prevGenre: genre,
          prevSrchType: searchType,
          prevSearchWord: searchWord,
          prevSortType: sortType,
          prevPageNo: pageNo, // 리듀서에서 이미 1로 교체
        });
      }
    }
  }, [data, isFetching, isForPagination, isBackPageRef.current]);
  // data 값이 변할 때만 실행하기 위해 useEffect 활용
  // 그렇지 않으면 한 번 data 받아온 후 리렌더링 몇 차례 되면서 서로 다른 조건문이 연이어 실행됨
}

export default useSearchListWithInfntScroll;
