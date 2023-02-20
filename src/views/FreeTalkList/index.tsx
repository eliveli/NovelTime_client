import React, { useRef } from "react";
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

  const currentPageNo = useRef(1);
  // for mobile ~
  const allPageWritings = useRef<TalkList>([]);
  // ~ for mobile

  const { isLoading, isError, data } = useGetWritingsFilteredQuery({
    listType: "T",
    novelGenre: currentGenre,
    searchType: !searchWord ? "no" : currentSrchType,
    searchWord: searchWord || "no",
    // ㄴwhen searchType is "no" searchWord is not considered
    // ㄴㄴbut searchWord can't be empty string because parameter in path can't be empty
    sortBy: currentSortType,
    pageNo: currentPageNo.current,
  });

  // for mobile ~
  if (data?.talks) {
    allPageWritings.current.push(...data.talks);
  }

  const isNearBottom = checkIsNearBottom(200);
  if (data && data?.lastPageNo !== currentPageNo.current && isNearBottom) {
    currentPageNo.current += 1;
  }
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
      {allPageWritings.current?.map((talk) => (
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
