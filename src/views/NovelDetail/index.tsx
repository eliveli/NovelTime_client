import React from "react";
import { ColumnList, ColumnDetailList, RowSlide } from "../../components/NovelListFrame";
import { NovelRow } from "../../components/Novel";

import Novel from "./NovelDetail.components";

// 컴포넌트에서 api 요청

export default function NovelDetail() {
  const info = {
    novelId: "20220225082010201",
    novelImg:
      "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260",
    userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
  };
  const arrayInfo2 = [info, info, info, info, info, info, info, info, info, info];

  return (
    <Novel>
      <Novel.NovelInfo novel={info} />

      <Novel.Column category="talk / recommend">
        {/* {arrayInfo2.map((novel) => (
          <NovelRow novel={novel} />
        ))} */}
      </Novel.Column>
      <RowSlide category="추천 작품">
        {arrayInfo2.map((novel) => (
          <NovelRow novel={novel} />
        ))}
      </RowSlide>
    </Novel>
  );
}
