import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { Product } from "~/lib/types/product";
import { products } from "~/lib/mocks/products";

type InitialState = {
  products: Product[];
};

const initialState: InitialState = {
  products: products,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    removeById: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { removeById } = productsSlice.actions;
export default productsSlice.reducer;
