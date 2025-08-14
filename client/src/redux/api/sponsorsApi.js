import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const Url = import.meta.env.VITE_SERVER;

export const sponsorApi = createApi({
    reducerPath: "sponsorApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${Url}/api/v1/sponsors/`,
    }),
    tagTypes: ["sponsors"],

    endpoints: (builder) => ({
        createSponsors: builder.mutation({
            query: ({ sponsorData, id }) => ({
                url: `createSponsors?id=${id}`,
                method: "POST",
                body: sponsorData,
            }),
            invalidatesTags: ["sponsors"],
        }),

        getAllSponsors: builder.query({
            query: () => `getSponsors`,
            providesTags: ["sponsors"],
        }),
        getLimitedSponsors: builder.query({
            query: ({ page = 1, limit = 4, category = "general" } = {}) => ({
                url: "/getLimitedSponsors",
                method: "POST",
                body: { page, limit, category },
            }),
            providesTags: ["posts"]
        }),

        deleteSponsor: builder.mutation({
            query: (sponsorId) => ({
                url: `${sponsorId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["sponsors"],
        }),
    }),
});

export const {
    useCreateSponsorsMutation,
    useDeleteSponsorMutation,
    useGetAllSponsorsQuery,
    useGetLimitedSponsorsQuery
} = sponsorApi;
