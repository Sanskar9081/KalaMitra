import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, StatusBadge, formatINR } from "@/components/dashboard-shell";
import { ORDERS } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

function AdminOrders() {
  return (
    <div>
      <PageHeader title="Orders" subtitle="All orders across the platform" />
      <div className="rounded-2xl glass">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
                <th className="px-5 py-4">Order ID</th>
                <th className="px-5 py-4">Product</th>
                <th className="px-5 py-4">Buyer</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {[...ORDERS, ...ORDERS].map((o, i) => (
                <tr key={i} className="border-t border-border/60">
                  <td className="px-5 py-4 font-mono text-xs">{o.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={o.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                      <span>{o.product}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{o.buyer}</td>
                  <td className="px-5 py-4">{formatINR(o.amount)}</td>
                  <td className="px-5 py-4"><StatusBadge status={o.status} /></td>
                  <td className="px-5 py-4 text-muted-foreground">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
