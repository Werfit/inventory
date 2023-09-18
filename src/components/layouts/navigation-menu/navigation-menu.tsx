"use client";

import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import Image from "next/image";

import { usePathname } from "next-intl/client";

import { Routes } from "~/common/constants/routes";
import PlaceHolderImage from "../../../../public/user-image.jpg";

type Props = {
  tabs: string[];
  className?: string;
};

const NavigationMenu: React.FC<Props> = ({ tabs, className = "" }) => {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <nav
      className={`bg-gray-100 sm:h-screen py-8 px-4 flex justify-center ${className}`}
    >
      <div className="flex gap-5 items-center justify-between w-full sm:block">
        <div className="relative">
          <Image
            src={PlaceHolderImage}
            alt="User image"
            className="w-20 h-20 sm:w-40 sm:h-40 object-cover rounded-full"
            priority
          />
          <button className="absolute bottom-0 right-0 bg-white shadow-lg shadow-gray-100/50 py-1 px-2 sm:py-2 sm:px-3 rounded-full">
            <i className="material-symbols-outlined sm:text-xl leading-7 text-lg">
              settings
            </i>
          </button>
        </div>

        <ul className="text-center sm:mt-10 flex sm:flex-col gap-3">
          {tabs.map((tab, index) => {
            const route = Routes.find((route) => route.name === tab);

            return (
              <li
                key={index}
                className={
                  route?.path === pathname
                    ? `underline decoration-2 decoration-green-600 underline-offset-8`
                    : ""
                }
              >
                <Link href={route?.path ?? "/"}>{t(`pageNames.${tab}`)}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export { NavigationMenu };
