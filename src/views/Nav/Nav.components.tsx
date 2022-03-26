import { ThemeProvider } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { sortWriting, filterContent, setLikeNovel } from "../../store/clientSlices/modalSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

import {
  LeftIcon,
  HeartIcon,
  ShareIcon,
  LeftIconBox,
  HeartIconBox,
  ShareIconBox,
  NavContentBoxPC,
  NavContentBoxMobile,
  Logo,
  NavContentPC,
  MyPageBtn,
  NavContent,
  HomeIcon,
  HomeIconBox,
  IconsBox,
  FillHeartIcon,
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
            ["Chat", "/chat_list"],
          ].map((_, idx) => {
            // when path is from novel detail to anywhere, mark Novel in the NavBar
            // but for other path, path is the same name in the Nav
            let isPath;
            if (idx === 2) {
              isPath = ["novel_detail", _[1]].filter((__) => pathname.includes(__)).length === 1;
            } else {
              isPath = pathname.includes(_[1]);
            }
            return (
              <NavContent key={_[0]} to={_[1]} isCurrentPath={isPath}>
                {_[0]}
              </NavContent>
            );
          })}
        </NavContentPC>

        {isLogin && <MyPageBtn to="/user_page/:userId">보관함</MyPageBtn>}
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

        {isLogin && <MyPageBtn to="/user_page/:userId">보관함</MyPageBtn>}
        {!isLogin && <MyPageBtn to="">로그인</MyPageBtn>}
      </NavContentBoxMobile>
    </ThemeProvider>
  );
}
export function NavMobileMainBottom({ pathname }: Props) {
  const theme = {};

  const dispatch = useAppDispatch();

  const isLogin = false; // is necessary when clicking add writing button

  return (
    <ThemeProvider theme={theme}>
      {/* bottom place */}
      <NavContentBoxMobile isNotPadding>
        {/* [category name, route path] */}
        {[
          ["FreeTalk", "/talk_list"],
          ["Recommend", "/recommend_list"],
          ["AddWriting", "Add"], // 추후 라우팅 필요
          ["Novel", "/novel_list"],
          ["Chat", "/chat_list"],
        ].map((_) => (
          <NavContent
            key={_[0]}
            to={_[1]}
            isBorderTop
            isCurrentPath={pathname.includes(_[1])}
            onClick={() => {
              dispatch(sortWriting("작성일New")); // reset category for sorting writings
              dispatch(filterContent("Novel")); // reset category for filtering content
            }}
          >
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
interface DetailProps {
  pathname: string;
  //   novelId: string;
  parameter: {
    novelId: string | undefined;
    talkId: string | undefined;
    recommendId: string | undefined;
  };
}

export function NavMobileDetail({ parameter, pathname }: DetailProps) {
  // one nav component: top

  const dispatch = useAppDispatch();

  const { novelTitle } = useAppSelector((state) => state.modal);

  const navigate = useNavigate();

  //   const dispatch = useAppDispatch();
  //   const { novelLike } = useAppSelector((state) => state.modal);

  //   novelLike.
  //   novelLike.novelId === parameter.novelId

  // server request in two component when clicking heart
  // in this, Nav :  get user's isHeart
  // in NovelDetail : user's isHeart, heart number

  //   const [isLike, handleLike] = useState(isLikeNovel);

  // this useState is not required for server request.
  // just click heart, request sever state, use it.
  const theme = {};
  return (
    <ThemeProvider theme={theme}>
      {/* top place */}
      <NavContentBoxMobile>
        <IconsBox isLeft>
          <LeftIconBox onClick={() => navigate(-1)}>
            <LeftIcon />
          </LeftIconBox>
          {/* from novelDetail to ... : show Home Icon */}
          {parameter.novelId && (
            <HomeIconBox
              onClick={() => {
                navigate("/talk_list");
                dispatch(sortWriting("작성일New")); // reset category for sorting writings
                dispatch(filterContent("Novel")); // reset category for filtering content
              }}
            >
              <HomeIcon />
            </HomeIconBox>
          )}
        </IconsBox>
        {/* what page title is :
            1.메인리스트->게시글 이동 : 프리톡/리코멘드 게시판 이름
            2.노블디테일-> ...: 노블 타이틀
            3.노블메인리스트 전체보기 페이지 : 페이지타이틀 없음(일단은)
        */}
        {pathname.includes("talk_detail") && <Logo>여기는 프리톡!</Logo>}
        {pathname.includes("recommend_detail") && <Logo>여기는 리코멘드!</Logo>}
        {parameter.novelId && <Logo>{novelTitle}</Logo>}
        <IconsBox isRight>
          {(pathname === `/novel_detail/${parameter.novelId}` ||
            parameter.recommendId ||
            parameter.talkId) && (
            <HeartIconBox
              onClick={() => {
                // handleLike(!isLikeNovel);
                // dispatch(setLikeNovel(!isLikeNovel));
              }}
            >
              <HeartIcon />
              {/* {isLikeNovel && <FillHeartIcon />} */}
              {/* {!isLikeNovel && <HeartIcon />} */}
            </HeartIconBox>
          )}
          {(parameter.recommendId || parameter.talkId) && (
            <ShareIconBox>
              <ShareIcon />
            </ShareIconBox>
          )}
        </IconsBox>
      </NavContentBoxMobile>
    </ThemeProvider>
  );
}
