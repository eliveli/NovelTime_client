import React, { useState } from "react";
import Novels from "./NovelList.components";
import NovelColumn from "../../components/NovelColumn";
import NovelRow from "../../components/NovelRow";

export default function NovelList() {
  const info = {
    novelImg:
      "https://dn-img-page.kakao.com/download/resource?kid=xsaRM/hzhOfrO85M/k1jHoCWYGpQkLzI11JXbA0&filename=th1",
    userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
  };
  const arrayInfo = [info, info];
  const arrayInfo2 = [info, info, info, info, info, info, info, info, info, info];

  const [imgHeight, setImgHeight] = useState(0); // 작품 이미지 height 받아오기
  return (
    <Novels>
      <Novels.ColumnSlide>
        {arrayInfo.map((novel) => (
          <NovelColumn novel={novel} />
        ))}
      </Novels.ColumnSlide>
      <Novels.RowSlide imgHeight={imgHeight}>
        {arrayInfo2.map((novel) => (
          <NovelRow novel={novel} handleImgHeight={setImgHeight} />
        ))}
      </Novels.RowSlide>
    </Novels>
  );
}
