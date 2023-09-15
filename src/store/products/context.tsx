"use client";
import { Provider } from "react-redux";
import { store } from "../store";

type Props = {
  children: React.ReactNode;
};

const ProductsProvider: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export { ProductsProvider };
