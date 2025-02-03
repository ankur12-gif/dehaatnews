import { configureStore } from "@reduxjs/toolkit"
import { userApi } from "./api/userApi";
import { postApi } from "./api/postApi";
import { userReducer } from "./reducer/userReducer.js"

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [postApi.reducerPath]: postApi.reducer,
        [userReducer.name]: userReducer.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(postApi.middleware)
});