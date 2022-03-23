/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NovelLike {
  novelId: string | undefined;
  isLike: boolean | undefined;
}

export interface IsModalState {
  modalCategory: "novelImage" | "sortWriting" | "filterContent" | "login" | "none";
  novelImage: string;
  sortingText: string;
  filteringContent: string;

  // 아래는 나중에 모듈 분리
  novelTitle: string;
  novelLike: NovelLike[];
}

const initialState: IsModalState = {
  modalCategory: "none",
  novelImage: "",
  sortingText: "작성일New",
  filteringContent: "Novel",

  //
  novelTitle: "",
  novelLike: [{ novelId: undefined, isLike: undefined }],
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<"novelImage" | "sortWriting" | "filterContent" | "login" | "none">,
    ) => {
      state.modalCategory = action.payload;
    },
    showBigImage: (state, action: PayloadAction<string>) => {
      state.modalCategory = "novelImage";
      state.novelImage = action.payload;
    },
    closeModal: (state) => {
      state.modalCategory = "none";
    },
    sortWriting: (state, action: PayloadAction<string>) => {
      state.sortingText = action.payload;
    },
    filterContent: (state, action: PayloadAction<string>) => {
      state.filteringContent = action.payload;
    },
    // 아래 리듀서 모듈 분리
    getNovelTitle: (state, action: PayloadAction<string>) => {
      state.novelTitle = action.payload;
    },
    setLikeNovel: (state, action: PayloadAction<NovelLike>) => {
      // state.novelLike.map( _, idx=> {
      //   if(_.novelId === action.payload.novelId){
      //     state.novelLike[idx].isLike = action.payload.isLike
      //     return;
      //   }
      //   if (idx === state.novelLike.lengh -1) {
      //   }})
    },

    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const {
  filterContent,
  openModal,
  showBigImage,
  closeModal,
  sortWriting,
  getNovelTitle,
  setLikeNovel,
} = modalSlice.actions;

export default modalSlice.reducer;
