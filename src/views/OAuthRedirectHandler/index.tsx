import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetLoginKakaoQuery, useGetNovelByIdQuery } from "store/serverAPIs/novelTime";
import {} from "./OAuthRedirectHandler.styles";

export default function OAuthRedirectHandler() {
  // 인가코드
  // - request with code and receive token and store it to client storage

  // following is just an example. I use RTK query, not axios
  //   axios({
  //     method: "GET",
  //     url: `http://3.35.208.142/oauth/callback/kakao?code=${code}`,
  //   })
  //   url 넣은 방식 : `http://{서버주소}?code=${code}`

  const navigate = useNavigate();
  // navigate(-2);

  const code = new URL(window.location.href).searchParams.get("code") as string;

  console.log("code: ", code);
  const { data, error, isLoading } = useGetLoginKakaoQuery(code);

  console.log(data || error || isLoading);

  //
  //  ... .then((res) => {
  //     console.log(res); // 토큰이 넘어올 것임

  //     const ACCESS_TOKEN = res.data.accessToken;

  //     localStorage.setItem("token", ACCESS_TOKEN);    //예시로 로컬에 저장함

  //     history.replace("/main") // 토큰 받았았고 로그인됐으니 화면 전환시켜줌(메인으로)

  //     }.catch((err) => {
  //     console.log("소셜로그인 에러", err);
  //     window.alert("로그인에 실패하였습니다.");
  //     history.replace("/login"); // 로그인 실패하면 로그인화면으로 돌려보냄
  //     }
  return (
    <div>리다이렉트 중 : 스피너 넣기</div>
    // {isLoading && <Spinner />}
  );
}
