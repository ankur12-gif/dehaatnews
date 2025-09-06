import { configureStore } from "@reduxjs/toolkit"
import { userApi } from "./api/userApi.js";
import { postApi } from "./api/postApi.js";
import { userReducer } from "./reducer/userReducer.js"
import { newsApi } from "./api/newsApi.js";
import { postReducer } from "./reducer/postReducer.js";
import { sponsorApi } from "./api/sponsorsApi.js";
import { analyticsApi } from "./api/analyticsApi.js";


export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [postApi.reducerPath]: postApi.reducer,
        [newsApi.reducerPath]: newsApi.reducer,
        [sponsorApi.reducerPath]: sponsorApi.reducer,
        [analyticsApi.reducerPath]: analyticsApi.reducer,
        user: userReducer.reducer,
        category: postReducer.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(postApi.middleware)
            .concat(newsApi.middleware)
            .concat(sponsorApi.middleware)
            .concat(analyticsApi.middleware)
});