import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("records/:slug", "routes/records.$slug.tsx"),
] satisfies RouteConfig;
