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
  useWritingsWithInfntScroll,
  useResetFiltersFromUrl,
} from "utils";
import PageNOs from "components/PageNOs";
import FreeTalk from "./FreeTalkList.components";

export default function FreeTalkList() {
  // for pagination in tablet or pc
  const [searchParams] = useSearchParams();
  const genreFromUrl = searchParams.get("genre");
  const searchTypeFromUrl = searchParams.get("searchType");
  const searchWordFromUrl = searchParams.get("searchWord");
  const sortTypeFromUrl = searchParams.get("sortType");
  const pageNoFromUrl = searchParams.get("pageNo");

  const filtersToCheck = [
    { filter: "genre", value: genreFromUrl },
    { filter: "searchType", value: searchTypeFromUrl },
    { filter: "searchWord", value: searchWordFromUrl },
    {
      filter: "sortType",
      value: sortTypeFromUrl,
    },
    {
      filter: "pageNo",
      value: pageNoFromUrl,
    },
  ];

  useResetFiltersFromUrl(filtersToCheck);

  // for infinite scroll in mobile
  const genreFromState = useAppSelector((state) => state.filter.genre);
  const searchTypeFromState = useAppSelector((state) => state.filter.searchType);
  const searchWordFromState = useAppSelector((state) => state.filter.searchWord);
  const sortTypeFromState = useAppSelector((state) => state.modal.sortType);
  const pageNoFromState = useAppSelector((state) => state.filter.pageNo);

  // select filters for pagination or infinite scroll
  const currentGenre = matchGenreName(genreFromUrl, genreFromState);
  const currentSrchType = matchSrchTypeName(searchTypeFromUrl, searchTypeFromState);
  const currentSearchWord = searchWordFromUrl ?? searchWordFromState;
  const currentSortType = matchSortTypeName(sortTypeFromUrl, sortTypeFromState);
  const currentPageNo = Number(pageNoFromUrl) || pageNoFromState;

  const { isLoading, isFetching, isError, data } = useGetWritingsFilteredQuery({
    listType: "T",
    novelGenre: currentGenre,
    searchType: currentSearchWord === "" ? "no" : currentSrchType,
    searchWord: currentSearchWord || "undefined",
    // ㄴwhen searchType is "no" searchWord is not considered
    // ㄴㄴbut searchWord can't be empty string because parameter in path can't be empty
    sortBy: currentSortType,
    pageNo: currentPageNo,
  });

  const writingsForInfntScroll = useWritingsWithInfntScroll({
    isForPagination: genreFromUrl !== null,
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
      {writingsForInfntScroll?.map((talk) => (
        <FreeTalk key={talk.talkId} talk={talk} />
      ))}

      {/* for tablet and pc */}
      {genreFromUrl && data?.talks?.map((talk) => <FreeTalk key={talk.talkId} talk={talk} />)}

      {genreFromUrl && data && <PageNOs selectedNo={currentPageNo} lastNo={data.lastPageNo} />}
    </MainBG>
  );
}
