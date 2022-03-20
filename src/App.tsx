/* eslint-disable */
// 지금은 뷰 구성에 집중할 것임. 린트 무시하는 주석은 나중에 해제하기
import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import {
  ChatList,
  ChatRoom,
  FreeTalkDetail,
  FreeTalkList,
  NovelDetail,
  NovelList,
  RecommendList,
  RecommendDetail,
  UserPage,
  NotFound,
  MainListNav,
  DetailNav,
  SearchPage,
  BeforeSearch,
  AfterSearch,
  NovelListByCategory,
  WritingList,
  NovelDetailMark,
} from "views";
import Modal from "components/Modal";
import { ThemeProvider } from "styled-components";
import theme from "assets/styles/theme";
import GlobalStyle from "./assets/styles/GlobalStyle";

function Home() {
  return (
    <>
      aaa
      <Outlet />
    </>
  );
  // for nested child element
}

function App() {
  return (
    <Router>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Modal />
        <Routes>
          {["/", "/talk_list", "/recommend_list", "/novel_list"].map((path) => (
            <Route path={path} element={<MainListNav />} />
          ))}
          {[
            "/novel_detail/:novelId",
            "/novel_detail/:novelId/writing_list",
            "/talk_detail/:talk_id",
            "/recommend_detail/:recommend_id",
            "/novel_list/:categoryText/:categoryId",
            "/novel_list/:categoryText/:categoryId/:novelId",
          ].map((path) => (
            <Route path={path} element={<DetailNav />} />
          ))}

          {/* 모바일 버전은 화면 최하단에 고정, PC 버전은 최상단에 스크롤 따라 보이기/감추기 */}
          {/* 페이지 별 다른 내비게이션 바가 필요할 경우 추가 & 아래 Routes에도 parent component path 추가 */}
        </Routes>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<FreeTalkList />} />
            <Route path="/talk_list" element={<FreeTalkList />} />
            <Route path="/recommend_list" element={<RecommendList />} />

            <Route path="/novel_list" element={<NovelList />} />
            <Route path="/novel_list/:categoryText/:categoryId" element={<NovelListByCategory />} />
            <Route
              path="/novel_list/:categoryText/:categoryId/:novelId"
              element={<NovelListByCategory />}
            />
            {/*  NovelList 컴포넌트 안에서 :  let { category } = useParams(); */}

            <Route path="/novel_detail" element={<NovelDetailMark />}>
              <Route path=":novelId/:novelTitle" element={<NovelDetail />} />

              <Route path=":novelId/:novelTitle/writing_list" element={<WritingList />} />
            </Route>
            <Route path="/talk_detail/:talk_id" element={<FreeTalkDetail />} />
            <Route path="/recommend_detail/:recommend_id" element={<RecommendDetail />} />

            {/* <Route path="/search" element={<SearchPage />}> */}
            {/* 검색 전 보여줄 예시 작품 */}
            {/* <Route path="/" element={<BeforeSearch />} /> */}
            {/* 검색 후 보여줄 작품 : 검색 필터 구분 - 최초 검색 시 제목 필터 디폴트 */}
            {/* <Route path="/" element={<AfterSearch />} /> */}
            {/* </Route> */}

            <Route path="/chat_list/:user_id" element={<ChatList />} />
            <Route path="/chat_room/:room_id" element={<ChatRoom />} />

            <Route path="/user_page/:user_id" element={<UserPage />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}
export default App;
