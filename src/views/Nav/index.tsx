import React from "react";
import { useParams } from "react-router-dom";
import { NavPC, NavMobileMainTop, NavMobileMainBottom, NavMobileDetail } from "./Nav.components";
import { NavTopBG, NavBottomBG } from "./Nav.styles";

export function MainListNav() {
  const { pathname } = window.location;
  const {} = useParams();

  // 내가 지금 어느 페이지에 있는지 확인,
  //  선택한 버튼 활성화
  // : pathname, useParams

  return (
    <>
      <NavTopBG>
        <NavPC pathname={pathname} />
        <NavMobileMainTop />
      </NavTopBG>
      <NavBottomBG>
        <NavMobileMainBottom pathname={pathname} />
      </NavBottomBG>
    </>
  );
}

export function DetailNav() {
  // "/novel_detail/:novelId",
  // "/writing_list/:novelId",

  // "/talk_detail/:talk_id",
  // "/recommend_detail/:recommend_id",
  // "/novel_list/:categoryText/:categoryId",
  // "/novel_list/:categoryText/:categoryId/:novelId",

  const { pathname } = window.location;
  const {} = useParams();

  // 내가 지금 어느 페이지에 있는지 확인,
  //  선택한 버튼 활성화 & 페이지 별 Nav 구성 다르게
  // : pathname, useParams

  return (
    <NavTopBG>
      <NavPC pathname={pathname} />
      <NavMobileDetail pathname={pathname} />
    </NavTopBG>
  );
}
