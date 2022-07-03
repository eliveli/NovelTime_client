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
    <ProfileContnr whenBGisNot={!!tempUserBG.src || !!userBG.src}>
      <ProfileAlign
        userBGSrc={tempUserBG.src || userBG.src}
        userBGPosition={tempUserBG.position || userBG.position}
      >
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userName } = useParams();

  const loginUserInfo = useAppSelector((state) => state.user.loginUserInfo);

  const isLoginUser = (userName as string) === loginUserInfo.userName;

  const { data, error, isLoading } = useGetUserInfoByUserNameQuery(userName as string, {
    skip: !userName || isLoginUser,
    // to request after userName variable gets value
    // only request by userName when the user is not the login user
  });

  console.log("user info :", data);

  // user info : login user or not
  let userInfoForUserPage: ProfileProps;
  userInfoForUserPage = loginUserInfo;

  if (data) {
    userInfoForUserPage = data.userInfo;
  }

  // set user info to show on nav //
  dispatch(setUserInfoForUserPage(userInfoForUserPage));

  // when user name doesn't exist in DB
  if (error) {
    alert("DB에 유저네임 없음");
    navigate("/");
  }

  if (!error && isLoading) {
    return <Spinner />;
  }

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
