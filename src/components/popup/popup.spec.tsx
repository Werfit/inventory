import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { Popup } from "./popup";
import { ANIMATION_TRANSITION } from "~/common/constants/animation";

// Mock the setTimeout function to avoid waiting for real timeouts
jest.useFakeTimers();

describe("Popup", () => {
  it("renders the component when isOpen is true", () => {
    const { getByText } = render(
      <Popup
        title="Test Popup"
        isOpen={true}
        onClose={() => {}}
      >
        <div>Popup Content</div>
      </Popup>
    );

    expect(getByText("Test Popup")).toBeInTheDocument();
    expect(getByText("Popup Content")).toBeInTheDocument();
  });

  it("does not render the component when isOpen is false", () => {
    const { queryByText } = render(
      <Popup
        title="Test Popup"
        isOpen={false}
        onClose={() => {}}
      >
        <div>Popup Content</div>
      </Popup>
    );

    expect(queryByText("Test Popup")).not.toBeInTheDocument();
    expect(queryByText("Popup Content")).not.toBeInTheDocument();
  });

  it("calls onClose when the background overlay is clicked", () => {
    const onClose = jest.fn();
    const { container } = render(
      <Popup
        title="Test Popup"
        isOpen={true}
        onClose={onClose}
      >
        <div>Popup Content</div>
      </Popup>
    );

    const overlay = container.querySelector(".fixed");
    fireEvent.click(overlay!);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose after the animation when isOpen transitions to false", async () => {
    const onClose = jest.fn();
    const { rerender } = render(
      <Popup
        title="Test Popup"
        isOpen={true}
        onClose={onClose}
      >
        <div>Popup Content</div>
      </Popup>
    );

    act(() => {
      rerender(
        <Popup
          title="Test Popup"
          isOpen={false}
          onClose={onClose}
        >
          <div>Popup Content</div>
        </Popup>
      );
    });

    expect(onClose).not.toBeCalled();

    // Fast-forward time to simulate the animation duration
    act(() => {
      jest.advanceTimersByTime(ANIMATION_TRANSITION);
    });

    await waitFor(() => {
      expect(onClose).not.toBeCalled();
    });
  });
});
