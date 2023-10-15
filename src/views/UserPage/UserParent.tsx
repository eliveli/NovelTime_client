import { useEffect } from "react";
import theme from "assets/styles/theme";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setLoginUser, setAccessToken, setLogout } from "store/clientSlices/loginUserSlice";
import { handleAlert, openModal } from "store/clientSlices/modalSlice";
import { messageIconUserPage } from "assets/images";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Icon from "assets/Icon";
import { useGetLogoutQuery, useGetUserInfoByUserNameQuery } from "store/serverAPIs/novelTime";
import Spinner from "assets/Spinner";
import { CHAT_ROOM_LIST, CHAT_ROOM } from "utils/pathname";
import { useWhetherItIsMobile } from "utils";
import { setUserProfile } from "store/clientSlices/userProfileSlice";
import socket from "store/serverAPIs/socket.io";
import { ChatRoom } from "store/serverAPIs/types";
import { initializeChat, setNewRoom } from "store/clientSlices/chatSlice";
import {
  ProfileContnr,
  ProfileBG,
  ProfileUserCntnr,
  ProfileUserInfoBG,
  UserImg,
  UserName,
  MessageIcon,
  LogOutIconBox,
  EditProfileBtn,
  NavigatingToUserHome,
} from "./UserPage.styles";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userName: userNameFromURL } = useParams();
  const {
    userName: userNameFromSlice,
    userImg: userImgFromSlice,
    userBG: userBGFromSlice,
  } = useAppSelector((state) => state.userProfile.user);
  const loginUser = useAppSelector((state) => state.loginUser.user);
  const isLogin = !!loginUser.userId;
  const isLogout = useAppSelector((state) => state.loginUser.isLogout);
  const isMobile = useWhetherItIsMobile();

  // not to display a previous user even for a second just before getting new user with query
  const userName = userNameFromSlice === userNameFromURL ? userNameFromSlice : "";
  const userImg =
    userNameFromSlice === userNameFromURL ? userImgFromSlice : { src: "", position: "" };
  const userBG =
    userNameFromSlice === userNameFromURL ? userBGFromSlice : { src: "", position: "" };

  // userBG when user is changing the BG
  const tempUserBG = useAppSelector((state) => state.userProfile.temporaryUserBG);

  // after logout remove access token and user info in store
  const logoutResult = useGetLogoutQuery(undefined, {
    skip: !isLogout,
  });

  const rooms = useAppSelector((state) => state.chat.rooms);

  if (logoutResult.data && loginUser.userId) {
    dispatch(setAccessToken(""));
    dispatch(
      setLoginUser({
        userId: "",
        userName: "",
        userImg: {
          src: "",
          position: "",
        },
        userBG: {
          src: "",
          position: "",
        },
      }),
    );
  }
  const handleLogout = () => {
    dispatch(openModal("alert"));
    dispatch(handleAlert("로그아웃 하시겠습니까?"));
    dispatch(setLogout(true));
    // - it is not required to set logout with undefined again
    //   because when user logs in, page will be refreshed then isLogout state will be undefined

    socket.emit("logout");

    dispatch(initializeChat());
  };

  const handleMessage = async () => {
    if (!isLogin) {
      dispatch(openModal("alert"));
      dispatch(handleAlert("메세지를 보내려면 로그인해 주세요"));
      return;
    }

    const [roomWithTheUser] = Object.values(rooms).filter(
      (room) => room.partnerUserName === userName,
    );

    // Go to the chatroom that exists
    if (roomWithTheUser) {
      if (isMobile) {
        navigate(`${CHAT_ROOM}/${roomWithTheUser.roomId}`);
        return;
      }
      navigate(`${CHAT_ROOM_LIST}?roomId=${roomWithTheUser.roomId}`);
      return;
    }

    // Create a new room if it doesn't exist
    socket.emit("create a room", loginUser.userId, userName);
  };

  type NewRoomResult = {
    status: number;
    data?: { room: ChatRoom };
    error?: { message?: string };
  };
  const setNewRoomWithSocket = ({ status, data, error }: NewRoomResult) => {
    if (status === 200 && data) {
      dispatch(setNewRoom(data.room));

      if (isMobile) {
        navigate(`${CHAT_ROOM}/${data.room.roomId}`);
        return;
      }
      navigate(`${CHAT_ROOM_LIST}?roomId=${data.room.roomId}`);
      return;
    }

    if (status === 400 && error && error.message === "user doesn't exist") {
      dispatch(openModal("alert"));
      dispatch(handleAlert("존재하지 않는 사용자입니다"));
      return;
    }

    if (status === 500) {
      dispatch(openModal("alert"));
      dispatch(handleAlert(`메세지를 보낼 수 없습니다.\n새로고침 후 시도해 보세요`));
    }
  };

  useEffect(() => {
    socket.on("newRoom", setNewRoomWithSocket);

    return () => {
      socket.off("newRoom", setNewRoomWithSocket);
    };
  }, [isMobile]);
  //
  const stylesForUserHomeIcon = `transform: scaleX(-1); ${theme.media.mobile(
    `display:none;`,
  )} ${theme.media.tablet(`display:none;`)} ${theme.media.desktop(`display:block;`)}`;
  //
  return (
    <ProfileContnr whenBGisNot={!!tempUserBG.src || !!userBG.src}>
      {logoutResult.isFetching && <Spinner styles="fixed" />}

      <ProfileBG
        userBGSrc={tempUserBG.src || userBG.src}
        userBGPosition={tempUserBG.position || userBG.position}
      >
        <ProfileUserCntnr>
          <ProfileUserInfoBG>
            <UserImg userImg={userImg} />
            <NavigatingToUserHome onClick={() => navigate(`/user-page/${userName}`)}>
              <UserName>{userName}</UserName>
              <Icon.IconBox color={theme.color.main} styles={stylesForUserHomeIcon}>
                <Icon.Runner />
              </Icon.IconBox>
            </NavigatingToUserHome>
            {/* message icon for other's page, logout icon for login user's page */}
            {loginUser.userName !== userName ? (
              <MessageIcon onClick={handleMessage} src={messageIconUserPage} alt="message" />
            ) : (
              <>
                <EditProfileBtn onClick={() => dispatch(openModal("editProfile"))}>
                  수정
                </EditProfileBtn>
                <LogOutIconBox size={33} onClick={handleLogout}>
                  <Icon.Logout />
                </LogOutIconBox>
              </>
            )}
          </ProfileUserInfoBG>
        </ProfileUserCntnr>
      </ProfileBG>
    </ProfileContnr>
  );
}

export default function UserParent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userName } = useParams();
  const loginUser = useAppSelector((state) => state.loginUser.user);
  const isLoginUser = !!userName && userName === loginUser.userName;

  const { data, isError, isFetching } = useGetUserInfoByUserNameQuery(userName as string, {
    skip: isLoginUser, // send request when this isn't login user
  });
  useEffect(() => {
    if (isError) {
      dispatch(openModal("alert"));
      dispatch(handleAlert("존재하지 않는 사용자입니다."));
      navigate("/");
      return;
    }

    if (isLoginUser) {
      dispatch(setUserProfile(loginUser));
      return;
    }

    if (!isLoginUser && !!data) {
      dispatch(setUserProfile(data));
    }
    //
    // "userName" in deps is required
    //   when navigating login user's page from other user's page
    //   by clicking the profile icon in nav bar
  }, [data, userName, isError]);

  return (
    <>
      {isFetching && <Spinner styles="fixed" />}
      <Profile />
      <Outlet />
    </>
  );
}
