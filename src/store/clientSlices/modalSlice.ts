import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IsModalState {
  modalCategory: "novelImage" | "login" | "none";
  novelImage: string;
}

const initialState: IsModalState = {
  modalCategory: "none",
  novelImage: "",
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

    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
  },
});

// Action creators are generated for each case reducer function
export const { showBigImage, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
