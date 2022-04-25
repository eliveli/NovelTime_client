// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NovelInfo, UserAndToken } from "./types";
import type { RootState } from "../index";
// Define a service using a base URL and expected endpoints
export const novelTimeApi = createApi({
  reducerPath: "novelTimeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8082",
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
  }),
  endpoints: (builder) => ({
    getNovelById: builder.query<NovelInfo, string>({
      query: (novelId) => `/novels/detail/${novelId}`,
    }),
    getLoginKakao: builder.query<UserAndToken, string>({
      query: (AUTHORIZE_CODE) => `/user/login/kakao?code=${AUTHORIZE_CODE}`,
    }),
    getAccessToken: builder.query<UserAndToken, undefined>({
      query: (undefined) => `/user/refreshToken`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNovelByIdQuery, useGetLoginKakaoQuery, useGetAccessTokenQuery } = novelTimeApi;
