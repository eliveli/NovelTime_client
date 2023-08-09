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

type Filters = {
  genre: GenresFromFilter;
  searchType: SearchTypeFromFilter;
  searchWord: string;
  sortType: SortTypeFromFilter;
  pageNo: number;
};

type FiltersForSearchNovel = {
  searchType: "Title" | "Desc" | "Author";
  searchWord: string;
  pageNo: number;
};

type FiltersForSearchAll = {
  searchCategory: "Novel" | "Talk" | "Recommend";
  searchType: "Title" | "Desc" | "Author" | "Text" | "Writer";
  searchWord: string;
  pageNo: number;
};

export type IsFilterState = {
  // to treat back page
  talk: {
    filters: Filters;
    list?: any[];
  };
  recommend: { filters: Filters; list?: any[] };

  novel: { filters: FiltersForSearchNovel; list?: any[] };

  searchAll: { filters: FiltersForSearchAll; list?: any[] };

  // need to change
  sortOnly: { filters: Filters; list?: any[] }; // let's talk and play in 소설 상세 페이지
  //

  searchTextCtgr: string;
  searchContentCtgr: string;
  searchNovel: { srchNovelId: string; srchNovelTitle: string };
};

const initialState: IsFilterState = {
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
  novel: {
    filters: {
      searchType: "Title",
      searchWord: "",
      pageNo: 1,
    },
    list: undefined,
  },
  searchAll: {
    filters: {
      searchCategory: "Novel",
      searchType: "Title",
      searchWord: "",
      pageNo: 1,
    },
    list: undefined,
  },

  // need to change
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
    setSearchList: (
      state,
      action: PayloadAction<{
        listType: "talk" | "recommend" | "novel" | "searchAll" | "sortOnly";
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
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const {
  setSearchList,

  setSearchTextCtgr,
  setSearchContentCtgr,
} = filterSlice.actions;

export default filterSlice.reducer;
