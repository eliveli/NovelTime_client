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

type FiltersForWriting = {
  genre: GenresFromFilter;
  searchType: SearchTypeFromFilter;
  searchWord: string;
  sortType: SortTypeFromFilter;
  pageNo: number;
};

type FiltersForSearchNovel = {
  searchType: "Title" | "Desc" | "Author" | "sample";
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
    filters: FiltersForWriting;
    list?: any[];
    isSettingTheList: boolean;
  };
  recommend: { filters: FiltersForWriting; list?: any[]; isSettingTheList: boolean };

  novel: { filters: FiltersForSearchNovel; list?: any[]; isSettingTheList: boolean };

  searchAll: { filters: FiltersForSearchAll; list?: any[]; isSettingTheList: boolean };
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
    isSettingTheList: false,
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
    isSettingTheList: false,
  },
  novel: {
    filters: {
      searchType: "sample",
      searchWord: "",
      pageNo: 1,
    },
    list: undefined,
    isSettingTheList: false,
  },
  searchAll: {
    filters: {
      searchCategory: "Novel",
      searchType: "Title",
      searchWord: "",
      pageNo: 1,
    },
    list: undefined,
    isSettingTheList: false,
  },
};

// all filters for infinite scroll
export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchList: (
      state,
      action: PayloadAction<{
        listType: "talk" | "recommend" | "novel" | "searchAll";
        filters?: { [key: string]: string | number };
        list?: any[] | "reset";
        isSettingTheList?: boolean;
      }>,
    ) => {
      const { listType, filters, list, isSettingTheList } = action.payload;

      if (filters) {
        state[listType].filters = { ...state[listType].filters, ...filters };
      }

      if (isSettingTheList !== undefined) {
        state[listType].isSettingTheList = isSettingTheList;
      }

      if (list === "reset") {
        state[listType].list = undefined;

        if (["talk", "recommend"].includes(listType)) {
          state[listType].filters = {
            genre: "All",
            searchType: "Title",
            searchWord: "",
            sortType: "작성일New",
            pageNo: 1,
          };
        } else if (listType === "novel") {
          state[listType].filters = {
            searchType: "sample",
            searchWord: "",
            pageNo: 1,
          };
        } else if (listType === "searchAll") {
          state[listType].filters = {
            searchCategory: "Novel",
            searchType: "Title",
            searchWord: "",
            pageNo: 1,
          };
        }
        return;
      }

      if (list) {
        state[listType].list = list;
      }
    },

    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const { setSearchList } = filterSlice.actions;

export default filterSlice.reducer;
