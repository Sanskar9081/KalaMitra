import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { IndianRupee, ShoppingCart, Users, Store, TrendingUp, ArrowUpRight } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, StatCard, StatusBadge, formatINR } from "@/components/dashboard-shell";
import { CATEGORY_SHARE, ORDERS, REVENUE_SERIES, SELLERS } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const PIE_COLORS = ["oklch(0.58 0.24 295)", "oklch(0.78 0.17 60)", "oklch(0.72 0.17 165)", "oklch(0.7 0.22 305)", "oklch(0.65 0.23 25)"];

function AdminDashboard() {
  return (
    <div>
      <PageHeader title="Platform overview" subtitle="What's happening across Kalamitra today" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total revenue" value="₹62.4 L" delta="+18.4% MoM" icon={IndianRupee} accent="primary" />
        <StatCard label="Orders" value="9,341" delta="+12.1% MoM" icon={ShoppingCart} accent="secondary" />
        <StatCard label="Active artisans" value="2,431" delta="+241 this month" icon={Store} accent="accent" />
        <StatCard label="Buyers" value="48,206" delta="+8.6% MoM" icon={Users} accent="primary" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 rounded-2xl glass p-6">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="font-display text-lg font-medium">Revenue trend</h3>
              <p className="text-xs text-muted-foreground">Last 6 months</p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs text-accent">
              <TrendingUp className="h-3.5 w-3.5" /> +112% YoY
            </span>
          </div>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_SERIES}>
                <defs>
                  <linearGradient id="rev" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.58 0.24 295)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.58 0.24 295)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="month" stroke="oklch(0.72 0.02 265)" fontSize={12} />
                <YAxis stroke="oklch(0.72 0.02 265)" fontSize={12} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ background: "oklch(0.22 0.035 265)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, color: "white" }} />
                <Area type="monotone" dataKey="revenue" stroke="oklch(0.7 0.22 305)" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass p-6">
          <h3 className="font-display text-lg font-medium">Category share</h3>
          <p className="text-xs text-muted-foreground">By order volume</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CATEGORY_SHARE} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3} stroke="none">
                  {CATEGORY_SHARE.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "oklch(0.22 0.035 265)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, color: "white" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1.5 text-xs">
            {CATEGORY_SHARE.map((c, i) => (
              <div key={c.name} className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: PIE_COLORS[i] }} />{c.name}</span>
                <span className="text-muted-foreground">{c.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl glass p-6">
          <h3 className="font-display text-lg font-medium">Orders by month</h3>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_SERIES}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="month" stroke="oklch(0.72 0.02 265)" fontSize={12} />
                <YAxis stroke="oklch(0.72 0.02 265)" fontSize={12} />
                <Tooltip contentStyle={{ background: "oklch(0.22 0.035 265)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12, color: "white" }} />
                <Bar dataKey="orders" fill="oklch(0.78 0.17 60)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl glass p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-medium">Top sellers</h3>
            <button className="inline-flex items-center gap-1 text-xs text-primary-glow">View all <ArrowUpRight className="h-3 w-3" /></button>
          </div>
          <div className="mt-4 space-y-3">
            {SELLERS.slice(0, 5).map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 rounded-xl bg-surface/40 p-3">
                <span className="w-5 text-center text-xs text-muted-foreground">{i + 1}</span>
                <img src={s.avatar} alt={s.name} className="h-9 w-9 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">{s.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{s.region}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatINR(s.revenue)}</p>
                  <p className="text-xs text-muted-foreground">{s.products} products</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl glass p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-medium">Recent orders</h3>
          <button className="text-xs text-primary-glow">View all</button>
        </div>
        <OrdersTable />
      </div>
    </div>
  );
}

function OrdersTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
            <th className="px-3 py-2">Order</th>
            <th className="px-3 py-2">Product</th>
            <th className="px-3 py-2">Buyer</th>
            <th className="px-3 py-2">Amount</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {ORDERS.map((o) => (
            <tr key={o.id} className="border-t border-border/60">
              <td className="px-3 py-3 font-mono text-xs">{o.id}</td>
              <td className="px-3 py-3">
                <div className="flex items-center gap-3">
                  <img src={o.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                  <span>{o.product}</span>
                </div>
              </td>
              <td className="px-3 py-3 text-muted-foreground">{o.buyer}</td>
              <td className="px-3 py-3">{formatINR(o.amount)}</td>
              <td className="px-3 py-3"><StatusBadge status={o.status} /></td>
              <td className="px-3 py-3 text-muted-foreground">{o.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
