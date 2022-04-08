import React from "react";
import SectionBG from "components/SectionBG";
import Filter from "components/Filter";

import Recommend from "./RecommendList.components";

export default function RecommendList() {
  const dataFromServer = [
    {
      recommend: {
        recommendId: "abcd", // 좋아요 누르거나 코멘트 작성 시 talkId로 서버 요청

        userName: "나나나",
        userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
        createDate: "22.03.03",

        likeNO: 5,

        recommendTitle: "이 소설 강추",
      },
      novel: {
        novelImg:
          "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
        novelTitle: "헌터와 매드 사이언티스트",
        novelAuthor: "델마르",
        novelGenre: "로판",
        isEnd: false,
      },
    },
    {
      recommend: {
        recommendId: "abcd", // 좋아요 누르거나 코멘트 작성 시 talkId로 서버 요청

        userName: "나나나",
        userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
        createDate: "22.03.03",

        likeNO: 5,

        recommendTitle: "이 소설 강추",
      },
      novel: {
        novelImg:
          "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
        novelTitle: "헌터와 매드 사이언티스트",
        novelAuthor: "델마르",
        novelGenre: "로판",
        isEnd: false,
      },
    },
    {
      recommend: {
        recommendId: "abcd", // 좋아요 누르거나 코멘트 작성 시 talkId로 서버 요청

        userName: "나나나",
        userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
        createDate: "22.03.03",

        likeNO: 5,

        recommendTitle: "이 소설 강추",
      },
      novel: {
        novelImg:
          "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
        novelTitle: "헌터와 매드 사이언티스트",
        novelAuthor: "델마르",
        novelGenre: "로판",
        isEnd: false,
      },
    },
  ];

  return (
    <SectionBG>
      <Filter />
      {dataFromServer.map((recommendInfo) => (
        <Recommend recommendInfo={recommendInfo} />
      ))}
    </SectionBG>
  );
}
