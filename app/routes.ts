import { type RouteConfig, index, path } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  path("records", "routes/records.tsx"),
  path("cart", "routes/cart.tsx"),
] satisfies RouteConfig;
