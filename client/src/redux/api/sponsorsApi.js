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
} = sponsorApi;
