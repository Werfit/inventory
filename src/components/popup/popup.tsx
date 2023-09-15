import { useState, useEffect } from "react";
import { ANIMATION_TRANSITION } from "~/lib/constants/animation";

type Props = {
  title: string;
  isOpen?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const Popup: React.FC<Props> = ({ title, isOpen, onClose, children }) => {
  const [shouldBeOpened, setShouldBeOpened] = useState(isOpen);

  useEffect(() => {
    if (!isOpen && shouldBeOpened) {
      setTimeout(() => {
        setShouldBeOpened(false);
      }, ANIMATION_TRANSITION);
      return;
    }

    setShouldBeOpened(isOpen);
  }, [isOpen]);

  return (
    shouldBeOpened && (
      <div
        className={`fixed w-screen h-screen bg-gray-500/50 cursor-pointer flex items-center justify-center top-0 left-0 animate__animated ${
          isOpen ? "animate__fadeIn" : "animate__fadeOut"
        }`}
        onClick={() => onClose()}
      >
        <div
          className={`w-1/3 h-fit bg-white shadow-md shadow-gray-400/50 rounded-md px-6 py-3 cursor-default flex flex-col gap-4 animate__animated ${
            isOpen ? "animate__slideInDown" : "animate__slideOutUp"
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <header className="font-bold tracking-wider">{title}</header>

          {children}
        </div>
      </div>
    )
  );
};

export { Popup };
