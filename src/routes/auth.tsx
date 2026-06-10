import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Shield, Store, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { useAuth, dashboardPath, type Role } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in · Kalamitra" }] }),
  component: AuthPage,
});

const ROLES: { id: Role; label: string; desc: string; icon: typeof Shield; demo: { name: string; email: string } }[] = [
  { id: "buyer", label: "Buyer", desc: "Discover & shop authentic crafts", icon: ShoppingBag, demo: { name: "Ananya Gupta", email: "ananya@kalamitra.in" } },
  { id: "seller", label: "Artisan / Seller", desc: "List products & manage orders", icon: Store, demo: { name: "Lakshmi Devi", email: "lakshmi@kalamitra.in" } },
  { id: "admin", label: "Admin", desc: "Platform operations & moderation", icon: Shield, demo: { name: "Insight Admin", email: "admin@kalamitra.in" } },
];

function AuthPage() {
  const [role, setRole] = useState<Role>("buyer");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const selected = ROLES.find((r) => r.id === role)!;
    const name = (form.get("name") as string) || selected.demo.name;
    const email = (form.get("email") as string) || selected.demo.email;
    login({ name, email, role });
    navigate({ to: dashboardPath(role) });
  };

  const fillDemo = () => {
    const selected = ROLES.find((r) => r.id === role)!;
    login({ ...selected.demo, role });
    navigate({ to: dashboardPath(role) });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />

      <div className="relative mx-auto grid min-h-screen max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[1fr,1.1fr] lg:gap-16 lg:py-16">
        <div className="flex flex-col justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)]">
              <span className="font-display text-lg font-bold text-primary-foreground">K</span>
            </span>
            <span className="font-display text-lg font-semibold">Kalamitra</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-secondary">
              <Sparkles className="h-3 w-3" /> Welcome back
            </span>
            <h1 className="mt-5 text-balance font-display text-5xl font-medium leading-tight">
              Step into <span className="text-gradient">Kalamitra</span>
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Choose how you want to enter the platform. Every role gets a dashboard
              tailored to what they need most.
            </p>

            <div className="mt-10 space-y-3">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
                    role === r.id
                      ? "border-primary/60 bg-primary/10"
                      : "border-border bg-surface/40 hover:bg-surface/70"
                  }`}
                >
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${role === r.id ? "bg-[image:var(--gradient-primary)]" : "bg-surface-elevated"}`}>
                    <r.icon className={`h-5 w-5 ${role === r.id ? "text-primary-foreground" : "text-secondary"}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{r.label}</p>
                    <p className="text-xs text-muted-foreground">{r.desc}</p>
                  </div>
                  {role === r.id && <ArrowRight className="h-4 w-4 text-primary-glow" />}
                </button>
              ))}
            </div>
          </motion.div>

          <p className="hidden text-xs text-muted-foreground lg:block">© 2026 Insight Coders · Crafted with care</p>
        </div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center"
        >
          <div className="w-full rounded-3xl glass-strong p-8 shadow-[var(--shadow-card)] md:p-10">
            <div className="lg:hidden">
              <div className="flex gap-2 overflow-x-auto pb-4">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition ${role === r.id ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground"}`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6 flex items-center gap-2 rounded-full bg-surface p-1">
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 rounded-full py-1.5 text-sm transition ${
                    mode === m ? "bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)]" : "text-muted-foreground"
                  }`}
                >
                  {m === "signin" ? "Sign in" : "Create account"}
                </button>
              ))}
            </div>

            <h2 className="font-display text-2xl font-medium">
              {mode === "signin" ? "Welcome back" : "Join Kalamitra"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Continuing as <span className="text-foreground capitalize">{role}</span>
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {mode === "signup" && (
                <Field label="Full name" name="name" placeholder="Your name" />
              )}
              <Field label="Email" name="email" type="email" placeholder="you@kalamitra.in" />
              <Field label="Password" name="password" type="password" placeholder="••••••••" />

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-primary)] py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition hover:brightness-110"
              >
                {mode === "signin" ? "Sign in" : "Create account"} <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={fillDemo}
                className="w-full rounded-full border border-border bg-surface/40 py-3 text-xs text-muted-foreground transition hover:text-foreground"
              >
                Skip · Use demo {role} account
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              By continuing you agree to our Terms & Privacy.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-border bg-surface/60 px-4 text-sm outline-none transition focus:border-primary/60"
      />
    </label>
  );
}
