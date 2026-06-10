import { createFileRoute } from "@tanstack/react-router";
import { Download, FileBarChart, FileText, FileSpreadsheet } from "lucide-react";
import { PageHeader } from "@/components/dashboard-shell";

export const Route = createFileRoute("/admin/reports")({
  component: AdminReports,
});

const REPORTS = [
  { name: "Monthly sales report", desc: "Revenue, orders & top categories", date: "June 2026", icon: FileBarChart },
  { name: "Seller payout report", desc: "Disbursements per artisan", date: "June 2026", icon: FileSpreadsheet },
  { name: "Platform health report", desc: "Uptime, AI accuracy, satisfaction", date: "Q2 2026", icon: FileText },
  { name: "GST compliance report", desc: "Tax-ready transaction summary", date: "May 2026", icon: FileSpreadsheet },
];

function AdminReports() {
  return (
    <div>
      <PageHeader title="Reports" subtitle="Download platform & sales reports" />
      <div className="grid gap-4 md:grid-cols-2">
        {REPORTS.map((r) => (
          <div key={r.name} className="flex items-center gap-4 rounded-2xl glass p-5">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15">
              <r.icon className="h-5 w-5 text-primary-glow" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.desc} · {r.date}</p>
            </div>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-xs transition hover:bg-surface-elevated">
              <Download className="h-3.5 w-3.5" /> CSV
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
