import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./products/slices";
import ordersReducer from "./orders/slices";

const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch };
