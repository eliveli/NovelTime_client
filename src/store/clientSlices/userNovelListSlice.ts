/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserNovelListToEdit = {
  listId: string;
  listTitle: string;
};

export type IsUserNovelListState = {
  userNovelListToEdit: UserNovelListToEdit;
};

const initialState: IsUserNovelListState = {
  userNovelListToEdit: {
    listId: "",
    listTitle: "",
  },
};

export const userNovelListSlice = createSlice({
  name: "userNovelList",
  initialState,
  reducers: {
    handleUserNovelListToEdit: (state, action: PayloadAction<UserNovelListToEdit>) => {
      state.userNovelListToEdit = action.payload;
    },

    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const { handleUserNovelListToEdit } = userNovelListSlice.actions;

export default userNovelListSlice.reducer;
