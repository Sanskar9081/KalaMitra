import { createFileRoute, Link } from "@tanstack/react-router";
import { IndianRupee, ShoppingCart, Package, Star, Sparkles, ArrowRight } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, StatCard, StatusBadge, formatINR } from "@/components/dashboard-shell";
import { ORDERS, REVENUE_SERIES, NOTIFICATIONS } from "@/lib/mock-data";
import { motion } from "framer-motion";

export const Route = createFileRoute("/seller/")({
  component: SellerDashboard,
});

function SellerDashboard() {
  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="Namaste, Lakshmi 🙏"
        subtitle="Here's how your craft is doing this week"
        actions={
          <Link to="/seller/upload" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:scale-105 shadow-2xl">
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> New AI listing
            </span>
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
          </Link>
        }
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Revenue (30d)" value="₹42,800" delta="+24% vs last month" icon={IndianRupee} accent="primary" />
        <StatCard label="Orders" value="186" delta="+18 new" icon={ShoppingCart} accent="secondary" />
        <StatCard label="Products live" value="18" delta="2 pending review" icon={Package} accent="accent" />
        <StatCard label="Avg. rating" value="4.8" delta="142 reviews" icon={Star} accent="primary" />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="lg:col-span-2 rounded-[2rem] border border-white/10 bg-surface/40 p-8 backdrop-blur-xl shadow-premium relative overflow-hidden group"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[80px] transition-all duration-700 group-hover:bg-primary/20" />
          
          <div className="relative z-10 flex items-center justify-between mb-8">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">Earnings Overview</h3>
              <p className="text-sm text-muted-foreground mt-1">Last 6 months revenue growth</p>
            </div>
            <select className="bg-surface/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-foreground outline-none backdrop-blur-md">
              <option>Last 6 months</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="relative z-10 h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_SERIES} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="srev" x1="0" x2="0" y1="0" y2="1">
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
                <Area type="monotone" dataKey="revenue" stroke="oklch(0.65 0.15 280)" strokeWidth={3} fill="url(#srev)" activeDot={{ r: 6, fill: "oklch(0.65 0.15 280)", stroke: "#fff", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-[2rem] border border-white/10 bg-surface/40 p-8 backdrop-blur-xl shadow-premium flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">Activity</h3>
            <button className="text-sm font-medium text-primary-glow hover:underline">Mark read</button>
          </div>
          
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {NOTIFICATIONS.map((n, i) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                key={n.id} 
                className="group relative rounded-2xl border border-white/5 bg-surface/50 p-4 transition-all hover:bg-surface hover:border-white/10"
              >
                <p className="text-sm font-semibold text-foreground">{n.title}</p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{n.body}</p>
                <p className="mt-3 text-[10px] font-medium uppercase tracking-widest text-primary-glow/70">{n.time} ago</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 rounded-[2rem] border border-white/10 bg-surface/40 p-8 backdrop-blur-xl shadow-premium"
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">Recent Orders</h3>
          <Link to="/seller/orders" className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-surface/50 px-4 py-2 text-xs font-semibold text-foreground transition-all hover:bg-surface hover:scale-105">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-white/10 text-muted-foreground uppercase tracking-widest text-xs">
                <th className="pb-4 font-semibold">Product</th>
                <th className="pb-4 font-semibold px-4">Customer</th>
                <th className="pb-4 font-semibold px-4">Date</th>
                <th className="pb-4 font-semibold px-4">Status</th>
                <th className="pb-4 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ORDERS.slice(0, 5).map((o) => (
                <tr key={o.id} className="group transition-colors hover:bg-white/[0.02]">
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <img src={o.image} alt="" className="h-12 w-12 rounded-xl object-cover border border-white/10" />
                      <span className="font-medium text-foreground">{o.product}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground">{o.buyer}</td>
                  <td className="py-4 px-4 text-muted-foreground">{o.date}</td>
                  <td className="py-4 px-4"><StatusBadge status={o.status} /></td>
                  <td className="py-4 text-right font-semibold text-foreground">{formatINR(o.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
