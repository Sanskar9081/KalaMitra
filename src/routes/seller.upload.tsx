import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Sparkles, Mic, Wand2, Check, ScrollText, Tags, ImageIcon } from "lucide-react";
import { PageHeader } from "@/components/dashboard-shell";
import heroImg from "@/assets/product-1.jpg";

export const Route = createFileRoute("/seller/upload")({
  component: SellerUpload,
});

function SellerUpload() {
  const [step, setStep] = useState(1);
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    setGenerated(false);
    setTimeout(() => setGenerated(true), 1500);
  };

  return (
    <div>
      <PageHeader
        title="AI Product Studio"
        subtitle="Upload a photo, answer a few questions, and let AI build your listing"
      />

      <div className="mb-8 flex items-center gap-3">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-1 items-center gap-3">
            <div
              className={`grid h-9 w-9 place-items-center rounded-full text-sm font-medium transition ${
                step >= s
                  ? "bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]"
                  : "bg-surface text-muted-foreground"
              }`}
            >
              {step > s ? <Check className="h-4 w-4" /> : s}
            </div>
            <div className="hidden text-xs sm:block">
              <p className={step >= s ? "font-medium" : "text-muted-foreground"}>
                {s === 1 ? "Upload" : s === 2 ? "Details" : "AI Generate"}
              </p>
            </div>
            {s < 3 && <div className={`h-px flex-1 ${step > s ? "bg-primary/50" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr,1fr]">
        {/* LEFT — form */}
        <div className="space-y-6">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass p-8 text-center">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-[image:var(--gradient-primary)]">
                <Upload className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-medium">Upload product photo</h3>
              <p className="mt-1 text-sm text-muted-foreground">Even a rough phone snap works — AI will enhance it.</p>
              <div className="mt-6 rounded-2xl border-2 border-dashed border-border bg-surface/30 p-10">
                <p className="text-sm text-muted-foreground">Drop image here or</p>
                <button onClick={() => setStep(2)} className="mt-3 inline-flex rounded-full bg-[image:var(--gradient-primary)] px-5 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)]">
                  Choose file
                </button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">PNG, JPG · up to 10MB</p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 rounded-2xl glass p-6">
              <Field label="Product name" placeholder="e.g. Blue Pottery Vase" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Category" placeholder="Home Decor" />
                <Field label="Material" placeholder="Ceramic" />
                <Field label="Price (₹)" placeholder="1299" />
                <Field label="Quantity" placeholder="10" />
              </div>
              <label className="block">
                <span className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Notes (or speak)</span>
                <div className="relative">
                  <textarea rows={3} placeholder="Tell us about your craft…" className="w-full rounded-xl border border-border bg-surface/60 p-3 text-sm outline-none focus:border-primary/60" />
                  <button className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-secondary/15 px-3 py-1 text-xs text-secondary">
                    <Mic className="h-3 w-3" /> Speak
                  </button>
                </div>
              </label>
              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="rounded-full border border-border px-4 py-2 text-sm">Back</button>
                <button onClick={() => { setStep(3); generate(); }} className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-primary)] px-5 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)]">
                  <Sparkles className="h-4 w-4" /> Generate with AI
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <AIBlock icon={ImageIcon} title="Image enhancement" loading={!generated}>
                Studio lighting applied · background cleaned · 4K detail
              </AIBlock>
              <AIBlock icon={ScrollText} title="Description" loading={!generated}>
                Hand-thrown by third-generation artisans of Jaipur, this 10-inch vase carries the cobalt blue that made the city famous on the Silk Route.
              </AIBlock>
              <AIBlock icon={Sparkles} title="Artisan story" loading={!generated}>
                For Lakshmi Devi, every vase begins at dawn beside the kiln her grandfather built. The cobalt swirls echo the wells of her village.
              </AIBlock>
              <AIBlock icon={Tags} title="SEO tags" loading={!generated}>
                <div className="flex flex-wrap gap-1.5">
                  {["handmade", "jaipur", "blue-pottery", "home-decor", "gift", "ceramic"].map((t) => (
                    <span key={t} className="rounded-full bg-accent/15 px-2 py-0.5 text-xs text-accent">#{t}</span>
                  ))}
                </div>
              </AIBlock>
              <div className="flex justify-end gap-2">
                <button onClick={generate} className="rounded-full border border-border px-4 py-2 text-sm"><Wand2 className="mr-1 inline h-3.5 w-3.5" /> Regenerate</button>
                <button className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-primary)] px-5 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)]">
                  Publish listing
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* RIGHT — preview */}
        <div className="rounded-2xl glass-strong p-4">
          <p className="px-2 pb-3 text-xs uppercase tracking-widest text-muted-foreground">Live preview</p>
          <div className="overflow-hidden rounded-xl">
            <img src={heroImg} alt="" className="aspect-square w-full object-cover" />
          </div>
          <div className="p-4">
            <p className="font-display text-lg">Heritage Blue Pottery Vase</p>
            <p className="text-xs text-muted-foreground">Jaipur · Lakshmi Devi</p>
            <p className="mt-2 font-semibold">₹1,299</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input placeholder={placeholder} className="h-10 w-full rounded-xl border border-border bg-surface/60 px-3 text-sm outline-none focus:border-primary/60" />
    </label>
  );
}

function AIBlock({ icon: Icon, title, loading, children }: { icon: any; title: string; loading: boolean; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl glass p-5">
      <div className="mb-2 flex items-center gap-2">
        <div className="grid h-7 w-7 place-items-center rounded-lg bg-primary/15">
          <Icon className="h-3.5 w-3.5 text-primary-glow" />
        </div>
        <p className="text-sm font-medium">{title}</p>
        {loading && <span className="ml-auto inline-flex items-center gap-1 text-xs text-secondary"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" /> Generating…</span>}
        {!loading && <span className="ml-auto inline-flex items-center gap-1 text-xs text-accent"><Check className="h-3 w-3" /> Ready</span>}
      </div>
      <div className={`text-sm text-muted-foreground ${loading ? "opacity-40" : ""}`}>{children}</div>
    </div>
  );
}
