import React, { useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainBG from "components/MainBG";
import Filter from "components/Filter";
import { useGetWritingsFilteredQuery } from "store/serverAPIs/novelTime";
import { TalkList, WritingList } from "store/serverAPIs/types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  checkIsNearBottom,
  matchGenreName,
  matchSortTypeName,
  matchSrchTypeName,
  useInfiniteScroll,
  useSearchFilters,
} from "utils";
import { setPageNo } from "store/clientSlices/filterSlice";
import FreeTalk from "./FreeTalkList.components";

export default function FreeTalkList() {
  // for pagination in tablet or pc ~
  const [searchParams, setSearchParams] = useSearchParams();
  const genreFromUrl = searchParams.get("genre");
  const searchTypeFromUrl = searchParams.get("searchType");
  const searchWordFromUrl = searchParams.get("searchWord");
  const sortTypeFromUrl = searchParams.get("sortType");
  const pageNoFromUrl = searchParams.get("pageNo");

  console.log("genreFromUrl:", genreFromUrl); // it can be null

  // for infinite scroll in mobile
  const { currentGenre, currentPageNo, currentSortType, currentSrchType, searchWord } =
    useSearchFilters();

  // *** sort type, pc에서 다루기

  const { isLoading, isFetching, isError, data } = useGetWritingsFilteredQuery({
    listType: "T",
    novelGenre: genreFromUrl || currentGenre,
    searchType: searchTypeFromUrl || !searchWord ? "no" : currentSrchType,
    searchWord: searchWordFromUrl || searchWord || "no",
    // ㄴwhen searchType is "no" searchWord is not considered
    // ㄴㄴbut searchWord can't be empty string because parameter in path can't be empty
    sortBy: sortTypeFromUrl || currentSortType,
    pageNo: pageNoFromUrl || currentPageNo,
  });

  // *** 아래 함수에서 prev 값이 잘 기억되는 지 확인 필요
  const allPageWritings = useInfiniteScroll({
    currentGenre,
    currentSrchType,
    searchWord,
    currentSortType,
    currentPageNo,
    isFetching,
    data,
  });

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
