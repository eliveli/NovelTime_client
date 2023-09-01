/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserNovelListToEdit = {
  listId: string;
  listTitle: string;
};

export type IsUserNovelListState = {
  novelIdToAddToList: string;
  userNovelListToEdit: UserNovelListToEdit;
};

const initialState: IsUserNovelListState = {
  novelIdToAddToList: "",
  userNovelListToEdit: {
    listId: "",
    listTitle: "",
  },
};

export const userNovelListSlice = createSlice({
  name: "userNovelList",
  initialState,
  reducers: {
    handleNovelIdToAddToList: (state, action: PayloadAction<string>) => {
      state.novelIdToAddToList = action.payload;
    },
    handleUserNovelListToEdit: (state, action: PayloadAction<UserNovelListToEdit>) => {
      state.userNovelListToEdit = action.payload;
    },
  },
});

export const { handleNovelIdToAddToList, handleUserNovelListToEdit } = userNovelListSlice.actions;

export default userNovelListSlice.reducer;
