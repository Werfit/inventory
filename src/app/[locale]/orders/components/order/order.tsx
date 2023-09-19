import { useMemo, useEffect, useState } from "react";
import { useSelector } from "~/hooks/redux/hooks";
import type { Order } from "~/common/types/order";

type Props = {
  order: Order;
  onClick?: (id: Order) => void;
  className?: string;
};

const Order: React.FC<Props> = ({ order, onClick, className = "" }) => {
  const { products } = useSelector((state) => state.products);
  const orderProducts = useMemo(
    () => products.filter((product) => product.order === order.id),
    [products, order]
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // since products are stored in localStorage, server data may differ from client data, this will prevent hydration warning
    setIsClient(true);
  }, []);

  return (
    <div
      className={`bg-white border border-gray-400 px-6 py-3 flex items-center rounded-sm shadow-md shadow-gray-400/25 overflow-scroll ${className}`}
    >
      <button
        onClick={() => (onClick ? onClick(order) : () => {})}
        className="border border-gray-300 leading-3 p-1 rounded-full"
      >
        <i className="material-symbols-outlined">list</i>
      </button>

      <div className="ml-3">
        <h2 className="text-lg">{order.title}</h2>
        <p className="text-xs text-gray-500">{order.description}</p>
      </div>

      <div className="text-xs text-gray-500 ml-auto">
        {/* active items amount */}
        <p>
          {orderProducts.filter((product) => !product.inUse).length} /{" "}
          {isClient ? orderProducts.length : 0}
        </p>
        <p>{order.date}</p>
      </div>
    </div>
  );
};

export { Order };
