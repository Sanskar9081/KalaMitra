import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/dashboard-shell";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  return (
    <div>
      <PageHeader title="Platform settings" subtitle="Configure Kalamitra preferences" />

      <div className="grid gap-6 lg:grid-cols-2">
        <SettingsCard title="Commission" desc="Platform fee taken from each sale">
          <Input label="Commission rate" defaultValue="3.5%" />
          <Input label="Payment cycle" defaultValue="Weekly" />
        </SettingsCard>
        <SettingsCard title="AI configuration" desc="Models powering listing generation">
          <Input label="Description model" defaultValue="Kalamitra-Story-3.0" />
          <Input label="Image enhancement" defaultValue="Kalamitra-Vision-2.1" />
        </SettingsCard>
        <SettingsCard title="Notifications" desc="What admins receive alerts about">
          <Toggle label="New seller signup" />
          <Toggle label="Suspicious order pattern" />
          <Toggle label="AI moderation flag" defaultChecked />
        </SettingsCard>
        <SettingsCard title="Branding" desc="Public-facing platform identity">
          <Input label="Platform name" defaultValue="Kalamitra" />
          <Input label="Tagline" defaultValue="Where Tradition Meets Technology" />
        </SettingsCard>
      </div>
    </div>
  );
}

function SettingsCard({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl glass p-6">
      <h3 className="font-display text-lg font-medium">{title}</h3>
      <p className="text-xs text-muted-foreground">{desc}</p>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function Input({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input defaultValue={defaultValue} className="h-10 w-full rounded-lg border border-border bg-surface/60 px-3 text-sm outline-none focus:border-primary/60" />
    </label>
  );
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center justify-between rounded-lg bg-surface/40 px-3 py-2.5">
      <span className="text-sm">{label}</span>
      <input type="checkbox" defaultChecked={defaultChecked} className="accent-[oklch(0.58_0.24_295)]" />
    </label>
  );
}
