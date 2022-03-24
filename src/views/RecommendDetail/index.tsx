import React from "react";
import { useParams } from "react-router-dom";
import SectionBG from "components/SectionBG";
import { WritingDetail, NovelInWriting, BoardMark } from "components/Writing";

export default function RecommendDetail() {
  return (
    <SectionBG>
      <BoardMark>Recommend Novel I like</BoardMark>
      {/* <NovelInWriting novel={dataFromServer.novel} />
      <WritingDetail detailTalk={dataFromServer.talk} /> */}
    </SectionBG>
  );
}
