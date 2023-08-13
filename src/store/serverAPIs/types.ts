export interface Img {
  src: string;
  position: string;
}
interface UserRank {
  userImg: Img;
  userName: string;
  count: number;
}

export interface SimpleNovel {
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

export type TalkList = {
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

export type RecommendList = {
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

export type WritingList =
  | { talks?: TalkList; recommends?: RecommendList; lastPageNo: number }
  | undefined;

export type NovelGenre =
  | "all"
  | "패러디"
  | "로판"
  | "로맨스"
  | "현판"
  | "판타지"
  | "무협"
  | "라이트노벨"
  | "BL"
  | "미스터리"
  | "extra";

export type ParamForGettingWritings = {
  writingType: "T" | "R";
  novelGenre: NovelGenre;
  searchType: "writingTitle" | "writingDesc" | "userName" | "novelTitle" | "no";
  searchWord: string; // note. it can't be empty string
  sortBy: "newDate" | "oldDate" | "manyComments" | "fewComments" | "manyLikes" | "fewLikes";
  pageNo: number;
};

export type ParamForGettingWriting = {
  writingType: "T" | "R";
  writingId: string;
};

export type ParamForRootComments = {
  talkId: string;
  commentSortType: "new" | "old";
  commentPageNo: number;
};

export type ParamForReComments = {
  rootCommentId: string;
  commentSortType: "new" | "old";
};

export type ParamForNewWriting = {
  novelId: string;
  writingType: "T" | "R";
  writingTitle: string;
  writingDesc: string;
  writingImg?: string;
};

export type ParamForNewRootComment = {
  talkId: string;
  novelTitle: string;
  commentContent: string;
};

export type ParamForNewReComment = {
  talkId: string;
  novelTitle: string;
  commentContent: string;
  parentCommentId: string;
};

export type ParamToEditComment = {
  commentId: string;
  commentContent: string;
  isReComment: boolean;
};

export type ParamToDeleteComment = {
  commentId: string;
  isReComment: boolean;
};

export type ParamToSearchForNovels = {
  searchType: "novelTitle" | "novelDesc" | "novelAuthor" | "sample";
  searchWord: string; // note. it can't be empty string
  pageNo: number;
};
export type NovelDetailList =
  | {
      novels: NovelDetail[];
      lastPageNo: number;
    }
  | undefined;

export type NovelIdAndTitle = { novelId: string; novelTitle: string };

type NovelDetail = {
  novelId: string;
  novelImg: string;
  novelTitle: string;
  novelAuthor: string;
  novelGenre: string;
  novelDesc: string;
};

type TalkInDetailPage = {
  talkId: string;
  userName: string;
  userImg: {
    src: string;
    position: string;
  };
  createDate: string;
  likeNO: number;
  commentNO: number;
  isLike: boolean;
  talkTitle: string;
  talkDesc: string;
  talkImg: string;
};

export type Comment = {
  commentId: string;
  userName: string;
  userImg: {
    src: string;
    position: string;
  };
  commentContent: string;
  createDate: string;
  reCommentNo: number;
  // only root comments have this property
  // it is necessary to divide between root comment and reComment
  isDeleted: 0 | 1;
  isEdited: 0 | 1;
};

type ReComment = {
  commentId: string;
  userName: string;
  userImg: {
    src: string;
    position: string;
  };
  commentContent: string;
  createDate: string;
  parentCommentId: string;
  parentCommentUserName: string;
  isDeleted: 0 | 1;
  isEdited: 0 | 1;
};

export type CommentList = { commentList: Comment[]; hasNext: boolean };

export type ReCommentList = ReComment[];

export type TalkDetail = {
  talk: TalkInDetailPage;
  novel: NovelDetail;
};

export interface HomeData {
  talkList: TalkList;

  talkUserRank: {
    talk?: UserRank[];
    comment?: UserRank[];
    likeReceived?: UserRank[];
  };

  recommendList: RecommendList;

  recommendUserRank: {
    recommend?: UserRank[];
    likeReceived?: UserRank[];
  };

  novelListUserRank: {
    novelList?: UserRank[];
    likeReceived?: UserRank[];
  };

  popularNovelsInNovelTime: SimpleNovel[];
}

export type WeeklyNovelsFromPlatform = {
  kakape?: SimpleNovel[];
  series?: SimpleNovel[];
  ridi?: SimpleNovel[];
  joara?: SimpleNovel[];
};

export type NovelPlatformInUrl = "kakape" | "series" | "ridi" | "joara";

export type UserNovelLists =
  | {
      listId: string;
      listTitle: string;
      userName: string;
      userImg: Img;
      novel: SimpleNovel[];
    }[]
  | undefined;

export type NovelListByCategory =
  | {
      novelId: string;
      novelImg: string;
      novelTitle: string;
      novelAuthor: string;
      novelGenre: string;
      novelDesc: string;
    }[]
  | undefined;

export type ParamForNovelListByCategory = {
  category: string;
  platform?: string;
  novelId?: string;
};

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
  isOthersListOfLoginUser?: boolean;
}
export interface IsLike {
  isLike: boolean; // for both writing and novelList
  likeNo?: number; // only for writing content
}
