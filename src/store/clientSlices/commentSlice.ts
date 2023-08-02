/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IsCommentState = {
  commentToEdit: {
    commentId: string;
    commentContent: string;
    parentUserName: string;
  };
};

const initialState: IsCommentState = {
  commentToEdit: {
    commentId: "",
    commentContent: "",
    parentUserName: "",
    // it can be empty string when comment is root comment
  },
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setCommentToEdit: (
      state,
      action: PayloadAction<{ commentId: string; commentContent: string; parentUserName: string }>,
    ) => {
      state.commentToEdit = action.payload;
    },
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const { setCommentToEdit } = commentSlice.actions;

export default commentSlice.reducer;
