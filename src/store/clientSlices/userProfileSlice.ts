/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IsUserProfileState = {
  user: {
    userName: string;
    userImg: { src: string; position: string };
    userBG: { src: string; position: string };
  };
  temporaryUserBG: { src: string; position: string };
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
        userImg: { src: string; position: string };
        userBG: { src: string; position: string };
      }>,
    ) => {
      state.user = action.payload;
    },
    setTemporaryUserBG: (
      state,
      action: PayloadAction<{
        src: string;
        position: string;
      }>,
    ) => {
      state.temporaryUserBG = action.payload;
    },
  },
});
export const { setUserProfile, setTemporaryUserBG } = userProfileSlice.actions;

export default userProfileSlice.reducer;
