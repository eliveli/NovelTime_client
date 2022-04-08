import React from "react";
import SectionBG from "components/SectionBG";
import Filter from "components/Filter";
import FreeTalk from "./FreeTalkList.components";

export default function FreeTalkList() {
  // 서버에서 데이터 받아올 때 구성 // dataFromServer = [{talk},{talk}]
  const dataFromServer = [
    {
      talkId: "abcd", // 좋아요 누르거나 코멘트 작성 시 talkId로 서버 요청

      userName: "나나나",
      userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
      createDate: "22.03.03",

      likeNO: 5,
      commentNO: 7,

      talkTitle: "이 소설 강추",
      talkImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",

      novelTitle: "헌터와 매드 사이언티스트",
    },
    {
      talkId: "abcd", // 좋아요 누르거나 코멘트 작성 시 talkId로 서버 요청

      userName: "나나나",
      userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
      createDate: "22.03.03",

      likeNO: 5,
      commentNO: 7,

      talkTitle: "이 소설 강추",
      talkImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",

      novelTitle: "헌터와 매드 사이언티스트",
    },
    {
      talkId: "abcd", // 좋아요 누르거나 코멘트 작성 시 talkId로 서버 요청

      userName: "나나나",
      userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
      createDate: "22.03.03",

      likeNO: 5,
      commentNO: 7,

      talkTitle: "이 소설 강추",
      talkImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",

      novelTitle: "헌터와 매드 사이언티스트",
    },
  ];

  return (
    <SectionBG>
      <Filter />
      {dataFromServer.map((talk) => (
        <FreeTalk talk={talk} />
      ))}
    </SectionBG>
  );
}
