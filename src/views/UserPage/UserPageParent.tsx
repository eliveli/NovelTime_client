import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  setLoginUserInfo,
  setAccessToken,
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
  userInfo: { userName: "나나나", userImg: "" },
};

interface ProfileProps {
  userImg: string;
  userName: string;
}

function Profile({ userImg, userName }: ProfileProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginUserInfo = useAppSelector((state) => state.user.loginUserInfo);
  const accessToken = useAppSelector((state) => state.user.accessToken);

  const [isLogout, setLogout] = useState(false);

  // after logout remove access token and user info in store
  const { data, error, isLoading, isUninitialized } = useGetLogoutQuery(undefined, {
    skip: !isLogout,
  });
  console.log("error: ", error);
  console.log("data:", data);
  console.log("accessToken:", accessToken);
  console.log("isLogout:", isLogout);
  console.log("isLoading:", isLoading);

  if (data && loginUserInfo.userId) {
    console.log("in logout handler");
    dispatch(setAccessToken(""));
    dispatch(setLoginUserInfo({ userId: "", userName: "", userImg: "" }));
  }
  const handleLogout = () => {
    alert("로그아웃 하시겠습니까?");
    setLogout(true);
  };
  return (
    <ProfileContnr>
      <ProfileAlign>
        <ProfileUserCntnr>
          <UserImg userImg={userImg} />
          <UserName onClick={() => navigate(`/user_page/${userName}`)}>{userName}</UserName>
          {/* message icon for other's page, logout icon for login user's page */}
          {loginUserInfo.userName === dataFromServer.userInfo.userName ? (
            // {loginUserInfo.userName !== dataFromServer.userInfo.userName ? ( // use this not above
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
