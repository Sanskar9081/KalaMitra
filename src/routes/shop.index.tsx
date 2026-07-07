import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Star, Sparkles, TrendingUp, Filter } from "lucide-react";
import { PageHeader, formatINR } from "@/components/dashboard-shell";
import { CATEGORIES, PRODUCTS } from "@/lib/mock-data";
import { motion } from "framer-motion";

export const Route = createFileRoute("/shop/")({
  component: ShopHome,
});

function ShopHome() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <PageHeader title="Discover Handmade" subtitle="Curated craft from 2,431 independent artisans" />
        <button className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/50 px-5 py-2 text-sm font-medium text-foreground backdrop-blur-md transition-all hover:bg-surface hover:border-white/20">
          <Filter className="h-4 w-4" /> Filter & Sort
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-12 overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-surface to-surface-elevated p-8 md:p-16 shadow-premium group"
      >
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-secondary/10 blur-[100px] transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-primary/10 blur-[80px]" />
        
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" /> Festive Collection
          </span>
          <h2 className="mt-6 max-w-2xl font-display text-4xl font-bold md:text-6xl tracking-tight text-foreground leading-[1.1]">
            Light up your space with <span className="text-secondary">hand-painted diyas</span>
          </h2>
          <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg leading-relaxed">
            Crafted in Khurja, India's pottery capital. Every piece tells a story of generational heritage.
          </p>
          <button className="mt-8 inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3.5 text-sm font-semibold text-background transition-all hover:scale-105 shadow-2xl">
            Shop collection
          </button>
        </div>
      </motion.div>

      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">Shop by category</h3>
        <button className="text-sm font-medium text-primary-glow hover:underline">View all</button>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 mb-12">
        {CATEGORIES.map((c, i) => (
          <motion.button 
            key={c.name} 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-3xl border border-white/5 bg-surface/40 p-6 text-center transition-all hover:-translate-y-1 hover:bg-surface/60 hover:border-white/20 hover:shadow-xl"
          >
            <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/20" />
            <div className="relative z-10">
              <div className="text-4xl transition-transform duration-300 group-hover:scale-110">{c.emoji}</div>
              <p className="mt-4 text-sm font-semibold text-foreground">{c.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.count} items</p>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">Trending pieces</h3>
          <TrendingUp className="h-5 w-5 text-accent" />
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
        {PRODUCTS.filter((p) => p.status === "live").map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to="/shop" className="group block overflow-hidden rounded-3xl border border-white/5 bg-surface/30 transition-all hover:-translate-y-1 hover:border-white/15 hover:shadow-2xl">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-elevated">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  loading="lazy" 
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <button className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-background/50 backdrop-blur-md transition-all hover:bg-background hover:scale-110 z-10">
                  <Heart className="h-4 w-4 text-foreground" />
                </button>
                
                {i === 0 && (
                  <div className="absolute left-4 top-4 rounded-full bg-accent/20 border border-accent/30 px-3 py-1 text-xs font-semibold text-accent backdrop-blur-md z-10">
                    Bestseller
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-xs font-medium text-secondary mb-2">
                  <Star className="h-3.5 w-3.5 fill-secondary" /> {p.rating} 
                  <span className="text-muted-foreground font-normal">({p.reviews} reviews)</span>
                </div>
                <p className="line-clamp-1 font-semibold text-lg text-foreground">{p.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{p.artisan} · {p.region}</p>
                
                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                  <p className="font-display text-xl font-bold text-foreground">{formatINR(p.price)}</p>
                  <button className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-all hover:scale-105 hover:bg-primary-glow hover:text-white">
                    Add to bag
                  </button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
