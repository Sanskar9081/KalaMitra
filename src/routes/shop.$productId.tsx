import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { PRODUCTS, SELLERS, REVIEWS } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, ShieldCheck, Truck, ChevronRight, ChevronDown, Package, Shield, ArrowRight, Quote, Info, MapPin, User } from "lucide-react";
import { formatINR } from "@/components/dashboard-shell";
import { useState } from "react";
import heroImg from "@/assets/hero-artisan.jpg";
import artisan3 from "@/assets/artisan-3.jpg";

export const Route = createFileRoute("/shop/$productId")({
  component: ProductDetails,
});

function ProductDetails() {
  const { productId } = Route.useParams();
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const artisan = SELLERS.find((s) => s.name === product.artisan) || SELLERS[0];
  const reviews = REVIEWS.filter((r) => r.product === product.name);
  if (reviews.length === 0) reviews.push(REVIEWS[0], REVIEWS[1]); // fallback
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id);

  return (
    <div className="bg-background text-foreground selection:bg-primary/20 pb-24 overflow-x-hidden">
      <HeroSection product={product} />
      <StorySection product={product} />
      <ArtisanSection artisan={artisan} />
      <ProcessSection />
      <SpecsSection product={product} />
      <ReviewsSection reviews={reviews} />
      <RelatedSection products={related.length ? related : PRODUCTS.slice(1, 4)} title="More in this Category" />
      <RelatedSection products={PRODUCTS.filter(p => p.artisan === artisan.name && p.id !== product.id).slice(0,4)} title={`More from ${artisan.name}`} />
      
      {/* Mobile Sticky Buy Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-xl border-t border-border/50 md:hidden z-50 flex items-center gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{product.name}</p>
          <p className="font-display font-medium text-lg">{formatINR(product.price)}</p>
        </div>
        <button className="bg-foreground text-background px-8 py-3 rounded-none uppercase tracking-widest text-xs font-bold hover-lift shrink-0">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function HeroSection({ product }: { product: any }) {
  const [qty, setQty] = useState(1);
  return (
    <div className="max-w-[1600px] mx-auto px-0 md:px-12 pt-0 md:pt-16 pb-32">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
        
        {/* Left: Immersive Gallery (60%) */}
        <div className="w-full lg:w-[60%] shrink-0 relative lg:sticky lg:top-32 h-fit">
          <div className="aspect-[4/5] md:aspect-[3/4] overflow-hidden md:rounded-2xl group bg-surface">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 cursor-crosshair"
            />
            {/* Tags overlay */}
            <div className="absolute top-6 left-6 flex gap-2">
              <span className="bg-background/80 backdrop-blur-md border border-border/50 px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold text-foreground">
                Authentic Craft
              </span>
            </div>
          </div>
          {/* Thumbnails */}
          <div className="flex gap-4 mt-4 px-6 md:px-0 overflow-x-auto scrollbar-hide pb-2">
            {[product.image, heroImg, artisan3].map((img, i) => (
              <button key={i} className={`w-20 h-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${i === 0 ? 'border-foreground' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Purchase Panel */}
        <div className="w-full lg:w-[40%] px-6 md:px-0 pt-8 lg:pt-12 flex flex-col justify-center">
          <Link to="/shop" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 mb-8 font-bold">
            Marketplace <ChevronRight className="w-3 h-3" /> {product.category}
          </Link>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground font-medium mb-4 leading-[1.1]">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-1 text-accent">
              <Star className="w-4 h-4 fill-accent" />
              <span className="font-medium text-sm">{product.rating}</span>
            </div>
            <span className="text-border">|</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              Read {product.reviews} Reviews
            </span>
          </div>

          <p className="font-display text-3xl mb-8">{formatINR(product.price)}</p>

          <p className="text-lg text-muted-foreground leading-relaxed font-serif italic mb-10 border-l-2 border-primary/30 pl-6">
            "{product.description}"
          </p>

          <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-12 border-y border-border/50 py-8">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1 block">Artisan</p>
              <p className="font-medium text-sm">{product.artisan}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1 block">Region</p>
              <p className="font-medium text-sm flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-primary" /> {product.region}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1 block">Material</p>
              <p className="font-medium text-sm">{product.material}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1 block">Availability</p>
              <p className="font-medium text-sm text-green-700">{product.stock} in stock</p>
            </div>
          </div>

          <div className="flex items-center gap-6 mb-12">
            <div className="flex items-center border border-border/50 bg-surface h-14">
              <button onClick={() => setQty(Math.max(1, qty-1))} className="w-12 h-full flex items-center justify-center hover:bg-border/30 transition-colors">-</button>
              <div className="w-12 h-full flex items-center justify-center font-medium font-display text-lg">{qty}</div>
              <button onClick={() => setQty(qty+1)} className="w-12 h-full flex items-center justify-center hover:bg-border/30 transition-colors">+</button>
            </div>
            <button className="flex-1 h-14 bg-foreground text-background uppercase tracking-widest text-sm font-bold hover-lift transition-transform">
              Add to Cart
            </button>
            <button className="w-14 h-14 border border-border/50 flex items-center justify-center hover:bg-surface hover:text-primary transition-colors shrink-0">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-4 text-muted-foreground">
              <Truck className="w-5 h-5 shrink-0" /> 
              <span>Free eco-friendly shipping within India (5-7 days).</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Shield className="w-5 h-5 shrink-0" /> 
              <span>Digital certificate of authenticity included.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StorySection({ product }: { product: any }) {
  return (
    <div className="py-32 paper-texture border-y border-border/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <Quote className="w-12 h-12 mx-auto text-primary/40 mb-8" />
        <h2 className="font-display text-4xl md:text-5xl mb-8">The Story Behind This Piece</h2>
        <p className="text-xl leading-loose text-muted-foreground font-serif italic mb-12">
          Rooted in traditions passed down through generations in {product.region}, this {product.material.toLowerCase()} creation is more than an object. It represents weeks of dedication, natural rhythms, and the soulful touch of human hands that machines can never replicate.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {product.tags.map((t: string) => (
            <span key={t} className="px-6 py-2 border border-border/50 rounded-full text-xs uppercase tracking-widest text-foreground bg-surface/50 backdrop-blur-sm">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArtisanSection({ artisan }: { artisan: any }) {
  return (
    <div className="py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-premium group">
          <img src={artisan.avatar} alt={artisan.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-10 left-10 text-white">
            <span className="text-[10px] uppercase tracking-widest font-bold mb-2 block opacity-80">Master Artisan</span>
            <p className="font-display text-3xl font-medium">{artisan.name}</p>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h3 className="font-display text-4xl md:text-5xl mb-6">Meet the Hands <br/>That Shaped It.</h3>
          <p className="text-xs uppercase tracking-widest text-primary font-bold mb-8 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> {artisan.region}
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mb-12">
            With over two decades of experience, {artisan.name} preserves the heritage of {artisan.region}. Every strike, every fold, and every polish is a testament to the uncompromising quality that has defined their family's legacy.
          </p>
          <Link to="/shop" className="inline-flex items-center gap-3 border-b-2 border-foreground pb-2 text-[10px] uppercase tracking-widest font-bold hover:text-primary hover:border-primary transition-colors">
            Explore {artisan.name}'s Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function ProcessSection() {
  const steps = [
    { num: "01", title: "Sourcing", desc: "Gathering pure, natural materials from local sources." },
    { num: "02", title: "Shaping", desc: "Hand-molding or carving using century-old tools." },
    { num: "03", title: "Detailing", desc: "Meticulous engraving and painting by master craftsmen." },
    { num: "04", title: "Finishing", desc: "Curing, polishing, and natural sealing for longevity." }
  ];

  return (
    <div className="py-32 bg-background border-b border-border/50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="font-display text-4xl mb-16 text-center">The Crafting Process</h2>
        
        <div className="flex flex-col md:flex-row justify-between items-start relative mt-24">
          <div className="hidden md:block absolute top-8 left-12 right-12 h-px bg-border/50" />
          {steps.map((s, i) => (
            <motion.div 
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative w-full md:w-1/4 px-4 mb-12 md:mb-0 text-center group"
            >
              <div className="w-16 h-16 mx-auto bg-background border-2 border-border/50 group-hover:border-primary rounded-full flex items-center justify-center font-display text-2xl mb-6 relative z-10 transition-colors shadow-sm text-foreground group-hover:text-primary">
                {s.num}
              </div>
              <h4 className="font-display text-xl mb-3">{s.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px] mx-auto">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpecsSection({ product }: { product: any }) {
  const specs = [
    { title: "Materials & Care", content: `Crafted from premium ${product.material.toLowerCase()}. To maintain its beauty, wipe with a soft, dry cloth. Avoid exposure to harsh chemicals or direct prolonged sunlight.` },
    { title: "Dimensions & Weight", content: "Approximately 10x12 inches. Weight is roughly 1.2kg. Note: Since every piece is handmade, slight variations in size are a mark of authenticity." },
    { title: "Shipping & Returns", content: "Ships within 5-7 business days via secure logistics. Returns accepted within 7 days if the product is damaged upon arrival." },
    { title: "Authenticity Certificate", content: "Includes a physical KalaMitra certificate signed by the artisan, verifying its origin and materials." }
  ];
  
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="py-32 paper-texture border-b border-border/50">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-display text-4xl mb-16 text-center">Product Details</h2>
        
        <div className="space-y-4">
          {specs.map((spec, i) => (
            <div key={i} className="border border-border/50 bg-surface/50 rounded-2xl overflow-hidden backdrop-blur-sm">
              <button 
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-surface transition-colors"
              >
                <span className="font-display text-xl">{spec.title}</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-muted-foreground leading-relaxed">
                      {spec.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewsSection({ reviews }: { reviews: any[] }) {
  return (
    <div className="py-32 bg-surface">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-display text-4xl mb-4">Patron Stories</h2>
            <div className="flex items-center gap-3 text-lg font-medium">
              <div className="flex text-accent">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-accent" />)}
              </div>
              <span className="text-sm">4.9 out of 5 based on authentic reviews.</span>
            </div>
          </div>
          <button className="text-[10px] uppercase tracking-widest font-bold border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors">
            Write a Review
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-background border border-border/50 p-8 rounded-2xl shadow-sm hover-lift">
              <div className="flex justify-between items-start mb-6">
                <div className="flex text-accent gap-1">
                  {[...Array(r.rating)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-accent" />)}
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{r.date}</span>
              </div>
              <p className="font-serif italic text-lg leading-relaxed text-foreground/90 mb-8">"{r.text}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-surface border border-border/50 flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">{r.buyer}</p>
                  <p className="text-[10px] uppercase tracking-widest text-primary flex items-center gap-1 mt-0.5 font-bold">
                    <ShieldCheck className="w-3 h-3" /> Verified Buyer
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RelatedSection({ products, title }: { products: any[], title: string }) {
  if(!products.length) return null;
  return (
    <div className="py-32 bg-background border-t border-border/50 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-display text-4xl">{title}</h2>
          <div className="hidden md:flex gap-4">
            <button className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center hover:bg-surface transition-colors">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center hover:bg-surface transition-colors">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
          {products.map(p => (
            <Link key={p.id} to={`/shop/${p.id}`} className="group w-[280px] md:w-[320px] shrink-0 snap-start block hover-lift">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-surface mb-6 relative">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <h3 className="font-display text-xl mb-2 group-hover:text-primary transition-colors">{p.name}</h3>
              <p className="text-muted-foreground">{formatINR(p.price)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
