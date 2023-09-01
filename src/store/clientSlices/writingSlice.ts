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
  },
});

export const { handleWritingToSubmitOnMobile, handleWritingToEdit } = writingSlice.actions;

export default writingSlice.reducer;
