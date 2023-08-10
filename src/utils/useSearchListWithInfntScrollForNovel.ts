import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { setSearchList } from "store/clientSlices/filterSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { NovelDetailList } from "store/serverAPIs/types";
import checkIsNearBottom from "./checkIsNearBottom";
import { SEARCH_NOVEL } from "./pathname";

export default function useSearchListWithInfntScrollForNovel({
  isForPagination,
  isFetching,
  data,
}: {
  isForPagination: boolean;
  isFetching: boolean;
  data: NovelDetailList;
}) {
  const location = useLocation();
  const navigationType = useNavigationType();

  const { pathname } = window.location;

  const dispatch = useAppDispatch();

  const isBackPageRef = useRef(false);

  const { filters, list } = useAppSelector((state) => state.filter.novel);

  const getCurrentFiltersAndList = () => {
    if (pathname === SEARCH_NOVEL) {
      return {
        currentFilters: filters,
        currentList: list,
      };
    }

    throw Error("pathname was not matched for infinite scroll");
  };

  const {
    currentFilters: { searchType, searchWord, pageNo },
    currentList,
  } = getCurrentFiltersAndList();

  const [prevFilters, setPrevFilters] = useState({
    prevSrchType: searchType,
    prevSearchWord: searchWord,
    prevPageNo: pageNo,
  });

  const setNextPageNo = () => {
    dispatch(setSearchList({ listType: "novel", filters: { pageNo: pageNo + 1 } }));
  };

  const setNextList = (searchList: any[]) => {
    dispatch(setSearchList({ listType: "novel", list: searchList }));
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

    const { prevSrchType, prevSearchWord, prevPageNo } = prevFilters;

    if (
      isBackPageRef.current &&
      currentList !== undefined &&
      prevSrchType === searchType &&
      prevSearchWord === searchWord &&
      prevPageNo === pageNo
    ) {
      // . 뒤로가기 직후 아무 동작 안 함 (list 재설정 X. 저장된 것 사용)
      // . 직후 필터 변경 시 새로운 리스트로 교체 (아래 다른 조건문 참고)
      // . 이후 스크롤을 내려 새로운 list 요청할 때 isBackPageRef.current가 false로 바뀜
      //    그러면 이 조건문 패스, 이후 코드 라인에서 list 재설정
      // . 뒤로가기 후 새로고침하면 currentList는 undefined (이 조건문 만족X)
      //  __조건문 관련__
      //   . 컴포넌트 새로 불러오면서 prev 필터가 현재 필터와 같아짐
      //    ㄴ필터 동일성 체크를 하지 않으면 뒤로가기 후 필터 변경 시 리스트를 새로 저장하지 못함
      //   . 저장된 리스트 존재
      return;
    }

    if (isFetching) return;

    if (!data) {
      // data is null
      setNextList([]);
      return;
    }

    if (data) {
      const { novels: listFromServer } = data;

      // - 최초 writings 요청할 때
      if (currentList === undefined && pageNo === 1) {
        setNextList(listFromServer);

        // 현재 필터로 교체
        setPrevFilters({
          prevSrchType: searchType,
          prevSearchWord: searchWord,
          prevPageNo: pageNo,
        });
      } else if (
        // - 다른 필터 유지하고 페이지번호만 증가할 때 list 이어 붙임
        prevSrchType === searchType &&
        prevSearchWord === searchWord &&
        currentList !== undefined &&
        prevPageNo === pageNo - 1
      ) {
        setNextList([...currentList, ...listFromServer]);

        setPrevFilters((prev) => ({
          ...prev,
          prevPageNo: pageNo,
        }));
      } else {
        // - 직전과 필터가 다르면 list 교체
        setNextList(listFromServer);

        // 현재 필터로 교체
        setPrevFilters({
          prevSrchType: searchType,
          prevSearchWord: searchWord,
          prevPageNo: pageNo, // 리듀서에서 이미 1로 교체
        });
      }
    }
  }, [data, isFetching, isForPagination, isBackPageRef.current]);
  // data 값이 변할 때만 실행하기 위해 useEffect 활용
  // 그렇지 않으면 한 번 data 받아온 후 리렌더링 몇 차례 되면서 서로 다른 조건문이 연이어 실행됨
}
