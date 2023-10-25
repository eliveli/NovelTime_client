import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { setLoginUser, setAccessToken } from "store/clientSlices/loginUserSlice";
import { useGetLoginOauthServerQuery } from "store/serverAPIs/novelTime";
import Spinner from "assets/Spinner";
import { handleAlert, openFirstModal } from "store/clientSlices/modalSlice";

export default function OAuthRedirectHandler() {
  const { oauthServerUrl } = useParams();

  const oauthServer = oauthServerUrl?.startsWith("kakao")
    ? "kakao"
    : oauthServerUrl?.startsWith("naver")
    ? "naver"
    : oauthServerUrl?.startsWith("google")
    ? "google"
    : "";

  let oauthInfo = "";

  const url = new URL(window.location.href);
  if (["kakao", "naver"].includes(oauthServer as string)) {
    // 인가코드 받고 서버에 보냄. 이후 토큰과 유저 정보를 받아 옴
    oauthInfo = url.searchParams.get("code") as string;
  } else if (oauthServer === "google") {
    const { hash } = url;
    const accessToken = hash.split("=")[1].split("&")[0];
    oauthInfo = accessToken;
  }

  const { data, error, isFetching } = useGetLoginOauthServerQuery(
    { oauthServer: oauthServer as string, oauthInfo },
    {
      skip: !oauthServerUrl,
    },
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // login success : store login info and access token in memory
  if (data) {
    dispatch(setLoginUser(data.userInfo));
    dispatch(setAccessToken(data.accessToken));
    navigate("/", { replace: true });
  }

  // login failed
  if (error) {
    dispatch(openFirstModal("alert"));
    dispatch(handleAlert({ text: "로그인에 실패하였습니다." }));
    navigate("/", { replace: true });
  }

  return <>{isFetching && <Spinner styles="fixed" />}</>;
}
