"use client";

import { useSelector } from "~/hooks/redux/hooks";

import { Filters } from "./components/filters/filters";
import { Item } from "./components/item/item";
import { useEffect, useState } from "react";
import { Product } from "~/common/types/product";
import { useTranslations } from "next-intl";

const ProductsPage = () => {
  const t = useTranslations();

  const { products } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [appliedFilters, setFilters] = useState({
    specification: null,
    model: null,
  });

  useEffect(() => {
    const visibleProducts = [];

    for (const product of products) {
      if (!appliedFilters.model && !appliedFilters.specification) {
        visibleProducts.push(product);
        continue;
      }

      if (
        appliedFilters.model &&
        appliedFilters.specification &&
        appliedFilters.model === product.type &&
        appliedFilters.specification === product.specification
      ) {
        visibleProducts.push(product);
        continue;
      }

      if (
        !appliedFilters.model &&
        appliedFilters.specification === product.specification
      ) {
        visibleProducts.push(product);
        continue;
      }

      if (
        !appliedFilters.specification &&
        appliedFilters.model === product.type
      ) {
        visibleProducts.push(product);
        continue;
      }
    }

    setFilteredProducts(visibleProducts);
  }, [appliedFilters, products]);

  const updateFilters = (filter: { key: string; value: string }) => {
    setFilters((state) => ({ ...state, [filter.key]: filter.value }));
  };

  return (
    <div className="flex flex-col gap-20 overflow-y-scroll animate__animated animate__fadeIn">
      <header className="flex items-center gap-10 w-full ">
        <span className="text-lg font-bold tracking-wider">
          {t("productsPage")} / {filteredProducts.length}
        </span>
        <Filters
          onChange={updateFilters}
          className="flex-1"
        />
      </header>

      <main className="w-full h-full sm:overflow-scroll">
        <div className="table">
          {filteredProducts.map((product) => (
            <Item
              key={product.id}
              product={product}
              className="mb-4"
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
