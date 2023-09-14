import { Header } from "../app/layouts/header/header";
import { Sidebar } from "../app/layouts/sidebar/sidebar";
import { Routes } from "./routes";

import "../assets/styles/globals.css";

type Props = {
  children: React.ReactNode;
};

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=optional"
        />
      </head>
      <body>
        <div className="bg-gray-100/50 h-screen w-screen overflow-y-hidden">
          <div className="flex">
            <Sidebar
              className="mt-14 w-1/6"
              tabs={Routes.map((route) => route.name)}
            />
            <main className="mt-14 px-20 py-20 flex-1">{children}</main>
          </div>
          {/* can not be the top element, because it will break lower element margins */}
          <Header className="fixed w-screen top-0" />
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
