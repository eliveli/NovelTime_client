import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { setLoginUser, setAccessToken } from "store/clientSlices/loginUserSlice";
import { useGetLoginOauthServerQuery } from "store/serverAPIs/novelTime";
import Spinner from "assets/Spinner";
import { handleAlert, openModal } from "store/clientSlices/modalSlice";

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
    dispatch(openModal("alert"));
    dispatch(handleAlert("로그인에 실패하였습니다."));
    navigate("/", { replace: true });
  }

  //   페이지 새로고침 시, 또는 액세스 토큰 만료 기간마다 인터벌로 리프레시 요청 보내기
  //     이건 app.ts에서. 이 때 리프레시 토큰이 쿠키에 있는 경우만.
  //     없다면 서버 단에서 unauthorize같은 에러를 보낼 것임
  //   만약 리프레시 토큰 유효기간이 얼마 남지 않았다면 서버단에서 새로 발급?
  //     액세스 토큰 재발급 위해 리프레시 토큰을 받고 검증할 때 유효기간 얼마 남았는지 알 수 있나?
  //   쿠키가 사라지면 리프레시 토큰을 보낼 수 없음.
  //      그럼 다시 로그인하라고 클라이언트 단에 메세지 보낼까?
  return <div>{isFetching && <Spinner styles="fixed" />}</div>;
}
