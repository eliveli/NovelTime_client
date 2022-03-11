import React from "react";
import Recommend from "./RecommendList.components";

export default function RecommendList() {
  return (
    <Recommend>
      {[0, 0, 0].map(() => (
        <Recommend.Text />
      ))}
    </Recommend>
  );
}
