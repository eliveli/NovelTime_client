import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  setLoginUserInfo,
  setAccessToken,
  setLogout,
  setUserInfoForUserPage,
} from "store/clientSlices/userSlice";
import { messageIconUserPage } from "assets/images";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Icon from "assets/Icon";
import { useGetLogoutQuery } from "store/serverAPIs/novelTime";
import { useState } from "react";
import {
  ProfileContnr,
  ProfileAlign,
  ProfileUserCntnr,
  UserImg,
  UserName,
  MessageIcon,
  LogOutIconBox,
} from "./UserPage.styles";

// server request with userName
const dataFromServer = {
  userInfo: { userName: "신은혜 eunhye", userImg: "" },
};

interface ProfileProps {
  userImg: string;
  userName: string;
}

function Profile({ userImg, userName }: ProfileProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginUserInfo = useAppSelector((state) => state.user.loginUserInfo);
  const isLogout = useAppSelector((state) => state.user.isLogout);

  // after logout remove access token and user info in store
  const { data, error, isLoading, isUninitialized } = useGetLogoutQuery(undefined, {
    skip: !isLogout,
  });

  if (data && loginUserInfo.userId) {
    console.log("in logout handler");
    dispatch(setAccessToken(""));
    dispatch(setLoginUserInfo({ userId: "", userName: "", userImg: "" }));
  }
  const handleLogout = () => {
    alert("로그아웃 하시겠습니까?");
    dispatch(setLogout(true));
    // it is not required to set logout with undefined again
    // because when user login, page will be refreshed then isLogout state will be undefined
  };
  return (
    <ProfileContnr>
      <ProfileAlign>
        <ProfileUserCntnr>
          <UserImg userImg={userImg} />
          <UserName onClick={() => navigate(`/user_page/${userName}`)}>{userName}</UserName>
          {/* message icon for other's page, logout icon for login user's page */}
          {loginUserInfo.userName !== dataFromServer.userInfo.userName ? (
            <MessageIcon src={messageIconUserPage} alt="message" />
          ) : (
            <LogOutIconBox size={33} onClick={handleLogout}>
              <Icon.Logout />
            </LogOutIconBox>
          )}
        </ProfileUserCntnr>
      </ProfileAlign>
    </ProfileContnr>
  );
}

export default function UserPageParent() {
  const { userName } = useParams();
  // server request with userName

  // set user info to show in nav
  const dispatch = useAppDispatch();
  dispatch(setUserInfoForUserPage(dataFromServer.userInfo));

  return (
    <>
      <Profile
        userImg={dataFromServer.userInfo.userImg}
        userName={dataFromServer.userInfo.userName}
      />
      <Outlet />
    </>
  );
}
