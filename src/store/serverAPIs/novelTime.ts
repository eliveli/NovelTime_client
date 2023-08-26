// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import {
  UserAndToken,
  OauthData,
  ChangedUserInfo,
  UserInfo,
  ContentOfUserHome,
  ParamsOfUserWriting,
  ContentOfUserWriting,
  ContentOfUserNovelList,
  ParamsOfUserNovelList,
  ContentOfLike,
  IsLike,
  AllTitlesAndOtherInfo,
  ParamsOfAllNovelListTitles,
  HomeData,
  UserNovelLists,
  WeeklyNovelsFromPlatform,
  NovelPlatformInUrl,
  NovelListByCategory,
  ParamForNovelListByCategory,
  WritingList,
  ParamForGettingWritings,
  TalkDetail,
  ParamForRootComments,
  CommentList,
  ParamForReComments,
  ReCommentList,
  ParamForNewRootComment,
  ParamForNewReComment,
  ParamToEditComment,
  ParamToDeleteComment,
  NovelDetailList,
  ParamToSearchForNovels,
  NovelIdAndTitle,
  ParamForNewWriting,
  ParamToEditWriting,
  ParamToDeleteWriting,
  RecommendDetail,
  NovelInDetail,
  WritingOfNovel,
  ParamForWritingsOfNovel,
  NovelOrWritingList,
  ParamToSearchForAll,
  ParamsOfUserNovelListAll,
  ListSummary,
  ListWithOrWithoutTheNovel,
  ParamToAddNovel,
} from "./types";
import type { RootState } from "../index";

interface FetchArgs extends RequestInit {
  url: string;
  params?: Record<string, any>;
  body?: any;
  responseHandler?: "json" | "text" | ((response: Response) => Promise<any>);
  validateStatus?: (response: Response, body: any) => boolean;
}
interface CustomError {
  data: {
    message: string;
  };
  status: number;
}

// Define a service using a base URL and expected endpoints
export const novelTimeApi = createApi({
  reducerPath: "novelTimeApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.REACT_APP_ENV === "production"
        ? "http://www.noveltime.shop/api"
        : "http://domainfordev.com/api", // 개발 환경에서도 도커 필요
    credentials: "include",
    prepareHeaders: (headers, { getState, endpoint }) => {
      const { accessToken } = (getState() as RootState).user;

      // headers.set('Access-Control-Allow-Origin', '*');

      // if (accessToken && endpoint.includes("")) {
      if (accessToken) {
        // every time send token to authenticate user
        headers.set("authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  tagTypes: [
    "ContentUpdatedInHome",
    "ListTitlesUpdatedInListDetailed",
    "ContentUpdatedInNovelList",
    "commentsUpdated",
    "talkListUpdated",
    "recommendListUpdated",
    "writingUpdated",
    "writingsOfNovelUpdated",
    "NovelsInListUpdated",
  ],
  endpoints: (builder) => ({
    // at home page
    getHomeData: builder.query<HomeData, undefined>({
      query: () => `/home`,
    }),
    getUserNovelListAtRandom: builder.query<UserNovelLists, undefined>({
      query: () => `/home/userNovelList`,
    }),
    getWeeklyNovelsFromPlatform: builder.query<WeeklyNovelsFromPlatform, NovelPlatformInUrl>({
      query: (novelPlatformInUrl) => `/home/weeklyNovels/${novelPlatformInUrl}`,
    }),

    // at novel list page for each category
    getNovelListByCategory: builder.query<NovelListByCategory, ParamForNovelListByCategory>({
      query: (params) =>
        `/novels/${params.category}/${String(params.platform)}/${String(params.novelId)}`,
      // ㄴif platform or novelId is undefined then it will be changed to "undefined" as string type
      // ㄴempty string "" can't be used in url that can cause 404 error
    }),

    // search for novels
    searchForNovel: builder.query<NovelDetailList, ParamToSearchForNovels>({
      query: (params) => `/novels/${params.searchType}/${params.searchWord}/${params.pageNo}`,
    }),

    // add a novel into db and get the novel id and novel title when user gives the novel url
    addNovelWithURL: builder.mutation<NovelIdAndTitle, string>({
      query: (novelURL) => ({
        url: "/novels/addNovelWithURL",
        method: "POST",
        body: { novelURL },
      }),
    }),

    getNovelInDetail: builder.query<NovelInDetail, string>({
      query: (novelId) => `/novels/detail/${novelId}`,
    }),
    getWritingsOfNovel: builder.query<WritingOfNovel, ParamForWritingsOfNovel>({
      query: ({ novelId, writingType, pageNo }) =>
        `/novels/detail/${novelId}/${writingType}/${pageNo}`,
      providesTags: (result, error, arg) => [
        { type: "writingsOfNovelUpdated", id: arg.novelId + arg.writingType },
      ],
    }),

    // use two apis depending on the search category
    searchForAll: builder.query<NovelOrWritingList, ParamToSearchForAll>({
      query: ({ searchCategory, searchType, searchWord, pageNo }) => {
        if (
          searchCategory === "novel" &&
          ["novelTitle", "novelDesc", "novelAuthor", "sample"].includes(searchType)
        ) {
          return `/novels/${searchType}/${searchWord}/${pageNo}`;
        }

        if (["writingTitle", "writingDesc", "userName", "no"].includes(searchType)) {
          return `/writing/${searchCategory}/all/${searchType}/${searchWord}/newDate/${pageNo}`;
        }
        return "";
      },
    }),

    // get writing list with search filter
    getWritingsFiltered: builder.query<WritingList, ParamForGettingWritings>({
      query: (params) =>
        `/writing/${params.writingType}/${params.novelGenre}/${params.searchType}/${params.searchWord}/${params.sortBy}/${params.pageNo}`,
      providesTags: (result, error, arg) =>
        arg.writingType === "T" ? ["talkListUpdated"] : ["recommendListUpdated"],
      // list is updated and user goes here automatically when adding or deleting a post
      // in other cases, it doesn't (such as the change of comment or like in a writing post, a post edited)
      //   to maintain the scroll position and the accumulated list with infinite-scroll
      //     when back to the list page.
      //   then some previous data might maintain,
      //     but I couldn't find a better way to treat the case above
      //     (also I checked that some popular website had the same problem)
    }),

    getTalkDetail: builder.query<TalkDetail, string>({
      query: (writingId) => `/writing/T/${writingId}`,
      providesTags: (result, error, arg) => [{ type: "writingUpdated", id: arg }],
    }),
    getRecommendDetail: builder.query<RecommendDetail, string>({
      query: (writingId) => `/writing/R/${writingId}`,
      providesTags: (result, error, arg) => [{ type: "writingUpdated", id: arg }],
    }),
    addWriting: builder.mutation<string, ParamForNewWriting>({
      query: ({ novelId, writingType, writingTitle, writingDesc, writingImg }) => ({
        url: "/writing",
        method: "POST",
        body: {
          novelId,
          writingType,
          writingTitle,
          writingDesc,
          writingImg,
        },
      }),
      invalidatesTags: (result, error, arg) => {
        const mainList = arg.writingType === "T" ? "talkListUpdated" : "recommendListUpdated";

        return [mainList, { type: "writingsOfNovelUpdated", id: arg.novelId + arg.writingType }];
      },
    }),
    editWriting: builder.mutation<string, ParamToEditWriting>({
      query: ({ writingId, writingTitle, writingDesc, writingImg }) => ({
        url: "/writing",
        method: "PUT",
        body: {
          writingId,
          writingTitle,
          writingDesc,
          writingImg,
        },
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "writingUpdated", id: arg.writingId },
        { type: "writingsOfNovelUpdated", id: arg.novelId + arg.writingType },
      ],
    }),
    deleteWriting: builder.mutation<string, ParamToDeleteWriting>({
      query: ({ writingId }) => ({
        url: "/writing",
        method: "DELETE",
        body: {
          writingId,
        },
      }),

      invalidatesTags: (result, error, arg) => {
        const mainList = arg.writingType === "T" ? "talkListUpdated" : "recommendListUpdated";

        return [
          mainList,
          { type: "writingUpdated", id: arg.writingId },
          { type: "writingsOfNovelUpdated", id: arg.novelId + arg.writingType },
        ];
      },
    }),

    getRootComments: builder.query<CommentList, ParamForRootComments>({
      query: (params) =>
        `/comment/${params.talkId}/${params.commentSortType}/${params.commentPageNo}`,
      providesTags: ["commentsUpdated"],
    }),
    getReComments: builder.query<ReCommentList, ParamForReComments>({
      query: (params) => `/comment/${params.rootCommentId}/${params.commentSortType}`,
      providesTags: ["commentsUpdated"],
    }),

    addRootComment: builder.mutation<string, ParamForNewRootComment>({
      query: ({ talkId, novelTitle, commentContent }) => ({
        url: "/comment/rootComment",
        method: "POST",
        body: { talkId, novelTitle, commentContent },
      }),
      invalidatesTags: (result, error, arg) => [
        "commentsUpdated",
        { type: "writingsOfNovelUpdated", id: `${arg.novelId}T` },
      ],
    }),
    addReComment: builder.mutation<string, ParamForNewReComment>({
      query: ({ talkId, novelTitle, commentContent, parentCommentId }) => ({
        url: "/comment/reComment",
        method: "POST",
        body: {
          talkId,
          novelTitle,
          commentContent,
          parentCommentId,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        "commentsUpdated",
        { type: "writingsOfNovelUpdated", id: `${arg.novelId}T` },
      ],
    }),
    editComment: builder.mutation<string, ParamToEditComment>({
      query: ({ commentId, commentContent }) => ({
        url: "/comment/comment",
        method: "PUT",
        body: {
          commentId,
          commentContent,
        },
      }),
      invalidatesTags: ["commentsUpdated"],
    }),
    deleteComment: builder.mutation<string, ParamToDeleteComment>({
      query: ({ commentId }) => ({
        url: "/comment/comment",
        method: "DELETE",
        body: {
          commentId,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        "commentsUpdated",
        { type: "writingsOfNovelUpdated", id: `${arg.novelId}T` },
      ],
    }),

    getLoginOauthServer: builder.query<UserAndToken, OauthData>({
      query: (oauthData) => `/user/login/${oauthData.oauthServer}?data=${oauthData.oauthInfo}`,
    }),
    getAccessToken: builder.query<UserAndToken, undefined>({
      query: () => `/user/refreshToken`,
    }),
    getLogout: builder.query<undefined, undefined>({
      query: () => `/user/logout`,
    }),
    getUserInfoByUserName: builder.query<UserInfo, string>({
      query: (userName) => `/user/userInfo/${userName}`,
    }),

    getContentOfUserHome: builder.query<ContentOfUserHome, string>({
      query: (userName) => `/userContent/home/${userName}`,
      // refetch data //
      // don't use cached data where part of them is not the same with them in other's list page
      //   when login user navigates automatically to his/her user's home
      //   from other's list in his/her user page
      //   for the reason that other's list doesn't exist anymore
      providesTags: ["ContentUpdatedInHome"],
    }),
    getWritingUserCreated: builder.query<ContentOfUserWriting, ParamsOfUserWriting>({
      query: (params) =>
        `/userContent/myWriting/${params.userName}/${params.contentType}/${params.order}`,
    }),
    getWritingUserLiked: builder.query<ContentOfUserWriting, ParamsOfUserWriting>({
      query: (params) =>
        `/userContent/othersWriting/${params.userName}/${params.contentType}/${params.order}`,
    }),

    getListSummary: builder.query<ListSummary[], ParamsOfUserNovelListAll>({
      query: ({ userName, isMyList }) => {
        if (isMyList) return `/userContent/listSummary/created/${userName}`;
        return `/userContent/listSummary/liked/${userName}`;
      },
    }),

    getListDetailedUserCreated: builder.query<ContentOfUserNovelList, ParamsOfUserNovelList>({
      query: (params) =>
        `/userContent/listDetailed/created/${params.userName}/${params.listId}/${params.order}`,
      keepUnusedDataFor: 120,
      providesTags: (result, error, arg) => [
        { type: "ContentUpdatedInNovelList", id: arg.listId },
        { type: "NovelsInListUpdated", id: arg.listId },
      ],
    }),
    getListDetailedUserLiked: builder.query<ContentOfUserNovelList, ParamsOfUserNovelList>({
      query: (params) =>
        `/userContent/listDetailed/liked/${params.userName}/${params.listId}/${params.order}`,
      keepUnusedDataFor: 120,
      providesTags: (result, error, arg) => [
        { type: "ContentUpdatedInNovelList", id: arg.listId },
        { type: "NovelsInListUpdated", id: arg.listId },
      ],
    }),
    getListTitlesAndOtherInListDetailed: builder.query<
      AllTitlesAndOtherInfo,
      ParamsOfAllNovelListTitles
    >({
      query: (params) =>
        `/userContent/listDetailed/listTitles/${params.userName}/${params.isMyList}`,
      keepUnusedDataFor: 120,
      providesTags: ["ListTitlesUpdatedInListDetailed"],
    }),

    getMyNovelList: builder.query<ListWithOrWithoutTheNovel[], string>({
      query: (novelId) => `/userContent/myNovelList/${novelId}`,
      providesTags: (result, error, arg) =>
        !result
          ? []
          : result.map((list) => ({ type: "NovelsInListUpdated", id: list.novelListId })),
    }),
    createMyNovelList: builder.mutation<{ listId: string }, string>({
      query: (listTitle) => ({
        url: `/userContent/myNovelList`,
        method: "POST",
        body: { listTitle },
      }),

      invalidatesTags: (result, error, arg) => [
        { type: "NovelsInListUpdated", id: result?.listId },
      ],
    }),
    addNovelToList: builder.mutation<string, ParamToAddNovel>({
      query: ({ novelId, listIDs }) => ({
        url: `/userContent/myNovelList/novel`,
        method: "POST",
        body: { novelId, listIDs },
      }),
      invalidatesTags: (result, error, arg) =>
        arg.listIDs.map((listId) => ({ type: "NovelsInListUpdated", id: listId })),
    }),

    toggleLike: builder.mutation<IsLike, ContentOfLike>({
      query: (contentForLike) => {
        const routeName = contentForLike.contentType === "writing" ? "writing" : "userContent";

        return {
          url: `${routeName}/toggleLike/${contentForLike.contentType}/${contentForLike.contentId}`,

          method: "PUT",
        };
      },
      invalidatesTags: (result, error, arg) => {
        if (arg.contentType === "writing" && arg.forWriting) {
          return [
            { type: "writingUpdated", id: arg.contentId },
            {
              type: "writingsOfNovelUpdated",
              id: arg.forWriting.novelId + arg.forWriting.writingType,
            },
          ];
        }

        if (arg.isOthersListOfLoginUser) {
          // do not invalidate tag of "contentUpdatedInNovelList" not to refetch current list
          // next list will be fetched
          //
          // tag of "contentUpdatedInHome" is necessary when navigating to an user's home page
          // to get updated content after toggling LIKE
          //
          // tag of "ListTitlesUpdatedInListDetailed" is necessary to get all list titles of user updated
          // list title where user canceled LIKE won't be in data of new titles
          return ["ContentUpdatedInHome", "ListTitlesUpdatedInListDetailed"];
        }
        return ["ContentUpdatedInHome", { type: "ContentUpdatedInNovelList", id: arg.contentId }];
      },
    }),

    checkForUserName: builder.mutation<string, string>({
      query: (newUserName) => ({
        url: "/user/checkUserName",
        method: "POST",
        body: { newUserName },
      }),
      // can't use transformResponse.
      // when I did that the response data became undefined
      // I guess that the reason is it was primitive type
    }),
    saveUserInfo: builder.mutation<UserAndToken, ChangedUserInfo>({
      query: (changedUserInfo) => ({
        url: "/user/saveChangedInfo",
        method: "POST",
        body: { changedUserInfo },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetHomeDataQuery,
  useGetUserNovelListAtRandomQuery,
  useLazyGetUserNovelListAtRandomQuery,
  useGetWeeklyNovelsFromPlatformQuery,
  useGetNovelListByCategoryQuery,
  useSearchForNovelQuery,
  useAddNovelWithURLMutation,
  useGetNovelInDetailQuery,
  useSearchForAllQuery,
  useGetWritingsOfNovelQuery,
  useGetWritingsFilteredQuery,
  useGetTalkDetailQuery,
  useGetRecommendDetailQuery,
  useAddWritingMutation,
  useEditWritingMutation,
  useDeleteWritingMutation,
  useGetRootCommentsQuery,
  useGetReCommentsQuery,
  useAddRootCommentMutation,
  useAddReCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
  useGetLoginOauthServerQuery,
  useGetLogoutQuery,
  useGetAccessTokenQuery,
  useGetUserInfoByUserNameQuery,
  useCheckForUserNameMutation,
  useSaveUserInfoMutation,
  useGetContentOfUserHomeQuery,
  useGetListDetailedUserCreatedQuery,
  useGetListDetailedUserLikedQuery,
  useGetListSummaryQuery,
  useGetListTitlesAndOtherInListDetailedQuery,
  useGetWritingUserCreatedQuery,
  useGetWritingUserLikedQuery,
  useToggleLikeMutation,
  useGetMyNovelListQuery,
  useCreateMyNovelListMutation,
  useAddNovelToListMutation,
} = novelTimeApi;
