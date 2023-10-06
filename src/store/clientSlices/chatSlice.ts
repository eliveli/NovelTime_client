/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IsChatState = {
  partnerUser: {
    userName: string;
    userImg: { src: string; position: string };
  };

  roomIDsLoginUserJoins: string[];
};

const initialState: IsChatState = {
  partnerUser: {
    userName: "",
    userImg: { src: "", position: "" },
  },

  roomIDsLoginUserJoins: [],
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
    setRoomUserJoined: (state, action: PayloadAction<string>) => {
      state.roomIDsLoginUserJoins = [...state.roomIDsLoginUserJoins, action.payload];
    },
    setMultipleRoomsUserJoined: (state, action: PayloadAction<string[]>) => {
      state.roomIDsLoginUserJoins = [...state.roomIDsLoginUserJoins, ...action.payload];
    },
  },
});
export const { setPartnerUser, setRoomUserJoined, setMultipleRoomsUserJoined } = chatSlice.actions;

export default chatSlice.reducer;
