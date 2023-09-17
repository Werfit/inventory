import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
  prettyDOM,
} from "@testing-library/react";
import { OrderDetails } from "./order-details"; // Replace with the correct import path
import { useSelector, useDispatch } from "~/hooks/redux/hooks"; // Import the hooks
import { removeById } from "~/store/products/slices"; // Import the action
import { orders } from "~/common/mocks/orders";
import { products } from "~/common/mocks/products";
import { ANIMATION_TRANSITION } from "~/common/constants/animation";

// Mock the useSelector function
jest.mock("~/hooks/redux/hooks", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock the useTranslations function if needed
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key, // Mock translation function
}));

describe("OrderDetails Component", () => {
  const order = orders[1];

  const useSelectorMock = useSelector as jest.Mock;
  const useDispatchMock = useDispatch as jest.Mock;

  beforeEach(() => {
    // Reset the mock functions before each test
    useSelectorMock.mockReset();
    useDispatchMock.mockReset();
  });

  it("renders the order title and product list", () => {
    // Mock the useSelector function to return the desired state
    useSelectorMock.mockReturnValue({ products });

    render(
      <OrderDetails
        order={order}
        onClose={() => {}}
        className=""
      />
    );

    const correspondingProducts = products.filter(
      (product) => product.order === order.id
    );
    const titleElement = screen.getByText(order.title);
    const product1Element = screen.getByText(correspondingProducts[0].title);
    const product2Element = screen.getByText(correspondingProducts[1].title);

    expect(titleElement).toBeInTheDocument();
    expect(product1Element).toBeInTheDocument();
    expect(product2Element).toBeInTheDocument();
  });

  it("calls removeById when remove button is clicked", async () => {
    // Mock the useSelector function to return the desired state
    useSelectorMock.mockReturnValue({ products });

    const dispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(dispatchMock);

    render(
      <OrderDetails
        order={order}
        onClose={() => {}}
        className=""
      />
    );

    const product = products.find((product) => product.id === order.id)!;
    const productDetail = screen.getByText(product.title);
    const removeButton = within(
      productDetail.parentElement!.parentElement!.parentElement!
    ).getByText("delete");
    fireEvent.click(removeButton);

    const modal = screen.getByText("removalConfirmationTitle");
    const modalRemoveButton = within(modal.parentElement!).getByText(
      "removeButtonTitle"
    );

    fireEvent.click(modalRemoveButton);
    // Assert that the removeById action is dispatched
    expect(dispatchMock).toHaveBeenCalledWith(removeById(product.id)); // Replace with the actual product ID

    // Wait for the modal to close
    await waitFor(() => {
      const closeButton = screen.queryByText("closeButtonTitle");
      setTimeout(() => {
        expect(closeButton).not.toBeInTheDocument();
      }, ANIMATION_TRANSITION);
    });
  });
});
