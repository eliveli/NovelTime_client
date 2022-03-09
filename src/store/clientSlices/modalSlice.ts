import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IsModalState {
  isModal: boolean;
}

const initialState: IsModalState = {
  isModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // eslint-disable-next-line no-param-reassign
      state.isModal = !state.isModal;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;
