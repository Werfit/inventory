import { useDispatch } from "~/hooks/redux/hooks";
import { removeById } from "~/store/products/slices";
import type { Product } from "~/lib/types/product";

type Props = {
  product: Product;
  className?: string;
};

const Item: React.FC<Props> = ({ product, className = "" }) => {
  const dispatch = useDispatch();

  // maybe should memoize it, but as long as there are not many price currencies, it's not that big of a deal
  const secondaryPrice = product.price.find((price) => !price.isDefault);
  const primaryPrice = product.price.find((price) => price.isDefault);

  return (
    <div
      className={`flex bg-white border border-gray-400  px-6 py-3 rounded-md shadow-md shadow-gray-400/10 items-center overflow-auto ${className}`}
    >
      <div>
        <span
          className={`block w-3 h-3 rounded-full bg-${
            product.inUse ? "emerald" : "red"
          }-500`}
        ></span>
      </div>

      <div className="flex gap-2 items-center w-96 ml-4">
        <span className="material-symbols-outlined text-3xl">computer</span>
        <div>
          <h2 className="font-bold text-lg">{product.title}</h2>
          <p className="text-gray-500 text-xs">{product.serialNumber}</p>
        </div>
      </div>

      {/* todo: support different statuses */}
      <div className="w-20 text-center">
        {product.inUse ? "In Use" : "In Repair"}
      </div>

      <div className="w-52 text-center">
        <p>From {product.guarantee.start}</p>
        <p>To {product.guarantee.end}</p>
      </div>

      <div className="w-20 text-center">{product.isNew ? "New" : "Used"}</div>

      <div className="w-52 text-center">
        <p className="text-gray-500 text-xs">
          {secondaryPrice
            ? `${secondaryPrice.value} ${secondaryPrice.symbol}`
            : "-"}
        </p>
        <h2>
          {primaryPrice ? `${primaryPrice.value} ${primaryPrice.symbol}` : "-"}
        </h2>
      </div>

      <div className="w-96">SHOULD BE ORDER HERE</div>

      <div className="w-20 text-center">-</div>

      <div className="w-96">{product.specification}</div>

      <div className="w-52 text-center">
        <p className="text-gray-500 text-xs">06/12</p>
        <h2>06 SEP, 2017</h2>
      </div>

      <div className="w-20">
        <button onClick={() => dispatch(removeById(product.id))}>
          <i className="material-symbols-outlined">delete</i>
        </button>
      </div>
    </div>
  );
};

export { Item };
