// for kakao
const REST_API_KEY_KAKAO = process.env.REACT_APP_KAKAO_CLIENT_ID;
const REDIRECT_URI_KAKAO =
  process.env.REACT_APP_ENV === "production"
    ? ""
    : "http://domainfordev.com:3000/oauth/callback/kakao";

// for google
const REST_API_KEY_GOOGLE = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const REDIRECT_URI_GOOGLE =
  process.env.REACT_APP_ENV === "production"
    ? ""
    : "http://domainfordev.com:3000/oauth/callback/google";

// oauth url
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY_KAKAO}&redirect_uri=${REDIRECT_URI_KAKAO}&response_type=code`;
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${REST_API_KEY_GOOGLE}&response_type=token&redirect_uri=${REDIRECT_URI_GOOGLE}&scope=https://www.googleapis.com/auth/userinfo.email`;
