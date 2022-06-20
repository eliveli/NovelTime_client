/* eslint-disable */
// 지금은 뷰 구성에 집중할 것임. 린트 무시하는 주석은 나중에 해제하기
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import {
  NovelDetailRecommend,
  NovelDetailTalk,
  MessageList,
  MessageRoom,
  FreeTalkDetail,
  FreeTalkList,
  NovelDetail,
  NovelList,
  RecommendList,
  RecommendDetail,
  UserPageHome,
  UserPageWriting,
  UserPageNovelList,
  UserPageParent,
  NotFound,
  MainListNav,
  DetailNav,
  SearchPage,
  BeforeSearch,
  AfterSearch,
  NovelListByCategory,
  WritingList,
  NovelDetailMark,
  AddWriting,
  Home,
  OAuthRedirectHandlerForGoogle,
  OAuthRedirectHandlerForKakao,
} from "views";
import Modal from "components/Modal";
import ScrollToTop from "utils/ScrollToTop";
import { useGetAccessTokenQuery } from "store/serverAPIs/novelTime";
import { setLoginUserInfo, setAccessToken } from "store/clientSlices/userSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { ThemeProvider } from "styled-components";
import theme from "assets/styles/theme";
import GlobalStyle from "./assets/styles/GlobalStyle";

function App() {
  const dispatch = useAppDispatch();

  const accessToken = useAppSelector((state) => state.user.accessToken);
  const isLogout = useAppSelector((state) => state.user.isLogout);

  const [isNonLogin, handleNoneLogin] = useState(false);

  // get access token and user info automatically when browser refresh and token is expired
  const { data, error, isLoading } = useGetAccessTokenQuery(undefined, {
    // pollingInterval: 10000, // millisecond
    pollingInterval: 1800000 - 10000, // millisecond
    skip: isNonLogin,
  });

  console.log("in app component");
  console.log("accessToken in app component : ", accessToken);
  if (isLoading) {
    console.log("isLoading in App:", isLoading);
  }
  if (data) {
    console.log("data in App:", data);
  }

  // don't dispatch when access token in cached data is the same with one in store
  // to prevent "too many rerender" right after login
  // to avoid that : dispatch - change state in store - component render - dispatch - change state ...
  // store access token and user info
  if (data && data.accessToken !== accessToken && isLogout === undefined) {
    dispatch(setAccessToken(data.accessToken));

    handleNoneLogin(false);
  }
  if (data && !accessToken && isLogout === undefined) {
    dispatch(setLoginUserInfo(data.userInfo));
  }

  // as user didn't login(token doesn't exist) or refresh token is invalid
  if (error) {
    console.log("refresh token error : ", error);
  }
  // for non login user
  // prevent non login user from "pollingInterval"
  if (!accessToken && error && "data" in error && error.data.message === "non login user") {
    handleNoneLogin(true);
  }
  // after user login immediately refresh browser
  // this is required because user receive error message above immediately after login
  if (!!accessToken && error && "data" in error && error.data.message === "non login user") {
    // cookie from server is set on next page loading
    // so do refresh page
    window.location.href = window.location.href;
  }

  // 로그인 유저 인증
  // - OAuth 이용, 인가코드 받고 서버에 넘겨 줌.
  // - 서버에서는 인가코드를 카카오 서버에 주고 토큰을 받고
  //   다시 토큰을 주고 유저 정보를 받아 옴.
  //   받은 유저 정보로 jwt 만들어 클라이언트에 넘겨 줌
  // - silent refresh 설계
  // 1. 로그인 시
  //   - 리프레시 토큰 in 쿠키 & 액세스 토큰 in 스토어 저장 : OAuth 핸들러 컴포넌트
  //  -> 스토어에 토큰 존재 확인 후 페이지 새로고침 : App 컴포넌트
  //      - 서버에서 받아 온 쿠키는 다음 페이지 로딩 후 사용가능하기 때문
  //  -> 리프레시 토큰 in 쿠키 존재 -> 액세스 토큰 및 유저 정보 받아옴 -> 로그인 성공
  // 2. 이전 로그인한 상태에서 페이지 새로고침 시
  //   - 리프레시 토큰 주고 액세스 토큰 받아 와 로그인
  // 3. 로그인 후 액세스 토큰 만료 기간마다 액세스 토큰 받아 와 로그인 상태 유지
  //   - polling interval 이용
  // 3. 로그아웃 시
  //   - 액세스 토큰 및 유저 정보 스토어에서 지우기 : UserPageParent 컴포넌트
  //   - 스토어의 로그아웃 상태 또한 true로 변경 : UserPageParent 컴포넌트
  //  -> 액세스 토큰 상태를 구독하는 앱 컴포넌트의 무한 리렌더링 막기 : App 컴포넌트
  //      - dispatch 작동 조건을 다음과 같이 설정했기에 가능 : isLogout === undefined
  // 4. 비로그인일 경우
  //   최초 페이지 진입 시 리프레시 요청 감. 이 때 non login user 에러 받고 polling interval 막기

  return (
    <Router>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Modal />
        <ScrollToTop>
          <Routes>
            {["/", "/talk_list", "/recommend_list", "/novel_list", "/message_list"].map((path) => (
              <Route path={path} element={<MainListNav />} />
            ))}
            {[
              "/novel_detail/:novelId",
              "/novel_detail/:novelId/writing_list",
              "/novel_detail/:novelId/:talkId",
              "/novel_detail/:novelId/:recommendId",
              "/talk_detail/:talkId",
              "/talk_detail/:talkId/:commentId",
              "/recommend_detail/:recommendId",
              "/novel_list/:categoryText/:categoryId",
              "/novel_list/:categoryText/:categoryId/:novelId",
              "/add_writing",
              "/add_writing/:novelId/:novelTitle",
              "/search",
              "/search/novel",
              "/message_room/:roomId",

              "/user_page/:userName",
              "/user_page/:userName/myWriting",
              "/user_page/:userName/othersWriting",
              "/user_page/:userName/myList/:listId",
              "/user_page/:userName/othersList/:listId",
              "*",
            ].map((path) => (
              <Route path={path} element={<DetailNav />} />
            ))}

            {/* 모바일 버전은 화면 최하단에 고정, PC 버전은 최상단에 스크롤 따라 보이기/감추기 */}
            {/* 페이지 별 다른 내비게이션 바가 필요할 경우 추가 & 아래 Routes에도 parent component path 추가 */}
          </Routes>
        </ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/oauth/callback/kakao" element={<OAuthRedirectHandlerForKakao />} />
          <Route path="/oauth/callback/google" element={<OAuthRedirectHandlerForGoogle />} />

          <Route path="/talk_list" element={<FreeTalkList />} />
          <Route path="/recommend_list" element={<RecommendList />} />

          <Route path="/novel_list" element={<NovelList />} />
          <Route path="/novel_list/:categoryText/:categoryId" element={<NovelListByCategory />} />
          <Route
            path="/novel_list/:categoryText/:categoryId/:novelId"
            element={<NovelListByCategory />}
          />

          <Route path="/novel_detail/:novelId" element={<NovelDetail />} />
          <Route path="/novel_detail/:novelId/writing_list" element={<WritingList />} />
          <Route path="/novel_detail/:novelId/:talkId" element={<NovelDetailTalk />} />
          <Route path="/novel_detail/:novelId/:recommendId" element={<NovelDetailRecommend />} />

          <Route path="/talk_detail/:talkId" element={<FreeTalkDetail />} />
          <Route path="/talk_detail/:talkId/:commentId" element={<FreeTalkDetail />} />
          <Route path="/recommend_detail/:recommendId" element={<RecommendDetail />} />

          <Route path="/add_writing" element={<AddWriting />} />
          <Route path="/add_writing/:novelId/:novelTitle" element={<AddWriting />} />

          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/novel" element={<SearchPage />} />
          <Route path="/search/novel/iframe" element={<SearchPage />} />
          {/* 검색 전 예시 작품 보여주기 */}

          <Route path="/message_list" element={<MessageList />} />

          <Route path="/message_room/:roomId" element={<MessageRoom />} />

          {/* 새로고침 등 상황에 로그인 유지 위해 클라이언트 스토어 이용*/}

          <Route path="/user_page/:userName" element={<UserPageParent />}>
            <Route index element={<UserPageHome />} />
            <Route
              path="/user_page/:userName/myWriting"
              element={<UserPageWriting isMyWriting={true} />}
            />
            <Route
              path="/user_page/:userName/othersWriting"
              element={<UserPageWriting isMyWriting={false} />}
            />
            <Route
              path="/user_page/:userName/myList/:listId"
              element={<UserPageNovelList isMyList={true} />}
            />
            <Route
              path="/user_page/:userName/othersList/:listId"
              element={<UserPageNovelList isMyList={false} />}
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}
export default App;
