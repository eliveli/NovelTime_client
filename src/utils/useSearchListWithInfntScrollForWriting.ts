import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { setListType, setSearchList } from "store/clientSlices/filterSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { WritingList } from "store/serverAPIs/types";
import checkIsNearBottom from "./checkIsNearBottom";
import { RECOMMEND_LIST, TALK_LIST } from "./pathname";

export default function useSearchListWithInfntScrollForWriting({
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

  const listType = setListType();

  const dispatch = useAppDispatch();

  const isBackPageRef = useRef(false);

  const {
    filters: talkFilters,
    list: talkList,
    isSettingTheList: isSettingTheListForTalk,
  } = useAppSelector((state) => state.filter.talk);
  const {
    filters: recommendFilters,
    list: recommendList,
    isSettingTheList: isSettingTheListForRecommend,
  } = useAppSelector((state) => state.filter.recommend);

  const getCurrentFiltersAndList = () => {
    if (pathname === TALK_LIST) {
      return {
        currentFilters: talkFilters,
        currentList: talkList,
        isSettingTheList: isSettingTheListForTalk,
      };
    }
    if (pathname === RECOMMEND_LIST) {
      return {
        currentFilters: recommendFilters,
        currentList: recommendList,
        isSettingTheList: isSettingTheListForRecommend,
      };
    }

    throw Error("pathname was not matched for infinite scroll");
  };

  const {
    currentFilters: { genre, searchType, searchWord, sortType, pageNo },
    currentList,
    isSettingTheList,
  } = getCurrentFiltersAndList();

  const [prevFilters, setPrevFilters] = useState({
    prevGenre: genre,
    prevSrchType: searchType,
    prevSearchWord: searchWord,
    prevSortType: sortType,
    prevPageNo: pageNo,
  });

  const setNextPageNo = () => {
    dispatch(setSearchList({ listType, filters: { pageNo: pageNo + 1 }, isSettingTheList: true }));
  };

  const setNextList = (searchList: any[]) => {
    dispatch(
      setSearchList({
        listType,
        list: searchList,
        isSettingTheList: false,
      }),
    );
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

    const { prevGenre, prevSrchType, prevSearchWord, prevSortType, prevPageNo } = prevFilters;

    if (
      isBackPageRef.current &&
      currentList !== undefined &&
      prevGenre === genre &&
      prevSrchType === searchType &&
      prevSearchWord === searchWord &&
      prevSortType === sortType &&
      prevPageNo === pageNo &&
      isSettingTheList === false
      // ㄴ when going back and adjusting searching filter again,
      //    it will be true and this if-statement won't run
      //      without this, the new list can't be set and displayed
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

    if (!isSettingTheList) return;

    if (isFetching) return;

    if (!data) {
      // data doesn't exist
      setNextList([]);
      return;
    }

    if (data) {
      const { talks, recommends } = data;
      const listFromServer = talks ?? recommends ?? [];

      // - 최초 writings 요청할 때
      if (currentList === undefined && pageNo === 1) {
        setNextList(listFromServer);

        // 현재 필터로 교체
        setPrevFilters({
          prevGenre: genre,
          prevSrchType: searchType,
          prevSearchWord: searchWord,
          prevSortType: sortType,
          prevPageNo: pageNo,
        });
      } else if (
        // - 다른 필터 유지하고 페이지번호만 증가할 때 list 이어 붙임
        prevGenre === genre &&
        prevSrchType === searchType &&
        prevSearchWord === searchWord &&
        prevSortType === sortType &&
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
