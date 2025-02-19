import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "./baseApi";
import { Cart, Item } from "../app/models/cart";
import { Product } from "../app/models/product";

function isProduct(product: Product | Item): product is Product {
  return (product as Product).description !== undefined;
}

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query<Cart, void>({
      query: () => ({
        url: "cart",
      }),
      providesTags: ["Cart"],
    }),
    addCartItem: builder.mutation<
      Cart,
      { product: Product | Item; quantity: number }
    >({
      query: ({ product, quantity }) => {
        const productId = isProduct(product) ? product.id : product.productId;
        console.log(productId);
        return {
          url: "cart",
          method: "POST",
          body: { productId: productId, quantity },
        };
      },
      onQueryStarted: async (
        { product, quantity },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const productId = isProduct(product) ? product.id : product.productId;
            console.log(product);
            const existingItem = draft.items.find(
              (item) => item.productId === productId 
            );
            if (existingItem) existingItem.quantity += quantity;
            else
              draft.items.push(
                isProduct(product) ? new Item(product, quantity) :product 
              );
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
    removeCartItem: builder.mutation<
      void,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `cart?productId=${productId}&quantity=${quantity}`,
        method: "DELETE",
      }),
      onQueryStarted: async (
        { productId, quantity },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const itemIndex = draft.items.findIndex(
              (item) => item.productId === productId
            );
            if (itemIndex >= 0) {
              draft.items[itemIndex].quantity -= quantity;
              if (draft.items[itemIndex].quantity <= 0) {
                draft.items.splice(itemIndex, 1);
              }
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartItemMutation,
  useRemoveCartItemMutation,
} = cartApi;
