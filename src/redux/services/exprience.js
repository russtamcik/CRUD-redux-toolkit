import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from "../../constants";
import Cookies from "js-cookie";

export const exprienceServices = createApi({
  reducerPath: "experiences",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPortfolios: builder.query({
      query: (page) => `experiences?page=${page}`,
      transformResponse: (res) => res,
    }),
    getPortfolio: builder.mutation({
      query: (id) => ({
        url: `experiences/${id}`,
        method: "GET",
      }),
    }),
    addPortfolio: builder.mutation({
      query: (body) => ({
        url: "experiences",
        method: "POST",
        body,
      }),
    }),
    updatePortfolio: builder.mutation({
      query: ({ id, body }) => ({
        url: `experiences/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deletePortfolio: builder.mutation({
      query: (id) => ({
        url: `experiences/${id}`,
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
} = exprienceServices;

export default exprienceServices.reducer;
