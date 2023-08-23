import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import modalReducer from "./clientSlices/modalSlice";
import writingReducer from "./clientSlices/writingSlice";
import filterReducer from "./clientSlices/filterSlice";
import userReducer from "./clientSlices/userSlice";
import commentReducer from "./clientSlices/commentSlice";
import userNovelListReducer from "./clientSlices/userNovelListSlice";

import { novelTimeApi } from "./serverAPIs/novelTime";
import { imageHostingApi } from "./serverAPIs/imageHosting";

const store = configureStore({
  reducer: {
    [novelTimeApi.reducerPath]: novelTimeApi.reducer,
    [imageHostingApi.reducerPath]: imageHostingApi.reducer,
    modal: modalReducer,
    writing: writingReducer,
    filter: filterReducer,
    user: userReducer,
    comment: commentReducer,
    userNovelList: userNovelListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(logger)
      .concat(novelTimeApi.middleware)
      .concat(imageHostingApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
