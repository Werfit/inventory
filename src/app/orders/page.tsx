import { GroupTab } from "../../components/group-tab/group-tab";
import { GroupItemsList } from "../../components/group-items-list/group-items-list";

const OrdersPage = () => {
  return (
    <div className="flex flex-col gap-20">
      <header className="flex items-center gap-4">
        <span className="text-lg font-bold tracking-wider">Orders / 25</span>
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

export default OrdersPage;
