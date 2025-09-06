import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const Url = import.meta.env.VITE_SERVER

export const analyticsApi = createApi({
    reducerPath: "analyticsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${Url}/api/v1/analytics/`,
    }),
    tagTypes: ["analytics"],

    endpoints: (builder) => ({

        getAllAnalyticsData: builder.query({
            query: () => `getdata`,
            providesTags: ["analytics"],
        }),

    }),
});

export const {
    useGetAllAnalyticsDataQuery
} = analyticsApi;
