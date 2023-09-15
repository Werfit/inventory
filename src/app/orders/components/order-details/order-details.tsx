import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "~/hooks/redux/hooks";

import type { Order } from "~/lib/types/order";
import type { Product as ProductType } from "~/lib/types/product";

import { Popup } from "~/components/popup/popup";

import { Product } from "../product/product";
import { removeById } from "~/store/products/slices";
import { ANIMATION_TRANSITION } from "~/lib/constants/animation";

type Props = {
  order: Order;
  onClose: () => void;
  className: string;
};

const OrderDetails: React.FC<Props> = ({ order, onClose, className }) => {
  // needed for fade out animation
  const [isOpen, setIsOpen] = useState(true);

  const { products } = useSelector((state) => state.products);
  const orderProducts = useMemo(
    () => products.filter((product) => product.order === order.id),
    [products, order]
  );

  const dispatch = useDispatch();

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
              {orderProducts[0].price.find((price) => price.isDefault)?.symbol}
            </p>
            <p className="text-gray-500 text-sm">
              {orderProducts.reduce(
                (sum, product) =>
                  sum +
                  (product.price.find((price) => !price.isDefault)?.value ?? 0),
                0
              )}{" "}
              {orderProducts[0].price.find((price) => !price.isDefault)?.symbol}
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
      <Popup
        isOpen={isRemovalConfirmationOpen}
        onClose={() => {
          setRemovalConfirmation(false);
          // setCurrentlyRemovedProduct(null);
        }}
        title="Confirm item removal"
      >
        <Product
          // we can be sure that at this point product is not null, because it is being set the same time popup visibility flag is set
          product={currentlyRemovedProduct!}
          isBeingRemoved
        />

        <footer className="flex justify-end gap-4">
          <button
            onClick={() => {
              setRemovalConfirmation(false);
              // setCurrentlyRemovedProduct(null);
            }}
          >
            Cancel
          </button>

          <button
            className="border border-red-500 shadow-md shadow-red-500/50 text-red-500 px-4 py-2 rounded-md"
            onClick={() => {
              dispatch(removeById(currentlyRemovedProduct!.id));
              setRemovalConfirmation(false);
              // setCurrentlyRemovedProduct(null);
            }}
          >
            Delete
          </button>
        </footer>
      </Popup>
    </>
  );
};

export { OrderDetails };
