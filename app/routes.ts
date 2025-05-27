import { type RouteConfig, index, path } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  path("records/$slug", "routes/records.$slug.tsx"),
] satisfies RouteConfig;
