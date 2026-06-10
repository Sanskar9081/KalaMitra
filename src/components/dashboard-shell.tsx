import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { LogOut, Bell, Search, Menu, X } from "lucide-react";
import { useState, type ComponentType, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";

export interface NavItem {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  exact?: boolean;
}

export function DashboardShell({
  nav,
  brand,
  children,
}: {
  nav: NavItem[];
  brand: string;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform glass-strong transition-transform md:relative md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-4">
          <Link to="/" className="mb-8 flex items-center gap-2 px-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)]">
              <span className="font-display text-lg font-bold text-primary-foreground">K</span>
            </span>
            <div>
              <p className="font-display text-base font-semibold leading-none">Kalamitra</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                {brand}
              </p>
            </div>
          </Link>

          <nav className="flex-1 space-y-1">
            {nav.map((item) => {
              const active = item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                    active
                      ? "bg-primary/15 text-foreground"
                      : "text-muted-foreground hover:bg-surface/60 hover:text-foreground"
                  }`}
                >
                  <item.icon className={`h-4 w-4 ${active ? "text-primary-glow" : ""}`} />
                  {item.label}
                  {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-glow" />}
                </Link>
              );
            })}
          </nav>

          <div className="rounded-2xl glass p-3">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[image:var(--gradient-primary)] text-sm font-semibold text-primary-foreground">
                {user?.name?.[0] ?? "?"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{user?.name ?? "Guest"}</p>
                <p className="truncate text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                title="Sign out"
                className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition hover:bg-surface hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/70 px-4 py-3 backdrop-blur md:px-8">
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg glass md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search…"
              className="h-9 w-full rounded-full border border-border bg-surface/60 pl-9 pr-3 text-sm outline-none transition focus:border-primary/60"
            />
          </div>
          <button className="relative grid h-9 w-9 place-items-center rounded-full glass">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-secondary" />
          </button>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-10">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-medium md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  accent = "primary",
}: {
  label: string;
  value: string;
  delta?: string;
  icon: ComponentType<{ className?: string }>;
  accent?: "primary" | "secondary" | "accent";
}) {
  const colors = {
    primary: "text-primary-glow bg-primary/15",
    secondary: "text-secondary bg-secondary/15",
    accent: "text-accent bg-accent/15",
  }[accent];

  return (
    <div className="rounded-2xl glass p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
          <p className="mt-2 font-display text-2xl font-semibold md:text-3xl">{value}</p>
          {delta && <p className="mt-1 text-xs text-accent">{delta}</p>}
        </div>
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${colors}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-accent/15 text-accent",
    live: "bg-accent/15 text-accent",
    delivered: "bg-accent/15 text-accent",
    pending: "bg-secondary/15 text-secondary",
    packed: "bg-secondary/15 text-secondary",
    shipped: "bg-primary/15 text-primary-glow",
    placed: "bg-primary/15 text-primary-glow",
    draft: "bg-muted text-muted-foreground",
    suspended: "bg-destructive/15 text-destructive",
    cancelled: "bg-destructive/15 text-destructive",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs capitalize ${map[status] ?? "bg-muted text-muted-foreground"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}
