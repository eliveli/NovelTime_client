/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IsUserState = {
  loginUserInfo: {
    userId: string;
    userName: string;
    userImg: { src: string; position: string };
    userBG: { src: string; position: string };
  };
  accessToken: string;
  // "isLogout" will be reset as undefined when user login and refresh page
  isLogout: true | undefined;
  userInfoInUserPage: {
    userName: string;
    userImg: { src: string; position: string };
    userBG: { src: string; position: string };
  };
  tempUserBG: { src: string; position: string };
};

const initialState: IsUserState = {
  loginUserInfo: {
    userId: "",
    userName: "",
    userImg: { src: "", position: "" },
    userBG: { src: "", position: "" },
  },
  accessToken: "",
  isLogout: undefined,
  userInfoInUserPage: {
    userName: "",
    userImg: { src: "", position: "" },
    userBG: { src: "", position: "" },
  },
  tempUserBG: { src: "", position: "" },
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setLoginUserInfo: (
      state,
      action: PayloadAction<{
        userId: string;
        userName: string;
        userImg: { src: string; position: string };
        userBG: { src: string; position: string };
      }>,
    ) => {
      state.loginUserInfo = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setLogout: (state, action: PayloadAction<true | undefined>) => {
      state.isLogout = action.payload;
    },
    setUserInfoForUserPage: (
      state,
      action: PayloadAction<{
        userName: string;
        userImg: { src: string; position: string };
        userBG: { src: string; position: string };
      }>,
    ) => {
      state.userInfoInUserPage = action.payload;
    },
    setTempUserBG: (
      state,
      action: PayloadAction<{
        src: string;
        position: string;
      }>,
    ) => {
      state.tempUserBG = action.payload;
    },
  },
});
export const {
  setUserInfoForUserPage,
  setLoginUserInfo,
  setLogout,
  setAccessToken,
  setTempUserBG,
} = userSlice.actions;

export default userSlice.reducer;
