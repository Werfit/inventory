"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { utcToZonedTime } from "date-fns-tz";

import { LanguagePicker } from "./components/language-picker";

// returns formatted time (e.g. 12:21)
const getFormattedTime = () => {
  const date = utcToZonedTime(new Date(), "Europe/Kyiv");
  const dateHours = date.getHours();
  const dateMinutes = date.getMinutes();

  const hours = dateHours < 10 ? `0${dateHours}` : dateHours;
  const minutes = dateMinutes < 10 ? `0${dateMinutes}` : dateMinutes;

  return `${hours}:${minutes}`;
};

type Props = {
  className?: string;
  locale: string;
};

const TopMenu: React.FC<Props> = ({ locale, className = "" }) => {
  const t = useTranslations();
  const [currentTime, setCurrentTime] = useState(getFormattedTime());

  // returns formatted date (e.g. 12 MAR, 2017)
  const getFormattedDate = () => {
    const date = utcToZonedTime(new Date(), "Europe/Kyiv");
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${day < 10 ? `0${day}` : day} ${t(`months.${month}`)}, ${year}`;
  };

  useEffect(() => {
    // should be one seconds, to avoid cases of clock update delay, like when website gets opened at 00:00:30 and then it waits a minute to update the clock.
    const INTERVAL = 1000;
    const timer = setInterval(
      () => setCurrentTime(getFormattedTime()),
      INTERVAL
    );

    return () => clearInterval(timer);
  });

  return (
    <nav
      className={`flex justify-center text-xs bg-white shadow-lg px-4 ${className}`}
    >
      <div className="container center flex justify-between items-center py-3">
        <div className="flex items-center gap-4">
          <p className="uppercase tracking-widest font-bold text-green-600">
            {t("title")}
          </p>
          <LanguagePicker
            locale={locale}
            languages={[
              { value: "en", label: "English" },
              {
                value: "ua",
                label: "Ukrainian",
              },
            ]}
          />
        </div>
        <div>
          <p>{t("day")}</p>
          <div className="flex gap-3">
            <span className="font-bold">{getFormattedDate()}</span>
            <span className="flex items-center gap-1">
              <i className="material-symbols-outlined text-xs text-green-600">
                schedule
              </i>
              <span suppressHydrationWarning>{currentTime}</span>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { TopMenu };
