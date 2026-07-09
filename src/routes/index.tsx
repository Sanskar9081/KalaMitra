import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, MapPin, Shield, HeartHandshake, Globe, Quote, Instagram, Twitter, Linkedin
} from "lucide-react";
import { useState, useEffect } from "react";
import heroImg from "@/assets/hero-artisan.jpg";
import artisan1 from "@/assets/artisan-1.jpg";
import artisan2 from "@/assets/artisan-2.jpg";
import artisan3 from "@/assets/artisan-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kalamitra — Authentic Indian Craftsmanship" },
      { name: "description", content: "India's premium digital marketplace connecting authentic local artisans directly with buyers." },
    ],
  }),
  component: Landing,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

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
        scrolled ? "bg-surface/90 backdrop-blur-2xl border-b border-border py-4 shadow-sm" : "bg-transparent py-8"
      } px-6 md:px-12`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <span className="font-display text-2xl font-bold tracking-tight text-primary">KalaMitra</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/80 md:flex uppercase tracking-widest">
          {['Explore', 'Artisans', 'Collections', 'Stories', 'About'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="transition-colors hover:text-primary">
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-6">
          <Link to="/auth" className="hidden text-sm font-medium text-foreground/80 uppercase tracking-widest transition hover:text-primary md:block">
            Login
          </Link>
          <Link to="/auth" className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-2.5 text-sm uppercase tracking-widest font-medium transition-all hover:bg-primary hover:text-primary-foreground">
            Become Seller
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -50]);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center paper-texture">
      <div className="mx-auto max-w-7xl px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
        {/* Left Side */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="max-w-xl"
        >
          <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.1] text-foreground tracking-tight">
            Every Handmade Piece <br/><i className="font-serif font-light text-primary">Carries a Story.</i>
          </h1>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
            Discover India's most exquisite artisanal crafts. We bridge the gap between rural master craftsmen and homes that appreciate authentic, timeless luxury.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-6">
            <Link to="/shop" className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 text-sm uppercase tracking-widest font-medium transition-transform hover-lift">
              Explore Collection
            </Link>
            <a href="#artisans" className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 text-sm uppercase tracking-widest font-medium text-foreground transition-colors hover:border-primary hover:text-primary">
              Meet the Artisans
            </a>
          </div>
        </motion.div>

        {/* Right Side */}
        <div className="relative h-[600px] w-full hidden lg:block">
          <motion.div style={{ y: y1 }} className="absolute right-0 top-0 w-4/5 h-[550px] overflow-hidden">
            <img src={heroImg} alt="Master artisan crafting pottery" className="w-full h-full object-cover scale-105" />
          </motion.div>
          
          <motion.div style={{ y: y2 }} className="absolute left-0 bottom-10 w-[240px] h-[320px] overflow-hidden border-8 border-background shadow-2xl z-20">
            <img src={artisan1} alt="Artisan portrait" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm p-3 text-center text-xs font-medium uppercase tracking-wider text-foreground">
              Rani Devi, Weaver
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SocialTrust() {
  return (
    <section className="border-y border-border/50 bg-surface/50 py-12">
      <div className="mx-auto max-w-7xl px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        <span>Featured In Vogue</span>
        <span>Government Support</span>
        <span>Verified Artisans</span>
        <span>Secure Payments</span>
        <span>10K+ Happy Buyers</span>
      </div>
    </section>
  );
}

function CraftJourney() {
  const steps = [
    { title: "Forest to Hands", desc: "Sourcing sustainable raw materials directly from nature, ensuring zero ecological harm." },
    { title: "Wood Selection", desc: "Master craftsmen hand-pick the perfect grain, reading the wood like a canvas." },
    { title: "Hand Carving", desc: "Weeks of meticulous chiseling and shaping, passing down techniques centuries old." },
    { title: "Natural Finishing", desc: "Using organic oils and plant-based dyes to bring the craft to vibrant life." },
    { title: "Your Home", desc: "A timeless masterpiece arrives at your doorstep, carrying the soul of its maker." }
  ];

  return (
    <section id="stories" className="py-32 px-6 bg-surface">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-24">
          <h2 className="font-display text-4xl md:text-5xl font-medium">The Journey of Craft</h2>
          <p className="mt-4 text-muted-foreground uppercase tracking-widest text-sm">From Nature to Your Living Room</p>
        </div>
        
        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border/50 hidden md:block" />
          
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-20 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1 w-full md:text-right hidden md:block">
                {i % 2 === 0 && (
                  <div>
                    <h3 className="font-display text-2xl mb-3 text-primary">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed max-w-md ml-auto">{step.desc}</p>
                  </div>
                )}
              </div>
              
              <div className="w-12 h-12 shrink-0 rounded-full border border-primary flex items-center justify-center bg-background z-10 text-primary font-display text-xl relative">
                {i + 1}
              </div>
              
              <div className="flex-1 w-full">
                {i % 2 !== 0 && (
                  <div className="md:text-left">
                    <h3 className="font-display text-2xl mb-3 text-primary">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed max-w-md">{step.desc}</p>
                  </div>
                )}
                {i % 2 === 0 && (
                  <div className="md:hidden">
                    <h3 className="font-display text-2xl mb-3 text-primary">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCollections() {
  const collections = [
    { title: "Wooden Decor", img: heroImg, class: "col-span-1 md:col-span-2 row-span-2 h-[600px]" },
    { title: "Traditional Paintings", img: artisan3, class: "col-span-1 h-[280px]" },
    { title: "Clay Art", img: artisan1, class: "col-span-1 h-[280px]" },
    { title: "Textile Art", img: artisan2, class: "col-span-1 md:col-span-2 h-[400px]" },
  ];

  return (
    <section id="collections" className="py-32 px-6 paper-texture">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-medium">Curated Collections</h2>
            <p className="mt-4 text-muted-foreground">Masterpieces defining Indian heritage.</p>
          </div>
          <Link to="/shop" className="text-sm uppercase tracking-widest font-medium border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors">
            View All Categories
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
          {collections.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`group relative overflow-hidden bg-surface ${c.class}`}
            >
              <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="font-display text-3xl font-medium mb-2 opacity-90">{c.title}</h3>
                <span className="text-sm uppercase tracking-widest flex items-center gap-2 opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Artisans() {
  return (
    <section id="artisans" className="py-32 px-6 bg-surface-elevated text-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-24">
          <h2 className="font-display text-4xl md:text-5xl font-medium">Meet the Makers</h2>
          <p className="mt-4 text-muted-foreground">The hands that preserve our legacy.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[3/4] overflow-hidden"
          >
            <img src={artisan2} alt="Artisan" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-lg"
          >
            <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-primary mb-6">
              <MapPin className="w-4 h-4" /> Varanasi, Uttar Pradesh
            </div>
            <h3 className="font-display text-4xl mb-4 italic">"Weaving isn't just a livelihood. It's the rhythm of my breath."</h3>
            <p className="text-muted-foreground mb-8 text-sm uppercase tracking-widest">Kabeer Das — 4th Generation Master Weaver</p>
            
            <p className="text-lg leading-relaxed mb-10 text-muted-foreground">
              For over 45 years, Kabeer has sat at his wooden handloom, creating Banarasi silk sarees that take up to three months to complete. His intricate Zari work tells stories of ancient temple architecture and royal gardens.
            </p>
            
            <Link to="/shop" className="inline-flex items-center gap-2 border border-border px-8 py-4 text-sm uppercase tracking-widest font-medium transition-colors hover:border-primary hover:text-primary">
              View His Collection
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WhyKalaMitra() {
  const sections = [
    { title: "Fair Trade. No Middlemen.", desc: "When you buy on KalaMitra, 90% of the value goes directly to the artisan's pocket. We are a transparent bridge, not a toll booth.", icon: HeartHandshake, img: heroImg },
    { title: "Certified Authentic", desc: "Every product comes with a digital certificate of authenticity, detailing the maker, the origin, and the hours poured into its creation.", icon: Shield, img: artisan3 },
  ];

  return (
    <section className="py-32 px-6 paper-texture">
      <div className="mx-auto max-w-7xl flex flex-col gap-32">
        {sections.map((s, i) => (
          <div key={s.title} className={`flex flex-col md:flex-row items-center gap-16 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex-1 w-full h-[500px] overflow-hidden bg-surface"
            >
              <img src={s.img} alt={s.title} className="w-full h-full object-cover opacity-90" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 max-w-md"
            >
              <s.icon className="w-12 h-12 text-primary mb-6 stroke-[1]" />
              <h2 className="font-display text-4xl mb-6">{s.title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="py-24 border-y border-border/50 bg-surface text-center">
      <div className="mx-auto max-w-5xl px-6 grid grid-cols-2 md:grid-cols-4 gap-12 divide-x divide-border/50">
        {[
          { v: "500+", l: "Verified Artisans" },
          { v: "25+", l: "States Reached" },
          { v: "10K+", l: "Handcrafted Products" },
          { v: "50K+", l: "Happy Patrons" }
        ].map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="flex flex-col items-center justify-center px-4"
          >
            <div className="font-display text-4xl md:text-5xl text-foreground mb-3">{s.v}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-32 px-6 paper-texture">
      <div className="mx-auto max-w-4xl text-center">
        <Quote className="w-16 h-16 mx-auto text-primary/30 mb-8" />
        <h2 className="font-display text-3xl md:text-5xl leading-tight mb-12 italic">
          "The wooden chest arrived smelling of natural oils and monsoon rain. It isn't just furniture; it's a piece of India's soul resting in my London apartment."
        </h2>
        <div className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
          — Eleanor R., London
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="py-32 px-6 bg-surface-elevated text-center border-t border-border/50">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-4xl mb-4">Join the Inner Circle</h2>
        <p className="text-muted-foreground mb-10">Receive editorial stories of our artisans and early access to limited collections.</p>
        
        <form className="flex flex-col sm:flex-row gap-4 border-b border-foreground/30 pb-2 max-w-md mx-auto focus-within:border-primary transition-colors">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground text-foreground px-2"
          />
          <button type="submit" className="text-sm uppercase tracking-widest font-medium hover:text-primary transition-colors">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-background pt-24 pb-12 px-6 border-t border-border/50">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
        <div className="md:col-span-1">
          <Link to="/" className="font-display text-3xl font-bold tracking-tight text-foreground block mb-6">
            KalaMitra
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed italic font-serif">
            "Art is not what you see, but what you make others see."
          </p>
          <div className="mt-8 flex gap-6">
            {[Instagram, Twitter, Linkedin, Globe].map((Icon, i) => (
              <a key={i} href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        
        {[
          { title: "Explore", links: ["All Collections", "Meet Artisans", "New Arrivals", "Best Sellers"] },
          { title: "Company", links: ["Our Story", "Sustainability", "Careers", "Contact Us"] },
          { title: "Support", links: ["Track Order", "Shipping & Returns", "FAQ", "Privacy Policy"] }
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-6">{col.title}</h4>
            <ul className="space-y-4">
              {col.links.map(l => (
                <li key={l}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mx-auto max-w-7xl border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} KalaMitra. All rights reserved.</p>
        <div className="flex gap-6">
          <span>Crafted with passion in India</span>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 text-foreground">
      <Nav />
      <Hero />
      <SocialTrust />
      <CraftJourney />
      <FeaturedCollections />
      <Artisans />
      <WhyKalaMitra />
      <Stats />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
