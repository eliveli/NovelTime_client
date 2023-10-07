/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatRoom, Message } from "store/serverAPIs/types";

export type IsChatState = {
  rooms: ChatRoom[];

  allUnreadMsgNo: number;

  // * below will change
  partnerUser: {
    userName: string;
    userImg: { src: string; position: string };
  };

  roomIDsLoginUserJoins: string[];
};

const initialState: IsChatState = {
  rooms: [],

  allUnreadMsgNo: 0,

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
      let unreadMsgNoOfAllRooms = 0;
      action.payload.forEach((room) => {
        unreadMsgNoOfAllRooms += room.unreadMessageNo;
      });

      state.allUnreadMsgNo = unreadMsgNoOfAllRooms;
    },

    setNewMsgInTheRoom: (
      state,
      action: PayloadAction<{
        newMessage: Message;
        loginUserName: string;
        currentRoomId?: string; // when user sees a chatroom in room list
      }>,
    ) => {
      const { newMessage, loginUserName, currentRoomId } = action.payload;
      const {
        roomId: roomIdOfNewMsg,
        senderUserName,
        senderUserImg,
        createDateTime,
        createDate,
        createTime,
        content,
      } = newMessage;

      const index = state.rooms.findIndex((room) => room.roomId === roomIdOfNewMsg);

      // when partner user sends a new message
      if (senderUserName !== loginUserName) {
        // add a new room
        if (index === -1) {
          state.rooms.push({
            roomId: roomIdOfNewMsg,
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
          //  set unreadMessageNo to 0 when new message comes in a room that the user is in
          const unreadMessageNo =
            currentRoomId === roomIdOfNewMsg ? 0 : state.rooms[index].unreadMessageNo + 1;

          state.rooms[index] = {
            ...state.rooms[index],
            latestMessageDateTime: createDateTime,
            latestMessageDate: createDate,
            latestMessageTime: createTime,
            latestMessageContent: content,
            unreadMessageNo,
          };
        }

        // change unread message number of all rooms
        state.allUnreadMsgNo += 1;
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

    decreaseUnreadMsgNo: (state, action: PayloadAction<{ currentRoomId: string }>) => {
      // change "unreadMessageNo" to 0 of current room
      const index = state.rooms.findIndex((room) => room.roomId === action.payload.currentRoomId);

      state.allUnreadMsgNo -= state.rooms[index].unreadMessageNo;

      state.rooms[index] = {
        ...state.rooms[index],
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
  setNewMsgInTheRoom,
  decreaseUnreadMsgNo,
  setPartnerUser,
  setRoomUserJoined,
  setMultipleRoomsUserJoined,
} = chatSlice.actions;

export default chatSlice.reducer;
