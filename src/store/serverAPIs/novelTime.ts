// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import {
  NovelInfo,
  UserAndToken,
  OauthData,
  ChangedUserInfo,
  UserInfo,
  ContentForUserPageHome,
  ParamsForUserPageWriting,
  ContentForUserPageMyWriting,
  ContentForUserPageOthersWriting,
  ContentForUserPageWriting,
  ContentForUserPageNovelList,
  ParamsForUserPageNovelList,
  ContentForLike,
  IsLike,
  AllTitlesAndOtherInfo,
  ParamsForAllNovelListTitles,
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
        : "http://domainfordev.com/api",
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
  tagTypes: ["ContentUpdatedInHome", "ListTitlesUpdated", "ContentUpdatedInNovelList"],
  endpoints: (builder) => ({
    getNovelById: builder.query<NovelInfo, string>({
      query: (novelId) => `/novels/detail/${novelId}`,
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
    getContentForUserPageHomeByUserName: builder.query<ContentForUserPageHome, string>({
      query: (userName) => `/userContent/${userName}`,
      // refetch data //
      // don't use cached data where part of them is not the same with them in other's list page
      //   when login user navigates automatically to his/her user's home
      //   from other's list in his/her user page
      //   for the reason that other's list doesn't exist anymore
      providesTags: ["ContentUpdatedInHome"],
    }),
    getContentForUserPageMyWriting: builder.query<
      ContentForUserPageWriting,
      ParamsForUserPageWriting
    >({
      query: (params) =>
        `/userContent/myWriting/${params.userName}/${params.contentType}/${params.order}`,
    }),
    getContentForUserPageOthersWriting: builder.query<
      ContentForUserPageWriting,
      ParamsForUserPageWriting
    >({
      query: (params) =>
        `/userContent/othersWriting/${params.userName}/${params.contentType}/${params.order}`,
    }),
    getContentForUserPageMyList: builder.query<
      ContentForUserPageNovelList,
      ParamsForUserPageNovelList
    >({
      query: (params) => `/userContent/myList/${params.userName}/${params.listId}/${params.order}`,
      keepUnusedDataFor: 120,
      providesTags: (result, error, arg) => [{ type: "ContentUpdatedInNovelList", id: arg.listId }],
    }),
    getContentForUserPageOthersList: builder.query<
      ContentForUserPageNovelList,
      ParamsForUserPageNovelList
    >({
      query: (params) =>
        `/userContent/othersList/${params.userName}/${params.listId}/${params.order}`,
      keepUnusedDataFor: 120,
      providesTags: (result, error, arg) => [{ type: "ContentUpdatedInNovelList", id: arg.listId }],
    }),
    getAllNovelListTitles: builder.query<AllTitlesAndOtherInfo, ParamsForAllNovelListTitles>({
      query: (params) => `/userContent/novelListTitles/${params.userName}/${params.isMyList}`,
      keepUnusedDataFor: 120,
      providesTags: ["ListTitlesUpdated"],
    }),
    toggleLike: builder.mutation<IsLike, ContentForLike>({
      query: (contentForLike) => ({
        url: `/toggleLike/${contentForLike.contentType}/${contentForLike.contentId}`,
        method: "PUT",
      }),
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
  useGetNovelByIdQuery,
  useGetLoginOauthServerQuery,
  useGetLogoutQuery,
  useGetAccessTokenQuery,
  useGetUserInfoByUserNameQuery,
  useCheckForUserNameMutation,
  useSaveUserInfoMutation,
  useGetContentForUserPageHomeByUserNameQuery,
  useGetContentForUserPageMyWritingQuery,
  useGetContentForUserPageOthersWritingQuery,
  useGetContentForUserPageMyListQuery,
  useGetContentForUserPageOthersListQuery,
  useToggleLikeMutation,
  useGetAllNovelListTitlesQuery,
} = novelTimeApi;
