import { useState, useEffect } from "react";
import { GenresFromFilter, setPageNo } from "store/clientSlices/filterSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { TalkList, WritingList } from "store/serverAPIs/types";
import checkIsNearBottom from "./checkIsNearBottom";
import { matchGenreName, matchSortTypeName, matchSrchTypeName } from "./matchName";

const useSearchFilters = () => {
  const genre = useAppSelector((state) => state.filter.genre);
  const currentGenre = matchGenreName(genre);

  const searchType = useAppSelector((state) => state.filter.searchType);
  const currentSrchType = matchSrchTypeName(searchType);

  const searchWord = useAppSelector((state) => state.filter.searchWord);

  // sort type 작업 필요 for pc
  const sortType = useAppSelector((state) => state.modal.sortType);
  const currentSortType = matchSortTypeName(sortType);

  const currentPageNo = useAppSelector((state) => state.filter.pageNo);

  return { currentGenre, currentSrchType, searchWord, currentSortType, currentPageNo };
};

const useInfiniteScroll = ({
  currentGenre,
  currentSrchType,
  searchWord,
  currentSortType,
  currentPageNo,
  isFetching,
  data,
}: {
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
  currentSrchType: "writingTitle" | "writingDesc" | "userName" | "novelTitle";
  searchWord: string;
  currentSortType:
    | "newDate"
    | "oldDate"
    | "manyComments"
    | "fewComments"
    | "manyLikes"
    | "fewLikes";
  currentPageNo: number;
  isFetching: boolean;
  data: WritingList;
}) => {
  if (isFetching) return;

  const [allPageWritings, setAllPageWritings] = useState<TalkList>([]);

  const [prevFilters, setPrevFilters] = useState({
    prevGenre: currentGenre,
    prevSrchType: currentSrchType,
    prevSearchWord: searchWord,
    prevSortType: currentSortType,
    prevPageNo: currentPageNo,
  });

  useEffect(() => {
    if (isFetching) return;
    if (!data) return;
    if (data && data.lastPageNo === currentPageNo) return;
    function handleScroll() {
      const isNearBottom = checkIsNearBottom(50);
      if (data && data?.lastPageNo !== currentPageNo && isNearBottom) {
        dispatch(setPageNo(currentPageNo + 1));
      }
    }
    // ㅇ스크롤y값이 변할 때마다 실행해야 함
    //  throttle 같은 걸로 불필요한 렌더링 방지?
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // clean up
    };
  }, [data, isFetching]);

  // 서버에서 새로 writings 받아온 후 writing filter를 이전 값과 비교
  //  필터가 같을 때 새로운 data가 undefined라면 아무것도 안 함
  useEffect(() => {
    if (isFetching) return;

    if (!data) {
      // data is null
      setAllPageWritings([]); // *** 콘텐트 없다는 컴포넌트 보이기 (아래 리턴 구문에서 이 값이 [] 일 때 조건문 넣기)
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
        prevSearchWord === searchWord &&
        prevSortType === currentSortType &&
        (prevPageNo === currentPageNo - 1 || // <- 이미 writings 존재, 다음 페이지 요청할 때
          (prevPageNo === 1 && currentPageNo === 1)) // <- 최초 writings 요청 시
        // ㄴstate 재설정에 따라 컴포넌트가 한 번에 연이어 리렌더링될 수 있음
        // ㄴ이 때 allPageWritings에 새로운 writing을 한 번만 추가하기 위해 pageNo 확인 필요
      ) {
        setAllPageWritings((prev) => [...prev, ...talksFromServer]);

        setPrevFilters((prev) => ({
          ...prev,
          prevPageNo: currentPageNo,
        }));
      } else {
        // 직전과 필터가 다르면 writings 교체
        setAllPageWritings(talksFromServer);

        // 현재 필터로 교체
        setPrevFilters({
          prevGenre: currentGenre,
          prevSrchType: currentSrchType,
          prevSearchWord: searchWord,
          prevSortType: currentSortType,
          prevPageNo: currentPageNo, // 리듀서에서 이미 1로 교체
        });
      }
    }
  }, [data, isFetching]);
  // data 값이 변할 때만 실행하기 위해 useEffect 활용
  // 그렇지 않으면 한 번 data 받아온 후 리렌더링 몇 차례 되면서 서로 다른 조건문이 연이어 실행됨
  return { allPageWritings };
};

export default useSearchFilters;
