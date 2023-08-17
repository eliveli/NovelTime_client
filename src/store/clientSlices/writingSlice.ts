/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WritingToEdit = {
  writingId: string;
  writingTitle: string;
  writingDesc: string;
  writingType: "FreeTalk" | "Recommend";

  novelId: string;
  novelTitle: string;
};

export type IsWritingState = {
  isWritingToSubmitOnMobile: boolean;

  writingToEdit: WritingToEdit;
};

const initialState: IsWritingState = {
  isWritingToSubmitOnMobile: false,

  writingToEdit: {
    writingId: "",
    writingTitle: "",
    writingDesc: "",
    writingType: "FreeTalk",
    novelId: "",
    novelTitle: "",
  },
};

export const writingSlice = createSlice({
  name: "writing",
  initialState,
  reducers: {
    handleWritingToSubmitOnMobile: (state, action: PayloadAction<boolean>) => {
      state.isWritingToSubmitOnMobile = action.payload;
    },
    handleWritingToEdit: (state, action: PayloadAction<WritingToEdit>) => {
      state.writingToEdit = action.payload;
    },

    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const { handleWritingToSubmitOnMobile, handleWritingToEdit } = writingSlice.actions;

export default writingSlice.reducer;
