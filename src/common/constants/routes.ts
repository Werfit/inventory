type Route = {
  name: string;
  path: string;
};

const Routes: Route[] = [
  {
    name: "Orders",
    path: "/orders",
  },
  {
    name: "Products",
    path: "/products",
  },
];

export { Routes };
