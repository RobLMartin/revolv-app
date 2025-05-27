import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("vendors/:vendorId", "routes/vendors.$vendorId.tsx"),
] satisfies RouteConfig;
