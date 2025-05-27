import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("records/:slug", "routes/records.$slug.tsx"),
  route("signin", "routes/signin.tsx"),
  route("signup", "routes/signup.tsx"),
  route("seller", "routes/seller.tsx"),


] satisfies RouteConfig;
