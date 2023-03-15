/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IsWritingState = {
  parentComment: {
    parentCommentId: string;
    parentCommentUserName: string;
  };
  handlePrevReComnt: React.Dispatch<React.SetStateAction<boolean>>;
  isWritingSubmit: boolean;
};

const initialState: IsWritingState = {
  parentComment: { parentCommentId: "", parentCommentUserName: "" },
  handlePrevReComnt: () => {},
  isWritingSubmit: false,
};

export const writingSlice = createSlice({
  name: "writing",
  initialState,
  reducers: {
    setParentComment: (
      state,
      action: PayloadAction<{
        parentCommentId: string;
        parentCommentUserName: string;
      }>,
    ) => {
      state.parentComment = action.payload;
    },
    getClosingReComnt: (
      state,
      action: PayloadAction<{
        handleWriteReComnt: React.Dispatch<React.SetStateAction<boolean>>;
      }>,
    ) => {
      state.handlePrevReComnt = action.payload.handleWriteReComnt;
    },
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
export const { setParentComment, getClosingReComnt, handleWritingSubmit } = writingSlice.actions;

export default writingSlice.reducer;
