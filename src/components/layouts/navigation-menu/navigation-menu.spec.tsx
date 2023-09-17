import React from "react";
import { render, screen } from "@testing-library/react";
import { NavigationMenu } from "./navigation-menu";

type Message = {
  [k: string]: Message | string;
};

// Mock next-intl's useTranslations and usePathname
jest.mock("next-intl", () => ({
  useTranslations: () => (path: string) => {
    const translations: Message = {
      pageNames: {
        home: "Home",
        about: "About",
        contact: "Contact",
      },
    };

    // this variable is supposed to be of type any, because it can be of any type: object, string, array etc.
    let value: any = translations;

    for (const key of path.split(".")) {
      value = value[key];
    }

    return value;
  },
  usePathname: () => "/",
}));

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

jest.mock("~/common/constants/routes", () => ({
  Routes: [
    { name: "home", path: "/" },
    { name: "about", path: "/about" },
    { name: "contact", path: "/contact" },
  ],
}));

describe("NavigationMenu", () => {
  it("renders with the default tabs", () => {
    const tabs = ["home", "about", "contact"];
    render(<NavigationMenu tabs={tabs} />);

    // Check if the navigation menu renders
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("applies the 'underline' class to the active link", () => {
    const tabs = ["home", "about", "contact"];
    render(<NavigationMenu tabs={tabs} />);

    // Check if the 'Home' link has the 'underline' class
    const homeLink = screen.getByText("Home");
    expect(homeLink.parentElement).toHaveClass("underline");

    // Check if the 'About' link does not have the 'underline' class
    const aboutLink = screen.getByText("About");
    expect(aboutLink.parentElement).not.toHaveClass("underline");
  });

  it("renders the correct number of links", () => {
    const tabs = ["home", "about", "contact"];
    render(<NavigationMenu tabs={tabs} />);

    // Check if there are three links rendered
    const links = screen.getAllByRole("link");
    expect(links.length).toBe(3);
  });
});
