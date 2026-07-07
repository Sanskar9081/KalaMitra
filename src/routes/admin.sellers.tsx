import { createFileRoute } from "@tanstack/react-router";
import { Check, Ban, MoreVertical } from "lucide-react";
import { PageHeader, StatusBadge, formatINR } from "@/components/dashboard-shell";
import { SELLERS } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/sellers")({
  component: AdminSellers,
});

function AdminSellers() {
  return (
    <div>
      <PageHeader
        title="Seller management"
        subtitle="Approve, suspend, or review artisan accounts"
        actions={
          <button className="rounded-full bg-[image:var(--gradient-primary)] px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)]">
            Invite seller
          </button>
        }
      />

      <div className="rounded-2xl glass">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
                <th className="px-5 py-4">Artisan</th>
                <th className="px-5 py-4">Region</th>
                <th className="px-5 py-4">Products</th>
                <th className="px-5 py-4">Revenue</th>
                <th className="px-5 py-4">Joined</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {SELLERS.map((s) => (
                <tr key={s.id} className="border-t border-border/60">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={s.avatar} alt={s.name} className="h-10 w-10 rounded-full object-cover" />
                      <div>
                        <p className="font-medium">{s.name}</p>
                        <p className="text-xs text-muted-foreground">ID {s.id.toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{s.region}</td>
                  <td className="px-5 py-4">{s.products}</td>
                  <td className="px-5 py-4">{formatINR(s.revenue)}</td>
                  <td className="px-5 py-4 text-muted-foreground">{s.joined}</td>
                  <td className="px-5 py-4"><StatusBadge status={s.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      {s.status === "pending" && (
                        <button className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-3 py-1 text-xs text-accent transition hover:bg-accent/25">
                          <Check className="h-3.5 w-3.5" /> Approve
                        </button>
                      )}
                      {s.status === "active" && (
                        <button className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-3 py-1 text-xs text-destructive transition hover:bg-destructive/20">
                          <Ban className="h-3.5 w-3.5" /> Suspend
                        </button>
                      )}
                      <button className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:bg-surface">
                        <MoreVertical className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
