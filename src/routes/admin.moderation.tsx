import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { PageHeader, StatusBadge } from "@/components/dashboard-shell";

export const Route = createFileRoute("/admin/moderation")({
  component: AdminModeration,
});

const QUEUE = [
  { id: "m1", item: "Madhubani Painting — Fish & Lotus", artisan: "Sita Jha", type: "AI description", status: "pending", flag: "Suggested rewrite" },
  { id: "m2", item: "Sandalwood Ganesha — 6 inch", artisan: "Anand Kumar", type: "AI image", status: "pending", flag: "Background cleanup" },
  { id: "m3", item: "Festive Diya Set", artisan: "Priya Ranjan", type: "Story", status: "live", flag: "Auto-approved" },
];

function AdminModeration() {
  return (
    <div>
      <PageHeader title="AI moderation queue" subtitle="Review AI-generated content before it reaches buyers" />

      <div className="space-y-3">
        {QUEUE.map((q) => (
          <div key={q.id} className="flex flex-wrap items-center gap-4 rounded-2xl glass p-5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15">
              <Sparkles className="h-4 w-4 text-primary-glow" />
            </div>
            <div className="flex-1 min-w-[200px]">
              <p className="font-medium">{q.item}</p>
              <p className="text-xs text-muted-foreground">{q.artisan} · {q.type}</p>
            </div>
            <span className="text-xs text-muted-foreground">{q.flag}</span>
            <StatusBadge status={q.status} />
            <div className="flex gap-2">
              <button className="rounded-full bg-accent/15 px-4 py-1.5 text-xs text-accent">Approve</button>
              <button className="rounded-full border border-border px-4 py-1.5 text-xs">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
