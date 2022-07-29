// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import {
  NovelInfo,
  UserAndToken,
  OauthData,
  ChangedUserInfo,
  UserInfo,
  ContentsForUserPageHome,
  ParamsForUserPageWriting,
  ContentsForUserPageMyWriting,
  ContentsForUserPageOthersWriting,
  ContentsForUserPageWriting,
  ContentsForUserPageNovelList,
  ParamsForUserPageNovelList,
  ContentForLike,
  IsLike,
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
    baseUrl: "http://domainfordev.com:8082",
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
  tagTypes: ["EmptyOthersListsForLoginUser"],
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
    getContentsForUserPageHomeByUserName: builder.query<ContentsForUserPageHome, string>({
      query: (userName) => `/contents/userPageHome/${userName}`,
      // refetch data //
      // don't use cached data where part of them is not the same with them in other's list page
      //   when login user navigates automatically to his/her user's home
      //   from other's list in his/her user page
      //   for the reason that other's list doesn't exist anymore
      providesTags: ["EmptyOthersListsForLoginUser"],
    }),
    getContentsForUserPageMyWriting: builder.query<
      ContentsForUserPageWriting,
      ParamsForUserPageWriting
    >({
      query: (params) =>
        `/contents/userPageMyWriting/${params.userName}/${params.contentsType}/${params.order}`,
    }),
    getContentsForUserPageOthersWriting: builder.query<
      ContentsForUserPageWriting,
      ParamsForUserPageWriting
    >({
      query: (params) =>
        `/contents/userPageOthersWriting/${params.userName}/${params.contentsType}/${params.order}`,
    }),
    getContentsForUserPageMyList: builder.query<
      ContentsForUserPageNovelList,
      ParamsForUserPageNovelList
    >({
      query: (params) =>
        `/contents/userPageMyList/${params.userName}/${params.listId}/${params.order}`,
    }),
    getContentsForUserPageOthersList: builder.query<
      ContentsForUserPageNovelList,
      ParamsForUserPageNovelList
    >({
      query: (params) =>
        `/contents/userPageOthersList/${params.userName}/${params.listId}/${params.order}`,
    }),
    toggleLike: builder.mutation<IsLike, ContentForLike>({
      query: (contentForLike) => ({
        url: `/contents/toggleLike/${contentForLike.contentType}/${contentForLike.contentId}`,
        method: "PUT",
      }),
      invalidatesTags: ["EmptyOthersListsForLoginUser"],
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
  useGetContentsForUserPageHomeByUserNameQuery,
  useGetContentsForUserPageMyWritingQuery,
  useGetContentsForUserPageOthersWritingQuery,
  useGetContentsForUserPageMyListQuery,
  useGetContentsForUserPageOthersListQuery,
  useToggleLikeMutation,
} = novelTimeApi;
