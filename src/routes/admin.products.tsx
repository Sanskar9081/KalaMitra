import { createFileRoute } from "@tanstack/react-router";
import { Check, X, Sparkles } from "lucide-react";
import { PageHeader, StatusBadge, formatINR } from "@/components/dashboard-shell";
import { PRODUCTS } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

function AdminProducts() {
  return (
    <div>
      <PageHeader title="Product moderation" subtitle="Review AI-generated listings before they go live" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-2xl glass">
            <div className="relative aspect-square overflow-hidden">
              <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
              <span className="absolute left-3 top-3"><StatusBadge status={p.status} /></span>
              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary/30 px-2 py-1 text-xs text-primary-foreground backdrop-blur">
                <Sparkles className="h-3 w-3" /> AI
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.artisan} · {p.region}</p>
                </div>
                <p className="text-sm font-semibold">{formatINR(p.price)}</p>
              </div>
              <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{p.description}</p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 inline-flex items-center justify-center gap-1 rounded-full bg-accent/15 py-2 text-xs text-accent transition hover:bg-accent/25">
                  <Check className="h-3.5 w-3.5" /> Approve
                </button>
                <button className="flex-1 inline-flex items-center justify-center gap-1 rounded-full bg-destructive/10 py-2 text-xs text-destructive transition hover:bg-destructive/20">
                  <X className="h-3.5 w-3.5" /> Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
