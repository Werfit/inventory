"use client";

import { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import {
  SelectValue,
  Option,
} from "react-tailwindcss-select/dist/components/type";
import { useSelector } from "~/hooks/redux/hooks";

type OnChangeProps = {
  key: string;
  value: string;
};

type Props = {
  onChange: (value: OnChangeProps) => void;
  className?: string;
};

const Filters: React.FC<Props> = ({ onChange, className = "" }) => {
  const { products } = useSelector((state) => state.products);

  const [currentModel, setCurrentModel] = useState<Option | null>(null);
  const [currentSpecification, setCurrentSpecification] =
    useState<Option | null>(null);

  const [models, setModels] = useState<string[]>([]);
  const [specifications, setSpecifications] = useState<string[]>([]);

  useEffect(() => {
    // gets models and specification without repetitions whenever products array is updated
    const _models = new Set<string>();
    const _specifications = new Set<string>();

    for (const product of products) {
      _models.add(product.type);
      _specifications.add(product.specification);
    }

    setModels(Array.from(_models));
    setSpecifications(Array.from(_specifications));
  }, [products]);

  const onModelChange = (value: SelectValue) => {
    const option = value as Option;
    setCurrentModel(option);
    onChange({ key: "model", value: option?.value });
  };

  const onSpecificationChange = (value: SelectValue) => {
    const option = value as Option;
    setCurrentSpecification(option);
    onChange({ key: "specification", value: option?.value });
  };

  return (
    <div className={`flex gap-4 ${className}`}>
      <div className="flex flex-1 items-center gap-2">
        Model:
        <Select
          options={models.map((model) => ({
            value: model,
            label: model,
          }))}
          value={currentModel}
          onChange={onModelChange}
          primaryColor="emerald"
          isClearable
        />
      </div>
      <div className="flex flex-1 items-center gap-2">
        Specification:
        <Select
          options={specifications.map((specification) => ({
            value: specification,
            label: specification,
          }))}
          value={currentSpecification}
          onChange={onSpecificationChange}
          primaryColor="emerald"
          isClearable
        />
      </div>
    </div>
  );
};

export { Filters };
