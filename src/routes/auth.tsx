import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Shield, Store, ShoppingBag, ArrowRight, Sparkles, CheckCircle2, Lock } from "lucide-react";
import { useAuth, dashboardPath, type Role } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in · Kalamitra" }] }),
  component: AuthPage,
});

const ROLES: { id: Role; label: string; desc: string; icon: typeof Shield; demo: { name: string; email: string } }[] = [
  { id: "buyer", label: "Buyer", desc: "Discover & shop authentic crafts", icon: ShoppingBag, demo: { name: "Ananya Gupta", email: "ananya@kalamitra.in" } },
  { id: "seller", label: "Artisan", desc: "List products & manage orders", icon: Store, demo: { name: "Lakshmi Devi", email: "lakshmi@kalamitra.in" } },
  { id: "admin", label: "Admin", desc: "Platform operations & moderation", icon: Shield, demo: { name: "Insight Admin", email: "admin@kalamitra.in" } },
];

function AuthPage() {
  const [role, setRole] = useState<Role>("buyer");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const selected = ROLES.find((r) => r.id === role)!;
    const name = (form.get("name") as string) || selected.demo.name;
    const email = (form.get("email") as string) || selected.demo.email;
    
    // Simulate loading for premium feel
    setTimeout(() => {
      login({ name, email, role });
      navigate({ to: dashboardPath(role) });
    }, 800);
  };

  const fillDemo = () => {
    setLoading(true);
    setTimeout(() => {
      const selected = ROLES.find((r) => r.id === role)!;
      login({ ...selected.demo, role });
      navigate({ to: dashboardPath(role) });
    }, 600);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background selection:bg-primary/30 flex items-center justify-center">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_90%)]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[800px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px] mix-blend-screen animate-pulse duration-10000" />
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-accent/10 blur-[150px] mix-blend-screen animate-pulse duration-7000" />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-10 lg:grid lg:grid-cols-[1fr,1fr] gap-16 xl:gap-24 items-center">
        {/* Left Side: Role Selection & Branding */}
        <div className="flex flex-col justify-center h-full hidden lg:flex">
          <Link to="/" className="flex items-center gap-3 mb-16 group">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-premium transition-transform duration-300 group-hover:scale-105">
              <span className="font-display text-xl font-bold text-primary-foreground">K</span>
            </div>
            <span className="font-display text-2xl font-bold tracking-tight">Kalamitra</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-glow backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" /> Authentication
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.1] tracking-tight">
              Unlock the power of <br/> <span className="text-gradient">intelligent commerce.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground leading-relaxed">
              Select your persona below to experience a dashboard tailored to your exact needs.
            </p>

            <div className="mt-12 space-y-4">
              {ROLES.map((r, i) => (
                <motion.button
                  key={r.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  onClick={() => setRole(r.id)}
                  className={`group relative flex w-full max-w-md items-center gap-5 rounded-2xl border p-5 text-left transition-all duration-300 ${
                    role === r.id
                      ? "border-primary/50 bg-primary/10 shadow-[0_0_30px_-5px_rgba(var(--color-primary),0.2)]"
                      : "border-white/5 bg-surface/30 hover:bg-surface/50 hover:border-white/10"
                  }`}
                >
                  {role === r.id && (
                    <motion.div layoutId="active-role" className="absolute inset-0 rounded-2xl border border-primary/20 bg-primary/5 shadow-inner" />
                  )}
                  <div className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-xl shadow-inner transition-colors duration-300 ${role === r.id ? "bg-gradient-to-br from-primary to-accent text-white" : "bg-surface-elevated text-muted-foreground group-hover:text-foreground"}`}>
                    <r.icon className="h-6 w-6" />
                  </div>
                  <div className="relative z-10 flex-1">
                    <p className={`font-semibold text-lg transition-colors ${role === r.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>{r.label}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{r.desc}</p>
                  </div>
                  {role === r.id && <ArrowRight className="relative z-10 h-5 w-5 text-primary-glow" />}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Side: Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md mx-auto"
        >
          <div className="relative rounded-[2.5rem] border border-white/10 bg-surface/40 p-8 md:p-12 backdrop-blur-2xl shadow-premium overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            
            {/* Mobile Role Switcher */}
            <div className="lg:hidden mb-8">
              <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                      role === r.id 
                        ? "border-primary/50 bg-primary/20 text-primary-foreground shadow-[0_0_15px_-3px_rgba(var(--color-primary),0.3)]" 
                        : "border-white/10 bg-surface text-muted-foreground"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative z-10 mb-8 flex items-center gap-1 rounded-full bg-surface-elevated p-1.5 border border-white/5 shadow-inner">
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`relative flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors duration-300 ${
                    mode === m ? "text-background" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {mode === m && (
                    <motion.div layoutId="auth-mode" className="absolute inset-0 rounded-full bg-foreground shadow-sm" />
                  )}
                  <span className="relative z-10">{m === "signin" ? "Sign in" : "Create account"}</span>
                </button>
              ))}
            </div>

            <div className="relative z-10">
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">
                {mode === "signin" ? "Welcome back" : "Join the future"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground font-medium">
                Continuing as <span className="text-primary-glow capitalize">{role}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 mt-8 space-y-5">
              <AnimatePresence mode="popLayout">
                {mode === "signup" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Field label="Full name" name="name" placeholder="John Doe" />
                  </motion.div>
                )}
              </AnimatePresence>
              <Field label="Email address" name="email" type="email" placeholder="you@example.com" />
              
              <div className="space-y-2">
                <Field label="Password" name="password" type="password" placeholder="••••••••" />
                {mode === "signup" && (
                  <div className="flex gap-1 mt-2">
                    <div className="h-1 flex-1 rounded-full bg-primary" />
                    <div className="h-1 flex-1 rounded-full bg-primary" />
                    <div className="h-1 flex-1 rounded-full bg-primary/20" />
                    <div className="h-1 flex-1 rounded-full bg-white/5" />
                  </div>
                )}
              </div>

              <button
                disabled={loading}
                type="submit"
                className="group relative mt-4 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-foreground py-4 text-base font-semibold text-background transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
              >
                {loading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-background border-t-transparent" />
                ) : (
                  <>
                    <span className="relative z-10">{mode === "signin" ? "Sign in to account" : "Create your account"}</span>
                    <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                <div className="relative flex justify-center"><span className="bg-surface/80 px-4 text-xs uppercase tracking-widest text-muted-foreground backdrop-blur-md">Or</span></div>
              </div>

              <button
                disabled={loading}
                type="button"
                onClick={fillDemo}
                className="group w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-surface/50 py-3.5 text-sm font-medium text-foreground transition-all hover:bg-surface hover:border-white/20 disabled:opacity-70"
              >
                <Sparkles className="h-4 w-4 text-accent transition-transform group-hover:scale-110" />
                Auto-fill demo {role}
              </button>
            </form>

            <p className="relative z-10 mt-8 text-center text-xs font-medium text-muted-foreground flex items-center justify-center gap-1.5">
              <Lock className="h-3 w-3" /> Secure 256-bit encryption
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className="relative">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className={`relative flex items-center overflow-hidden rounded-xl border transition-colors duration-300 ${focused ? 'border-primary/50 bg-primary/5' : 'border-white/10 bg-surface/60 hover:border-white/20'}`}>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="h-12 w-full bg-transparent px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/50"
        />
        {focused && (
          <motion.div layoutId="input-focus" className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-primary to-accent" />
        )}
      </div>
    </div>
  );
}
