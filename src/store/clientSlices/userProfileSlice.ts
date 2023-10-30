/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Img } from "store/serverAPIs/types";

export type User = {
  userName: string;
  userImg: Img;
  userBG: Img;
};

export type IsUserProfileState = {
  user: User;
  temporaryUserBG: Img;
};

const initialState: IsUserProfileState = {
  user: {
    userName: "",
    userImg: { src: "", position: "" },
    userBG: { src: "", position: "" },
  },
  temporaryUserBG: { src: "", position: "" },
};

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfile: (
      state,
      action: PayloadAction<{
        userName: string;
        userImg: Img;
        userBG: Img;
      }>,
    ) => {
      state.user = action.payload;
    },
    setTemporaryUserBG: (state, action: PayloadAction<Img>) => {
      state.temporaryUserBG = action.payload;
    },
  },
});
export const { setUserProfile, setTemporaryUserBG } = userProfileSlice.actions;

export default userProfileSlice.reducer;
