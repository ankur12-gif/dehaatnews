import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = import.meta.env.VITE_API_KEY

const URL = import.meta.env.VITE_NEWS_URL


export const newsApi = createApi({
    reducerPath: "nesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${URL}`,
    }),
    tagTypes: ["news"],

    endpoints: (builder) => ({
        getAllNews: builder.query({
            query: () => `latest?apiKey=${API_KEY}`,
            providesTags: ["news"]
        }),
    })

})

export const { useGetAllNewsQuery } = newsApi