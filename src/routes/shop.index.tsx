import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { PageHeader, formatINR } from "@/components/dashboard-shell";
import { CATEGORIES, PRODUCTS } from "@/lib/mock-data";

export const Route = createFileRoute("/shop/")({
  component: ShopHome,
});

function ShopHome() {
  return (
    <div>
      <PageHeader title="Discover handmade India" subtitle="Curated craft from 2,431 artisans" />

      <div className="relative mb-10 overflow-hidden rounded-3xl glass-strong p-8 md:p-12">
        <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-secondary/20 blur-3xl" />
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary/15 px-3 py-1 text-xs text-secondary">🪔 Festive collection</span>
        <h2 className="mt-4 max-w-xl font-display text-3xl font-medium md:text-5xl">Light up your Diwali with hand-painted diyas</h2>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">Crafted in Khurja, India's pottery capital. Every piece tells a story.</p>
        <button className="mt-6 rounded-full bg-[image:var(--gradient-primary)] px-5 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)]">
          Shop collection
        </button>
      </div>

      <h3 className="font-display text-xl font-medium">Shop by category</h3>
      <div className="mt-4 grid grid-cols-3 gap-3 md:grid-cols-6">
        {CATEGORIES.map((c) => (
          <button key={c.name} className="rounded-2xl glass p-4 text-center transition hover:-translate-y-0.5 hover:border-primary/40">
            <div className="text-3xl">{c.emoji}</div>
            <p className="mt-2 text-sm font-medium">{c.name}</p>
            <p className="text-xs text-muted-foreground">{c.count}</p>
          </button>
        ))}
      </div>

      <h3 className="mt-10 font-display text-xl font-medium">Featured products</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {PRODUCTS.filter((p) => p.status === "live").map((p) => (
          <Link key={p.id} to="/shop" className="group block overflow-hidden rounded-2xl glass transition hover:-translate-y-0.5">
            <div className="relative aspect-square overflow-hidden">
              <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <button className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-background/70 backdrop-blur transition hover:bg-background">
                <Heart className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-1 text-xs text-secondary">
                <Star className="h-3 w-3 fill-secondary" /> {p.rating} <span className="text-muted-foreground">({p.reviews})</span>
              </div>
              <p className="mt-1 line-clamp-1 font-medium">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.artisan} · {p.region}</p>
              <div className="mt-3 flex items-center justify-between">
                <p className="font-semibold">{formatINR(p.price)}</p>
                <button className="rounded-full bg-[image:var(--gradient-primary)] px-3 py-1.5 text-xs text-primary-foreground shadow-[var(--shadow-glow)]">
                  Add to cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
