"use client";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";

import { Routes } from "../../routes";
import { Icon } from "~/app/components/icon/Icon";

type Props = {
  tabs: string[];
  className?: string;
};

const Sidebar: React.FC<Props> = ({ tabs, className = "" }) => {
  const pathname = usePathname();

  return (
    <nav
      className={`bg-gray-100 h-screen py-8 px-4 flex justify-center ${className}`}
    >
      <div>
        <div className="relative">
          <Image
            src="/user-image.jpg"
            alt="User image"
            className="w-40 h-40 object-cover rounded-full"
            width={500}
            height={500}
          />
          <button className="absolute bottom-0 right-0 bg-white shadow-lg shadow-gray-100/50 py-2 px-3 rounded-full">
            <i className="material-symbols-outlined text-xl">settings</i>
          </button>
        </div>

        <ul className="text-center mt-10 flex flex-col gap-3">
          {tabs.map((tab, index) => (
            <li
              key={index}
              className={
                tab === pathname
                  ? `underline decoration-2 decoration-green-600 underline-offset-8`
                  : ""
              }
            >
              <Link
                // not really effective, but it's not that much of routes
                href={Routes.find((route) => route.name === tab)?.path ?? "/"}
              >
                {tab}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export { Sidebar };
