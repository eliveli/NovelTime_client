/* eslint-disable */
// 지금은 뷰 구성에 집중할 것임. 린트 무시하는 주석은 나중에 해제하기
import { configureStore } from "@reduxjs/toolkit";
// import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import modalReducer from "./clientSlices/modalSlice";
import writingReducer from "./clientSlices/writingSlice";
import filterReducer from "./clientSlices/filterSlice";
import userReducer from "./clientSlices/userSlice";

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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
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
