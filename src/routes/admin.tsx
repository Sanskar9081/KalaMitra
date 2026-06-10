import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LayoutDashboard, Users, Store, Package, ShoppingCart, BarChart3, FileText, Settings } from "lucide-react";
import { DashboardShell, type NavItem } from "@/components/dashboard-shell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · Kalamitra" }] }),
  component: AdminLayout,
});

const NAV: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/sellers", label: "Sellers", icon: Store },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/reports", label: "Reports", icon: BarChart3 },
  { to: "/admin/moderation", label: "Moderation", icon: FileText },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.role !== "admin") navigate({ to: "/auth" });
    if (user === null && typeof window !== "undefined") {
      const raw = localStorage.getItem("kalamitra:user");
      if (!raw) navigate({ to: "/auth" });
    }
  }, [user, navigate]);

  return (
    <DashboardShell nav={NAV} brand="Admin">
      <Outlet />
    </DashboardShell>
  );
}
