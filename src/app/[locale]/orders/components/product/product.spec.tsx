import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Product } from "./product";
import { useTranslations } from "next-intl";
import { products } from "~/common/mocks/products";

const mockedUseTranslation = useTranslations as jest.MockedFunction<
  typeof useTranslations
>;

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

describe("Product Component", () => {
  const tMock = jest.fn((key) => key); // Mock the translation function

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the product title and serial number", () => {
    mockedUseTranslation.mockReturnValue(
      tMock as unknown as ReturnType<typeof useTranslations>
    );

    render(<Product product={products[0]} />);

    const titleElement = screen.getByText(products[0].title);
    const serialNumberElement = screen.getByText(products[0].serialNumber);

    expect(titleElement).toBeInTheDocument();
    expect(serialNumberElement).toBeInTheDocument();
  });

  it("renders the correct status when in use", () => {
    mockedUseTranslation.mockReturnValue(
      tMock as unknown as ReturnType<typeof useTranslations>
    );

    render(<Product product={{ ...products[0], inUse: true }} />);

    const statusElement = screen.getByText("modelBeingUsed");
    expect(statusElement).toBeInTheDocument();
  });

  it("renders the correct status when not in use", () => {
    mockedUseTranslation.mockReturnValue(
      tMock as unknown as ReturnType<typeof useTranslations>
    );

    render(<Product product={{ ...products[0], inUse: false }} />);

    const statusElement = screen.getByText("modelInRepair");
    expect(statusElement).toBeInTheDocument();
  });

  it("calls the onRemove function when the delete button is clicked", () => {
    const onRemoveMock = jest.fn();

    mockedUseTranslation.mockReturnValue(
      tMock as unknown as ReturnType<typeof useTranslations>
    );

    render(
      <Product
        product={products[0]}
        onRemove={onRemoveMock}
      />
    );

    const deleteButton = screen.getByText("delete");
    fireEvent.click(deleteButton);

    expect(onRemoveMock).toHaveBeenCalledWith(products[0]);
  });
});
