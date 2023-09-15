type Route = {
  name: string;
  path: string;
};

const Routes: Route[] = [
  {
    name: "Income",
    path: "/income",
  },
  {
    name: "Groups",
    path: "/groups",
  },
  {
    name: "Products",
    path: "/products",
  },
] as const;

export { Routes };
