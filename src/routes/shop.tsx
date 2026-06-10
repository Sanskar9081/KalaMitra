import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LayoutDashboard, Heart, ShoppingCart, Package, BookOpen, User } from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/dashboard-shell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/shop")({
  head: () => ({ meta: [{ title: "Shop · Kalamitra" }] }),
  component: ShopLayout,
});

const NAV: NavItem[] = [
  { to: "/shop", label: "Marketplace", icon: LayoutDashboard, exact: true },
  { to: "/shop/stories", label: "Artisan Stories", icon: BookOpen },
  { to: "/shop/wishlist", label: "Wishlist", icon: Heart },
  { to: "/shop/cart", label: "Cart", icon: ShoppingCart },
  { to: "/shop/orders", label: "My Orders", icon: Package },
  { to: "/shop/profile", label: "Profile", icon: User },
];

function ShopLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("kalamitra:user");
    if (!raw) navigate({ to: "/auth" });
  }, [user, navigate]);
  return (
    <DashboardShell nav={NAV} brand="Marketplace">
      <Outlet />
    </DashboardShell>
  );
}
