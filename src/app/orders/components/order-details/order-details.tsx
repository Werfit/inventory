import { useMemo } from "react";
import { useSelector } from "~/hooks/redux/hooks";
import { Product } from "../product/product";
import type { Order } from "~/lib/types/order";

type Props = {
  order: Order;
  className: string;
};

const OrderDetails: React.FC<Props> = ({ order, className }) => {
  const { products } = useSelector((state) => state.products);
  const orderProducts = useMemo(
    () => products.filter((product) => product.order === order.id),
    [products, order]
  );

  return (
    <div
      className={`bg-white border border-gray-400 rounded-md px-6 py-3 max-h-screen overflow-y-scroll ${className}`}
    >
      <header className="font-bold tracking-wider text-lg">
        {order.title}
      </header>

      <button className="flex gap-2 text-sm items-center mt-4 text-green-500">
        <i className="material-symbols-outlined bg-green-500 rounded-full py-1 px-2 shadow-md shadow-green-500/25 text-sm text-white">
          add
        </i>
        Add product
      </button>

      <main className="mt-8 flex flex-col gap-2">
        {orderProducts.map((product) => (
          <Product
            key={product.id}
            product={product}
          />
        ))}
      </main>
    </div>
  );
};

export { OrderDetails };
