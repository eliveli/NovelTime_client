/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IsMessageState = {
  otherUser: { userName: string; userImg: string };
};

const initialState: IsMessageState = {
  otherUser: { userName: "", userImg: "" },
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setOtherUser: (state, action: PayloadAction<{ userName: string; userImg: string }>) => {
      state.otherUser = action.payload;
    },
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const { setOtherUser } = messageSlice.actions;

export default messageSlice.reducer;
