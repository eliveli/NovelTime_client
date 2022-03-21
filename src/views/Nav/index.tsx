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
  // if novelId exists, pageTitle is novelTitle //
  // "/novel_detail/:novelId/:talkId",
  // "/novel_detail/:novelId/:recommendId",
  // "/novel_detail/:novelId",
  // "/novel_detail/:novelId/writing_list",
  // "/novel_list/:categoryText/:categoryId/:novelId",

  // if not, pageTitle is empty : it can be changed //
  // "/novel_list/:categoryText/:categoryId",

  // from MainList to Detail, get board name - talk or recommend //
  // "/talk_detail/:talkId",
  // "/recommend_detail/:recommendId",

  const { pathname } = window.location;
  // const { novelId } = useParams();
  const { novelId, talkId, recommendId } = useParams();
  const parameter = { novelId, talkId, recommendId };

  // 내가 지금 어느 페이지에 있는지 확인,
  //  선택한 버튼 활성화 & 페이지 별 Nav 구성 다르게
  // : pathname, useParams

  return (
    <NavTopBG>
      <NavPC pathname={pathname} />
      <NavMobileDetail pathname={pathname} parameter={parameter} />
    </NavTopBG>
  );
}
