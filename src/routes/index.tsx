import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles, Upload, Wand2, Store, Mic, Languages,
  Boxes, Truck, ShieldCheck, Image as ImageIcon,
  ScrollText, Tags, ArrowRight, PlayCircle, Star,
  Plus, Minus, Instagram, Twitter, Linkedin, Github
} from "lucide-react";
import { useState, useEffect } from "react";
import heroImg from "@/assets/hero-artisan.jpg";
import artisan1 from "@/assets/artisan-1.jpg";
import artisan2 from "@/assets/artisan-2.jpg";
import artisan3 from "@/assets/artisan-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kalamitra — Premium AI Commerce" },
      { name: "description", content: "Empowering India's artisans with next-generation AI tools." },
    ],
  }),
  component: Landing,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

function Section({
  id, eyebrow, title, description, children, className = "",
}: {
  id?: string; eyebrow?: string; title?: React.ReactNode; description?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <section id={id} className={`relative px-6 py-24 md:py-32 overflow-hidden ${className}`}>
      <div className="mx-auto max-w-7xl relative z-10">
        {(eyebrow || title) && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            {eyebrow && (
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" />
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl text-foreground">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-6 text-lg text-muted-foreground md:text-xl leading-relaxed">
                {description}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

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
        scrolled ? "bg-background/70 backdrop-blur-2xl border-b border-white/5 py-3 shadow-2xl" : "bg-transparent py-6"
      } px-6`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-premium transition-transform duration-300 group-hover:scale-105">
            <span className="font-display text-xl font-bold text-primary-foreground">K</span>
          </div>
          <span className="font-display text-xl font-semibold tracking-tight">Kalamitra</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {['Features', 'Stories'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="transition-colors hover:text-foreground">
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/auth" className="hidden text-sm font-medium text-muted-foreground transition hover:text-foreground md:block">
            Sign in
          </Link>
          <Link to="/auth" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
            <span className="relative z-10">Get Started</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen pt-32 md:pt-48 pb-20 overflow-hidden flex flex-col items-center">
      {/* Animated abstract background elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-10000" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-7000 delay-1000" />

      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      <motion.div style={{ y: y1, opacity }} className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-foreground backdrop-blur-md mb-8 shadow-2xl"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          Kalamitra AI 2.0 is now live
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl font-bold tracking-tight md:text-[5.5rem] leading-[1.05]"
        >
          Scale your craft.<br />
          <span className="text-gradient">Powered by intelligence.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed"
        >
          Turn a single photo into a professional storefront. Our AI agent writes your story, enhances images, and manages inventory automatically.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/auth" className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-foreground px-8 py-4 text-base font-semibold text-background transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
            <span className="relative z-10">Start building free</span>
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <a href="#demo" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-surface/50 px-8 py-4 text-base font-semibold text-foreground backdrop-blur-md transition-all hover:bg-surface hover:border-white/20">
            <PlayCircle className="h-5 w-5" />
            Watch product tour
          </a>
        </motion.div>
      </motion.div>

      {/* Premium Dashboard Preview */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mt-24 w-full max-w-6xl px-6 z-20"
      >
        <div className="relative rounded-3xl border border-white/10 bg-surface/40 p-2 backdrop-blur-2xl shadow-premium">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="relative overflow-hidden rounded-2xl bg-background border border-white/5">
             {/* Fake browser bar */}
             <div className="flex items-center gap-2 border-b border-white/5 bg-surface/80 px-4 py-3">
               <div className="flex gap-1.5">
                 <div className="h-3 w-3 rounded-full bg-destructive/80" />
                 <div className="h-3 w-3 rounded-full bg-secondary/80" />
                 <div className="h-3 w-3 rounded-full bg-accent/80" />
               </div>
               <div className="mx-auto flex h-6 w-full max-w-xs items-center justify-center rounded-md bg-background/50 text-[10px] text-muted-foreground font-mono">
                 dashboard.kalamitra.ai
               </div>
             </div>
             {/* Preview Content */}
             <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img src={heroImg} alt="Platform Preview" className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                
                {/* Floating UI Elements inside preview */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute bottom-10 left-10 rounded-2xl border border-white/10 bg-surface/80 p-4 backdrop-blur-xl shadow-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/20 text-primary-glow">
                      <Wand2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Listing Generated</p>
                      <p className="text-xs text-muted-foreground">SEO optimized in 1.2s</p>
                    </div>
                  </div>
                </motion.div>
             </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Stats() {
  const STATS = [
    { value: "$2.4M", label: "Artisan Revenue" },
    { value: "40K+", label: "AI Listings Created" },
    { value: "14", label: "Languages Supported" },
    { value: "99.9%", label: "Platform Uptime" },
  ];

  return (
    <section className="px-6 py-12 relative z-20 -mt-20">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/5 bg-surface/60 backdrop-blur-3xl shadow-2xl p-8 md:p-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 divide-x divide-white/5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center px-4"
            >
              <div className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const BENTOS = [
    {
      title: "Auto-Magic Descriptions",
      desc: "Our LLM understands craft nuances and outputs high-converting copy in seconds.",
      icon: ScrollText,
      span: "col-span-1 md:col-span-2",
      delay: 0
    },
    {
      title: "One-Click Studio",
      desc: "Transform phone photos into 4K studio shots.",
      icon: ImageIcon,
      span: "col-span-1 md:col-span-1",
      delay: 0.1
    },
    {
      title: "Voice to Commerce",
      desc: "Speak your product details in any regional language.",
      icon: Mic,
      span: "col-span-1 md:col-span-1",
      delay: 0.2
    },
    {
      title: "Global Inventory Sync",
      desc: "Seamlessly push products to Amazon, Flipkart, and Shopify with zero friction.",
      icon: Boxes,
      span: "col-span-1 md:col-span-2",
      delay: 0.3
    }
  ];

  return (
    <Section
      id="features"
      eyebrow="Capabilities"
      title={<span>Engineered for <br/> <span className="text-gradient">effortless scale</span></span>}
      description="We abstracted away the complexity of online selling so you can focus entirely on your craft."
    >
      <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
        {BENTOS.map((b) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: b.delay, duration: 0.6 }}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-surface/40 p-8 backdrop-blur-sm transition-all hover:bg-surface/60 hover:border-white/20 ${b.span}`}
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-[80px] transition-all group-hover:bg-primary/20" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-12">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-background border border-white/5 shadow-inner">
                <b.icon className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-foreground">{b.title}</h3>
                <p className="mt-2 text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Stories() {
  const TESTIMONIALS = [
    { img: artisan1, name: "Lakshmi Devi", craft: "Potter · Khurja", quote: "I spoke into my phone in Hindi. Within minutes my diyas had a beautiful listing." },
    { img: artisan2, name: "Manoj Patel", craft: "Weaver · Surat", quote: "The AI made my fabric look like a magazine photo. Customers are now my regulars." },
    { img: artisan3, name: "Priya Ranjan", craft: "Painter · Jaipur", quote: "It felt like having a son who knows technology. It just works effortlessly." },
  ];

  return (
    <Section
      id="stories"
      eyebrow="Success Stories"
      title={<span>Empowering <span className="text-gradient">creators</span></span>}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative overflow-hidden rounded-3xl border border-white/5 bg-surface/30 backdrop-blur-sm"
          >
            <div className="h-64 overflow-hidden">
              <img src={t.img} alt={t.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:rotate-1 opacity-80" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
              </div>
              <p className="font-display text-xl font-medium leading-snug text-foreground mb-4">"{t.quote}"</p>
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">{t.craft}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function CTA() {
  return (
    <section className="px-6 py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5" />
      <div className="mx-auto max-w-5xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-[3rem] border border-white/10 bg-gradient-to-br from-surface to-surface-elevated p-12 md:p-20 text-center shadow-premium relative overflow-hidden"
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />
          
          <div className="relative z-10">
            <h2 className="font-display text-4xl font-bold md:text-6xl tracking-tight">
              Ready to scale your <br/> <span className="text-gradient">creative empire?</span>
            </h2>
            <p className="mt-6 mx-auto max-w-xl text-lg text-muted-foreground">
              Join the platform that is redefining commerce for artisans. Deploy your intelligent storefront in under 3 minutes.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 text-base font-semibold text-background transition-all hover:scale-105 shadow-2xl">
                Create free account
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background px-6 pt-20 pb-10">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[2fr,1fr,1fr,1fr]">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <span className="font-display text-sm font-bold text-primary-foreground">K</span>
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">Kalamitra</span>
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
            Building the intelligence layer for global artisan commerce. Engineered with precision in India.
          </p>
          <div className="mt-8 flex gap-4">
            {[Instagram, Twitter, Linkedin, Github].map((Icon, i) => (
              <a key={i} href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: "Product", items: ["AI Studio", "Marketplace", "Enterprise", "Pricing"] },
          { title: "Resources", items: ["Documentation", "API Reference", "Blog", "Community"] },
          { title: "Company", items: ["About", "Careers", "Legal", "Contact"] },
        ].map((col) => (
          <div key={col.title}>
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">{col.title}</p>
            <ul className="space-y-4 text-sm text-muted-foreground">
              {col.items.map((item) => (
                <li key={item}><a href="#" className="hover:text-foreground transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-20 max-w-7xl border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-muted-foreground">
        <p>© 2026 Kalamitra Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Privacy Policy</a>
          <a href="#" className="hover:text-foreground">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <Stories />
      <CTA />
      <Footer />
    </main>
  );
}
