/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NovelLike {
  novelId: string | undefined;
  isLike: boolean | undefined;
}
export interface IsModalState {
  modalCategory: "novelImage" | "login" | "none";
  novelImage: string;
  novelTitle: string;
  novelLike: NovelLike[];
}

const initialState: IsModalState = {
  modalCategory: "none",
  novelImage: "",
  novelTitle: "",
  novelLike: [{ novelId: undefined, isLike: undefined }],
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showBigImage: (state, action: PayloadAction<string>) => {
      state.modalCategory = "novelImage";
      state.novelImage = action.payload;
    },
    closeModal: (state) => {
      state.modalCategory = "none";
    },
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
export const { showBigImage, closeModal, getNovelTitle, setLikeNovel } = modalSlice.actions;

export default modalSlice.reducer;
