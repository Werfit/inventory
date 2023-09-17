import { createSlice } from "@reduxjs/toolkit";

import type { Order } from "~/common/types/order";
import { orders } from "~/common/mocks/orders";

type InitialState = {
  orders: Order[];
};

const initialState: InitialState = {
  orders: orders,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
});

export default ordersSlice.reducer;
