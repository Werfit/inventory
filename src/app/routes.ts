import GroupsPage from "./groups/page";
import IncomePage from "./income/page";
import ProductsPage from "./products/page";

type Route = {
  name: string;
  path: string;
  component: React.FC;
};

const Routes: Route[] = [
  {
    name: "Income",
    path: "/income",
    component: IncomePage,
  },
  {
    name: "Groups",
    path: "/groups",
    component: GroupsPage,
  },
  {
    name: "Products",
    path: "/products",
    component: ProductsPage,
  },
];

export { Routes };
