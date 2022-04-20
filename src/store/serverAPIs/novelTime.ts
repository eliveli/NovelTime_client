// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NovelInfo } from "./types";

// Define a service using a base URL and expected endpoints
export const novelTimeApi = createApi({
  reducerPath: "novelTimeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8082" }),
  endpoints: (builder) => ({
    getNovelById: builder.query<NovelInfo, string>({
      query: (novelId) => `/novels/detail/${novelId}`,
    }),
    getLoginKakao: builder.query<string, string>({
      query: (AUTHORIZE_CODE) => `/login/kakao/${AUTHORIZE_CODE}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNovelByIdQuery, useGetLoginKakaoQuery } = novelTimeApi;
