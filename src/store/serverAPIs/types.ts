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

export type TalkInList = {
  talkId: string;
  userName: string;
  userImg: Img;
  createDate: string;
  likeNO: number;
  commentNO: number;
  talkTitle: string;
  talkDesc?: string; // used in search with writingDesc
  talkImg: string;
  novelTitle: string;
};

export type TalkList = TalkInList[];

export type RecommendInList = {
  recommend: {
    recommendId: string;
    userName: string;
    userImg: Img;
    createDate: string;
    likeNO: number;
    recommendTitle: string;
    recommendDesc?: string; // used in search with writingDesc
  };
  novel: SimpleNovelWithoutId;
};

export type RecommendList = RecommendInList[];

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
  searchType: "writingTitle" | "writingDesc" | "userName" | "novelTitle";
  isSearchWord: boolean;
  searchWord: string; // note. it can't be empty string
  sortBy: "newDate" | "oldDate" | "manyComments" | "fewComments" | "manyLikes" | "fewLikes";
  pageNo: number;
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

export type ParamToEditWriting = {
  writingId: string;
  writingTitle: string;
  writingDesc: string;
  writingImg?: string;
  writingType: "T" | "R";
  novelId: string;
};
export type ParamToDeleteWriting = {
  writingId: string;
  writingType: "T" | "R";
  novelId: string;
};

export type ParamForNewRootComment = {
  talkId: string;
  novelId: string;
  novelTitle: string;
  commentContent: string;
};

export type ParamForNewReComment = {
  talkId: string;
  novelId: string;
  novelTitle: string;
  commentContent: string;
  parentCommentId: string;
};

export type ParamToEditComment = {
  commentId: string;
  commentContent: string;
};

export type ParamToDeleteComment = {
  novelId: string;
  commentId: string;
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

export type NovelOrWritingList =
  | {
      novels?: NovelDetail[];
      talks?: TalkList;
      recommends?: RecommendList;
      lastPageNo: number;
    }
  | undefined;

export type ParamToSearchForAll = {
  searchCategory: "novel" | "T" | "R";
  searchType:
    | "novelTitle"
    | "novelDesc"
    | "novelAuthor"
    | "sample" // for novels with no search word
    | "writingTitle"
    | "writingDesc"
    | "userName";
  isSearchWord: boolean; // for writings with no search word
  searchWord: string; // note. it can't be empty string
  pageNo: number;
};

export type NovelIdAndTitle = { novelId: string; novelTitle: string };
export interface NovelInDetailPage {
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
}
export type Novel = {
  novelId: string;
  novelImg: string;
  novelTitle: string;
  novelAuthor: string;
  novelAge: string;
  novelGenre: string;
};

export type WritingWithoutGenre = {
  writingId: string;
  userId: string;
  userName: string;
  userImg: {
    src: string;
    position: string;
  };
  createDate: string;
  writingTitle: string;
  writingImg: string;
  writingDesc: string;
  novelId: string;
  likeNO: number;
  commentNO?: number;
  talkOrRecommend: "T" | "R";
};
export type NovelInDetail = {
  novel: NovelInDetailPage;
  novelsPublishedByTheAuthor: Novel[];
};

export type WritingOfNovel = {
  writings: WritingWithoutGenre[];
  hasNext: boolean;
  writingNoWithAllType: number;
};

export type ParamForWritingsOfNovel = {
  novelId: string;
  writingType: "T" | "R";
  pageNo: number;
};

export type NovelDetail = {
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

export type ReComment = {
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

type Recommend = {
  recommendId: string;
  userName: string;
  userImg: Img;
  createDate: string;
  likeNO: number;
  isLike: boolean;
  recommendTitle: string;
  recommendDesc: string;
  recommendImg: string;
};

export type RecommendDetail = {
  recommend: Recommend;
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
  kakape?: NovelDetail[];
  series?: NovelDetail[];
  ridi?: NovelDetail[];
  joara?: NovelDetail[];
};
type NovelPlatform = "kakape" | "series" | "ridi" | "joara";

export type ParamToGetWeeklyNovels = {
  platform: NovelPlatform;
  limitedNo: number;
};
export type ParamForListsPeopleLike = {
  limitedNo: number;
  isWithListSummaryCard: string;
};

export type UserNovelLists =
  | {
      listId: string;
      listTitle: string;
      userName: string;
      userImg: Img;
      novel: SimpleNovel[];
    }[]
  | undefined;

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
interface NovelListsSimpleInfos {
  listId: string;
  listTitle: string;
  userName?: string;
  userImg?: {
    src: string;
    position: string;
  };
}
export interface NovelListDetailed {
  listId: string;
  listTitle: string;
  isLike: boolean;
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
    listsUserCreated: ListSummaryUserCreated[];
    listsUserLikes: ListSummaryUserLiked[];
  };
}
export interface ContentOfUserWriting {
  writingsUserCreated?: TalkOrRecommend[];
  commentsUserCreated?: CommentUserCreated[];
  writingsUserLikes?: TalkOrRecommend[];
  isNextOrder: boolean;
}

export interface ParamsOfUserWriting {
  userName: string;
  contentType: "T" | "R" | "C";
  order: number;
  isCreated: boolean; // isCreated or isLiked
}

export interface ParamsOfUserNovelListAll {
  userName: string;
  isCreated: boolean;
}
export interface ListSummary {
  listId: string;
  listTitle: string;
  novelNo: number;
  likeNo: number;
  novelImgs: string[];
  userName?: string; // only for other's list
  userImg?: { src: string; position: string }; // only for other's list
}
export interface ListSummaryUserCreated {
  listId: string;
  listTitle: string;
  novelNo: number;
  likeNo: number;
  novelImgs: string[];
}
export interface ListSummaryUserLiked {
  listId: string;
  listTitle: string;
  novelNo: number;
  likeNo: number;
  novelImgs: string[];
  userName: string;
  userImg: { src: string; position: string };
}

export interface ContentOfListDetailed {
  novelList: NovelListDetailed;
  isNextOrder: boolean;
}
export type AllTitlesAndOtherInfo = NovelListsSimpleInfos[];

export interface ParamsOfAllNovelListTitles {
  userName: string;
  isCreated: string;
}

export interface ParamsOfListDetailed {
  accessToken: string;
  userName: string;
  listId: string;
  order: number;
  isCreated: boolean;
}

export interface ListWithOrWithoutTheNovel {
  novelListId: string;
  novelListTitle: string;
  isContaining: boolean;
}

export interface ListId {
  listId: string;
}
export interface ParamToCreateList {
  listTitle: string;
  userName: string;
}
export interface ParamToGetMyList {
  novelId: string;
  userName: string;
}
export interface ParamToChangeListTitle {
  listId: string;
  listTitle: string;
  userName: string;
}

export interface ParamToDeleteList {
  listId: string;
  userName: string;
}
export interface ParamToAddOrRemoveNovel {
  novelId: string;
  listIDsToAddNovel: string[];
  listIDsToRemoveNovel: string[];
  userName: string;
}
export interface ParamToRemoveNovelFromList {
  listId: string;
  novelIDs: string[];
  userName: string;
}
export interface ParamToToggleLike {
  contentType: "writing" | "novelList";
  contentId: string;
  forWriting?: {
    writingType: "T" | "R";
    novelId: string;
  };
  isTheListCanceledInLoginUserPage?: boolean;
  userName?: string;
  loginUserName?: string;
}
export interface IsLike {
  isLike: boolean; // for both writing and novelList
  likeNo?: number; // only for writing content
}

export interface ChatRoom {
  roomId: string;
  partnerUserName: string;
  partnerUserImg: {
    src: string;
    position: string;
  };
  latestMessageContent: string;
  latestMessageDateTime: string;
  latestMessageDate: string;
  latestMessageTime: string;
  unreadMessageNo: number;
}

export type PartnerUser = {
  userName: string;
  userImg: Img;
};
export interface Message {
  messageId: string;
  roomId: string;
  content: string;
  createDateTime: string;
  // ㄴit is saved as "latestMessageDateTime" of "rooms" in chatSlice
  // ㄴfor sorting rooms in room list page after new message comes
  createDate: string;
  createTime: string;
  isReadByReceiver: boolean;
  senderUserName: string;
  senderUserImg: {
    src: string;
    position: string;
  };
}

export type MessagesWithPartner = {
  partnerUser: PartnerUser;
  messages: Message[];
};
