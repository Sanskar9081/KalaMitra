import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LayoutDashboard, Upload, Package, ShoppingCart, TrendingUp, Star, User, LifeBuoy } from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/dashboard-shell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/seller")({
  head: () => ({ meta: [{ title: "Seller · Kalamitra" }] }),
  component: SellerLayout,
});

const NAV: NavItem[] = [
  { to: "/seller", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/seller/upload", label: "AI Product Studio", icon: Upload },
  { to: "/seller/products", label: "My Products", icon: Package },
  { to: "/seller/orders", label: "Orders", icon: ShoppingCart },
  { to: "/seller/revenue", label: "Revenue", icon: TrendingUp },
  { to: "/seller/reviews", label: "Reviews", icon: Star },
  { to: "/seller/profile", label: "Profile", icon: User },
  { to: "/seller/support", label: "Support", icon: LifeBuoy },
];

function SellerLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("kalamitra:user");
    if (!raw) navigate({ to: "/auth" });
    else if (user && user.role !== "seller") navigate({ to: "/auth" });
  }, [user, navigate]);

  return (
    <DashboardShell nav={NAV} brand="Seller">
      <Outlet />
    </DashboardShell>
  );
}
