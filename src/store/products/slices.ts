import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { Product } from "~/common/types/product";
import { products } from "~/common/mocks/products";

import { StoreFieldNames } from "~/common/enums/store";

type InitialState = {
  products: Product[];
};

let loadedProducts = products;

// workaround for server-side rendering
if (typeof window !== "undefined") {
  const storedProducts = JSON.parse(
    localStorage.getItem(StoreFieldNames.products) || "[]"
  );

  if (!storedProducts || storedProducts.length === 0) {
    localStorage.setItem(StoreFieldNames.products, JSON.stringify(products));
  }

  loadedProducts = JSON.parse(
    localStorage.getItem(StoreFieldNames.products) || "[]"
  );
}

const initialState: InitialState = {
  products: loadedProducts,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    removeById: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );

      localStorage.setItem(
        StoreFieldNames.products,
        JSON.stringify(state.products)
      );
    },
  },
});

export const { removeById } = productsSlice.actions;
export default productsSlice.reducer;
