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
  talkTitle: string;
  createDate: string;
  likeNO: number;
  commentNO: number;
  novelImg: string;
  novelTitle: string;
}
interface RecommendUserCreated {
  recommendId: string;
  recommendTitle: string;
  createDate: string;
  likeNO: number;
  novelImg: string;
  novelTitle: string;
}
interface TalkOrRecommendUserCreated {
  talkId?: string;
  talkTitle?: string;
  recommendId?: string;
  recommendTitle?: string;
  createDate: string;
  likeNO: number;
  commentNO?: number;
  novelImg: string;
  novelTitle: string;
}
export interface TalkOrRecommend {
  talkId?: string;
  talkTitle?: string;
  recommendId?: string;
  recommendTitle?: string;
  createDate: string;
  likeNO: number;
  commentNO?: number;
  novelImg: string;
  novelTitle: string;
  userName?: string;
}
interface TalkUserLikes {
  talkId: string;
  talkTitle: string;
  createDate: string;
  likeNO: number;
  commentNO: number;
  novelImg: string;
  novelTitle: string;
  userName: string;
}
interface RecommendUserLikes {
  recommendId: string;
  recommendTitle: string;
  createDate: string;
  likeNO: number;
  novelImg: string;
  novelTitle: string;
  userName: string;
}
export interface CommentUserCreated {
  commentId: string;
  commentContent: string;
  createDate: string;
  talkId: string;
  talkTitle: string;
  novelTitle: string;
}
export interface NovelInNovelList {
  novelId: string;
  novelImg: string;
  novelTitle: string;
  novelAuthor: string;
  novelGenre: string;
  novelIsEnd: boolean;
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

interface NovelListsSimpleInfos {
  listId: string;
  listTitle: string;
  userName?: string;
  userImg?: {
    src: string;
    position: string;
  };
}
export interface NovelListSetForMyOrOthersList {
  listId: string;
  listTitle: string;
  isLike: boolean;
  otherList: NovelListsSimpleInfos[];
  novel: NovelInNovelList[];
  userName?: string;
  userImg?: { src: string; position: string };
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
export interface ContentsForUserPageWriting {
  writingsUserCreated?: TalkOrRecommend[];
  commentsUserCreated?: CommentUserCreated[];
  writingsUserLikes?: TalkOrRecommend[];
  isNextOrder: boolean;
}
export interface ContentsForUserPageMyWriting {
  writingsUserCreated?: TalkOrRecommendUserCreated[];
  commentsUserCreated?: CommentUserCreated[];
  isNextOrder: boolean;
}
export interface ContentsForUserPageOthersWriting {
  writingsUserLikes: TalkUserLikes[] | RecommendUserLikes[];
  isNextOrder: boolean;
}

export interface ParamsForUserPageWriting {
  userName: string;
  contentsType: "T" | "R" | "C";
  order: number;
}
export interface ContentsForUserPageNovelList {
  novelList: NovelListSetForMyOrOthersList;
  isNextOrder: boolean;
}
export interface ParamsForUserPageNovelList {
  accessToken?: string;
  userName: string;
  listId: string;
  order: number;
}
export interface ContentForLike {
  contentType: "writing" | "novelList";
  contentId: string;
  isOthersListOfLoginUser: boolean;
}
export interface IsLike {
  isLike: boolean;
}
