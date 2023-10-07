/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatRoom, Message } from "store/serverAPIs/types";

export type IsChatState = {
  rooms: ChatRoom[];

  unreadMessageNo: number;

  // * below will change
  partnerUser: {
    userName: string;
    userImg: { src: string; position: string };
  };

  roomIDsLoginUserJoins: string[];
};

const initialState: IsChatState = {
  rooms: [],

  unreadMessageNo: 0,

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
    setRooms: (state, action: PayloadAction<ChatRoom[]>) => {
      // set rooms at first
      state.rooms.push(...action.payload);

      // set unread message number of all rooms
      let unreadMessageNoOfAllRooms = 0;
      action.payload.forEach((room) => {
        unreadMessageNoOfAllRooms += room.unreadMessageNo;
      });

      state.unreadMessageNo = unreadMessageNoOfAllRooms;
    },

    changeRoom: (state, action: PayloadAction<{ newMessage: Message; loginUserName: string }>) => {
      const { newMessage, loginUserName } = action.payload;
      const {
        roomId,
        senderUserName,
        senderUserImg,
        createDateTime,
        createDate,
        createTime,
        content,
      } = newMessage;

      const index = state.rooms.findIndex((room) => room.roomId === roomId);

      // when partner user sends a new message
      if (senderUserName !== loginUserName) {
        // add a new room
        if (index === -1) {
          state.rooms.push({
            roomId,
            partnerUserName: senderUserName,
            partnerUserImg: senderUserImg,
            latestMessageDateTime: createDateTime,
            latestMessageDate: createDate,
            latestMessageTime: createTime,
            latestMessageContent: content,
            unreadMessageNo: 1,
          });
        } else {
          // change the room with new message
          state.rooms[index] = {
            ...state.rooms[index],
            latestMessageDateTime: createDateTime,
            latestMessageDate: createDate,
            latestMessageTime: createTime,
            latestMessageContent: content,
            unreadMessageNo: state.rooms[index].unreadMessageNo + 1,
          };
        }

        // change unread message number of all rooms
        state.unreadMessageNo += 1;
        return;
      }

      // when the login user sends a new message
      // change the room with new message
      state.rooms[index] = {
        ...state.rooms[index],
        latestMessageDateTime: createDateTime,
        latestMessageDate: createDate,
        latestMessageTime: createTime,
        latestMessageContent: content,
        unreadMessageNo: 0,
      };
    },

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
      state.roomIDsLoginUserJoins.push(action.payload);
    },
    setMultipleRoomsUserJoined: (state, action: PayloadAction<string[]>) => {
      state.roomIDsLoginUserJoins.push(...action.payload);
    },
  },
});
export const {
  setRooms,
  changeRoom,
  setPartnerUser,
  setRoomUserJoined,
  setMultipleRoomsUserJoined,
} = chatSlice.actions;

export default chatSlice.reducer;
