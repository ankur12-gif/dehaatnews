import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`,
    }),
    tagTypes: ["user"],

    endpoints: (builder) => ({
        userSignin: builder.mutation({
            query: (user) => ({
                url: `/loginUser`,
                method: "POST",
                body: user
            }),
            invalidatesTags: ["user"],
        }),
    }),
});

export const {
    useUserSigninMutation
} = userApi;
