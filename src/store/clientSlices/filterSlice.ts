/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GenresFromFilter =
  | "All"
  | "그 외"
  | "패러디"
  | "로판"
  | "로맨스"
  | "현판"
  | "판타지"
  | "무협"
  | "라이트노벨"
  | "BL"
  | "미스터리";

export type SearchTypeFromFilter = "no" | "Title" | "Desc" | "Writer" | "Novel";

export type IsFilterState = {
  genre: GenresFromFilter;
  searchType: SearchTypeFromFilter;
  searchWord: string;
  pageNo: number;

  searchTextCtgr: string;
  searchContentCtgr: string;
  searchNovel: { srchNovelId: string; srchNovelTitle: string };
};

const initialState: IsFilterState = {
  genre: "All",
  searchType: "no",
  searchWord: "",
  pageNo: 1,

  searchTextCtgr: "",
  searchContentCtgr: "",
  searchNovel: { srchNovelId: "", srchNovelTitle: "title" },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    selectGenre: (state, action: PayloadAction<GenresFromFilter>) => {
      // 현재와 다른 필터를 눌렀을 때만 페이지넘버 1로 리셋
      if (state.genre !== action.payload) {
        state.pageNo = 1;
      }

      state.genre = action.payload;
    },
    selectSearchType: (state, action: PayloadAction<SearchTypeFromFilter>) => {
      if (state.searchType !== action.payload) {
        state.pageNo = 1;
      }

      state.searchType = action.payload;
    },
    setSearchWord: (state, action: PayloadAction<string>) => {
      if (state.searchWord !== action.payload) {
        state.pageNo = 1;
      }

      state.searchWord = action.payload;
    },
    setPageNo: (state, action: PayloadAction<number>) => {
      state.pageNo = action.payload;
    },

    setSearchTextCtgr: (state, action: PayloadAction<string>) => {
      state.searchTextCtgr = action.payload;
    },
    setSearchContentCtgr: (state, action: PayloadAction<string>) => {
      state.searchContentCtgr = action.payload;
    },
    // now this is not necessary
    getNovelBySearch: (
      state,
      action: PayloadAction<{ srchNovelId: string; srchNovelTitle: string }>,
    ) => {
      state.searchNovel = action.payload;
    },

    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const {
  selectGenre,
  selectSearchType,
  setSearchWord,
  setPageNo,

  setSearchTextCtgr,
  setSearchContentCtgr,
  getNovelBySearch,
} = filterSlice.actions;

export default filterSlice.reducer;
