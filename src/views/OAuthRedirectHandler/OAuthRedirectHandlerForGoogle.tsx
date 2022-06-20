import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "store/hooks";

import { setLoginUserInfo, setAccessToken } from "store/clientSlices/userSlice";
import { useGetLoginKakaoQuery } from "store/serverAPIs/novelTime";
import {} from "./OAuthRedirectHandler.styles";

export default function OAuthRedirectHandlerForGoogle() {
  // 인가코드 받고 서버에 보냄. 이후 토큰과 유저 정보를 받아 옴
  const code = new URL(window.location.href).searchParams.get("code") as string;

  const { data, error, isLoading } = useGetLoginKakaoQuery(code);

  console.log("in RedirectHandler");
  if (isLoading) {
    console.log("isLoading in RedirectHandler:", isLoading);
  }
  if (data) {
    console.log("data in RedirectHandler:", data);
  }
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // login success : store login info and access token in memory
  if (data) {
    dispatch(setLoginUserInfo(data.userInfo));
    dispatch(setAccessToken(data.accessToken));
    navigate("/", { replace: true });
  }

  // login failed
  if (error) {
    console.log("소셜로그인 에러", error);
    window.alert("로그인에 실패하였습니다.");
    navigate("/", { replace: true });
  }

  //   페이지 새로고침 시, 또는 액세스 토큰 만료 기간마다 인터벌로 리프레시 요청 보내기
  //     이건 app.ts에서. 이 때 리프레시 토큰이 쿠키에 있는 경우만.
  //     없다면 서버 단에서 unauthorize같은 에러를 보낼 것임
  //   만약 리프레시 토큰 유효기간이 얼마 남지 않았다면 서버단에서 새로 발급?
  //     액세스 토큰 재발급 위해 리프레시 토큰을 받고 검증할 때 유효기간 얼마 남았는지 알 수 있나?
  //   쿠키가 사라지면 리프레시 토큰을 보낼 수 없음.
  //      그럼 다시 로그인하라고 클라이언트 단에 메세지 보낼까?
  return (
    <div>리다이렉트 중 : 스피너 넣기</div>
    // {isLoading && <Spinner />}
  );
}
