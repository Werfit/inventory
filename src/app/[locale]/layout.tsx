import "animate.css";
import "material-symbols";

import { notFound } from "next/navigation";

import { ProductsProvider } from "~/store/provider";

import { Routes } from "~/common/constants/routes";

import { TopMenu } from "~/components/layouts/top-menu/top-menu";
import { NavigationMenu } from "~/components/layouts/navigation-menu/navigation-menu";

import "~/assets/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ua" }];
}

const RootLayout: React.FC<Props> = async ({
  children,
  params: { locale },
}) => {
  let messages;

  try {
    messages = (await import(`../../../public/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <div className="bg-gray-100/50 h-screen w-screen overflow-hidden">
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
          >
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
            <TopMenu
              className="fixed w-screen top-0"
              locale={locale}
            />
          </NextIntlClientProvider>
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
