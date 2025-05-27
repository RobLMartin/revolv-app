import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("records", "routes/records.tsx"),
  route("cart", "routes/cart.tsx"),
] satisfies RouteConfig;
