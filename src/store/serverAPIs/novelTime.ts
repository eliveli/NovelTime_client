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
} = novelTimeApi;
