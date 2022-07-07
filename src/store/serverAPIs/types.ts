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
  userName: string;
  userImg: Img;
  userBG: Img;
}
interface TalkUserCreated {
  talkId: string;
  novelImg: string;
  talkTitle: string;
  createDate: string;
  likeNO: number;
  commentNO: number;
  novelTitle: string;
}
interface RecommendUserCreated {
  recommendId: string;
  novelImg: string;
  recommendTitle: string;
  createDate: string;
  likeNO: number;
  novelTitle: string;
}
interface TalkUserLikes {
  talkId: string;
  novelImg: string;
  talkTitle: string;
  createDate: string;
  likeNO: number;
  commentNO: number;
  novelTitle: string;
  userName: string;
}
interface RecommendUserLikes {
  recommendId: string;
  novelImg: string;
  recommendTitle: string;
  createDate: string;
  likeNO: number;
  novelTitle: string;
  userName: string;
}
interface CommentUserCreated {
  commentId: string;
  commentContent: string;
  createDate: string;
  talkId: string;
  talkTitle: string;
  novelTitle: string;
}
interface NovelInNovelList {
  novelId: string;
  novelImg: string;
  novelTitle: string;
  novelAuthor: string;
  novelGenre: string;
  novelIsEnd: string;
}
interface ListUserCreated {
  listId: string;
  listTitle: string;
  novel: NovelInNovelList[];
}
interface ListUserLikes {
  listId: string;
  listTitle: string;
  userName: string;
  userImg: { src: string; position: string };
  novel: NovelInNovelList[];
}
export interface ContentsForUserPageHome {
  talksUserCreated: TalkUserCreated[];
  recommendsUserCreated: RecommendUserCreated[];
  commentsUserCreated: CommentUserCreated[];
  talksUserLikes: TalkUserLikes[];
  recommendsUserLikes: RecommendUserLikes[];
  novelLists: {
    listsUserCreated: ListUserCreated[];
    listsUserLikes: ListUserLikes[];
  };
}
