import React, { useRef, useState, useEffect } from "react";
import MainBG from "components/MainBG";
import Filter from "components/Filter";
import { useGetWritingsFilteredQuery } from "store/serverAPIs/novelTime";
import { TalkList, WritingList } from "store/serverAPIs/types";
import { useAppSelector } from "store/hooks";
import { checkIsNearBottom, matchGenreName, matchSortTypeName, matchSrchTypeName } from "utils";
import FreeTalk from "./FreeTalkList.components";

export default function FreeTalkList() {
  const genre = useAppSelector((state) => state.filter.genre);
  const currentGenre = matchGenreName(genre);

  const searchType = useAppSelector((state) => state.filter.searchType);
  const currentSrchType = matchSrchTypeName(searchType);

  const searchWord = useAppSelector((state) => state.filter.searchWord);

  const sortType = useAppSelector((state) => state.modal.sortType);
  const currentSortType = matchSortTypeName(sortType);

  const [currentPageNo, setPageNo] = useState(1);
  // for mobile ~
  const [allPageWritings, setAllPageWritings] = useState<TalkList>([]);

  const [prevFilters, setPrevFilters] = useState({
    prevGenre: currentGenre,
    prevSrchType: currentSrchType,
    prevSearchWord: searchWord,
    prevSortType: currentSortType,
    prevPageNo: currentPageNo,
  });
  // ~ for mobile

  // *** 하위 컴포넌트에서 필터 변경 후 페이지번호도 변경 필요. 이후에 쿼리 날리기
  const { isLoading, isFetching, isError, data } = useGetWritingsFilteredQuery({
    listType: "T",
    novelGenre: currentGenre,
    searchType: !searchWord ? "no" : currentSrchType,
    searchWord: searchWord || "no",
    // ㄴwhen searchType is "no" searchWord is not considered
    // ㄴㄴbut searchWord can't be empty string because parameter in path can't be empty
    sortBy: currentSortType,
    pageNo: currentPageNo,
  });
  // for mobile ~
  useEffect(() => {
    if (isFetching) return;
    if (!data) return;
    if (data && data.lastPageNo === currentPageNo) return;
    function handleScroll() {
      const isNearBottom = checkIsNearBottom(50);
      if (data && data?.lastPageNo !== currentPageNo && isNearBottom) {
        setPageNo((prev) => prev + 1);
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
  // cf. 필터가 같을 때 새로운 data가 undefined라면 아무것도 안 함
  useEffect(() => {
    if (isFetching) return;

    const { prevGenre, prevSrchType, prevSearchWord, prevSortType, prevPageNo } = prevFilters;
    if (data && data.talks) {
      const { talks: talksFromServer } = data;

      // 최초 1페이지 불러오면 그대로 넣기
      if (prevPageNo === 1 && currentPageNo === 1) {
        setAllPageWritings(talksFromServer);
      } else if (
        // 다른 필터 유지한 채 페이지번호만 증가
        prevGenre === currentGenre &&
        prevSrchType === currentSrchType &&
        prevSearchWord === searchWord &&
        prevSortType === currentSortType &&
        prevPageNo !== currentPageNo
        // ㄴstate 재설정에 따라 컴포넌트가 한 번에 연이어 리렌더링될 수 있음
        // ㄴ이 때 allPageWritings에 새로운 writing을 한 번만 추가하기 위해 pageNo 확인 필요
      ) {
        // 직전과 필터가 같으면 기존 writings에 추가 (페이지 넘버만 다름)
        setAllPageWritings((prev) => [...prev, ...talksFromServer]);

        setPrevFilters((prev) => ({
          ...prev,
          prevPageNo: currentPageNo,
        }));
      } else {
        // 직전과 필터가 다르면 writings 교체
        setAllPageWritings(talksFromServer);

        // 검색 필터 교체 시 페이지는 항상 1
        setPageNo(1);

        // 현재 필터로 교체
        setPrevFilters({
          prevGenre: currentGenre,
          prevSrchType: currentSrchType,
          prevSearchWord: searchWord,
          prevSortType: currentSortType,
          prevPageNo: 1,
        });
      }
    }
  }, [data, isFetching]);
  // data 값이 변할 때만 실행하기 위해 useEffect 활용
  // 그렇지 않으면 한 번 data 받아온 후 리렌더링 몇 차례 되면서 서로 다른 조건문이 연이어 실행됨
  // ~ for mobile

  // 서버에서 데이터 받아올 때 구성
  const dataFromServer = [
    {
      talkId: "abcd", // 좋아요 누르거나 코멘트 작성 시 talkId로 서버 요청

      userName: "나나나",
      userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
      createDate: "22.03.03",

      likeNO: 5,
      commentNO: 7,

      talkTitle: "이 소설 강추",
      talkImg: "", // it can be empty string

      novelTitle: "헌터와 매드 사이언티스트",
    },
  ];

  return (
    <MainBG>
      <Filter />
      {allPageWritings?.map((talk) => (
        <FreeTalk key={talk.talkId} talk={talk} />
      ))}

      {/* for tablet and pc
      {data?.talks?.map((talk) => (
         <FreeTalk key={talk.talkId} talk={talk} />
       ))}
      */}
    </MainBG>
  );
}
