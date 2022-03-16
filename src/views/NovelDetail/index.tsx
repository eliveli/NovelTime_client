import React from "react";
import { ColumnList, ColumnDetailList, RowSlide } from "../../components/NovelListFrame";
import { NovelRow } from "../../components/Novel";

import Novel from "./NovelDetail.components";

// 컴포넌트에서 api 요청

export default function NovelDetail() {
  const info = {
    novelId: "20220225082010201",
    novelImg:
      "//dn-img-page.kakao.com/download/resource?kid=bpp9n3/hzp2hVb5sA/z46Nq6YOG1GGdQwKvhYMj1",
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
