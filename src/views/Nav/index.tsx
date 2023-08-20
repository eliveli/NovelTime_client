import { NavPC, NavMobileMainTop, NavMobileMainBottom, NavMobileDetail } from "./Nav.components";
import { NavTopBG, NavBottomBG } from "./Nav.styles";

export function MainListNav() {
  return (
    <>
      <NavTopBG>
        <NavPC />
        <NavMobileMainTop />
      </NavTopBG>
      <NavBottomBG>
        <NavMobileMainBottom />
      </NavBottomBG>
    </>
  );
}

export function DetailNav() {
  // if novelId exists, pageTitle is novelTitle //
  // "/novel-detail/:novelId/:talkId",
  // "/novel-detail/:novelId/:recommendId",
  // "/novel-detail/:novelId",
  // "/novel-detail/:novelId/writing-list",
  // "/novel-list/:categoryText/:categoryId/:novelId",

  // if not, pageTitle is empty : it can be changed //
  // "/novel-list/:categoryText/:categoryId",

  // from MainList to Detail, get board name - talk or recommend //
  // "/talk-detail/:talkId",
  // "/recommend-detail/:recommendId",
  return (
    <NavTopBG>
      <NavPC />
      <NavMobileDetail />
    </NavTopBG>
  );
}
