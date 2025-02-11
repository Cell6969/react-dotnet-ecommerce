import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "./baseApi";
import { Cart } from "../app/models/basket";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    getCart: builder.query<Cart, void>({
      query: () => ({
        url: "cart",
      }),
    }),
    addCartItem: builder.mutation<
      Cart,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: "cart",
        method: "POST",
        body: { productId, quantity },
      }),
    }),
    removeCartItem: builder.mutation<
      void,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `cart?productId=${productId}&quantity=${quantity}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartItemMutation,
  useRemoveCartItemMutation,
} = cartApi;
