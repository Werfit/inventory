import { useMemo, useState } from "react";
import { useSelector } from "~/hooks/redux/hooks";

import type { Order } from "~/common/types/order";
import type { Product as ProductType } from "~/common/types/product";

import { Product } from "../product/product";
import { ANIMATION_TRANSITION } from "~/common/constants/animation";
import { useTranslations } from "next-intl";
import { RemovalConfirmationPopup } from "./components/removal-confirmation";

type Props = {
  order: Order;
  onClose: () => void;
  className: string;
};

const OrderDetails: React.FC<Props> = ({ order, onClose, className }) => {
  const t = useTranslations();
  // needed for fade out animation
  const [isOpen, setIsOpen] = useState(true);

  const { products } = useSelector((state) => state.products);
  const orderProducts = useMemo(
    () => products.filter((product) => product.order === order.id),
    [products, order]
  );

  const [isRemovalConfirmationOpen, setRemovalConfirmation] = useState(false);
  const [currentlyRemovedProduct, setCurrentlyRemovedProduct] =
    useState<ProductType | null>(null);

  return (
    <>
      <div
        className={`bg-white border border-gray-400 rounded-md px-6 py-3 max-h-screen relative animate__animated ${
          isOpen ? "animate__fadeInRight" : "animate__fadeOutRight"
        } ${className}`}
      >
        <button
          className="absolute right-0 top-0 leading-3 p-2 text-2xl bg-white shadow-md shadow-gray-300/50 rounded-full translate-x-1/2 -translate-y-1/2"
          onClick={() => {
            setIsOpen(false);
            setTimeout(() => onClose(), ANIMATION_TRANSITION);
          }}
        >
          <i className="material-symbols-outlined">close</i>
        </button>
        <header className="font-bold tracking-wider text-lg">
          {order.title}
        </header>

        {orderProducts.length > 0 && (
          <div className="text-sm items-center mt-4">
            <p className="font-bold tracking-wider">
              {orderProducts.reduce(
                (sum, product) =>
                  sum +
                  (product.price.find((price) => price.isDefault)?.value ?? 0),
                0
              )}{" "}
              {t(
                `currencies.${
                  orderProducts[0].price.find((price) => price.isDefault)
                    ?.symbol
                }`
              )}
            </p>
            <p className="text-gray-500 text-sm">
              {orderProducts.reduce(
                (sum, product) =>
                  sum +
                  (product.price.find((price) => !price.isDefault)?.value ?? 0),
                0
              )}{" "}
              {t(
                `currencies.${
                  orderProducts[0].price.find((price) => !price.isDefault)
                    ?.symbol
                }`
              )}
            </p>
          </div>
        )}

        <main className="mt-8 flex flex-col gap-2">
          {orderProducts.map((product) => (
            <Product
              key={product.id}
              product={product}
              onRemove={(product) => {
                setRemovalConfirmation(true);
                setCurrentlyRemovedProduct(product);
              }}
            />
          ))}
        </main>
      </div>

      <RemovalConfirmationPopup
        isOpen={isRemovalConfirmationOpen}
        product={currentlyRemovedProduct!}
        onClose={() => setRemovalConfirmation(false)}
      />
    </>
  );
};

export { OrderDetails };
