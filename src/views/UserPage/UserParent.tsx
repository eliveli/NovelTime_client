import { useEffect } from "react";
import theme from "assets/styles/theme";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setLoginUser, setAccessToken, setLogout } from "store/clientSlices/loginUserSlice";
import { openModal } from "store/clientSlices/modalSlice";
import { messageIconUserPage } from "assets/images";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Icon from "assets/Icon";
import {
  useGetLogoutQuery,
  useGetUserInfoByUserNameQuery,
  useLazyGetChatRoomIdQuery,
} from "store/serverAPIs/novelTime";
import Spinner from "assets/Spinner";
import { CHAT_ROOM_LIST, CHAT_ROOM } from "utils/pathname";
import { useWhetherItIsMobile } from "utils";
import { setUserProfile } from "store/clientSlices/userProfileSlice";
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
  const { userName, userImg, userBG } = useAppSelector((state) => state.userProfile.user);
  const loginUser = useAppSelector((state) => state.loginUser.user);
  const isLogin = !!loginUser.userId;
  const isLogout = useAppSelector((state) => state.loginUser.isLogout);
  const isMobile = useWhetherItIsMobile();

  // userBG when user is changing the BG
  const tempUserBG = useAppSelector((state) => state.userProfile.temporaryUserBG);

  // after logout remove access token and user info in store
  const { data } = useGetLogoutQuery(undefined, {
    skip: !isLogout,
  });
  const [getChatRoomId, getChatRoomIdResult] = useLazyGetChatRoomIdQuery();

  if (data && loginUser.userId) {
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
    alert("로그아웃 하시겠습니까?");
    dispatch(setLogout(true));
    // it is not required to set logout with undefined again
    // because when user login, page will be refreshed then isLogout state will be undefined
  };

  const handleMessage = async () => {
    if (!isLogin) {
      alert("메세지를 보내려면 로그인해 주세요");
      return;
    }

    if (getChatRoomIdResult.isFetching) return;

    await getChatRoomId(userName);
  };

  useEffect(() => {
    if (
      getChatRoomIdResult.error &&
      "data" in getChatRoomIdResult.error &&
      "message" in getChatRoomIdResult.error.data &&
      getChatRoomIdResult.error.data.message === "user doesn't exist"
    ) {
      alert("존재하지 않는 사용자입니다");
      return;
    }

    if (getChatRoomIdResult.isError) {
      alert("메세지를 보낼 수 없습니다. 새로고침 후 시도해 보세요");
      return;
    }

    if (getChatRoomIdResult.data && !getChatRoomIdResult.data.roomId) {
      alert("메세지를 보낼 수 없습니다.");
      return;
    }

    if (getChatRoomIdResult.data) {
      if (isMobile) {
        navigate(`${CHAT_ROOM}/${getChatRoomIdResult.data.roomId}`);
        return;
      }
      navigate(`${CHAT_ROOM_LIST}?roomId=${getChatRoomIdResult.data.roomId}`);
    }

    //
  }, [getChatRoomIdResult.data, getChatRoomIdResult.isError, isMobile]);

  const stylesForUserHomeIcon = `transform: scaleX(-1); ${theme.media.mobile(
    `display:none;`,
  )} ${theme.media.tablet(`display:none;`)} ${theme.media.desktop(`display:block;`)}`;
  //
  return (
    <ProfileContnr whenBGisNot={!!tempUserBG.src || !!userBG.src}>
      {getChatRoomIdResult.isFetching && <Spinner styles="fixed" />}

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
      alert("존재하지 않는 사용자입니다.");
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
