/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RootCommentToShowReComments = { commentId: string; userName: string };

export type IsCommentState = {
  commentSortType: "new" | "old";
  commentPageNo: number;

  rootCommentToShowReComments: RootCommentToShowReComments;

  parentToWriteReComment: {
    parentCommentId: string;
    parentCommentUserName: string;
  };

  // to highlight the parent comment when user selects a reComment by clicking "원댓글보기"
  // parent might be a root comment or reComment in a root comment
  parentAndChildConnected: { parent: string; child: string };

  argsForApis: {
    talkId: string;
    novelId: string;
    novelTitle: string;
  };

  commentIdFromUserPageForScroll?: string;
  //
  commentToEdit: {
    commentId: string;
    commentContent: string;
    parentUserName: string;
  };
};

const initialState: IsCommentState = {
  commentSortType: "old",
  commentPageNo: 1,

  rootCommentToShowReComments: { commentId: "", userName: "" },

  parentToWriteReComment: {
    parentCommentId: "",
    parentCommentUserName: "",
  },

  parentAndChildConnected: { parent: "", child: "" },

  argsForApis: {
    talkId: "",
    novelId: "",
    novelTitle: "",
  },

  //  it can't work if the comment is reComment not root comment
  commentIdFromUserPageForScroll: undefined,
  //
  commentToEdit: {
    commentId: "",
    commentContent: "",
    parentUserName: "",
    // it can be empty string when comment is root comment
  },
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setRootCommentToShowReComments: (state, action: PayloadAction<RootCommentToShowReComments>) => {
      state.rootCommentToShowReComments = action.payload;
    },
    setParentToWriteReComment: (
      state,
      action: PayloadAction<{
        parentCommentId: string;
        parentCommentUserName: string;
      }>,
    ) => {
      state.parentToWriteReComment = action.payload;
    },
    setCommentSortType: (state, action: PayloadAction<"new" | "old">) => {
      state.commentSortType = action.payload;
    },
    setCommentPageNo: (state, action: PayloadAction<number>) => {
      state.commentPageNo = action.payload;
    },
    setParentAndChildConnected: (
      state,
      action: PayloadAction<{
        parent: string;
        child: string;
      }>,
    ) => {
      state.parentAndChildConnected = action.payload;
    },
    setArgsForApis: (
      state,
      action: PayloadAction<{
        talkId: string;
        novelId: string;
        novelTitle: string;
      }>,
    ) => {
      state.argsForApis = action.payload;
    },
    setCommentIdFromUserPageForScroll: (state, action: PayloadAction<string | undefined>) => {
      state.commentIdFromUserPageForScroll = action.payload;
    },
    initializeCommentStates: (state) => {
      state.rootCommentToShowReComments = {
        commentId: "",
        userName: "",
      };
      state.parentToWriteReComment = { parentCommentId: "", parentCommentUserName: "" };
      state.commentSortType = "old";
      state.commentPageNo = 1;
      state.parentAndChildConnected = { parent: "", child: "" };
      state.argsForApis = {
        talkId: "",
        novelId: "",
        novelTitle: "",
      };
      state.commentIdFromUserPageForScroll = undefined;
    },

    //
    setCommentToEdit: (
      state,
      action: PayloadAction<{ commentId: string; commentContent: string; parentUserName: string }>,
    ) => {
      state.commentToEdit = action.payload;
    },
  },
});

export const {
  setParentAndChildConnected,
  initializeCommentStates,
  setCommentIdFromUserPageForScroll,
  setCommentSortType,
  setArgsForApis,
  setRootCommentToShowReComments,
  setParentToWriteReComment,
  setCommentPageNo,
  setCommentToEdit,
} = commentSlice.actions;

export default commentSlice.reducer;
