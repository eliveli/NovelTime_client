import { useAppDispatch } from "store/hooks";
import { setUserInfoForUserPage } from "store/clientSlices/userSlice";
import { messageIconUserPage } from "assets/images";
import { Outlet, useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  return (
    <ProfileContnr>
      <ProfileAlign>
        <ProfileUserCntnr>
          <UserImg userImg={userImg} />
          <UserName onClick={() => navigate(`/user_page/${userName}`)}>{userName}</UserName>
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
