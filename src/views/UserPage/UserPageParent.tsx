import { useAppDispatch } from "store/hooks";
import { setUserInfo } from "store/clientSlices/userInfoSlice";
import { messageIconUserPage } from "assets/images";
import { Outlet, useParams } from "react-router-dom";
import {
  ProfileContnr,
  ProfileAlign,
  ProfileUserCntnr,
  UserImg,
  UserName,
  MessageIcon,
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
  return (
    <ProfileContnr>
      <ProfileAlign>
        <ProfileUserCntnr>
          <UserImg userImg={userImg} />
          <UserName>{userName}</UserName>
          <MessageIcon src={messageIconUserPage} alt="message" />
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
  dispatch(setUserInfo(dataFromServer.userInfo));

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
