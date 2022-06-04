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
import { useState } from "react";
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
  return (
    <ProfileContnr>
      <ProfileAlign userBG={userBG}>
        <ProfileUserCntnr>
          <UserImg userImg={userImg} />
          <UserName onClick={() => navigate(`/user_page/${userName}`)}>{userName}</UserName>
          {/* message icon for other's page, logout icon for login user's page */}
          {loginUserInfo.userName !== dataFromServer.userInfo.userName ? (
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
  // server request with userName

  // set user info to show in nav
  const dispatch = useAppDispatch();
  dispatch(setUserInfoForUserPage(dataFromServer.userInfo));

  return (
    <>
      <Profile
        userImg={dataFromServer.userInfo.userImg}
        userName={dataFromServer.userInfo.userName}
        userBG={dataFromServer.userInfo.userBG}
      />
      <Outlet />
    </>
  );
}
