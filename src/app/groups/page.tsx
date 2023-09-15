import { GroupTab } from "../../components/group-tab/group-tab";
import { GroupItemsList } from "../../components/group-items-list/group-items-list";

const GroupsPage = () => {
  return (
    <div className="flex flex-col gap-20">
      <header className="flex items-center gap-4">
        <button className="text-white bg-green-600 leading-3 rounded-full p-1 text-xs shadow-md shadow-green-600/50">
          <i className="material-symbols-outlined bg-green-500 rounded-full p-1 shadow-md shadow-green-500/50">
            add
          </i>
        </button>
        <span className="text-lg font-bold tracking-wider">Groups / 25</span>
      </header>

      <main className="flex gap-10">
        <div className="flex flex-col gap-4 min-w-[35%]">
          <GroupTab />
          <GroupTab />
          <GroupTab />
        </div>

        <GroupItemsList className="flex-1" />
      </main>
    </div>
  );
};

export default GroupsPage;
