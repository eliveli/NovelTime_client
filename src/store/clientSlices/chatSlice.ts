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
      action.payload.forEach((room) => {
        state.allUnreadMsgNo += room.unreadMessageNo;
      });
    },

    // set an initial room and empty message info
    setNewRoom: (state, action: PayloadAction<ChatRoom>) => {
      const room = action.payload;

      if (!room.roomId) return;

      if (!state.rooms[room.roomId]) {
        state.rooms[room.roomId] = room;
      }

      if (!state.allMessages[room.roomId]) {
        state.allMessages[room.roomId] = {
          partnerUser: {
            userName: room.partnerUserName,
            userImg: room.partnerUserImg,
          },
          messages: [],
        };
      }
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

      // Treat rooms ------------------------------------------------------------ //
      // when partner user sends a new message
      if (senderUserName !== loginUserName) {
        // add a new room when there's no room for the message
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

          // change unread message number of all rooms
          state.allUnreadMsgNo += 1;
          //
          // new message comes in the current room
        } else if (currentRoomId === roomIdOfNewMsg) {
          state.rooms[roomIdOfNewMsg] = {
            ...state.rooms[roomIdOfNewMsg],
            latestMessageDateTime: createDateTime,
            latestMessageDate: createDate,
            latestMessageTime: createTime,
            latestMessageContent: content,
            unreadMessageNo: 0,
          };

          //
          // new message comes in the room that the user isn't watching now
        } else {
          state.rooms[roomIdOfNewMsg] = {
            ...state.rooms[roomIdOfNewMsg],
            latestMessageDateTime: createDateTime,
            latestMessageDate: createDate,
            latestMessageTime: createTime,
            latestMessageContent: content,
            unreadMessageNo: state.rooms[roomIdOfNewMsg].unreadMessageNo + 1,
          };

          // change unread message number of all rooms
          state.allUnreadMsgNo += 1;
        }

        //
      } else {
        // when the login user sends a new message
        state.rooms[roomIdOfNewMsg] = {
          ...state.rooms[roomIdOfNewMsg],
          latestMessageDateTime: createDateTime,
          latestMessageDate: createDate,
          latestMessageTime: createTime,
          latestMessageContent: content,
          unreadMessageNo: 0,
        };
      }

      // Treat Messages --------------------------------------------------------- //
      // partner user sends a message to the room that the login user is in
      if (currentRoomId === roomIdOfNewMsg && newMessage.senderUserName !== loginUserName) {
        socket.emit("change message read", newMessage.messageId);

        // Set "isReadByReceiver" is true
        // - to mark a first message unread by login user in next visit to this room
        // - this mark is for partner user's message. no need to mark for login user's
        const newMessageSet = { ...newMessage, isReadByReceiver: true };

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
        // - if a partner user sends a message at first,
        //    the room holding the partner data exists already.
        //   it was added in the code to treat the room above

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

    // it works when getting messages in the room at first
    setMessages: (state, action: PayloadAction<{ roomId: string; data: MessagesWithPartner }>) => {
      const { roomId, data } = action.payload;

      state.allMessages[roomId] = data;
    },

    // it works whenever choosing a room
    changeMsgsUnread: (state, action: PayloadAction<{ roomId: string }>) => {
      // Treat messages ------------------------------------------------------ //

      // Set "isReadByReceiver" to true of messages in current room
      const room = state.allMessages[action.payload.roomId];
      if (!room) return;

      const { partnerUser, messages } = room;

      state.allMessages[action.payload.roomId].messages = messages.map((message) => {
        if (message.senderUserName === partnerUser.userName && message.isReadByReceiver === false) {
          return {
            ...message,
            isReadByReceiver: true,
          };
        }
        return message;
      });

      // Treat the room -------------------------------------------------------- //
      const currentRoom = state.rooms[action.payload.roomId];
      if (!currentRoom) return;

      // Reduce all of unread message numbers in all rooms
      state.allUnreadMsgNo -= currentRoom.unreadMessageNo;

      // Change "unreadMessageNo" to 0 of current room
      state.rooms[action.payload.roomId] = {
        ...currentRoom,
        unreadMessageNo: 0,
      };
    },

    initializeChat: (state) => {
      state.rooms = {};
      state.allMessages = {};
      state.allUnreadMsgNo = 0;
    },
  },
});

export const {
  setRooms,
  setNewRoom,
  treatNewMessage,
  setMessages,
  changeMsgsUnread,
  initializeChat,
} = chatSlice.actions;

export default chatSlice.reducer;
