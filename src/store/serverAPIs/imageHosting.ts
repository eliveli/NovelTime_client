// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// in react, I must not install dotenv just use it //
// import dotenv from "dotenv";
// dotenv.config();

// set env variable in advance : process.env.REACT_APP_ENV
// type " set NODE_ENV=development " in terminal CMD
// set client id for production in .env file later
//
// I'm testing now
const IMAGE_HOSTING_CLIENT_ID = process.env.REACT_APP_IMAGE_HOSTING_CLIENT_ID_WITH_CALLBACK_NAVER;
//
// Define a service using a base URL and expected endpoints
export const imageHostingApi = createApi({
  reducerPath: "imageHostingApi/3",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.imgur.com",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Client-ID ${IMAGE_HOSTING_CLIENT_ID as string}`);
      headers.set("Accept", `application/json`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    imageHosting: builder.mutation<any, string>({
      query: (imageDataUrl) => ({
        url: "/upload",
        method: "POST",
        body: imageDataUrl,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useImageHostingMutation } = imageHostingApi;
