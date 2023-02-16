import React, { useEffect, useRef, useState } from "react";
import MainBG from "components/MainBG";
import Filter from "components/Filter";
import { useGetWritingsFilteredQuery } from "store/serverAPIs/novelTime";
import { TalkList } from "store/serverAPIs/types";
import FreeTalk from "./FreeTalkList.components";

export type GenresFromFilter =
  | "All"
  | "그 외"
  | "패러디"
  | "로판"
  | "로맨스"
  | "현판"
  | "판타지"
  | "무협"
  | "라이트노벨"
  | "BL"
  | "미스터리";

function matchGenreName(genre: GenresFromFilter) {
  if (genre === "All") return "all";
  if (genre === "그 외") return "extra";
  return genre;
}

export type SrchTypeFromFilter = "Title" | "Desc" | "Writer" | "Novel";

function matchSrchTypeName(srchType: SrchTypeFromFilter) {
  if (srchType === "Title") return "writingTitle";
  if (srchType === "Desc") return "writingDesc";
  if (srchType === "Writer") return "userName";
  if (srchType === "Novel") return "novelTitle"; // *** 백&프론트 작업 필요
  throw Error("search Type error");
}

export default function FreeTalkList() {
  const [genre, selectGenre] = useState<GenresFromFilter>("All");
  const currentGenre = matchGenreName(genre);

  const [srchType, selectSrchType] = useState<SrchTypeFromFilter>("Title");
  const currentSrchType = matchSrchTypeName(srchType);

  const [srchWord, handleSrchWord] = useState("");

  const { isLoading, isError, data } = useGetWritingsFilteredQuery({
    listType: "T",
    novelGenre: currentGenre,
    searchType: !srchWord ? "no" : currentSrchType,
    searchWord: srchWord || "no",
    // ㄴwhen searchType is "no" searchWord is not considered
    // ㄴㄴbut searchWord can't be empty string because parameter in path can't be empty
    sortBy: "newDate",
    pageNo: 1,
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
      <Filter
        genre={{ genreDisplayed: genre, selectGenre }}
        search={{
          searchWord: {
            srchWord,
            handleSrchWord,
          },
          searchType: {
            srchType,
            selectSrchType,
          },
        }}
      />
      {data?.talks?.map((talk) => (
        <FreeTalk talk={talk} />
      ))}
    </MainBG>
  );
}
