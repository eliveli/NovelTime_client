import React from "react";
import SectionBG from "components/SectionBG";
import Filter from "components/Filter";
import FreeTalk from "./FreeTalkList.components";

export default function FreeTalkList() {
  const info = {
    talkId: "abcd",
    userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
    talkImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
  };
  const arrayInfo = [info, info, info];
  return (
    <SectionBG>
      <Filter />
      {arrayInfo.map((talk) => (
        <FreeTalk talk={talk} />
      ))}
    </SectionBG>
  );
}
