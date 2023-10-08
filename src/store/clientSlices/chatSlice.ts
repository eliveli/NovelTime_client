/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import socket from "store/serverAPIs/socket.io";
import { ChatRoom, Message, MessagesWithPartner } from "store/serverAPIs/types";

export type IsChatState = {
  rooms: { [roomId: string]: ChatRoom };

  allUnreadMsgNo: number;

  allMessages: { [roomId: string]: MessagesWithPartner };
};

const initialState: IsChatState = {
  rooms: {},

  allUnreadMsgNo: 0,

  allMessages: {},
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<ChatRoom[]>) => {
      // set rooms at first
      action.payload?.forEach((room) => {
        state.rooms[room.roomId] = room;
      });

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
        currentRoomId: string; // when user entered a chatroom
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

      const roomThatMsgCameIn = state.rooms[roomIdOfNewMsg];

      // Treat rooms ----------------------------------------------
      // when partner user sends a new message
      if (senderUserName !== loginUserName) {
        // there's no room for the message
        // add a new room
        if (!roomThatMsgCameIn) {
          state.rooms[roomIdOfNewMsg] = {
            roomId: roomIdOfNewMsg,
            partnerUserName: senderUserName,
            partnerUserImg: senderUserImg,
            latestMessageDateTime: createDateTime,
            latestMessageDate: createDate,
            latestMessageTime: createTime,
            latestMessageContent: content,
            unreadMessageNo: 1,
          };
        } else {
          // change the room with new message
          //  set unreadMessageNo to 0 when new message comes in a room that the user is in
          const unreadMessageNo =
            currentRoomId === roomIdOfNewMsg ? 0 : state.rooms[roomIdOfNewMsg].unreadMessageNo + 1;

          state.rooms[roomIdOfNewMsg] = {
            ...state.rooms[roomIdOfNewMsg],
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
      state.rooms[roomIdOfNewMsg] = {
        ...state.rooms[roomIdOfNewMsg],
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
        const { partnerUserName: partnerUserNameOfNewMsg, partnerUserImg: partnerUserImgOfNewMsg } =
          state.rooms[roomIdOfNewMsg];

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
      const currentRoom = state.rooms[action.payload.currentRoomId];
      if (!currentRoom) {
        return;
      }

      state.allUnreadMsgNo -= currentRoom.unreadMessageNo;

      state.rooms[action.payload.currentRoomId] = {
        ...currentRoom,
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
