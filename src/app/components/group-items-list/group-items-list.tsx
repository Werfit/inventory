type Props = {
  className: string;
};

const GroupItemsList: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={`bg-white border border-gray-400 rounded-md px-6 py-3 ${className}`}
    >
      <h2 className="font-bold tracking-wider text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
      </h2>

      <button className="flex gap-2 text-sm items-center mt-4 text-green-500">
        <i className="material-symbols-outlined bg-green-500 rounded-full py-1 px-2 shadow-md shadow-green-500/25 text-sm text-white">
          add
        </i>
        Add product
      </button>
    </div>
  );
};

export { GroupItemsList };
