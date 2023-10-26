import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from "../../constants";
import Cookies from "js-cookie";

export const educationServices = createApi({
  reducerPath: "education",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPortfolios: builder.query({
      query: (page) => `education?page=${page}`,
      transformResponse: (res) => res,
    }),
    getPortfolio: builder.mutation({
      query: (id) => ({
        url: `education/${id}`,
        method: "GET",
      }),
    }),
    addPortfolio: builder.mutation({
      query: (body) => ({
        url: "education",
        method: "POST",
        body,
      }),
    }),
    updatePortfolio: builder.mutation({
      query: ({ id, body }) => ({
        url: `education/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deletePortfolio: builder.mutation({
      query: (id) => ({
        url: `education/${id}`,
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
} = educationServices;

export default educationServices.reducer;
