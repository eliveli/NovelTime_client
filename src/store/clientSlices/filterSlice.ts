import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IsFilterState = {
  searchWord: string;
  searchTextCtgr: string;
  searchContentCtgr: string;
};

const initialState: IsFilterState = {
  searchWord: "",
  searchTextCtgr: "",
  searchContentCtgr: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchWord: (state, action: PayloadAction<string>) => {
      state.searchWord = action.payload;
    },
    setSearchTextCtgr: (state, action: PayloadAction<string>) => {
      state.searchTextCtgr = action.payload;
    },
    setSearchContentCtgr: (state, action: PayloadAction<string>) => {
      state.searchContentCtgr = action.payload;
    },

    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const { setSearchWord, setSearchTextCtgr, setSearchContentCtgr } = filterSlice.actions;

export default filterSlice.reducer;
