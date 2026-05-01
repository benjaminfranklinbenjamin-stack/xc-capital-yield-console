import { PageShell } from "@/components/xc/PageShell";
import { Button } from "@/components/ui/button";
import { FileBarChart, Download, FileText, Calendar } from "lucide-react";

const reports = [
  { id: "RPT-2026-Q1-INV", title: "Q1 2026 Investor Statement", type: "Investor", date: "Apr 01, 2026", size: "2.4 MB" },
  { id: "RPT-2026-03-NAV", title: "Monthly NAV Reconciliation · March", type: "NAV", date: "Mar 31, 2026", size: "812 KB" },
  { id: "RPT-2026-03-COV", title: "Covenant Compliance Pack · March", type: "Compliance", date: "Mar 31, 2026", size: "1.1 MB" },
  { id: "RPT-2026-Q1-TAX", title: "Q1 K-1 Distributions Draft", type: "Tax", date: "Mar 28, 2026", size: "3.8 MB" },
  { id: "RPT-2026-02-AUD", title: "RAMS Audit Stream · February", type: "Audit", date: "Feb 28, 2026", size: "5.2 MB" },
  { id: "RPT-2026-02-NAV", title: "Monthly NAV Reconciliation · February", type: "NAV", date: "Feb 28, 2026", size: "798 KB" },
];

export default function Reports() {
  return (
    <PageShell
      title="Reports"
      subtitle="Investor packs · NAV · audit · tax exports"
      actions={
        <Button size="sm" className="h-8 gap-1.5 bg-gradient-gold text-primary-foreground">
          <FileText className="h-3.5 w-3.5" /> Generate Report
        </Button>
      }
    >
      <div className="grid md:grid-cols-4 gap-3">
        {[
          { l: "Reports YTD", v: "48" },
          { l: "Awaiting Sign-Off", v: "2" },
          { l: "Investors", v: "127" },
          { l: "AUM", v: "$184.2M" },
        ].map((s) => (
          <div key={s.l} className="panel p-4">
            <div className="stat-label">{s.l}</div>
            <div className="num text-2xl font-semibold tracking-tight mt-1">{s.v}</div>
          </div>
        ))}
      </div>

      <section className="panel">
        <div className="panel-header">
          <div className="flex items-center gap-2">
            <FileBarChart className="h-4 w-4 text-accent" />
            <h2 className="text-sm font-semibold tracking-tight">Document Vault</h2>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" /> Last 90 days
          </div>
        </div>
        <div className="grid grid-cols-[140px_1fr_110px_120px_80px_100px] gap-3 px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border bg-surface/40">
          <div>ID</div><div>Title</div><div>Type</div><div>Date</div><div>Size</div><div className="text-right">Action</div>
        </div>
        {reports.map((r) => (
          <div key={r.id} className="grid grid-cols-[140px_1fr_110px_120px_80px_100px] gap-3 px-4 py-3 border-b border-border last:border-0 items-center hover:bg-surface-hover/40 transition-colors">
            <div className="num text-[11px] text-muted-foreground">{r.id}</div>
            <div className="text-[13px] font-medium">{r.title}</div>
            <div className="text-[11px]"><span className="px-1.5 py-0.5 rounded border border-border bg-surface text-muted-foreground uppercase tracking-wider text-[10px]">{r.type}</span></div>
            <div className="num text-[12px] text-muted-foreground">{r.date}</div>
            <div className="num text-[11px] text-muted-foreground">{r.size}</div>
            <div className="text-right">
              <Button size="sm" variant="ghost" className="h-7 text-[11px] gap-1"><Download className="h-3 w-3" /> PDF</Button>
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
