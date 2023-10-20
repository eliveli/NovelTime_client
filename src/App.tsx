import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useSearchParams } from "react-router-dom";

import {
  ChatRoomList,
  ChatRoom,
  FreeTalkDetail,
  FreeTalkList,
  NovelDetail,
  NovelList,
  RecommendList,
  RecommendDetail,
  UserHome,
  UserNovelListDetailed,
  UserParent,
  UserNovelListSummary,
  UserWriting,
  NotFound,
  MainListNav,
  DetailNav,
  SearchNovelPage,
  SearchAllPage,
  NovelListByCategory,
  AddWriting,
  Home,
  OAuthRedirectHandler,
  SearchNovelIframe,
} from "views";
import Modal from "components/Modal";
import ScrollToTop from "utils/ScrollToTop";
import { useGetAccessTokenQuery } from "store/serverAPIs/novelTime";
import { setLoginUser, setAccessToken } from "store/clientSlices/loginUserSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { ThemeProvider } from "styled-components";
import theme from "assets/styles/theme";
import EditWriting from "views/EditWriting";
import { ChatRoomNavMobile } from "views/Nav";
import socket from "store/serverAPIs/socket.io";
import { Message, ChatRoom as TypeChatRoom } from "store/serverAPIs/types";
import { treatNewMessage, setRooms } from "store/clientSlices/chatSlice";
import { getCurrentRoomId } from "utils";
import GlobalStyle from "./assets/styles/GlobalStyle";

function App() {
  const dispatch = useAppDispatch();

  const accessToken = useAppSelector((state) => state.loginUser.accessToken);
  const isLogout = useAppSelector((state) => state.loginUser.isLogout);

  const [isNonLogin, handleNoneLogin] = useState(false);

  // get access token and user info automatically when browser refresh and token is expired
  const { data, error } = useGetAccessTokenQuery(undefined, {
    // pollingInterval: 10000, // millisecond
    pollingInterval: 1800000 - 10000, // millisecond
    skip: isNonLogin,
  });

  // don't dispatch when access token in cached data is the same with one in store
  // to prevent "too many rerender" right after login
  // to avoid that : dispatch - change state in store - component render - dispatch - change state ...
  // store access token and user info
  if (data && data.accessToken !== accessToken && isLogout === undefined) {
    dispatch(setAccessToken(data.accessToken));

    handleNoneLogin(false);
  }
  if (data && !accessToken && isLogout === undefined) {
    dispatch(setLoginUser(data.userInfo));
  }

  // error occurs as user didn't login(token doesn't exist) or refresh token is invalid
  //
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
    // eslint-disable-next-line no-self-assign
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
  //   - 액세스 토큰 및 유저 정보 스토어에서 지우기 : UserParent 컴포넌트
  //   - 스토어의 로그아웃 상태 또한 true로 변경 : UserParent 컴포넌트
  //  -> 액세스 토큰 상태를 구독하는 앱 컴포넌트의 무한 리렌더링 막기 : App 컴포넌트
  //      - dispatch 작동 조건을 다음과 같이 설정했기에 가능 : isLogout === undefined
  // 4. 비로그인일 경우
  //   최초 페이지 진입 시 리프레시 요청 감. 이 때 non login user 에러 받고 polling interval 막기

  //
  const { userId: loginUserId, userName: loginUserName } = useAppSelector(
    (state) => state.loginUser.user,
  );
  // It's necessary to use states from userSlice to chat right after login
  // Don't use "data.userInfo.userId" or "data.userInfo.userName"
  // With them, user can't chat right after login
  //  only can do after login and page refresh.

  // Join chat rooms //
  useEffect(() => {
    if (!loginUserId) return;

    socket.emit("join all rooms", loginUserId);
  }, [loginUserId]);

  // Set chat rooms //
  const setRoomsAfterLogIn = (rooms: TypeChatRoom[]) => {
    if (!rooms.length) return;

    dispatch(setRooms(rooms));
  };

  useEffect(() => {
    socket.on("rooms", setRoomsAfterLogIn);

    return () => {
      socket.off("rooms", setRoomsAfterLogIn);
    };
  }, []);

  // Get a new message and Change the room that the message comes in //
  const treatNewMsgInSlice = (newMessage: Message) => {
    if (!loginUserName) return;

    // for when the user entered a chatroom
    dispatch(
      treatNewMessage({
        newMessage,
        loginUserName,
        currentRoomId: getCurrentRoomId(),
      }),
    );
  };

  useEffect(() => {
    socket.on("new message", treatNewMsgInSlice);

    return () => {
      socket.off("new message", treatNewMsgInSlice);
    };
  }, [loginUserName]);

  return (
    <Router>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Modal />
        <ScrollToTop>
          <Routes>
            {["/", "/talk-list", "/recommend-list", "/novel-list", "/chat-room-list"].map(
              (path) => (
                <Route key={path} path={path} element={<MainListNav />} />
              ),
            )}
            {[
              "/talk-detail/:talkId",
              "/talk-detail/:talkId/:commentId",
              "/recommend-detail/:recommendId",
              "/novel-list/:categoryId",
              "/novel-detail/:novelId",
              "/add-writing",
              "/edit-writing",
              "/search",
              "/search/novel",
              "/user-page/:userName",
              "/user-page/:userName/writing/created",
              "/user-page/:userName/writing/liked",
              "/user-page/:userName/novel-list/created",
              "/user-page/:userName/novel-list/created/:listId",
              "/user-page/:userName/novel-list/liked",
              "/user-page/:userName/novel-list/liked/:listId",
              "*", // for not found page
            ].map((path) => (
              <Route key={path} path={path} element={<DetailNav />} />
            ))}

            <Route path="/chat-room/:roomId" element={<ChatRoomNavMobile />} />
          </Routes>
        </ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/oauth/callback/:oauthServerUrl" element={<OAuthRedirectHandler />} />

          <Route path="/talk-list" element={<FreeTalkList />} />
          <Route path="/recommend-list" element={<RecommendList />} />

          <Route path="/novel-list" element={<NovelList />} />
          <Route path="/novel-list/:categoryId" element={<NovelListByCategory />} />

          <Route path="/novel-detail/:novelId" element={<NovelDetail />} />

          <Route path="/talk-detail/:talkId" element={<FreeTalkDetail />} />
          <Route path="/talk-detail/:talkId/:commentId" element={<FreeTalkDetail />} />
          <Route path="/recommend-detail/:recommendId" element={<RecommendDetail />} />

          <Route path="/add-writing" element={<AddWriting />} />
          <Route path="/edit-writing" element={<EditWriting />} />

          <Route path="/search" element={<SearchAllPage />} />
          <Route path="/search/novel" element={<SearchNovelPage />} />
          <Route path="/search/novel/iframe" element={<SearchNovelIframe />} />

          <Route path="/chat-room-list" element={<ChatRoomList />} />

          <Route path="/chat-room/:roomId" element={<ChatRoom />} />

          {/* 새로고침 등 상황에 로그인 유지 위해 클라이언트 스토어 이용 */}

          <Route path="/user-page/:userName" element={<UserParent />}>
            <Route index element={<UserHome />} />
            <Route
              path="/user-page/:userName/writing/created"
              element={<UserWriting isCreated />}
            />
            <Route
              path="/user-page/:userName/writing/liked"
              element={<UserWriting isCreated={false} />}
            />
            <Route
              path="/user-page/:userName/novel-list/created"
              element={<UserNovelListSummary isCreated />}
            />
            <Route
              path="/user-page/:userName/novel-list/created/:listId"
              element={<UserNovelListDetailed isCreated />}
            />
            <Route
              path="/user-page/:userName/novel-list/liked"
              element={<UserNovelListSummary isCreated={false} />}
            />
            <Route
              path="/user-page/:userName/novel-list/liked/:listId"
              element={<UserNovelListDetailed isCreated={false} />}
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}
export default App;
