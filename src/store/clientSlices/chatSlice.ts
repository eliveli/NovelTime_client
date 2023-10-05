/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IsChatState = {
  partnerUser: {
    userName: string;
    userImg: { src: string; position: string };
  };
};

const initialState: IsChatState = {
  partnerUser: {
    userName: "",
    userImg: { src: "", position: "" },
  },
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setPartnerUser: (
      state,
      action: PayloadAction<{
        userName: string;
        userImg: { src: string; position: string };
      }>,
    ) => {
      state.partnerUser = action.payload;
    },
  },
});
export const { setPartnerUser } = chatSlice.actions;

export default chatSlice.reducer;
