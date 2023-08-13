/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IsWritingState = {
  isNewWritingOnMobile: boolean;
};

const initialState: IsWritingState = {
  isNewWritingOnMobile: false,
};

export const writingSlice = createSlice({
  name: "writing",
  initialState,
  reducers: {
    handleNewWritingOnMobile: (state, action: PayloadAction<boolean>) => {
      state.isNewWritingOnMobile = action.payload;
    },
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const { handleNewWritingOnMobile } = writingSlice.actions;

export default writingSlice.reducer;
