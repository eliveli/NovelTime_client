/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IsUserState = {
  loginUserInfo: { userId: string; userName: string; userImg: string };
  accessToken: string;
  isLogout: true | undefined; // this state will be reset as undefined when user login and refresh page
  userInfoInUserPage: { userName: string; userImg: string };
};

const initialState: IsUserState = {
  loginUserInfo: { userId: "", userName: "", userImg: "" },
  accessToken: "",
  isLogout: undefined,
  userInfoInUserPage: { userName: "", userImg: "" },
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setLoginUserInfo: (
      state,
      action: PayloadAction<{ userId: string; userName: string; userImg: string }>,
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
      action: PayloadAction<{ userName: string; userImg: string }>,
    ) => {
      state.userInfoInUserPage = action.payload;
    },
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const { setUserInfoForUserPage, setLoginUserInfo, setLogout, setAccessToken } =
  userSlice.actions;

export default userSlice.reducer;
