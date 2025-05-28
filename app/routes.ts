
import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/landing.tsx"),
  route("app", "routes/home.tsx"),
  route("app/vendors/:vendorId", "routes/vendors.$vendorId.tsx"),
  route("app/records", "routes/records.tsx"),
  route("app/cart", "routes/cart.tsx"),
  route("app/records/:slug", "routes/records.$slug.tsx"),
  route("signin", "routes/signin.tsx"),
  route("signup", "routes/signup.tsx"),
  route("app/seller", "routes/seller.tsx"),
  route("app/buyer", "routes/buyer.tsx"),

] satisfies RouteConfig;
