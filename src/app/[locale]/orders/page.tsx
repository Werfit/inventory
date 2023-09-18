"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { useSelector } from "~/hooks/redux/hooks";

import { Order } from "./components/order/order";
import { OrderDetails } from "./components/order-details/order-details";
import type { Order as OrderType } from "~/common/types/order";

const OrdersPage = () => {
  const t = useTranslations();

  const { orders } = useSelector((state) => state.orders);
  const [currentOrder, setCurrentOrder] = useState<OrderType | null>(null);

  return (
    <div className="flex flex-col sm:gap-20 gap-10 animate__animated animate__fadeIn">
      <header className="flex items-center gap-4">
        <span className="text-lg font-bold tracking-wider">
          {t("ordersPage")} / {orders.length}
        </span>
      </header>

      <main className="flex gap-10 sm:flex-row flex-col ">
        <div
          className={`flex flex-col gap-4 min-w-[35%] flex-${Number(
            !currentOrder
          )}`}
        >
          {orders.map((order) => (
            <Order
              key={order.id}
              onClick={(order) => setCurrentOrder(order)}
              order={order}
            />
          ))}
        </div>

        {currentOrder !== null && (
          <OrderDetails
            order={currentOrder}
            onClose={() => setCurrentOrder(null)}
            className="flex-1"
          />
        )}
      </main>
    </div>
  );
};

export default OrdersPage;
