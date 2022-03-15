import React from "react";
import { NovelColumn, NovelColumnDetail, NovelRow } from "../../components";
import Novels from "./NovelList.components";

export default function NovelList() {
  const info = {
    novelImg:
      "//dn-img-page.kakao.com/download/resource?kid=bpp9n3/hzp2hVb5sA/z46Nq6YOG1GGdQwKvhYMj1",
    userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
  };
  const arrayInfo = [info, info];
  const arrayInfo2 = [info, info, info, info, info, info, info, info, info, info];

  return (
    <Novels>
      <Novels.Column category="소설계의 박스오피스">
        {arrayInfo.map((novel) => (
          <NovelColumn novel={novel} />
        ))}
      </Novels.Column>

      <Novels.ColumnDetail category="맞춤 추천은 여기에(상세)">
        {arrayInfo.map((novel) => (
          <NovelColumnDetail novel={novel} />
        ))}
      </Novels.ColumnDetail>

      <Novels.RowSlide category="요즘 인기 있는">
        {arrayInfo2.map((novel) => (
          <NovelRow novel={novel} />
        ))}
      </Novels.RowSlide>
    </Novels>
  );
}
