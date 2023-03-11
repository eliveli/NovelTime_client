/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RECOMMEND_LIST, TALK_LIST } from "utils/pathname";

export const setListType = () => {
  const { pathname } = window.location;
  if (pathname === TALK_LIST) return "talk";
  if (pathname === RECOMMEND_LIST) return "recommend";
  throw Error("pathname error when setting list type");
};

export const setSortTypes = () => {
  const { pathname } = window.location;

  if (pathname === TALK_LIST) {
    return ["작성일New", "작성일Old", "댓글Up", "댓글Down", "좋아요Up", "좋아요Down"];
  }
  if (pathname === RECOMMEND_LIST) return ["작성일New", "작성일Old", "좋아요Up", "좋아요Down"];

  throw Error("pathname error when setting sort type");
};

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

export type SearchTypeFromFilter = "Title" | "Desc" | "Writer" | "Novel";

export type SortTypeFromFilter =
  | "작성일New"
  | "작성일Old"
  | "댓글Up"
  | "댓글Down"
  | "좋아요Up"
  | "좋아요Down";

type FilterType = "genre" | "searchType" | "searchWord" | "sortType" | "pageNo";

type Filters = {
  genre: GenresFromFilter;
  searchType: SearchTypeFromFilter;
  searchWord: string;
  sortType: SortTypeFromFilter;
  pageNo: number;
};

export type IsFilterState = {
  genre: GenresFromFilter;
  searchType: SearchTypeFromFilter;
  searchWord: string;
  pageNo: number;

  // to treat back page
  talk: {
    filters: Filters;
    list?: any[];
  };
  recommend: { filters: Filters; list?: any[] };

  // need to change
  novel: { filters: Filters; list?: any[] };
  sortOnly: { filters: Filters; list?: any[] }; // let's talk and play in 소설 상세 페이지
  all: { filters: Filters; list?: any[] }; // search for writings or novels in nav
  //

  searchTextCtgr: string;
  searchContentCtgr: string;
  searchNovel: { srchNovelId: string; srchNovelTitle: string };
};

const initialState: IsFilterState = {
  genre: "All",
  searchType: "Title",
  searchWord: "",
  pageNo: 1,

  //
  talk: {
    filters: {
      genre: "All",
      searchType: "Title",
      searchWord: "",
      sortType: "작성일New",
      pageNo: 1,
    },
    list: undefined,
  },
  recommend: {
    filters: {
      genre: "All",
      searchType: "Title",
      searchWord: "",
      sortType: "작성일New",
      pageNo: 1,
    },
    list: undefined,
  },

  // need to change
  novel: {
    filters: {
      genre: "All",
      searchType: "Title",
      searchWord: "",
      sortType: "작성일New",
      pageNo: 1,
    },
    list: undefined,
  },
  sortOnly: {
    filters: {
      genre: "All",
      searchType: "Title",
      searchWord: "",
      sortType: "작성일New",
      pageNo: 1,
    },
    list: undefined,
  },
  all: {
    filters: {
      genre: "All",
      searchType: "Title",
      searchWord: "",
      sortType: "작성일New",
      pageNo: 1,
    },
    list: undefined,
  },
  //

  searchTextCtgr: "",
  searchContentCtgr: "",
  searchNovel: { srchNovelId: "", srchNovelTitle: "title" },
};

// all filters for infinite scroll
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

    setSearchList: (
      state,
      action: PayloadAction<{
        listType: "talk" | "recommend" | "novel" | "sortOnly" | "all";
        filters?: { [key: string]: string | number };
        list?: any[] | "reset";
      }>,
    ) => {
      const { listType, filters, list } = action.payload;

      if (filters) {
        state[listType].filters = { ...state[listType].filters, ...filters };
      }

      if (list === "reset") {
        state[listType].list = undefined;
      } else if (list) {
        state[listType].list = list;
      }
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

  setSearchList,

  setSearchTextCtgr,
  setSearchContentCtgr,
  getNovelBySearch,
} = filterSlice.actions;

export default filterSlice.reducer;
