import { useTranslations } from "next-intl";
import { utcToZonedTime } from "date-fns-tz";

import { useDispatch, useSelector } from "~/hooks/redux/hooks";
import { removeById } from "~/store/products/slices";
import type { Product } from "~/common/types/product";

type Props = {
  product: Product;
  className?: string;
};

const formatShortDate = (date: string) => {
  const date_ = utcToZonedTime(new Date(date), "Europe/Kyiv");

  const month = date_.getMonth() + 1;
  const day = date_.getDate();

  return `${day < 10 ? `0${day}` : day} / ${month < 10 ? `0${month}` : month}`;
};

const Item: React.FC<Props> = ({ product, className = "" }) => {
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const t = useTranslations();

  const formatDate = (date: string) => {
    const date_ = utcToZonedTime(new Date(date), "Europe/Kyiv");

    const year = date_.getFullYear();
    const month = date_.getMonth();
    const day = date_.getDate();

    return `${day < 10 ? `0${day}` : day} ${t(`months.${month}`)}, ${year}`;
  };

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
      <div className="w-40 text-center">
        {product.inUse ? t("modelBeingUsed") : t("modelInRepair")}
      </div>

      <div className="w-52 text-center">
        <p>
          {t("timeRanges.From")} {product.guarantee.start}
        </p>
        <p>
          {t("timeRanges.To")} {product.guarantee.end}
        </p>
      </div>

      <div className="w-40 text-center">
        {product.isNew ? t("modelNew") : t("modelWasUsed")}
      </div>

      <div className="w-52 text-center">
        <p className="text-gray-500 text-xs">
          {secondaryPrice
            ? `${secondaryPrice.value} ${t(
                `currencies.${secondaryPrice.symbol}`
              )}`
            : "-"}
        </p>
        <h2>
          {primaryPrice
            ? `${primaryPrice.value} ${t(`currencies.${primaryPrice.symbol}`)}`
            : "-"}
        </h2>
      </div>

      <div className="w-96">
        {orders.find((order) => order.id === product.order)?.title ?? "-"}
      </div>

      <div className="w-96">{product.specification}</div>

      <div className="w-52 text-center">
        <p className="text-gray-500 text-xs">{formatShortDate(product.date)}</p>
        <h2>{formatDate(product.date)}</h2>
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
