// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import {
  NovelInfo,
  UserAndToken,
  OauthData,
  ChangedUserInfo,
  UserInfo,
  ContentOfUserHome,
  ParamsOfUserWriting,
  ContentForUserPageMyWriting,
  ContentForUserPageOthersWriting,
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
  ParamForGettingWriting,
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
    "ListTitlesUpdated",
    "ContentUpdatedInNovelList",
    "reCommentsUpdated",
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

    getNovelById: builder.query<NovelInfo, string>({
      query: (novelId) => `/novels/detail/${novelId}`,
    }),

    // search for novels
    searchForNovel: builder.query<NovelDetailList, ParamToSearchForNovels>({
      query: (params) => `/novels/${params.searchType}/${params.searchWord}/${params.pageNo}`,
    }),

    // get writing list with search filter
    getWritingsFiltered: builder.query<WritingList, ParamForGettingWritings>({
      query: (params) =>
        `/writing/${params.writingType}/${params.novelGenre}/${params.searchType}/${params.searchWord}/${params.sortBy}/${params.pageNo}`,
    }),

    // in talk-detail page
    getTalkDetail: builder.query<TalkDetail, ParamForGettingWriting>({
      query: (params) => `/writing/${params.writingType}/${params.writingId}`,
    }),
    getRootComments: builder.query<CommentList, ParamForRootComments>({
      query: (params) =>
        `/comment/${params.talkId}/${params.commentSortType}/${params.commentPageNo}`,
    }),
    getReComments: builder.query<ReCommentList, ParamForReComments>({
      query: (params) => `/comment/${params.rootCommentId}/${params.commentSortType}`,
      providesTags: ["reCommentsUpdated"],
    }),

    addRootComment: builder.mutation<string, ParamForNewRootComment>({
      query: ({ talkId, novelTitle, commentContent }) => ({
        url: "/comment/rootComment",
        method: "POST",
        body: { talkId, novelTitle, commentContent },
      }),
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
      invalidatesTags: ["reCommentsUpdated"],
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
      invalidatesTags: (result, error, arg) => (arg.isReComment ? ["reCommentsUpdated"] : []),
    }),
    deleteComment: builder.mutation<string, ParamToDeleteComment>({
      query: ({ commentId }) => ({
        url: "/comment/comment",
        method: "DELETE",
        body: {
          commentId,
        },
      }),
      invalidatesTags: (result, error, arg) => (arg.isReComment ? ["reCommentsUpdated"] : []),
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
      query: (userName) => `/userContent/${userName}`,
      // refetch data //
      // don't use cached data where part of them is not the same with them in other's list page
      //   when login user navigates automatically to his/her user's home
      //   from other's list in his/her user page
      //   for the reason that other's list doesn't exist anymore
      providesTags: ["ContentUpdatedInHome"],
    }),
    getContentOfUserMyWriting: builder.query<ContentOfUserWriting, ParamsOfUserWriting>({
      query: (params) =>
        `/userContent/myWriting/${params.userName}/${params.contentType}/${params.order}`,
    }),
    getContentOfUserOthersWriting: builder.query<ContentOfUserWriting, ParamsOfUserWriting>({
      query: (params) =>
        `/userContent/othersWriting/${params.userName}/${params.contentType}/${params.order}`,
    }),
    getContentOfUserMyList: builder.query<ContentOfUserNovelList, ParamsOfUserNovelList>({
      query: (params) => `/userContent/myList/${params.userName}/${params.listId}/${params.order}`,
      keepUnusedDataFor: 120,
      providesTags: (result, error, arg) => [{ type: "ContentUpdatedInNovelList", id: arg.listId }],
    }),
    getContentOfUserOthersList: builder.query<ContentOfUserNovelList, ParamsOfUserNovelList>({
      query: (params) =>
        `/userContent/othersList/${params.userName}/${params.listId}/${params.order}`,
      keepUnusedDataFor: 120,
      providesTags: (result, error, arg) => [{ type: "ContentUpdatedInNovelList", id: arg.listId }],
    }),
    getAllNovelListTitles: builder.query<AllTitlesAndOtherInfo, ParamsOfAllNovelListTitles>({
      query: (params) => `/userContent/novelListTitles/${params.userName}/${params.isMyList}`,
      keepUnusedDataFor: 120,
      providesTags: ["ListTitlesUpdated"],
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
        if (arg.isOthersListOfLoginUser) {
          // do not invalidate tag of "contentUpdatedInNovelList" not to refetch current list
          // next list will be fetched
          //
          // tag of "contentUpdatedInHome" is necessary when navigating to an user's home page
          // to get updated content after toggling LIKE
          //
          // tag of "ListTitlesUpdated" is necessary to get all list titles of user updated
          // list title where user canceled LIKE won't be in data of new titles
          return ["ContentUpdatedInHome", "ListTitlesUpdated"];
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
  useGetNovelByIdQuery,
  useSearchForNovelQuery,
  useGetWritingsFilteredQuery,
  useGetTalkDetailQuery,
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
  useGetContentOfUserMyWritingQuery,
  useGetContentOfUserOthersWritingQuery,
  useGetContentOfUserMyListQuery,
  useGetContentOfUserOthersListQuery,
  useToggleLikeMutation,
  useGetAllNovelListTitlesQuery,
} = novelTimeApi;
