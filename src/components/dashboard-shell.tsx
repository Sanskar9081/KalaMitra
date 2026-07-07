import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { LogOut, Bell, Search, Menu, X } from "lucide-react";
import { useState, type ComponentType, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="flex min-h-screen w-full bg-background selection:bg-primary/30">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col transition-transform duration-300 md:relative md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between border-r border-border/50 bg-surface/40 px-4 py-6 backdrop-blur-2xl">
          <div>
            <Link to="/" className="group mb-8 flex items-center gap-3 px-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-premium transition-transform duration-300 group-hover:scale-105">
                <span className="font-display text-xl font-bold text-primary-foreground">K</span>
              </div>
              <div>
                <p className="font-display text-lg font-semibold leading-none tracking-tight">Kalamitra</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-primary-glow">
                  {brand}
                </p>
              </div>
            </Link>

            <nav className="space-y-1.5">
              {nav.map((item) => {
                const active = item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
                  >
                    {active && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute inset-0 rounded-xl bg-primary/15 border border-primary/20 shadow-[inset_0_0_12px_rgba(255,255,255,0.05)]"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <item.icon
                      className={`relative z-10 h-5 w-5 transition-colors ${
                        active ? "text-primary-glow" : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    />
                    <span className={`relative z-10 ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                      {item.label}
                    </span>
                    {active && (
                      <motion.span
                        layoutId="active-indicator"
                        className="absolute right-4 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary-glow shadow-[0_0_8px_var(--color-primary-glow)]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-8 rounded-2xl border border-white/5 bg-gradient-to-br from-surface to-surface-elevated p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white shadow-premium">
                {user?.name?.[0] ?? "?"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{user?.name ?? "Guest"}</p>
                <p className="truncate text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                title="Sign out"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-transparent text-muted-foreground transition-all hover:border-white/10 hover:bg-white/5 hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-border/40 bg-background/60 px-4 py-4 backdrop-blur-xl md:px-8">
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-surface/50 transition-colors hover:bg-surface md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          
          <div className="relative flex-1 max-w-lg">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search anything..."
              className="h-10 w-full rounded-full border border-white/10 bg-surface/30 pl-11 pr-4 text-sm outline-none transition-all focus:border-primary/50 focus:bg-surface/60 focus:ring-4 focus:ring-primary/10"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-surface/50 transition-all hover:bg-surface hover:scale-105">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-8 md:px-10 md:py-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>
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
    <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div className="space-y-1">
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl text-foreground">
          {title}
        </h1>
        {subtitle && <p className="text-sm md:text-base text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
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
  const styles = {
    primary: "text-primary-glow from-primary/20 to-primary/5 border-primary/20",
    secondary: "text-secondary from-secondary/20 to-secondary/5 border-secondary/20",
    accent: "text-accent from-accent/20 to-accent/5 border-accent/20",
  }[accent];

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group relative overflow-hidden rounded-2xl glass-strong p-6 transition-all"
    >
      <div className={`absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl transition-opacity group-hover:opacity-100 opacity-50 bg-gradient-to-br ${styles}`} />
      
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
          <p className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">{value}</p>
          {delta && <p className={`mt-2 text-sm font-medium ${styles.split(' ')[0]}`}>{delta}</p>}
        </div>
        <div className={`grid h-12 w-12 place-items-center rounded-xl border bg-gradient-to-br shadow-inner ${styles}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-accent/15 text-accent border-accent/20",
    live: "bg-accent/15 text-accent border-accent/20",
    delivered: "bg-accent/15 text-accent border-accent/20",
    pending: "bg-secondary/15 text-secondary border-secondary/20",
    packed: "bg-secondary/15 text-secondary border-secondary/20",
    shipped: "bg-primary/15 text-primary-glow border-primary/20",
    placed: "bg-primary/15 text-primary-glow border-primary/20",
    draft: "bg-surface text-muted-foreground border-white/10",
    suspended: "bg-destructive/15 text-destructive border-destructive/20",
    cancelled: "bg-destructive/15 text-destructive border-destructive/20",
  };
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium capitalize backdrop-blur-md ${map[status] ?? "bg-surface text-muted-foreground border-white/10"}`}>
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
      {status}
    </span>
  );
}

export function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}
