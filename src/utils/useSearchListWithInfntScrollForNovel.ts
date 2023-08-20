import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { setSearchList } from "store/clientSlices/filterSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { NovelDetail, NovelDetailList } from "store/serverAPIs/types";
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

  const dispatch = useAppDispatch();

  const isBackPageRef = useRef(false);

  const {
    filters: { searchType, searchWord, pageNo },
    list: currentList,
    isSettingTheList,
  } = useAppSelector((state) => state.filter.novel);

  const [prevFilters, setPrevFilters] = useState({
    prevSrchType: searchType,
    prevSearchWord: searchWord,
    prevPageNo: pageNo,
  });

  const setNextPageNo = () => {
    dispatch(
      setSearchList({ listType: "novel", filters: { pageNo: pageNo + 1 }, isSettingTheList: true }),
    );
  };

  const setNextList = (searchList: NovelDetail[]) => {
    dispatch(
      setSearchList({
        listType: "novel",
        list: searchList,
        isSettingTheList: false,
      }),
    );
  };

  const setNoData = () => {
    if (pageNo === 1) {
      dispatch(
        setSearchList({
          listType: "novel",
          list: [],
          isSettingTheList: false,
        }),
      );
      return;
    }

    // let the list be when the page number is more than 1 but data is undefined
    dispatch(
      setSearchList({
        listType: "novel",
        isSettingTheList: false,
      }),
    );
  };

  function isThisPathSearchNovel() {
    return [SEARCH_NOVEL, `${SEARCH_NOVEL}/iframe`].includes(window.location.pathname);
  }

  // for infinite scroll
  useEffect(() => {
    if (isForPagination) return;
    if (isFetching) return;
    if (data && data.lastPageNo === pageNo) return;

    function handleScroll() {
      const isNearBottom = checkIsNearBottom(50);

      // 페이지 다운으로 리스트의 다음 페이지 요청하는 때
      // - 뒤로가기 시. 이 때 data는 undefined
      //   한 번 데이터 요청 후 뒤로가기 상태 false 설정
      // - 데이터 존재 시.
      //    페이지 요청 후 데이터가 존재하지 않으면 다음 페이지 요청 불가
      if ((isBackPageRef.current || data) && isNearBottom) {
        // 상세 페이지로 이동 시 스크롤 발생,
        //  path가 서치노블이 아닐 때 다음 코드 실행 막음
        if (!isThisPathSearchNovel()) return;
        setNextPageNo();

        isBackPageRef.current = false;
        // 뒤로가기 직후 한 번 페이지 요청했으므로 false
        // 이후부터 data 존재 여부로 다음 페이지 요청 여부 결정
      }
    }

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
