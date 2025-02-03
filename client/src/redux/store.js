import { configureStore } from "@reduxjs/toolkit"
import { userApi } from "./api/userApi.js";
import { postApi } from "./api/postApi.js";
import { userReducer } from "./reducer/userReducer.js"


export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [postApi.reducerPath]: postApi.reducer,
        user: userReducer.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(postApi.middleware)
});