// todo: figure out why moving `_layouts` outside of app folder causes issues with styles

import "material-symbols";

import { TopMenu } from "./_layouts/top-menu/top-menu";
import { NavigationMenu } from "./_layouts/navigation-menu/navigation-menu";
import { Routes } from "~/lib/constants/routes";

import "../assets/styles/globals.css";

type Props = {
  children: React.ReactNode;
};

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="bg-gray-100/50 h-screen w-screen overflow-y-hidden">
          <div className="flex">
            <NavigationMenu
              className="mt-14 w-1/6"
              tabs={Routes.map((route) => route.name)}
            />
            <main className="mt-14 px-20 py-20 flex-1">{children}</main>
          </div>
          {/* can not be the top element, because it will break lower element margins */}
          <TopMenu className="fixed w-screen top-0" />
        </div>
      </body>
    </html>
  );
};

export const metadata = {
  title: "Inventory",
  description: "Inventory application for DZENCode",
};

export default RootLayout;
