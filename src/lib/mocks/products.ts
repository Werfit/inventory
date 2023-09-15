const products = [
  {
    id: 1,
    serialNumber: "SN-12.3456789",
    inUse: true,
    isNew: true,
    photo: "pathToFile.jpg",
    title: "Gigabyte Technology X58-USB3 (Socket 1366) 6 X58-USB3",
    type: "Monitors",
    specification: "Specification 1",
    guarantee: {
      start: "2017-06-29 12:09:33",
      end: "2017-06-29 12:09:33",
    },
    price: [
      { value: 100, symbol: "USD", isDefault: false },
      { value: 2600, symbol: "UAH", isDefault: true },
    ],
    order: 1,
    date: "2017-06-29 12:09:33",
  },
  {
    id: 2,
    serialNumber: "SN-12.3456790",
    inUse: true,
    isNew: true,
    photo: "pathToFile.jpg",
    title: "Product 2",
    type: "Monitors",
    specification: "Specification 2",
    guarantee: {
      start: "2017-07-28 12:09:33",
      end: "2019-06-29 18:03:23",
    },
    price: [
      { value: 100, symbol: "USD", isDefault: false },
      { value: 2600, symbol: "UAH", isDefault: true },
    ],
    order: 2,
    date: "2017-07-28 12:09:33",
  },
  {
    id: 3,
    serialNumber: "SM-24.1456790",
    inUse: false,
    isNew: false,
    photo: "pathToFile.jpg",
    title: "Product 3",
    type: "Desktop",
    specification: "Specification 3",
    guarantee: {
      start: "2017-07-28 12:09:33",
      end: "2019-06-29 18:03:23",
    },
    price: [
      { value: 100, symbol: "USD", isDefault: false },
      { value: 2600, symbol: "UAH", isDefault: true },
    ],
    order: 2,
    date: "2017-07-28 12:09:33",
  },
];

export { products };
