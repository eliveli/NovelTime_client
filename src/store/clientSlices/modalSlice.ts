/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MetaTags {
  title: string;
  description: string;
  image: string;
  url: string;
}
interface Confirm {
  question: string;
  textForYes: string;
  textForNo: string;
  functionForYes: () => void;
  functionForNo?: () => void;
}
export interface IsModalState {
  modalCategory:
    | "novelImage"
    | "sortWriting"
    | "filterContent" // used with searchAll.filters.searchCategory in filterSlice
    | "login"
    | "editProfile"
    | "share"
    | "getNovelURL"
    | "addToMyNovelList"
    | "changeListTitle"
    | "confirm"
    | "alert"
    | "writeNewListTitle"
    | "none";
  novelImage: string;
  metaTags: MetaTags;
  confirm: Confirm;
  alert: string;
}

const initialState: IsModalState = {
  modalCategory: "none",
  novelImage: "",
  metaTags: {
    title: "NovelTime",
    description: "It's time to read novels!",
    image:
      // 사이트 썸네일 이미지 in 구글 포토 앨범
      "https://photos.google.com/album/AF1QipOy4A30VtN2Afb5ynQYejvDxN_5CVBjYRa_DYX4/photo/AF1QipM-TuRzTrhw9-AH4fdhB9EwS1vxjwdOfdX2svVp",
    url: "",
  },
  confirm: {
    question: "",
    textForYes: "",
    textForNo: "",
    functionForYes: () => {},
    functionForNo: () => {},
  },
  alert: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<
        | "novelImage"
        | "sortWriting"
        | "filterContent"
        | "login"
        | "editProfile"
        | "share"
        | "getNovelURL"
        | "addToMyNovelList"
        | "changeListTitle"
        | "confirm"
        | "alert"
        | "writeNewListTitle"
        | "none"
      >,
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
    setMetaTags: (state, action: PayloadAction<MetaTags>) => {
      state.metaTags = action.payload;
    },
    handleConfirm: (state, action: PayloadAction<Confirm>) => {
      state.confirm = action.payload;
    },
    handleAlert: (state, action: PayloadAction<string>) => {
      state.alert = action.payload;
    },
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const { openModal, showBigImage, closeModal, setMetaTags, handleConfirm, handleAlert } =
  modalSlice.actions;

export default modalSlice.reducer;
