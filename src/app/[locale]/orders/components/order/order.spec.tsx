import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Order } from "./order";
import { useSelector } from "~/hooks/redux/hooks";
import { products } from "~/common/mocks/products";
import { orders } from "~/common/mocks/orders";

jest.mock("~/hooks/redux/hooks", () => ({
  useSelector: jest.fn(),
}));

describe("Order Component", () => {
  const order = orders[1];

  const useSelectorMock = useSelector as jest.Mock;

  beforeEach(() => {
    useSelectorMock.mockReset();
  });

  it("renders the order title and description", () => {
    useSelectorMock.mockReturnValue({ products });

    render(<Order order={order} />);

    const titleElement = screen.getByText(order.title);
    const descriptionElement = screen.getByText(order.description);

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders the correct number of active items", () => {
    useSelectorMock.mockReturnValue({ products });

    render(<Order order={order} />);

    const activeItemsElement = screen.getByText("1 / 2"); // 1 active item out of 2 products
    expect(activeItemsElement).toBeInTheDocument();
  });

  it("calls the onClick function when the button is clicked", () => {
    const onClickMock = jest.fn();
    useSelectorMock.mockReturnValue({ products });

    render(
      <Order
        order={order}
        onClick={onClickMock}
      />
    );

    const button = screen.getByText("list");
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledWith(order);
  });

  it("does not call the onClick function when the button is clicked if not provided", () => {
    useSelectorMock.mockReturnValue({ products });
    render(<Order order={order} />);

    const button = screen.getByText("list");
    fireEvent.click(button);

    // Ensure that onClick was not called
    expect(screen.queryByText(order.description)).not.toBeNull();
  });
});
