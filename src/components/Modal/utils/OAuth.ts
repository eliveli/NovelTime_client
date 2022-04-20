// import dotenv from "dotenv";

// dotenv.config();
const REST_API_KEY = process.env.REACT_APP_KAKAO_CLIENT_ID;

// 개발 환경에 따라 달라짐. 환경변수 미리 설정 : process.env.REACT_APP_ENV
// 터미널 CMD에서 set NODE_ENV=development
const REDIRECT_URI =
  process.env.REACT_APP_ENV === "production" ? "" : "http://localhost:3000/oauth/callback/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
