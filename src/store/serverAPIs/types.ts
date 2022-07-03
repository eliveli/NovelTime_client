export interface NovelInfo {
  novelId: string;
  novelImg: string;
  novelTitle: string;
  novelDesc: string;
  novelAuthor: string;
  novelAge: string;
  novelGenre: string;
  novelIsEnd: boolean;
  novelPlatform: string;
  novelPlatform2: string;
  novelPlatform3: string;
  novelUrl: string;
  novelUrl2: string;
  novelUrl3: string;
  isRecommendation: boolean;
  isFreeTalk: boolean;
}
export interface UserAndToken {
  accessToken: string;
  userInfo: {
    userId: string;
    userName: string;
    userImg: { src: string; position: string };
    userBG: { src: string; position: string };
  };
}

export interface OauthData {
  oauthServer: string;
  oauthInfo: string;
}

interface Img {
  src: string;
  position: string;
}
export interface ChangedUserInfo {
  changedUserName: string;
  changedUserImg: Img;
  changedUserBG: Img;
}
export interface UserInfo {
  userInfo: {
    userName: string;
    userImg: Img;
    userBG: Img;
  };
}
