import { createFileRoute, Link } from "@tanstack/react-router";
import { IndianRupee, ShoppingCart, Package, Star, Sparkles, ArrowRight } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, StatCard, StatusBadge, formatINR } from "@/components/dashboard-shell";
import { ORDERS, REVENUE_SERIES, NOTIFICATIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/seller/")({
  component: SellerDashboard,
});

function SellerDashboard() {
  return (
    <div>
      <PageHeader
        title="Namaste, Lakshmi 🙏"
        subtitle="Here's how your craft is doing this week"
        actions={
          <Link to="/seller/upload" className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-primary)] px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)]">
            <Sparkles className="h-4 w-4" /> New AI listing
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Revenue (30d)" value="₹42,800" delta="+24% vs last month" icon={IndianRupee} accent="primary" />
        <StatCard label="Orders" value="186" delta="+18 new" icon={ShoppingCart} accent="secondary" />
        <StatCard label="Products live" value="18" delta="2 pending review" icon={Package} accent="accent" />
        <StatCard label="Avg. rating" value="4.8" delta="142 reviews" icon={Star} accent="primary" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl glass p-6">
          <h3 className="font-display text-lg font-medium">Earnings</h3>
          <p className="text-xs text-muted-foreground">Last 6 months</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_SERIES}>
                <defs>
                  <linearGradient id="srev" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.17 60)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.78 0.17 60)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="month" stroke="oklch(0.72 0.02 265)" fontSize={12} />
                <YAxis stroke="oklch(0.72 0.02 265)" fontSize={12} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: "oklch(0.22 0.035 265)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, color: "white" }} />
                <Area type="monotone" dataKey="revenue" stroke="oklch(0.78 0.17 60)" strokeWidth={2} fill="url(#srev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl glass p-6">
          <h3 className="font-display text-lg font-medium">Notifications</h3>
          <div className="mt-4 space-y-2">
            {NOTIFICATIONS.map((n) => (
              <div key={n.id} className="rounded-xl bg-surface/40 p-3">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{n.time} ago</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl glass p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-medium">Recent orders</h3>
          <Link to="/seller/orders" className="inline-flex items-center gap-1 text-xs text-primary-glow">View all <ArrowRight className="h-3 w-3" /></Link>
        </div>
        <div className="space-y-2">
          {ORDERS.slice(0, 5).map((o) => (
            <div key={o.id} className="flex items-center gap-4 rounded-xl bg-surface/40 p-3">
              <img src={o.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{o.product}</p>
                <p className="text-xs text-muted-foreground">{o.buyer} · {o.date}</p>
              </div>
              <StatusBadge status={o.status} />
              <p className="w-20 text-right text-sm font-medium">{formatINR(o.amount)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
