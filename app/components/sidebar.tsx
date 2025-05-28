import { Link, useLocation } from "react-router";
import {
  Home,
  Catalog,
  ShoppingCart,
  User,
  UserAvatar,
  Login,
  UserFollow,
} from "@carbon/icons-react";

import { cn } from "../lib/utils";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/records", label: "Records", icon: Catalog },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/buyer", label: "Buyer", icon: UserAvatar },
  { to: "/seller", label: "Seller", icon: User },
  { to: "/signin", label: "Sign In", icon: Login },
  { to: "/signup", label: "Sign Up", icon: UserFollow },
];

export function Sidebar() {
  const location = useLocation();
  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r bg-white/70 p-4 md:block">
      <nav className="grid gap-1 text-sm font-medium">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-100",
                active && "bg-gray-100 font-semibold"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

