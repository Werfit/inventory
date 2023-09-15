type Props = {
  title: string;
  isOpen?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const Popup: React.FC<Props> = ({ title, isOpen, onClose, children }) => {
  return (
    isOpen && (
      <div
        className="fixed w-screen h-screen bg-gray-500/50 cursor-pointer flex items-center justify-center top-0 left-0"
        onClick={() => onClose()}
      >
        <div
          className="w-1/3 h-fit bg-white shadow-md shadow-gray-400/50 rounded-md px-6 py-3 cursor-default flex flex-col gap-4"
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
