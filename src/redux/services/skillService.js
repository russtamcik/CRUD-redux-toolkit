import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from "../../constants";
import Cookies from "js-cookie";

export const skillsService = createApi({
  reducerPath: "skills",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPortfolios: builder.query({
      query: (page) => `skills?page=${page}`,
      transformResponse: (res) => res,
    }),
    getPortfolio: builder.mutation({
      query: (id) => ({
        url: `skills/${id}`,
        method: "GET",
      }),
    }),
    addPortfolio: builder.mutation({
      query: (body) => ({
        url: "skills",
        method: "POST",
        body,
      }),
    }),
    updatePortfolio: builder.mutation({
      query: ({ id, body }) => ({
        url: `skills/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deletePortfolio: builder.mutation({
      query: (id) => ({
        url: `skills/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPortfoliosQuery,
  useAddPortfolioMutation,
  useGetPortfolioMutation,
  useDeletePortfolioMutation,
  useUpdatePortfolioMutation,
} = skillsService;

export default skillsService.reducer;
