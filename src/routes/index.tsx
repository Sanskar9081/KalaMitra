import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles,
  Upload,
  Wand2,
  Store,
  Mic,
  Languages,
  Boxes,
  Truck,
  ShieldCheck,
  Image as ImageIcon,
  ScrollText,
  Tags,
  ArrowRight,
  PlayCircle,
  Star,
  Plus,
  Minus,
  Instagram,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/hero-artisan.jpg";
import artisan1 from "@/assets/artisan-1.jpg";
import artisan2 from "@/assets/artisan-2.jpg";
import artisan3 from "@/assets/artisan-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kalamitra — Where Tradition Meets Technology" },
      {
        name: "description",
        content:
          "AI-powered commerce platform empowering India's artisans, potters, weavers, and craftsmen to sell beautifully online.",
      },
      { property: "og:title", content: "Kalamitra — Where Tradition Meets Technology" },
      {
        property: "og:description",
        content:
          "Turn a single photo into a professional listing with AI image enhancement, storytelling, and SEO — built for India's artisans.",
      },
    ],
  }),
  component: Landing,
});

/* ---------- shared ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative px-6 py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title) && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            {eyebrow && (
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary-glow">
                <Sparkles className="h-3 w-3" />
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="mt-5 text-4xl font-medium md:text-5xl">{title}</h2>
            )}
            {description && (
              <p className="mt-4 text-base text-muted-foreground md:text-lg">{description}</p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

/* ---------- nav ---------- */

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl glass px-4 py-3 md:px-6">
        <a href="#" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)]">
            <span className="font-display text-lg font-bold text-primary-foreground">K</span>
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Kalamitra</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#how" className="transition hover:text-foreground">How it works</a>
          <a href="#features" className="transition hover:text-foreground">Features</a>
          <a href="#ai" className="transition hover:text-foreground">AI Studio</a>
          <a href="#stories" className="transition hover:text-foreground">Stories</a>
          <a href="#faq" className="transition hover:text-foreground">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/auth" className="hidden rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground md:inline-flex">
            Sign in
          </Link>
          <Link to="/auth" className="group inline-flex items-center gap-1 rounded-full bg-[image:var(--gradient-primary)] px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110">
            Get started
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-12 pt-36 md:pt-44">
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="absolute left-1/2 top-20 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-secondary"
          >
            <Sparkles className="h-3 w-3" />
            Built for Bharat · Powered by AI
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-balance text-5xl font-medium leading-[1.05] md:text-7xl lg:text-[5.5rem]"
          >
            Empowering India's <br />
            <span className="text-gradient">artisans through AI</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl"
          >
            Transform handmade craft into professional online listings with AI-powered
            storytelling, image enhancement, and commerce tools — in your language, in minutes.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/auth" className="group inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-primary)] px-6 py-3 text-base font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110">
              Get started free
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a href="#how" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-base font-medium text-foreground backdrop-blur transition hover:bg-surface">
              <PlayCircle className="h-5 w-5 text-secondary" />
              Watch demo
            </a>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-4 text-xs text-muted-foreground">
            No credit card · Free for first 50 listings · 14 regional languages
          </motion.p>
        </motion.div>

        {/* Hero composite */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mx-auto mt-16 max-w-6xl"
        >
          <div className="relative overflow-hidden rounded-3xl glass-strong p-3 shadow-[var(--shadow-card)]">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={heroImg}
                alt="Handcrafted Indian artisan products"
                width={1536}
                height={1152}
                className="h-auto w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>

            {/* Floating cards */}
            <FloatingCard
              className="absolute -left-4 top-10 md:-left-12 md:top-20"
              delay={0.6}
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/20">
                  <Wand2 className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">AI generated</p>
                  <p className="text-sm font-medium">Listing ready in 14s</p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard
              className="absolute -right-4 bottom-16 md:-right-10 md:bottom-24"
              delay={0.9}
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-secondary/20">
                  <Star className="h-5 w-5 fill-secondary text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">First sale</p>
                  <p className="text-sm font-medium">+₹1,240 · Diya set</p>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard
              className="absolute right-6 top-8 md:right-16 md:top-14"
              delay={1.1}
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <p className="text-xs font-medium">2,431 artisans online</p>
              </div>
            </FloatingCard>
          </div>

          {/* Trust strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-widest text-muted-foreground/70">
            <span>Featured in</span>
            <span className="font-display text-base normal-case tracking-normal text-muted-foreground">YourStory</span>
            <span className="font-display text-base normal-case tracking-normal text-muted-foreground">Inc42</span>
            <span className="font-display text-base normal-case tracking-normal text-muted-foreground">The Hindu</span>
            <span className="font-display text-base normal-case tracking-normal text-muted-foreground">ET Prime</span>
            <span className="font-display text-base normal-case tracking-normal text-muted-foreground">Mint</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={`hidden md:block ${className}`}
    >
      <div className="rounded-2xl glass-strong px-4 py-3 shadow-[var(--shadow-card)]">{children}</div>
    </motion.div>
  );
}

/* ---------- stats ---------- */

const STATS = [
  { value: "12,400+", label: "Artisans empowered" },
  { value: "1.8L", label: "Products listed" },
  { value: "94,000", label: "Orders completed" },
  { value: "₹6.2 Cr", label: "Revenue generated" },
];

function Stats() {
  return (
    <section className="px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-4 rounded-3xl glass p-6 md:grid-cols-4 md:p-10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="text-center md:text-left"
            >
              <div className="font-display text-3xl font-semibold text-gradient md:text-5xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- how it works ---------- */

const STEPS = [
  {
    icon: Upload,
    title: "Upload product",
    desc: "Snap a photo from your phone. Even a rough one — we'll handle the rest.",
  },
  {
    icon: Wand2,
    title: "AI enhances image",
    desc: "Clean backgrounds, studio lighting, and 4K detail in seconds.",
  },
  {
    icon: ScrollText,
    title: "AI creates listing",
    desc: "Title, description, story, and SEO tags — auto-written for your buyer.",
  },
  {
    icon: Store,
    title: "Sell across India",
    desc: "Publish to Kalamitra marketplace and manage orders from one dashboard.",
  },
];

function HowItWorks() {
  return (
    <Section
      id="how"
      eyebrow="How it works"
      title={<>From workshop to checkout in <span className="text-gradient">four steps</span></>}
      description="No tech skills needed. Speak in your language. We do the heavy lifting."
    >
      <div className="relative grid gap-6 md:grid-cols-4">
        <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent md:block" />
        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.55 }}
            className="relative rounded-2xl glass p-6"
          >
            <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)]">
              <step.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="mb-2 text-xs font-mono text-muted-foreground">0{i + 1}</div>
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- features ---------- */

const FEATURES = [
  { icon: ScrollText, title: "AI description generator", desc: "Compelling product copy tuned for buyers — in seconds." },
  { icon: Sparkles, title: "AI story generator", desc: "Share the soul behind every craft with authentic artisan stories." },
  { icon: ImageIcon, title: "AI image enhancement", desc: "Studio-quality photos from a single phone snap." },
  { icon: Mic, title: "Voice-based creation", desc: "Speak your product details. We turn them into a listing." },
  { icon: Languages, title: "14 regional languages", desc: "Hindi, Tamil, Bengali, Marathi and more — first class." },
  { icon: Boxes, title: "Inventory management", desc: "Track stock, variants, and low-quantity alerts." },
  { icon: Truck, title: "Order tracking", desc: "Live shipment status with India-wide logistics partners." },
  { icon: ShieldCheck, title: "Marketplace integration", desc: "One-click sync to Amazon, Flipkart, and more." },
];

function Features() {
  return (
    <Section
      id="features"
      eyebrow="Features"
      title={<>Everything an artisan needs, <br className="hidden md:block" /> nothing they don't</>}
      description="A complete commerce toolkit, designed to feel as familiar as a phone call."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 4) * 0.06, duration: 0.5 }}
            className="group relative overflow-hidden rounded-2xl glass p-6 transition hover:-translate-y-1 hover:border-primary/40"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/20" />
            <div className="relative">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-surface-elevated">
                <f.icon className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- AI studio preview ---------- */

const AI_MODULES = [
  { icon: ImageIcon, name: "Image Enhancement", color: "text-primary-glow" },
  { icon: ScrollText, name: "Description Writer", color: "text-secondary" },
  { icon: Sparkles, name: "Storytelling", color: "text-accent" },
  { icon: Tags, name: "SEO Tags", color: "text-primary-glow" },
  { icon: Mic, name: "Voice-to-Text", color: "text-secondary" },
];

function AIStudio() {
  return (
    <Section
      id="ai"
      eyebrow="AI Studio"
      title={<>Five intelligent modules, <span className="text-gradient">one calm workspace</span></>}
      description="Purpose-built models that understand craft, culture, and commerce."
    >
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-3">
          {AI_MODULES.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex items-center justify-between rounded-2xl glass p-4"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-surface-elevated">
                  <m.icon className={`h-5 w-5 ${m.color}`} />
                </div>
                <div>
                  <p className="font-medium">{m.name}</p>
                  <p className="text-xs text-muted-foreground">Ready · Avg. 1.4s response</p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Active
              </span>
            </motion.div>
          ))}
        </div>

        {/* Mock chat / generator */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl glass-strong p-5 shadow-[var(--shadow-card)]"
        >
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-secondary/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-accent/70" />
            </div>
            <span className="text-xs text-muted-foreground">kalamitra.ai/studio</span>
          </div>
          <div className="mt-5 space-y-4 text-sm">
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary/20 px-4 py-2 text-foreground">
                Blue pottery vase, 10 inches, made in Jaipur
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-surface-elevated px-4 py-3 text-foreground">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-secondary">Generated listing</p>
                <p className="font-display text-base font-semibold">Heritage Blue Pottery Vase — Jaipur</p>
                <p className="mt-1 text-muted-foreground">
                  Hand-thrown by third-generation artisans of Jaipur, this 10-inch vase carries
                  the cobalt blue that made the city famous on the Silk Route…
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["handmade", "jaipur", "blue-pottery", "home-decor", "gift"].map((t) => (
                    <span key={t} className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-surface/50 px-3 py-2 text-muted-foreground">
              <Mic className="h-4 w-4 text-secondary" />
              <span className="text-xs">Tap to speak in Hindi, Tamil, Bengali…</span>
              <div className="ml-auto flex gap-1">
                {[3, 5, 4, 6, 3, 5, 4].map((h, i) => (
                  <span
                    key={i}
                    className="w-0.5 rounded-full bg-secondary/70"
                    style={{ height: `${h * 3}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------- testimonials ---------- */

const TESTIMONIALS = [
  {
    img: artisan1,
    name: "Lakshmi Devi",
    craft: "Potter · Khurja, UP",
    quote:
      "I spoke into my phone in Hindi. Within minutes my diyas had a beautiful listing. I sold 40 sets in the first week of Diwali.",
  },
  {
    img: artisan2,
    name: "Manoj Patel",
    craft: "Handloom Weaver · Surat",
    quote:
      "Kalamitra's AI made my fabric look like a magazine photo. Customers from Bangalore and Delhi are now my regulars.",
  },
  {
    img: artisan3,
    name: "Priya Ranjan",
    craft: "Diya Painter · Jaipur",
    quote:
      "I was scared of selling online. Kalamitra felt like having a son who knows technology. It just works.",
  },
];

function Stories() {
  return (
    <Section
      id="stories"
      eyebrow="Stories"
      title={<>Real artisans, <span className="text-gradient">real livelihoods</span></>}
      description="A growing community turning generational craft into thriving businesses."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.55 }}
            className="overflow-hidden rounded-3xl glass"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={t.img}
                alt={t.name}
                width={768}
                height={768}
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
            </div>
            <div className="p-6">
              <div className="mb-3 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-secondary text-secondary" />
                ))}
              </div>
              <blockquote className="font-display text-lg leading-snug">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <p className="font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.craft}</p>
              </figcaption>
            </div>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}

/* ---------- faq ---------- */

const FAQS = [
  {
    q: "Do I need a smartphone or laptop to use Kalamitra?",
    a: "A basic smartphone with a camera is enough. The whole platform is designed mobile-first and supports voice input in 14 regional languages.",
  },
  {
    q: "How much does it cost to list a product?",
    a: "The first 50 listings are free for every artisan. After that, we charge a tiny percentage only when you make a sale — never an upfront fee.",
  },
  {
    q: "Does Kalamitra handle shipping?",
    a: "Yes. We've partnered with India-wide logistics providers. Print a label, hand off the parcel, and we'll keep buyers updated automatically.",
  },
  {
    q: "Can the AI really write in my regional language?",
    a: "Our models are trained for Indian languages and craft vocabulary — Hindi, Tamil, Bengali, Marathi, Telugu, Kannada, Gujarati, Punjabi and more.",
  },
  {
    q: "Who owns my product photos and stories?",
    a: "You do. Always. Kalamitra never re-sells your content, and you can export or delete everything any time.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Questions, answered"
      description="Everything you need to know before you start selling."
    >
      <div className="mx-auto max-w-3xl space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className="overflow-hidden rounded-2xl glass transition"
            >
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-medium">{f.q}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-elevated">
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="px-6 pb-5 text-sm text-muted-foreground"
                >
                  {f.a}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- CTA ---------- */

function CTA() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl glass-strong p-10 md:p-16">
        <div className="grid items-center gap-8 md:grid-cols-[1.5fr,1fr]">
          <div>
            <h2 className="text-4xl font-medium md:text-5xl">
              Your craft deserves <span className="text-gradient">a global stage.</span>
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground md:text-lg">
              Join 12,000+ artisans turning tradition into thriving online businesses with
              Kalamitra. Setup takes 3 minutes.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Link to="/auth" className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-primary)] px-6 py-3 text-base font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110">
              Start selling free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm text-foreground transition hover:bg-surface">
              Book a 1:1 onboarding call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */

function Footer() {
  return (
    <footer className="border-t border-border px-6 pb-10 pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr,1fr,1fr,1fr]">
        <div>
          <a href="#" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)]">
              <span className="font-display text-lg font-bold text-primary-foreground">K</span>
            </span>
            <span className="font-display text-lg font-semibold">Kalamitra</span>
          </a>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Where tradition meets technology. Empowering India's artisans, one beautiful
            listing at a time.
          </p>
          <div className="mt-6 flex gap-3 text-muted-foreground">
            {[Instagram, Twitter, Linkedin, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full glass transition hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: "Product", items: ["AI Studio", "Marketplace", "Pricing", "Roadmap"] },
          { title: "Company", items: ["About", "Stories", "Press", "Careers"] },
          { title: "Support", items: ["Help center", "Contact", "Privacy", "Terms"] },
        ].map((col) => (
          <div key={col.title}>
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {col.title}
            </p>
            <ul className="space-y-2 text-sm">
              {col.items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-foreground/80 transition hover:text-foreground">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
        <p>© 2026 Kalamitra · Crafted by team Insight Coders</p>
        <p>Made with care in Bharat 🇮🇳</p>
      </div>
    </footer>
  );
}

/* ---------- page ---------- */

function Landing() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <Stats />
      <HowItWorks />
      <Features />
      <AIStudio />
      <Stories />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
