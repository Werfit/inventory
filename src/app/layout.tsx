import "material-symbols";

import { TopMenu } from "~/components/layouts/top-menu/top-menu";
import { NavigationMenu } from "~/components/layouts/navigation-menu/navigation-menu";
import { Routes } from "~/lib/constants/routes";

import "../assets/styles/globals.css";
import { ProductsProvider } from "~/store/products/context";

type Props = {
  children: React.ReactNode;
};

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="bg-gray-100/50 h-screen w-screen overflow-hidden">
          <div className="flex h-full">
            <NavigationMenu
              className="mt-14 min-w-1/6"
              tabs={Routes.map((route) => route.name)}
            />
            <ProductsProvider>
              <main className="mt-14 px-20 py-20 flex-1 overflow-x-hidden">
                {children}
              </main>
            </ProductsProvider>
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
