/* eslint-disable */
// 지금은 뷰 구성에 집중할 것임. 린트 무시하는 주석은 나중에 해제하기
import React from "react";
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
} from "views";
import Modal from "components/Modal";
import ScrollToTop from "utils/ScrollToTop";
import { ThemeProvider } from "styled-components";
import theme from "assets/styles/theme";
import GlobalStyle from "./assets/styles/GlobalStyle";

function App() {
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
            ].map((path) => (
              <Route path={path} element={<DetailNav />} />
            ))}

            {/* 모바일 버전은 화면 최하단에 고정, PC 버전은 최상단에 스크롤 따라 보이기/감추기 */}
            {/* 페이지 별 다른 내비게이션 바가 필요할 경우 추가 & 아래 Routes에도 parent component path 추가 */}
          </Routes>
        </ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
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
