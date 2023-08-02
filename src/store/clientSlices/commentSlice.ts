/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IsCommentState = {
  textToEdit: string;
  commentIdToEditComment: string;
};

const initialState: IsCommentState = {
  textToEdit: "",
  commentIdToEditComment: "",
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setTextToEdit: (state, action: PayloadAction<string>) => {
      state.textToEdit = action.payload;
    },
    setCommentIdToEditComment: (state, action: PayloadAction<string>) => {
      state.commentIdToEditComment = action.payload;
    },
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const { setTextToEdit, setCommentIdToEditComment } = commentSlice.actions;

export default commentSlice.reducer;
