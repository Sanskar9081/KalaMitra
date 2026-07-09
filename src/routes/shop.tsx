import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { motion } from "framer-motion";
import { Footer } from "./index";

export const Route = createFileRoute("/shop")({
  head: () => ({ meta: [{ title: "Marketplace · KalaMitra" }] }),
  component: ShopLayout,
});

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-surface/90 backdrop-blur-2xl border-b border-border/50 shadow-sm py-4" : "bg-transparent py-6"
      } px-6 md:px-12`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        {/* Left */}
        <Link to="/" className="group flex items-center gap-3">
          <span className="font-display text-2xl font-bold tracking-tight text-primary">KalaMitra</span>
        </Link>
        
        {/* Center */}
        <nav className="hidden lg:flex items-center gap-10 text-sm font-medium text-foreground/80 uppercase tracking-widest">
          {['Explore', 'Collections', 'Artisans', 'Stories'].map((item) => (
            <Link key={item} to="/shop" className="transition-colors hover:text-primary">
              {item}
            </Link>
          ))}
        </nav>
        
        {/* Right */}
        <div className="flex items-center gap-6 text-foreground/80">
          <button className="transition-colors hover:text-primary"><Search className="w-5 h-5" /></button>
          <button className="transition-colors hover:text-primary"><Heart className="w-5 h-5" /></button>
          <button className="transition-colors hover:text-primary relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">2</span>
          </button>
          <button className="transition-colors hover:text-primary h-8 w-8 rounded-full bg-surface-elevated border border-border/50 flex items-center justify-center overflow-hidden">
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}

function ShopLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 paper-texture flex flex-col">
      <Nav />
      <main className="flex-1 w-full pt-28">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
