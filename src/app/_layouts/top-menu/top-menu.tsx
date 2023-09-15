"use client";
import { useEffect, useState } from "react";

// returns formatted date (e.g. 12 MAR, 2017)
const getFormattedDate = () => {
  const MONTHS = [
    "JUN",
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
  ];

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${day < 10 ? `0${day}` : day} ${MONTHS[month]}, ${year}`;
};

// returns formatted time (e.g. 12:21)
const getFormattedTime = () => {
  const date = new Date();
  const dateHours = date.getHours();
  const dateMinutes = date.getMinutes();

  const hours = dateHours < 10 ? `0${dateHours}` : dateHours;
  const minutes = dateMinutes < 10 ? `0${dateMinutes}` : dateMinutes;

  return `${hours}:${minutes}`;
};

type Props = {
  className?: string;
};

const TopMenu: React.FC<Props> = ({ className = "" }) => {
  const [currentTime, setCurrentTime] = useState(getFormattedTime());

  useEffect(() => {
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
        <p className="uppercase tracking-widest font-bold text-green-600">
          Inventory
        </p>
        <div>
          <p>Today</p>
          <div className="flex gap-3">
            <span className="font-bold">{getFormattedDate()}</span>
            <span className="flex items-center gap-1">
              <i className="material-symbols-outlined text-xs text-green-600">
                schedule
              </i>
              {currentTime}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { TopMenu };
