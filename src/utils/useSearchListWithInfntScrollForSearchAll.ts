import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { ListOfSearchAll, setSearchList } from "store/clientSlices/filterSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { NovelOrWritingList } from "store/serverAPIs/types";
import checkIsNearBottom from "./checkIsNearBottom";
import { SEARCH_ALL } from "./pathname";

export default function useSearchListWithInfntScrollForSearchAll({
  isForPagination,
  isFetching,
  data,
}: {
  isForPagination: boolean;
  isFetching: boolean;
  data: NovelOrWritingList;
}) {
  const location = useLocation();
  const navigationType = useNavigationType();

  const dispatch = useAppDispatch();

  const isBackPageRef = useRef(false);

  const {
    filters: { searchCategory, searchType, searchWord, pageNo },
    list: currentList,
    isSettingTheList,
  } = useAppSelector((state) => state.filter.searchAll);

  const [prevFilters, setPrevFilters] = useState({
    prevSearchCategory: searchCategory,
    prevSrchType: searchType,
    prevSearchWord: searchWord,
    prevPageNo: pageNo,
  });

  const setNextPageNo = () => {
    dispatch(
      setSearchList({
        listType: "searchAll",
        filters: { pageNo: pageNo + 1 },
        isSettingTheList: true,
      }),
    );
  };
  const setNextList = (list: ListOfSearchAll) => {
    dispatch(setSearchList({ listType: "searchAll", list, isSettingTheList: false }));
  };

  const setNoData = () => {
    if (pageNo === 1) {
      if (searchCategory === "Novel") {
        dispatch(
          setSearchList({
            listType: "searchAll",
            list: { novels: [], talks: undefined, recommends: undefined },
            isSettingTheList: false,
          }),
        );
      } else if (searchCategory === "Talk") {
        dispatch(
          setSearchList({
            listType: "searchAll",
            list: { novels: undefined, talks: [], recommends: undefined },
            isSettingTheList: false,
          }),
        );
      } else if (searchCategory === "Recommend") {
        dispatch(
          setSearchList({
            listType: "searchAll",
            list: { novels: undefined, talks: undefined, recommends: [] },
            isSettingTheList: false,
          }),
        );
      }
      return;
    }

    dispatch(
      setSearchList({
        listType: "searchAll",
        isSettingTheList: false,
      }),
    );
  };

  function isThisPathSearchAll() {
    return SEARCH_ALL === window.location.pathname;
  }

  // for infinite scroll
  useEffect(() => {
    if (isForPagination) return;
    if (isFetching) return;
    if (data && data.lastPageNo === pageNo) return;

    function handleScroll() {
      const isNearBottom = checkIsNearBottom(50);

      if ((isBackPageRef.current || data) && isNearBottom) {
        if (!isThisPathSearchAll()) return;

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

    const { prevSearchCategory, prevSrchType, prevSearchWord, prevPageNo } = prevFilters;

    if (
      isBackPageRef.current &&
      currentList !== undefined &&
      prevSearchCategory === searchCategory &&
      prevSrchType === searchType &&
      prevSearchWord === searchWord &&
      prevPageNo === pageNo &&
      isSettingTheList === false
    ) {
      return;
    }

    if (!isSettingTheList) return;

    if (isFetching) return;

    if (!data) {
      setNoData();
      return;
    }

    if (data) {
      const { novels, talks, recommends } = data;
      const listOfSearchAll = { novels, talks, recommends };

      // - 최초 writings 요청할 때
      if (currentList === undefined && pageNo === 1) {
        setNextList(listOfSearchAll);

        // 현재 필터로 교체
        setPrevFilters({
          prevSearchCategory: searchCategory,
          prevSrchType: searchType,
          prevSearchWord: searchWord,
          prevPageNo: pageNo,
        });
      } else if (
        // - 다른 필터 유지하고 페이지번호만 증가할 때 list 이어 붙임
        prevSearchCategory === searchCategory &&
        prevSrchType === searchType &&
        prevSearchWord === searchWord &&
        currentList !== undefined &&
        prevPageNo === pageNo - 1
      ) {
        if (currentList.novels && novels) {
          listOfSearchAll.novels = [...currentList.novels, ...novels];
        }
        if (currentList.talks && talks) {
          listOfSearchAll.talks = [...currentList.talks, ...talks];
        }
        if (currentList.recommends && recommends) {
          listOfSearchAll.recommends = [...currentList.recommends, ...recommends];
        }

        setNextList(listOfSearchAll);

        setPrevFilters((prev) => ({
          ...prev,
          prevPageNo: pageNo,
        }));
      } else {
        // - 직전과 필터가 다르면 list 교체
        setNextList(listOfSearchAll);

        // 현재 필터로 교체
        setPrevFilters({
          prevSearchCategory: searchCategory,
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
