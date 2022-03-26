/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IsWritingState = {
  reCommentUser: {
    reCommentId: string;
    reCommentUserName: string;
  };
  handlePrevReComnt: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialState: IsWritingState = {
  reCommentUser: { reCommentId: "", reCommentUserName: "" },
  handlePrevReComnt: () => {},
};

export const writingSlice = createSlice({
  name: "writing",
  initialState,
  reducers: {
    setReComment: (
      state,
      action: PayloadAction<{
        reCommentId: string;
        reCommentUserName: string;
      }>,
    ) => {
      state.reCommentUser = action.payload;
    },
    getClosingReComnt: (
      state,
      action: PayloadAction<{
        handleWriteReComnt: React.Dispatch<React.SetStateAction<boolean>>;
      }>,
    ) => {
      state.handlePrevReComnt = action.payload.handleWriteReComnt;
    },
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const { setReComment, getClosingReComnt } = writingSlice.actions;

export default writingSlice.reducer;
