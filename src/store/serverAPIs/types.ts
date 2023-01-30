export interface Img {
  src: string;
  position: string;
}
interface UserRank {
  userImg: Img;
  userName: string;
  count: number;
}

interface SimpleNovel {
  novelId: string;
  novelImg: string;
  novelTitle: string;
  novelAuthor: string;
  novelGenre: string;
  novelIsEnd: boolean;
}

export interface SimpleNovelWithoutId {
  novelImg: string;
  novelTitle: string;
  novelAuthor: string;
  novelGenre: string;
  novelIsEnd: boolean;
}

export interface HomeData {
  talkList: {
    talkId: string;
    userName: string;
    userImg: Img;
    createDate: string;
    likeNO: number;
    commentNO: number;
    talkTitle: string;
    talkImg: string;
    novelTitle: string;
  }[];

  talkUserRank: {
    talk?: UserRank[];
    comment?: UserRank[];
    likeReceived?: UserRank[];
  };

  recommendList: {
    recommend: {
      recommendId: string;
      userName: string;
      userImg: Img;
      createDate: string;
      likeNO: number;
      recommendTitle: string;
    };
    novel: SimpleNovelWithoutId;
  }[];

  recommendUserRank: {
    recommend?: UserRank[];
    likeReceived?: UserRank[];
  };

  novelListUserRank: {
    list?: UserRank[];
    likeReceived?: UserRank[];
  };

  popularNovelsInNovelTime: SimpleNovel[];

  weeklyNovelsFromPlatforms: {
    kakape?: SimpleNovel[];
    series?: SimpleNovel[];
    ridi?: SimpleNovel[];
    joara?: SimpleNovel[];
  };
}

export type UserNovelLists =
  | {
      listId: string;
      listTitle: string;
      userName: string;
      userImg: Img;
      novel: SimpleNovel[];
    }[]
  | undefined;

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

interface ListUserCreated {
  listId: string;
  listTitle: string;
  novel: SimpleNovel[];
}
interface ListUserLikes {
  listId: string;
  listTitle: string;
  userName: string;
  userImg: { src: string; position: string };
  novel: SimpleNovel[];
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
  novel: SimpleNovel[];
  userName?: string;
  userImg?: { src: string; position: string };
}
export interface ContentOfUserHome {
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
export interface ContentOfUserWriting {
  writingsUserCreated?: TalkOrRecommend[];
  commentsUserCreated?: CommentUserCreated[];
  writingsUserLikes?: TalkOrRecommend[];
  isNextOrder: boolean;
}
export interface ContentForUserPageMyWriting {
  writingsUserCreated?: TalkOrRecommendUserCreated[];
  commentsUserCreated?: CommentUserCreated[];
  isNextOrder: boolean;
}
export interface ContentForUserPageOthersWriting {
  writingsUserLikes: TalkUserLikes[] | RecommendUserLikes[];
  isNextOrder: boolean;
}

export interface ParamsOfUserWriting {
  userName: string;
  contentType: "T" | "R" | "C";
  order: number;
}
export interface ContentOfUserNovelList {
  novelList: NovelListSetForMyOrOthersList;
  isNextOrder: boolean;
}
export type AllTitlesAndOtherInfo = NovelListsSimpleInfos[];

export interface ParamsOfAllNovelListTitles {
  userName: string;
  isMyList: string;
}

export interface ParamsOfUserNovelList {
  accessToken?: string;
  userName: string;
  listId: string;
  order: number;
}
export interface ContentOfLike {
  contentType: "writing" | "novelList";
  contentId: string;
  isOthersListOfLoginUser: boolean;
}
export interface IsLike {
  isLike: boolean;
}
