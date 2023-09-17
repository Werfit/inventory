type Price = {
  value: number;
  symbol: string;
  isDefault: boolean;
};

type Product = {
  id: number;
  serialNumber: string;
  inUse: boolean;
  isNew: boolean;
  photo: string;
  title: string;
  type: string;
  specification: string;
  guarantee: {
    start: string;
    end: string;
  };
  price: Price[];
  order: number;
  date: string;
};

export type { Product };
