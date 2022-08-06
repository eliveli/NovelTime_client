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
import { useGetLogoutQuery, useGetUserInfoByUserNameQuery } from "store/serverAPIs/novelTime";
import { useEffect } from "react";
import Spinner from "assets/Spinner";
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
    <ProfileContnr whenBGisNot={!!tempUserBG.src || !!userBG.src}>
      <ProfileAlign
        userBGSrc={tempUserBG.src || userBG.src}
        userBGPosition={tempUserBG.position || userBG.position}
      >
        <ProfileUserCntnr>
          <UserImg userImg={userImg} />
          <UserName onClick={() => navigate(`/user-page/${userName}`)}>{userName}</UserName>
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userName } = useParams();

  const loginUserInfo = useAppSelector((state) => state.user.loginUserInfo);

  const isLoginUser = !!userName && userName === loginUserInfo.userName;

  const { data, isError, isLoading } = useGetUserInfoByUserNameQuery(userName as string, {
    skip: isLoginUser,
    // only request by userName when the user didn't login
  });

  console.log("user info :", data);

  // user info : login user or not
  let userInfoForUserPage = {
    userName: "",
    userImg: { src: "", position: "" },
    userBG: { src: "", position: "" },
  };

  // set user info to show on nav //
  if (!isLoginUser && !!data) {
    userInfoForUserPage = data;
  } else if (isLoginUser) {
    userInfoForUserPage = loginUserInfo;
  }
  dispatch(setUserInfoForUserPage(userInfoForUserPage));
  // when user name doesn't exist in DB
  if (isError) {
    alert("존재하지 않는 사용자입니다.");
    navigate("/");
  }

  return (
    <>
      {isLoading && <Spinner styles="fixed" />}
      <Profile
        userImg={userInfoForUserPage.userImg}
        userName={userInfoForUserPage.userName}
        userBG={userInfoForUserPage.userBG}
      />
      <Outlet />
    </>
  );
}
