import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Heart, Star, MapPin, Filter, ChevronRight, ChevronLeft } from "lucide-react";
import { formatINR } from "@/components/dashboard-shell";
import { CATEGORIES, PRODUCTS, PRODUCT_IMAGES } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { useState } from "react";
import heroImg from "@/assets/hero-artisan.jpg";
import artisan1 from "@/assets/artisan-1.jpg";

export const Route = createFileRoute("/shop/")({
  component: ShopHome,
});

function ShopHome() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Wood Craft", "Pottery", "Handloom", "Metal Art", "Traditional Paintings", "Jewellery", "Eco Friendly", "Newest"];

  return (
    <div className="pb-24 text-foreground max-w-[1400px] mx-auto">
      {/* Marketplace Header */}
      <div className="px-6 md:px-12 py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl md:text-7xl text-foreground font-medium mb-6 leading-tight">
              Discover Handmade <br/><i className="font-serif font-light text-primary">Treasures</i>
            </h1>
            <p className="text-muted-foreground text-lg uppercase tracking-widest leading-relaxed">
              Explore authentic handcrafted creations from artisans across India.
            </p>
          </div>
          
          <div className="w-full lg:w-[480px] shrink-0">
            {/* Search Bar */}
            <div className="relative group mb-6">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
              </div>
              <input 
                type="text" 
                placeholder="Search by craft, artisan or state..." 
                className="w-full h-14 bg-surface/80 border border-border/50 rounded-full pl-14 pr-6 text-base font-medium text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-primary focus:bg-surface transition-all shadow-sm backdrop-blur-md"
              />
            </div>
            
            {/* Floating Filter Chips */}
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide lg:flex-wrap" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {filters.map(f => (
                <button 
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all hover-lift ${
                    activeFilter === f 
                      ? 'bg-foreground text-background shadow-md' 
                      : 'bg-surface border border-border/50 text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Explorer (Tiles) */}
      <div className="px-6 md:px-12 mb-32 max-w-7xl mx-auto">
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 lg:grid-cols-6 md:gap-4 md:snap-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {CATEGORIES.map((c, i) => (
            <Link key={c.name} to="/shop" className="group relative w-64 md:w-auto shrink-0 aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden snap-start hover-lift block">
              <img src={PRODUCT_IMAGES[i % PRODUCT_IMAGES.length]} alt={c.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="font-display text-2xl font-medium mb-1">{c.name}</h3>
                <span className="text-xs uppercase tracking-widest opacity-80">{c.count} items</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Product Grid (Mixed Layout) */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="font-display text-4xl mb-12">Curated Gallery</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
          {PRODUCTS.filter(p => p.status === 'live').map((p, i) => {
            // Create rhythm: make 1st and 5th items span 2 columns on large screens
            const isLarge = i === 0 || i === 4;
            const spanClass = isLarge ? "md:col-span-2 lg:col-span-2" : "col-span-1";
            const aspectClass = isLarge ? "aspect-[4/3] lg:aspect-[16/9]" : "aspect-[3/4] md:aspect-[4/5]";
            
            return (
              <Link 
                key={p.id}
                to={`/shop/${p.id}`}
                className={`group relative block ${spanClass}`}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className={`relative overflow-hidden rounded-2xl bg-surface ${aspectClass} hover-lift`}>
                    <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    
                    {/* Quick Preview Hover Overlay */}
                    <div className="absolute inset-0 bg-background/95 backdrop-blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-center p-8 text-center pointer-events-none">
                      <p className="font-serif italic text-lg text-foreground mb-4 line-clamp-4">"{p.description}"</p>
                      <div className="grid grid-cols-2 gap-4 text-xs uppercase tracking-widest text-muted-foreground mt-auto border-t border-border/50 pt-4">
                        <div>
                          <span className="block text-[10px] mb-1 opacity-70">Material</span>
                          <span className="font-medium text-foreground">{p.material}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] mb-1 opacity-70">Crafted In</span>
                          <span className="font-medium text-foreground">~7 Days</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/50 backdrop-blur-md flex items-center justify-center border border-border/50 transition-all hover:bg-background hover:scale-110 z-10 text-foreground"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-medium text-foreground mb-1 group-hover:text-primary transition-colors">{p.name}</h3>
                      <p className="text-sm text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {p.region}
                      </p>
                      <p className="text-sm text-foreground/80 mt-1 font-medium">{p.artisan}</p>
                    </div>
                    <div className="sm:text-right">
                      <p className="font-display text-xl">{formatINR(p.price)}</p>
                      <div className="flex items-center gap-1 sm:justify-end text-xs font-medium text-accent mt-1">
                        <Star className="h-3 w-3 fill-accent" /> {p.rating}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Featured Banner (Immersive) */}
      <div className="my-32 max-w-[100rem] mx-auto px-6 md:px-12">
        <div className="relative h-[600px] md:h-[700px] rounded-3xl overflow-hidden group">
          <img src={heroImg} alt="Collection Banner" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-y-0 left-0 p-10 md:p-20 flex flex-col justify-center max-w-2xl text-white">
            <span className="text-sm uppercase tracking-[0.3em] text-white/80 mb-6 block">Featured Collection</span>
            <h2 className="font-display text-5xl md:text-7xl font-medium mb-6 leading-tight">Crafted from Rajasthan</h2>
            <p className="text-lg text-white/90 leading-relaxed mb-10 font-serif italic">
              "The golden sands hold secrets of ancient kilns and weaving looms. Explore pieces born from the desert heat and royal heritage."
            </p>
            <button className="self-start px-8 py-4 bg-white text-black text-sm uppercase tracking-widest font-medium hover-lift">
              Explore Collection
            </button>
          </div>
        </div>
      </div>

      {/* Artisan Highlight */}
      <div className="py-32 bg-surface border-y border-border/50">
        <div className="mx-auto max-w-7xl px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] rounded-2xl overflow-hidden shadow-premium">
            <img src={artisan1} alt="Artisan Highlight" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-xs uppercase tracking-[0.2em] text-primary block mb-4">Artisan Spotlight</span>
            <h2 className="font-display text-5xl mb-6">Lakshmi Devi</h2>
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-8">Master Potter · Jaipur, Rajasthan</p>
            <p className="text-lg leading-relaxed text-foreground/80 font-serif italic mb-10">
              "My hands remember the shapes my grandmother taught me. When I mold the clay, I feel her guiding my fingers. The blue dye we use is a recipe older than this village."
            </p>
            <button className="border-b border-foreground pb-1 text-sm uppercase tracking-widest font-medium hover:text-primary hover:border-primary transition-colors">
              View All 18 Creations
            </button>
          </motion.div>
        </div>
      </div>

      {/* Editorial Pagination */}
      <div className="py-32 flex justify-center items-center gap-8 text-sm uppercase tracking-widest font-medium">
        <button className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <div className="flex gap-6 items-center">
          <span className="text-foreground border-b border-foreground pb-1">1</span>
          <button className="text-muted-foreground hover:text-foreground transition-colors">2</button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">3</button>
        </div>
        <button className="text-foreground hover:text-primary flex items-center gap-2 transition-colors">
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile Bottom Filter Button */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <button className="h-14 w-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-premium hover-lift">
          <Filter className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

