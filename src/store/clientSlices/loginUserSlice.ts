/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IsLoginUserState = {
  user: {
    userId: string;
    userName: string;
    userImg: { src: string; position: string };
    userBG: { src: string; position: string };
  };
  accessToken: string;
  isLogout: true | undefined; // can be undefined when user logs in and refreshes page
};

const initialState: IsLoginUserState = {
  user: {
    userId: "",
    userName: "",
    userImg: { src: "", position: "" },
    userBG: { src: "", position: "" },
  },
  accessToken: "",
  isLogout: undefined,
};

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    setLoginUser: (
      state,
      action: PayloadAction<{
        userId: string;
        userName: string;
        userImg: { src: string; position: string };
        userBG: { src: string; position: string };
      }>,
    ) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setLogout: (state, action: PayloadAction<true | undefined>) => {
      state.isLogout = action.payload;
    },
  },
});
export const { setLoginUser, setLogout, setAccessToken } = loginUserSlice.actions;

export default loginUserSlice.reducer;
