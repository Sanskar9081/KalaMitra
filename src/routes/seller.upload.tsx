import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Sparkles, Mic, Wand2, Check, ScrollText, Tags, ImageIcon, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/dashboard-shell";
import heroImg from "@/assets/product-1.jpg";

export const Route = createFileRoute("/seller/upload")({
  component: SellerUpload,
});

function SellerUpload() {
  const [step, setStep] = useState(1);
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setGenerated(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        title="AI Product Studio"
        subtitle="Upload a raw photo and let Kalamitra Intelligence build your listing."
      />

      <div className="mb-12 flex items-center justify-between max-w-3xl">
        {[
          { id: 1, label: "Upload Asset" },
          { id: 2, label: "Context" },
          { id: 3, label: "AI Generation" }
        ].map((s, i) => (
          <div key={s.id} className="flex flex-1 items-center gap-4">
            <div
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-base font-bold transition-all duration-500 ${
                step > s.id
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--color-primary),0.4)]"
                  : step === s.id
                  ? "bg-surface-elevated border-2 border-primary/50 text-primary-glow"
                  : "bg-surface border border-white/5 text-muted-foreground"
              }`}
            >
              {step > s.id ? <Check className="h-5 w-5" /> : s.id}
            </div>
            <div className="hidden sm:block">
              <p className={`text-sm uppercase tracking-widest ${step >= s.id ? "font-bold text-foreground" : "font-medium text-muted-foreground"}`}>
                {s.label}
              </p>
            </div>
            {i < 2 && (
              <div className="flex-1 px-4">
                <div className="h-[2px] w-full rounded-full bg-surface-elevated overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: step > s.id ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr,1fr] xl:gap-16">
        {/* LEFT — Form Area */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="rounded-[2rem] border border-white/10 bg-surface/40 p-10 backdrop-blur-xl shadow-premium text-center min-h-[500px] flex flex-col justify-center"
              >
                <div className="mx-auto mb-8 grid h-24 w-24 place-items-center rounded-[2rem] bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 shadow-inner">
                  <Upload className="h-10 w-10 text-primary-glow" />
                </div>
                <h3 className="font-display text-3xl font-semibold tracking-tight">Upload raw photo</h3>
                <p className="mt-3 text-base text-muted-foreground max-w-sm mx-auto">
                  Drop an unedited phone picture. Our Vision model will extract the product and apply studio lighting.
                </p>
                <div className="mt-10 mx-auto w-full max-w-md rounded-3xl border-2 border-dashed border-primary/30 bg-surface/50 p-12 transition-all hover:bg-surface/80 hover:border-primary/50 group cursor-pointer" onClick={() => setStep(2)}>
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Drag & drop your file here</p>
                  <div className="mt-6 mx-auto inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all group-hover:scale-105">
                    Browse files
                  </div>
                </div>
                <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground font-semibold">Supports HEIC, PNG, JPG (Max 20MB)</p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="rounded-[2rem] border border-white/10 bg-surface/40 p-10 backdrop-blur-xl shadow-premium"
              >
                <div className="mb-8">
                  <h3 className="font-display text-3xl font-semibold tracking-tight">Product Context</h3>
                  <p className="text-muted-foreground mt-2">Provide basic hints. AI will do the heavy lifting.</p>
                </div>
                
                <div className="space-y-6">
                  <Field label="Working Title" placeholder="e.g. Hand-painted Blue Pottery Vase" />
                  
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Category" placeholder="Home Decor" />
                    <Field label="Material" placeholder="Ceramic / Clay" />
                    <Field label="Target Price (₹)" placeholder="1299" />
                    <Field label="Available Qty" placeholder="10" />
                  </div>
                  
                  <label className="block pt-2">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                      Background Story
                      <button className="inline-flex items-center gap-1.5 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-[10px] text-secondary transition-colors hover:bg-secondary/20">
                        <Mic className="h-3 w-3" /> Dictate
                      </button>
                    </span>
                    <textarea 
                      rows={4} 
                      placeholder="Share the history or technique used..." 
                      className="w-full rounded-2xl border border-white/10 bg-surface/60 p-4 text-sm outline-none transition-all focus:border-primary/50 focus:bg-surface/80 focus:ring-4 focus:ring-primary/10" 
                    />
                  </label>
                </div>

                <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-8">
                  <button onClick={() => setStep(1)} className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                    Back to Upload
                  </button>
                  <button onClick={generate} className="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background transition-all hover:scale-105 shadow-2xl">
                    <Sparkles className="h-4 w-4" /> 
                    <span>Generate AI Listing</span>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-5"
              >
                <div className="mb-8">
                  <h3 className="font-display text-3xl font-semibold tracking-tight flex items-center gap-3">
                    Intelligence Output
                    {loading && <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span></span>}
                  </h3>
                  <p className="text-muted-foreground mt-2">Review and publish your optimized storefront listing.</p>
                </div>

                <AIBlock icon={ImageIcon} title="Studio Image Enhancement" loading={loading} generated={generated} delay={0.1}>
                  <span className="text-foreground font-medium">Applied:</span> Studio lighting · Auto background removal · 4K upscaling
                </AIBlock>
                <AIBlock icon={ScrollText} title="Conversion Copywriting" loading={loading} generated={generated} delay={0.2}>
                  Hand-thrown by third-generation artisans of Jaipur, this 10-inch vase carries the cobalt blue that made the city famous on the Silk Route.
                </AIBlock>
                <AIBlock icon={Sparkles} title="Artisan Storytelling" loading={loading} generated={generated} delay={0.3}>
                  For Lakshmi Devi, every vase begins at dawn beside the kiln her grandfather built. The cobalt swirls echo the wells of her village.
                </AIBlock>
                <AIBlock icon={Tags} title="SEO & Discoverability" loading={loading} generated={generated} delay={0.4}>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["handmade", "jaipur", "blue-pottery", "home-decor", "gift", "ceramic"].map((t) => (
                      <span key={t} className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">#{t}</span>
                    ))}
                  </div>
                </AIBlock>

                <div className="mt-10 flex items-center justify-end gap-4 border-t border-white/10 pt-8">
                  <button onClick={generate} disabled={loading} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/50 px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-surface disabled:opacity-50">
                    <Wand2 className="h-4 w-4" /> Regenerate All
                  </button>
                  <button disabled={loading} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3.5 text-sm font-bold text-white shadow-premium transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100">
                    Publish to Store <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT — Live Preview */}
        <div className="hidden lg:block relative">
          <div className="sticky top-32 rounded-[2rem] border border-white/10 bg-surface/30 p-6 backdrop-blur-3xl shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Preview
              </p>
              <div className="flex gap-1.5">
                 <div className="h-3 w-3 rounded-full bg-white/10" />
                 <div className="h-3 w-3 rounded-full bg-white/10" />
                 <div className="h-3 w-3 rounded-full bg-white/10" />
               </div>
            </div>
            
            <div className="overflow-hidden rounded-2xl bg-surface-elevated border border-white/5 relative group">
              <div className={`absolute inset-0 z-10 bg-background/50 backdrop-blur-sm transition-opacity duration-500 ${loading || step < 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'} flex items-center justify-center`}>
                 <div className="text-center">
                   <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                   <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Awaiting Generation</p>
                 </div>
              </div>

              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img src={heroImg} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-display text-2xl font-bold tracking-tight text-foreground shadow-sm">Heritage Blue Pottery Vase</p>
                <p className="mt-1 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Jaipur <span className="h-1 w-1 rounded-full bg-white/20" /> Lakshmi Devi
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-semibold text-foreground">₹1,299</p>
                  <div className="rounded-full bg-foreground px-4 py-1.5 text-xs font-bold text-background">
                    Add to cart
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
      <input 
        placeholder={placeholder} 
        className="h-12 w-full rounded-2xl border border-white/10 bg-surface/60 px-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:bg-surface/80 focus:ring-4 focus:ring-primary/10" 
      />
    </label>
  );
}

function AIBlock({ icon: Icon, title, loading, generated, delay, children }: { icon: any; title: string; loading: boolean; generated: boolean; delay: number; children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface/40 p-6 backdrop-blur-md transition-all duration-500 ${generated && !loading ? "border-primary/30 shadow-[0_0_30px_-10px_rgba(var(--color-primary),0.2)]" : ""}`}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-500 ${generated && !loading ? "bg-primary/20 text-primary-glow" : "bg-surface-elevated text-muted-foreground"}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">{title}</p>
        </div>
        
        {loading && (
          <span className="inline-flex items-center gap-2 rounded-full bg-surface-elevated px-3 py-1 text-xs font-medium text-muted-foreground border border-white/5">
            <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-muted-foreground opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-muted-foreground"></span></span>
            Processing
          </span>
        )}
        {generated && !loading && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary-glow border border-primary/20">
            <Check className="h-3.5 w-3.5" /> Complete
          </span>
        )}
      </div>
      
      <div className={`text-sm leading-relaxed transition-all duration-500 ${loading || !generated ? "opacity-30 blur-[2px] select-none" : "text-muted-foreground"}`}>
        {children}
      </div>
    </motion.div>
  );
}
