import { useEffect, useState } from "react";
import theme from "assets/styles/theme";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setLoginUser, setAccessToken, setLogout } from "store/clientSlices/loginUserSlice";
import { handleAlert, handleConfirm, openFirstModal } from "store/clientSlices/modalSlice";
import { messageIconUserPage } from "assets/images";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Icon from "assets/Icon";
import { useGetLogoutQuery, useGetUserInfoByUserNameQuery } from "store/serverAPIs/novelTime";
import Spinner from "assets/Spinner";
import { CHAT_ROOM_LIST, CHAT_ROOM } from "utils/pathname";
import { useWhetherItIsMobile } from "utils";
import { User, setUserProfile } from "store/clientSlices/userProfileSlice";
import socket from "store/serverAPIs/socket.io";
import { ChatRoom, UserInfo } from "store/serverAPIs/types";
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
  ProfileBtn,
  NavigatingToUserHome,
  UserContentContainer,
  UserImgAndName,
} from "./UserPage.styles";

function Profile({ user }: { user: User }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isMobile = useWhetherItIsMobile();

  const loginUser = useAppSelector((state) => state.loginUser.user);
  const isLogin = !!loginUser.userId;
  const isLogout = useAppSelector((state) => state.loginUser.isLogout);

  const { userName, userImg, userBG } = user;

  // userBG when user is changing the BG
  const tempUserBG = useAppSelector((state) => state.userProfile.temporaryUserBG);

  // Handle logout ------------------------------------------------------------- //
  const logoutResult = useGetLogoutQuery(undefined, {
    skip: !isLogout,
  });

  // after logout remove access token and user info in store
  useEffect(() => {
    if (!logoutResult.data || !loginUser.userId) return;

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
  }, [logoutResult.data, loginUser.userId]);

  const handleLogout = () => {
    dispatch(setLogout(true));
    // - it is not necessary to set logout to undefined again
    //   because when user logs in, page will be refreshed and isLogout state will be undefined

    socket.emit("logout");

    dispatch(initializeChat());
  };

  const confirmLogout = () => {
    dispatch(
      handleConfirm({
        question: "로그아웃 하시겠습니까?",
        textForYes: "예",
        textForNo: "아니오",
        functionForYes: handleLogout,
      }),
    );

    dispatch(openFirstModal("confirm"));
  };

  // Handle chatroom --------------------------------------------------------- //

  const rooms = useAppSelector((state) => state.chat.rooms);

  const handleMessage = async () => {
    if (!isLogin) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "메세지를 보내려면 로그인해 주세요" }));
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
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "존재하지 않는 사용자입니다" }));
      return;
    }

    if (status === 500) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: `메세지를 보낼 수 없습니다.\n새로고침 후 시도해 보세요` }));
    }
  };

  useEffect(() => {
    socket.on("newRoom", setNewRoomWithSocket);

    return () => {
      socket.off("newRoom", setNewRoomWithSocket);
    };
  }, [isMobile]);
  //
  const stylesForUserInUserHome = `transform: scaleX(-1); ${theme.media.mobile(
    `display:none;`,
  )} ${theme.media.tablet(`display:none;`)} ${theme.media.desktop(`display:block;`)}`;
  //
  return (
    <ProfileContnr isUserBG={!!tempUserBG.src || !!userBG.src}>
      {logoutResult.isFetching && <Spinner styles="fixed" />}

      <ProfileBG
        userBGSrc={tempUserBG.src || userBG.src}
        userBGPosition={tempUserBG.position || userBG.position}
      >
        <ProfileUserCntnr>
          <ProfileUserInfoBG>
            <UserImgAndName>
              <UserImg userImg={userImg} onClick={() => navigate(`/user-page/${userName}`)} />
              <NavigatingToUserHome onClick={() => navigate(`/user-page/${userName}`)}>
                <UserName>{userName}</UserName>
                <Icon.IconBox
                  color={theme.color.main}
                  styles={stylesForUserInUserHome}
                  hover="none"
                >
                  <Icon.Runner />
                </Icon.IconBox>
              </NavigatingToUserHome>
            </UserImgAndName>
            {/* message icon for other's page, logout icon for login user's page */}
            {loginUser.userName !== userName ? (
              <MessageIcon onClick={handleMessage} src={messageIconUserPage} alt="message" />
            ) : (
              <>
                <ProfileBtn onClick={() => dispatch(openFirstModal("editProfile"))}>
                  수정
                </ProfileBtn>

                {isMobile ? (
                  <LogOutIconBox size={33} onClick={confirmLogout}>
                    <Icon.Logout />
                  </LogOutIconBox>
                ) : (
                  <ProfileBtn isLogOut onClick={confirmLogout}>
                    로그아웃
                  </ProfileBtn>
                )}
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

  const initialUser = {
    userName: "",
    userImg: {
      src: "",
      position: "",
    },
    userBG: {
      src: "",
      position: "",
    },
  };

  const [user, setUser] = useState<UserInfo>(initialUser);

  useEffect(() => {
    if (isLoginUser) {
      setUser(loginUser);
      dispatch(setUserProfile(loginUser));
      return;
    }

    if (isFetching) return;

    if (isError) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "존재하지 않는 사용자입니다." }));
      navigate("/");
      return;
    }

    if (!isLoginUser && !!data) {
      setUser(data);
      dispatch(setUserProfile(data));
    }

    //
    // "userName" in deps is required
    //   when navigating login user's page from other user's page
    //   by clicking the profile icon in nav bar
  }, [data, userName, isError, isFetching]);

  // Darken user content while editing userBG
  const isEditingBG = !!useAppSelector((state) => state.userProfile.temporaryUserBG.src);

  return (
    <>
      {isFetching && <Spinner styles="fixed" />}
      <Profile user={user} />

      <UserContentContainer isEditingBG={isEditingBG}>
        <Outlet />
      </UserContentContainer>
    </>
  );
}
