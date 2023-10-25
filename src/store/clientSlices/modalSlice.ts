/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalCategory =
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
  | undefined;

interface MetaTags {
  title: string;
  description: string;
  image: string;
  url: string;
}
interface Alert {
  text: string;
  nextFunction?: () => void;
}
interface Confirm {
  question: string;
  textForYes: string;
  textForNo: string;
  functionForYes: () => void;
  functionForNo?: () => void;
}
export interface IsModalState {
  firstModalCategory: ModalCategory;
  secondModalCategory: ModalCategory;
  novelImage: string;
  confirm: Confirm;
  alert: Alert;
  metaTags: MetaTags;
}

export const logoImg = "https://i.imgur.com/wjATdZi.jpg";
export const websiteURL = "http://domainfordev.com"; // * need to change after setting the domain

const initialState: IsModalState = {
  firstModalCategory: undefined,
  secondModalCategory: undefined,
  novelImage: "",
  confirm: {
    question: "",
    textForYes: "",
    textForNo: "",
    functionForYes: () => {},
    functionForNo: () => {},
  },
  alert: {
    text: "",
    nextFunction: undefined,
  },

  // Used for sharer after setting new meta tags in each page
  metaTags: {
    title: "NovelTime",
    description: "It's time to read novels!",
    image: logoImg,
    url: websiteURL,
  },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openFirstModal: (state, action: PayloadAction<ModalCategory>) => {
      state.firstModalCategory = action.payload;
    },
    openSecondModal: (state, action: PayloadAction<ModalCategory>) => {
      state.secondModalCategory = action.payload;
    },
    closeModal: (state, action: PayloadAction<{ isSecond?: true }>) => {
      if (action.payload.isSecond) {
        state.secondModalCategory = undefined;
        return;
      }
      state.firstModalCategory = undefined;
    },

    showBigImage: (state, action: PayloadAction<string>) => {
      state.firstModalCategory = "novelImage";
      state.novelImage = action.payload;
    },
    setMetaTags: (state, action: PayloadAction<MetaTags>) => {
      state.metaTags = action.payload;
    },
    handleConfirm: (state, action: PayloadAction<Confirm>) => {
      state.confirm = action.payload;
    },
    handleAlert: (state, action: PayloadAction<Alert>) => {
      state.alert = action.payload;
    },
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const {
  openFirstModal,
  openSecondModal,
  closeModal,
  showBigImage,
  setMetaTags,
  handleConfirm,
  handleAlert,
} = modalSlice.actions;

export default modalSlice.reducer;
