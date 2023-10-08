/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import socket from "store/serverAPIs/socket.io";
import { ChatRoom, Message, MessagesWithPartner } from "store/serverAPIs/types";

export type IsChatState = {
  rooms: ChatRoom[];

  allUnreadMsgNo: number;

  allMessages: { [roomId: string]: MessagesWithPartner };
};

const initialState: IsChatState = {
  rooms: [],

  allUnreadMsgNo: 0,

  allMessages: {},
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

    treatNewMessage: (
      state,
      action: PayloadAction<{
        newMessage: Message;
        loginUserName: string;
        currentRoomId?: string; // when user entered a chatroom
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

      // Treat rooms ----------------------------------------------
      // when partner user sends a new message
      if (senderUserName !== loginUserName) {
        // there's no room for the message
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

      // Treat Messages ------------------------------------------------
      // partner user sends a message to the room that the login user is in
      if (currentRoomId === roomIdOfNewMsg && newMessage.senderUserName !== loginUserName) {
        socket.emit("change message read", newMessage.messageId);

        // Set "isReadByReceiver" is true
        // - to mark a first message unread by login user
        // - this mark is for partner user's message. no need to mark for login user's
        const newMessageSet = { ...newMessage, isReadByReceiver: true };
        state.allMessages[currentRoomId]?.messages.push(newMessageSet);

        // Set new message to the message list identified by the room
        state.allMessages[currentRoomId] = {
          // - add a new property [roomId] in messages if it doesn't exist
          partnerUser: {
            userImg: newMessageSet.senderUserImg,
            userName: newMessageSet.senderUserName,
          },
          messages: state.allMessages[currentRoomId]
            ? [...state.allMessages[currentRoomId].messages, newMessageSet]
            : [newMessageSet],
        };
      } else {
        // Get partner user from state.rooms
        const indexOfRoom = state.rooms.findIndex((room) => room.roomId === roomIdOfNewMsg);
        const { partnerUserName: partnerUserNameOfNewMsg, partnerUserImg: partnerUserImgOfNewMsg } =
          state.rooms[indexOfRoom];

        // Set new message to the message list identified by the room
        state.allMessages[roomIdOfNewMsg] = {
          // - add a new property [roomId] in messages if it doesn't exist
          partnerUser: { userImg: partnerUserImgOfNewMsg, userName: partnerUserNameOfNewMsg },
          messages: state.allMessages[roomIdOfNewMsg]
            ? [...state.allMessages[roomIdOfNewMsg].messages, newMessage]
            : [newMessage],
        };
      }
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

    setMessages: (state, action: PayloadAction<{ roomId: string; data: MessagesWithPartner }>) => {
      const { roomId, data } = action.payload;
      state.allMessages[roomId] = data;
    },
  },
});
export const { setRooms, treatNewMessage, decreaseUnreadMsgNo, setMessages } = chatSlice.actions;

export default chatSlice.reducer;
