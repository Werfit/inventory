import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Item } from "./item"; // Replace with the correct import path
import { useDispatch, useSelector } from "~/hooks/redux/hooks"; // Import the hooks
import { products } from "~/common/mocks/products";

const mockedUseSelector = useSelector as jest.MockedFunction<
  typeof useSelector
>;
const mockedUseDispatch = useDispatch as jest.MockedFunction<
  typeof useDispatch
>;

// Mock the useDispatch and useSelector functions
jest.mock("~/hooks/redux/hooks", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock the useTranslations function
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key, // Mock translation function
}));

// Mock the removeById action
const mockDispatch = jest.fn();
jest.mock("~/store/products/slices", () => ({
  removeById: (id: number) => ({ type: "REMOVE_PRODUCT", payload: id }),
}));

describe("Item Component", () => {
  const orders = [
    { id: 1, title: "Order 1" },
    { id: 2, title: "Order 2" },
  ];

  beforeEach(() => {
    // Reset the mock functions before each test
    jest.clearAllMocks();
  });

  it("renders the product title", () => {
    // Mock the useSelector function to return the desired state
    mockedUseSelector.mockReturnValue({ orders });

    render(<Item product={products[0]} />);

    const titleElement = screen.getByText(products[0].title); // Replace with the actual title
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the order title", () => {
    // Mock the useSelector function to return the desired state
    mockedUseSelector.mockReturnValue({ orders });

    render(<Item product={products[0]} />);

    const orderElement = screen.getByText(
      orders.find((order) => order.id === products[0].id)?.title || "-"
    ); // Replace with the actual order title
    expect(orderElement).toBeInTheDocument();
  });

  it("dispatches removeById when the delete button is clicked", () => {
    // Mock the useDispatch function to capture dispatched actions
    mockedUseDispatch.mockReturnValue(mockDispatch);

    render(<Item product={products[0]} />);

    const deleteButton = screen.getByText("delete");
    fireEvent.click(deleteButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "REMOVE_PRODUCT",
      payload: products[0].id,
    }); // Replace with the actual product ID
  });
});
