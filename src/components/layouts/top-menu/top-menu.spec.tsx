import React from "react";
import { render, screen } from "@testing-library/react";
import { TopMenu } from "./top-menu";

const translations: Record<string, string | object> = {
  title: "My App",
  day: "Day",
  months: [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ],
};

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
    replace: jest.fn(),
  }),
  useParams: () => ({
    locale: "en",
  }),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    return translations[key];
  },
}));

describe("TopMenu", () => {
  it("renders with default locale and current time", () => {
    render(<TopMenu locale="en" />);

    // Check if the title and day are rendered
    expect(screen.getByText("My App")).toBeInTheDocument();
    expect(screen.getByText("Day")).toBeInTheDocument();

    // Check if the date and time are in the format we expect
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const formattedDate = `${day < 10 ? `0${day}` : day} ${
      translations[month]
    }, ${year}`;

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`;

    expect(screen.getByText(formattedDate)).toBeInTheDocument();
    expect(screen.getByText(formattedTime)).toBeInTheDocument();
  });
});
