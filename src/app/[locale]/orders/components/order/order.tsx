import { useMemo } from "react";
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

  return (
    <div
      className={`bg-white border border-gray-400 px-6 py-3 flex items-center rounded-sm shadow-md shadow-gray-400/25 ${className}`}
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
          {orderProducts.length}
        </p>
        <p>{order.date}</p>
      </div>
    </div>
  );
};

export { Order };
