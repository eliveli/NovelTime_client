/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IsWritingState = {
  isWritingSubmit: boolean;
};

const initialState: IsWritingState = {
  isWritingSubmit: false,
};

export const writingSlice = createSlice({
  name: "writing",
  initialState,
  reducers: {
    handleWritingSubmit: (state, action: PayloadAction<boolean>) => {
      state.isWritingSubmit = action.payload;
    },
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const { handleWritingSubmit } = writingSlice.actions;

export default writingSlice.reducer;
