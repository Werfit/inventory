type Props = {
  className?: string;
};

const GroupTab: React.FC<Props> = ({ className = "" }) => {
  return (
    <div
      className={`bg-white border border-gray-400 px-6 py-3 flex items-center rounded-sm shadow-md shadow-gray-400/25 ${className}`}
    >
      <button className="border border-gray-300 leading-3 p-1 rounded-full">
        <i className="material-symbols-outlined">list</i>
      </button>

      <div className="ml-3">
        <h2 className="text-lg">23</h2>
        <p className="text-xs text-gray-500">Some text</p>
      </div>

      <div className="text-xs text-gray-500 ml-auto">
        {/* active items amount */}
        <p>10 / 12</p>
        <p>06 OCT, 2017 </p>
      </div>
    </div>
  );
};

export { GroupTab };
