import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  setLoginUserInfo,
  setAccessToken,
  setLogout,
  setUserInfoForUserPage,
} from "store/clientSlices/userSlice";
import { openModal } from "store/clientSlices/modalSlice";
import { messageIconUserPage } from "assets/images";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Icon from "assets/Icon";
import { useGetLogoutQuery } from "store/serverAPIs/novelTime";
import { useEffect } from "react";
import {
  ProfileContnr,
  ProfileAlign,
  ProfileUserCntnr,
  UserImg,
  UserName,
  MessageIcon,
  LogOutIconBox,
  EditProfileBtn,
} from "./UserPage.styles";

// server request with userName
const dataFromServer = {
  userInfo: {
    userName: "eunhye shin",
    userImg: { src: "", position: "top" },
    userBG: {
      src: "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png",
      position: "center",
    },
  },
};

interface ProfileProps {
  userName: string;
  userImg: { src: string; position: string };
  userBG: { src: string; position: string };
}

function Profile({ userImg, userName, userBG }: ProfileProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginUserInfo = useAppSelector((state) => state.user.loginUserInfo);
  const isLogout = useAppSelector((state) => state.user.isLogout);
  // userBG when user is changing the BG
  const tempUserBG = useAppSelector((state) => state.user.tempUserBG);
  // after logout remove access token and user info in store
  const { data, error, isLoading, isUninitialized } = useGetLogoutQuery(undefined, {
    skip: !isLogout,
  });

  if (data && loginUserInfo.userId) {
    console.log("in logout handler");
    dispatch(setAccessToken(""));
    dispatch(
      setLoginUserInfo({
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

  useEffect(() => {
    console.log("tempUserBG in useEffect:", tempUserBG);
  }, [tempUserBG]);
  return (
    <ProfileContnr>
      <ProfileAlign userBG={tempUserBG || userBG}>
        <ProfileUserCntnr>
          <UserImg userImg={userImg} />
          <UserName onClick={() => navigate(`/user_page/${userName}`)}>{userName}</UserName>
          {/* message icon for other's page, logout icon for login user's page */}
          {loginUserInfo.userName !== userName ? (
            <MessageIcon src={messageIconUserPage} alt="message" />
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
        </ProfileUserCntnr>
      </ProfileAlign>
    </ProfileContnr>
  );
}

export default function UserPageParent() {
  const { userName } = useParams();
  // request with userName to server when the user is not the login user

  const dispatch = useAppDispatch();
  const loginUserInfo = useAppSelector((state) => state.user.loginUserInfo);
  // user info : login user or not
  const userInfoForUserPage =
    loginUserInfo.userName !== dataFromServer.userInfo.userName
      ? dataFromServer.userInfo
      : loginUserInfo;
  // set user info to show on nav //
  dispatch(setUserInfoForUserPage(userInfoForUserPage));

  return (
    <>
      <Profile
        userImg={userInfoForUserPage.userImg}
        userName={userInfoForUserPage.userName}
        userBG={userInfoForUserPage.userBG}
      />
      <Outlet />
    </>
  );
}
