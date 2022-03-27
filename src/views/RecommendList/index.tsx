import React from "react";
import SectionBG from "components/SectionBG";
import Filter from "components/Filter";

import Recommend from "./RecommendList.components";

export default function RecommendList() {
  const info = {
    recommendId: "abcd",
    novelImg:
      "https://dn-img-page.kakao.com/download/resource?kid=xsaRM/hzhOfrO85M/k1jHoCWYGpQkLzI11JXbA0&filename=th1",
    userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
  };
  const arrayInfo = [info, info, info];
  return (
    <SectionBG>
      <Filter />
      {arrayInfo.map((text) => (
        <Recommend text={text} />
      ))}
    </SectionBG>
  );
}
