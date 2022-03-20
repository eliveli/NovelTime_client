import { useRef } from "react";
import { ThemeProvider } from "styled-components";
import { Link } from "react-router-dom";
import { useComponentWidth } from "utils";
import Icon from "../../assets/Icon";

import {
  CreateDate,
  LastLineContainer,
  NovelImg,
  UserName,
  Text,
  UserNameBox,
  IconBox,
  TalkTitle,
  NovelTitle,
  IconNO,
  TalkPreview,
  UserContainer,
  NovelContainer,
  NovelInfoBox,
  UserImg,
  NovelInfo,
  NovelSubInfoBox,
  NovelInfoLineHeight,
  RightIcon,
  RightIconBox,
  NavContentBoxPC,
  NavContentBoxMobile,
  Logo,
  NavContentPC,
  MyPageBtn,
  NavContent,
} from "./Nav.styles";

interface Props {
  pathname: string;
}
export function NavPC({ pathname }: Props) {
  const theme = {};

  const isLogin = false;

  return (
    <ThemeProvider theme={theme}>
      <NavContentBoxPC>
        <Logo>It's Novel Time!</Logo>
        <NavContentPC>
          {/* [category name, route path] */}
          {[
            ["FreeTalk", "/talk_list"],
            ["Recommend", "/recommend_list"],
            ["Novel", "/novel_list"],
            ["Chat", "/chat_list/:user_id"],
          ].map((_, idx) => {
            // when path is from novel detail to anywhere, mark Novel in the NavBar
            // but for other path, path is the same name in the Nav
            let isPath;
            if (idx === 2) {
              isPath = ["novel", "writing"].filter((__) => pathname.includes(__)).length === 1;
            } else {
              isPath = pathname.includes(_[1]);
            }
            return (
              <NavContent to={_[1]} isCurrentPath={isPath}>
                {_[0]}
              </NavContent>
            );
          })}
        </NavContentPC>

        {isLogin && <MyPageBtn to="/user_page/:user_id">보관함</MyPageBtn>}
        {!isLogin && <MyPageBtn to="">로그인</MyPageBtn>}
      </NavContentBoxPC>
    </ThemeProvider>
  );
}

// all below is only for Mobile, Tablet, not PC //
export function NavMobileMainTop() {
  const theme = {};

  const isLogin = false;

  return (
    <ThemeProvider theme={theme}>
      {/* top place */}
      <NavContentBoxMobile>
        <Logo>kitty walks to center leaving footprint</Logo>
        <Logo>It's Novel Time!</Logo>

        {isLogin && <MyPageBtn to="/user_page/:user_id">보관함</MyPageBtn>}
        {!isLogin && <MyPageBtn to="">로그인</MyPageBtn>}
      </NavContentBoxMobile>
    </ThemeProvider>
  );
}
export function NavMobileMainBottom({ pathname }: Props) {
  const theme = {};

  const isLogin = false; // is necessary when clicking add writing button

  return (
    <ThemeProvider theme={theme}>
      {/* bottom place */}
      <NavContentBoxMobile>
        {/* [category name, route path] */}
        {[
          ["FreeTalk", "/talk_list"],
          ["Recommend", "/recommend_list"],
          ["AddWriting", "Add"], // 추후 라우팅 필요
          ["Novel", "/novel_list"],
          ["Chat", "/chat_list/:user_id"],
        ].map((_) => (
          <NavContent to={_[1]} isBorderTop isCurrentPath={pathname.includes(_[1])}>
            {_[0]}
          </NavContent>
        ))}
      </NavContentBoxMobile>
    </ThemeProvider>
  );
}

// below two Nav can be one Nav? maybe yes...
// novel list to novel list by category too? except for heart icon, share icon, page title

// from MainList to Detail : FreeTalkDetail, RecommendDetail
// via useParams: boardTitle is in the center of NavBar
// share icon, heart icon are in all
export function NavMobileDetail({ pathname }: Props) {
  // one nav component: top
  const theme = {};
  return (
    <ThemeProvider theme={theme}>
      {/* top place */}
      <NavContentBoxMobile>
        <Logo>Back Icon (+Home)</Logo>
        <Logo>Page Title</Logo>
        <Logo>heart, sharing icons</Logo>
      </NavContentBoxMobile>
    </ThemeProvider>
  );
}

// all from novelDetail to other : novelDetail, writingList, writingDetail
// via useParams: novelTitle is in the center of NavBar
// share icon, heart icon are in the Writing Detail

export function NavNovelDetail() {
  return <div />;
}
