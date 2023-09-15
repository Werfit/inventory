import { useDispatch } from "~/hooks/redux/hooks";
import type { Product as ProductType } from "~/lib/types/product";
import { removeById } from "~/store/products/slices";

type Props = {
  product: ProductType;
};

const Product: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center">
      <div>
        <span className="block w-3 h-3 bg-green-500 rounded-full"></span>
      </div>

      <div className="flex gap-2 items-center flex-1 ml-4">
        <span className="material-symbols-outlined text-3xl">computer</span>
        <div>
          <h2 className="font-bold text-lg">{product.title}</h2>
          <p className="text-gray-500 text-xs">{product.serialNumber}</p>
        </div>
      </div>

      {/* todo: support different statuses */}
      <div className="w-20 flex-1 text-center">
        {product.inUse ? "In Use" : "In Repair"}
      </div>

      <div className="w-20 ml-auto">
        <button onClick={() => dispatch(removeById(product.id))}>
          <i className="material-symbols-outlined">delete</i>
        </button>
      </div>
    </div>
  );
};

export { Product };
