// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { NovelInfo, UserAndToken } from "./types";
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
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints: (builder) => ({
    getNovelById: builder.query<NovelInfo, string>({
      query: (novelId) => `/novels/detail/${novelId}`,
    }),
    getLoginKakao: builder.query<UserAndToken, string>({
      query: (AUTHORIZE_CODE) => `/user/login/kakao?code=${AUTHORIZE_CODE}`,
    }),
    getAccessToken: builder.query<UserAndToken, undefined>({
      query: () => `/user/refreshToken`,
    }),
    getLogout: builder.query<undefined, undefined>({
      query: () => `/user/logout`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetNovelByIdQuery,
  useGetLoginKakaoQuery,
  useGetLogoutQuery,
  useGetAccessTokenQuery,
} = novelTimeApi;
