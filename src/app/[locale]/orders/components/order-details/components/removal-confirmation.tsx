import { Popup } from "~/components/popup/popup";
import { Product } from "../../product/product";
import type { Product as ProductType } from "~/common/types/product";
import { useDispatch } from "~/hooks/redux/hooks";
import { removeById } from "~/store/products/slices";
import { useTranslations } from "next-intl";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  product: ProductType;
};

const RemovalConfirmationPopup: React.FC<Props> = ({
  isOpen,
  onClose,
  product,
}) => {
  const dispatch = useDispatch();
  const t = useTranslations();

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title={t("removalConfirmationTitle")}
    >
      <Product
        // we can be sure that at this point product is not null, because it is being set the same time popup visibility flag is set
        product={product!}
        isBeingRemoved
      />

      <footer className="flex justify-end gap-4">
        <button onClick={onClose}>{t("cancelButtonTitle")}</button>

        <button
          className="border border-red-500 shadow-md shadow-red-500/50 text-red-500 px-4 py-2 rounded-md"
          onClick={() => {
            dispatch(removeById(product.id));
            onClose();
          }}
        >
          {t("removeButtonTitle")}
        </button>
      </footer>
    </Popup>
  );
};

export { RemovalConfirmationPopup };
