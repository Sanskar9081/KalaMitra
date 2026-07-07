import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { IndianRupee, ShoppingCart, Users, Store, TrendingUp, ArrowUpRight } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, StatCard, StatusBadge, formatINR } from "@/components/dashboard-shell";
import { CATEGORY_SHARE, ORDERS, REVENUE_SERIES, SELLERS } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const PIE_COLORS = ["oklch(0.65 0.15 280)", "oklch(0.7 0.15 200)", "oklch(0.65 0.2 320)", "oklch(0.6 0.15 250)", "oklch(0.75 0.15 150)"];

function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader 
        title="Command Center" 
        subtitle="Platform overview and key metrics across Kalamitra" 
        actions={
          <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/50 px-5 py-2.5 text-sm font-semibold text-foreground backdrop-blur-md transition-all hover:bg-surface hover:border-white/20 shadow-premium">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
            Live Sync
          </button>
        }
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total revenue" value="₹62.4 L" delta="+18.4% MoM" icon={IndianRupee} accent="primary" />
        <StatCard label="Orders" value="9,341" delta="+12.1% MoM" icon={ShoppingCart} accent="secondary" />
        <StatCard label="Active artisans" value="2,431" delta="+241 this month" icon={Store} accent="accent" />
        <StatCard label="Buyers" value="48,206" delta="+8.6% MoM" icon={Users} accent="primary" />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="lg:col-span-2 rounded-[2rem] border border-white/10 bg-surface/40 p-8 backdrop-blur-xl shadow-premium relative overflow-hidden group"
        >
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/5 blur-[100px] transition-all duration-700 group-hover:bg-primary/15" />
          
          <div className="relative z-10 flex items-end justify-between mb-8">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">Revenue Trajectory</h3>
              <p className="text-sm text-muted-foreground mt-1">Platform GMV last 6 months</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-bold text-accent backdrop-blur-md">
              <TrendingUp className="h-3.5 w-3.5" /> +112% YoY
            </span>
          </div>
          
          <div className="relative z-10 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_SERIES} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.15 280)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.65 0.15 280)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 1 1 / 0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="oklch(1 1 1 / 0.3)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="oklch(1 1 1 / 0.3)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} dx={-10} />
                <Tooltip 
                  cursor={{ stroke: 'oklch(1 1 1 / 0.1)', strokeWidth: 2, strokeDasharray: '4 4' }}
                  contentStyle={{ background: "rgba(20,20,25,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, color: "white", backdropFilter: "blur(12px)" }} 
                />
                <Area type="monotone" dataKey="revenue" stroke="oklch(0.65 0.15 280)" strokeWidth={3} fill="url(#rev)" activeDot={{ r: 6, fill: "oklch(0.65 0.15 280)", stroke: "#fff", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-[2rem] border border-white/10 bg-surface/40 p-8 backdrop-blur-xl shadow-premium flex flex-col relative overflow-hidden group"
        >
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-accent/5 blur-[80px] transition-all duration-700 group-hover:bg-accent/15" />
          
          <div className="relative z-10 mb-6">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">Market Share</h3>
            <p className="text-sm text-muted-foreground mt-1">By order volume</p>
          </div>
          
          <div className="relative z-10 h-48 w-full flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CATEGORY_SHARE} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={4} stroke="none">
                  {CATEGORY_SHARE.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} className="hover:opacity-80 transition-opacity outline-none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: "rgba(20,20,25,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white", backdropFilter: "blur(12px)" }} 
                  itemStyle={{ color: "white" }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="relative z-10 mt-6 space-y-2 flex-1">
            {CATEGORY_SHARE.map((c, i) => (
              <div key={c.name} className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-white/5">
                <span className="inline-flex items-center gap-3 text-sm font-medium text-foreground">
                  <span className="h-3 w-3 rounded-full shadow-sm" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                  {c.name}
                </span>
                <span className="text-sm font-semibold text-muted-foreground">{c.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-[2rem] border border-white/10 bg-surface/40 p-8 backdrop-blur-xl shadow-premium"
        >
          <div className="mb-6">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">Volume Growth</h3>
            <p className="text-sm text-muted-foreground mt-1">Monthly orders processed</p>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_SERIES} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 1 1 / 0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="oklch(1 1 1 / 0.3)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="oklch(1 1 1 / 0.3)" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  cursor={{ fill: 'oklch(1 1 1 / 0.05)' }}
                  contentStyle={{ background: "rgba(20,20,25,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white", backdropFilter: "blur(12px)" }} 
                />
                <Bar dataKey="orders" fill="oklch(0.7 0.15 200)" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="rounded-[2rem] border border-white/10 bg-surface/40 p-8 backdrop-blur-xl shadow-premium"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">Top Artisans</h3>
              <p className="text-sm text-muted-foreground mt-1">By revenue generation</p>
            </div>
            <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary-glow hover:underline">
              View directory <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
          
          <div className="space-y-3">
            {SELLERS.slice(0, 5).map((s, i) => (
              <div key={s.id} className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-surface/30 p-3 transition-all hover:bg-surface/60 hover:border-white/10 hover:shadow-lg">
                <div className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${i === 0 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : i === 1 ? 'bg-slate-300/20 text-slate-300 border border-slate-300/30' : i === 2 ? 'bg-amber-700/20 text-amber-600 border border-amber-700/30' : 'bg-surface-elevated text-muted-foreground'}`}>
                  {i + 1}
                </div>
                <img src={s.avatar} alt={s.name} className="h-10 w-10 rounded-full object-cover border border-white/10" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{s.name}</p>
                  <p className="truncate text-xs font-medium text-muted-foreground uppercase tracking-widest">{s.region}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{formatINR(s.revenue)}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{s.products} listings</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 rounded-[2rem] border border-white/10 bg-surface/40 p-8 backdrop-blur-xl shadow-premium"
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">Global Transaction Stream</h3>
          <button className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-surface/50 px-4 py-2 text-xs font-semibold text-foreground transition-all hover:bg-surface hover:scale-105">
            Full ledger <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
        <OrdersTable />
      </motion.div>
    </div>
  );
}

function OrdersTable() {
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead>
          <tr className="border-b border-white/10 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <th className="pb-4 pr-4">Order ID</th>
            <th className="pb-4 px-4">Item</th>
            <th className="pb-4 px-4">Customer</th>
            <th className="pb-4 px-4 text-right">Value</th>
            <th className="pb-4 px-4 text-center">Status</th>
            <th className="pb-4 pl-4 text-right">Timestamp</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {ORDERS.map((o) => (
            <tr key={o.id} className="group transition-colors hover:bg-white/[0.02]">
              <td className="py-4 pr-4">
                <span className="rounded-md bg-surface-elevated px-2 py-1 font-mono text-[10px] text-muted-foreground border border-white/5">
                  {o.id}
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <img src={o.image} alt="" className="h-10 w-10 rounded-lg object-cover border border-white/10" />
                  <span className="font-medium text-foreground">{o.product}</span>
                </div>
              </td>
              <td className="py-4 px-4 text-muted-foreground font-medium">{o.buyer}</td>
              <td className="py-4 px-4 text-right font-bold text-foreground">{formatINR(o.amount)}</td>
              <td className="py-4 px-4 text-center"><StatusBadge status={o.status} /></td>
              <td className="py-4 pl-4 text-right text-muted-foreground font-mono text-xs">{o.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
