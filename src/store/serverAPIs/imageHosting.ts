// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// in react, I must not install or import dotenv just use it //
// after changing .env file kill and rerun the process in terminal to read the changed env var

const IMAGE_HOSTING_CLIENT_ID = process.env.REACT_APP_IMAGE_HOSTING_CLIENT_ID_ANONYMOUS;
// I registered with "anonymous" option on imgur

// response type for image hosting is inaccurate. I couldn't catch what is the exact yet
type ImgHostingResult = {
  data: {
    data: {
      link: string;
    };
    status: number;
    success: boolean;
  };
};

// Define a service using a base URL and expected endpoints
export const imageHostingApi = createApi({
  reducerPath: "imageHostingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.imgur.com",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Client-ID ${IMAGE_HOSTING_CLIENT_ID as string}`);
      headers.set("Accept", `application/json`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    imageHosting: builder.mutation<ImgHostingResult, FormData>({
      query: (imageFormData) => ({
        url: "/3/image",
        method: "POST",
        body: imageFormData,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useImageHostingMutation } = imageHostingApi;
