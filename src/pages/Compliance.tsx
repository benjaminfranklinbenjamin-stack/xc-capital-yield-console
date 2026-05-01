import { PageShell } from "@/components/xc/PageShell";
import { ShieldCheck, FileCheck2, Fingerprint, Scale, AlertTriangle } from "lucide-react";

const covenants = [
  { ref: "§4.2", title: "Permitted Investments", status: "pass", last: "14:02:13" },
  { ref: "§5.1", title: "Lien Perfection · UCC-1", status: "pass", last: "13:58:02" },
  { ref: "§6.4", title: "LTV Ceiling 75%", status: "warn", last: "13:41:55" },
  { ref: "§7.1", title: "Reg D 506(c) Investor Cap", status: "pass", last: "12:30:11" },
  { ref: "§8.3", title: "Reserve Account Minimum", status: "pass", last: "11:09:48" },
  { ref: "§9.2", title: "Quarterly Reporting", status: "pass", last: "Yesterday" },
];

const statusCls: Record<string, string> = {
  pass: "bg-success/10 text-success border-success/30",
  warn: "bg-warning/10 text-warning border-warning/30",
  fail: "bg-destructive/10 text-destructive border-destructive/30",
};

export default function Compliance() {
  return (
    <PageShell
      title="Compliance · RAMS"
      subtitle="Real-time covenant monitoring · cryptographic attestations"
    >
      <div className="grid md:grid-cols-4 gap-3">
        {[
          { l: "Covenants Monitored", v: "42", i: Scale },
          { l: "Attestations (24h)", v: "1,284", i: Fingerprint },
          { l: "Open Exceptions", v: "1", i: AlertTriangle },
          { l: "RAMS Quorum", v: "3 / 5", i: ShieldCheck },
        ].map((s) => (
          <div key={s.l} className="panel p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-surface-elevated border border-border grid place-items-center">
              <s.i className="h-4 w-4 text-accent" />
            </div>
            <div>
              <div className="stat-label">{s.l}</div>
              <div className="num text-xl font-semibold tracking-tight">{s.v}</div>
            </div>
          </div>
        ))}
      </div>

      <section className="panel">
        <div className="panel-header">
          <div className="flex items-center gap-2">
            <FileCheck2 className="h-4 w-4 text-success" />
            <h2 className="text-sm font-semibold tracking-tight">SPV Covenant Matrix</h2>
          </div>
          <span className="text-[11px] text-muted-foreground font-mono">SPV Aurora Credit IV · 0x7a..f3c1</span>
        </div>
        <div className="grid grid-cols-[80px_1fr_120px_140px] gap-3 px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border bg-surface/40">
          <div>Clause</div><div>Covenant</div><div>Status</div><div>Last Check</div>
        </div>
        {covenants.map((c) => (
          <div key={c.ref} className="grid grid-cols-[80px_1fr_120px_140px] gap-3 px-4 py-3 border-b border-border last:border-0 items-center">
            <div className="num text-[11px] text-accent">{c.ref}</div>
            <div className="text-[13px] font-medium">{c.title}</div>
            <div><span className={`text-[10px] px-1.5 py-0.5 rounded border uppercase tracking-wider ${statusCls[c.status]}`}>{c.status === "pass" ? "Compliant" : "Watch"}</span></div>
            <div className="num text-[11px] text-muted-foreground">{c.last}</div>
          </div>
        ))}
      </section>

      <section className="panel p-4">
        <div className="flex items-center gap-2 mb-3">
          <Fingerprint className="h-4 w-4 text-accent" />
          <h2 className="text-sm font-semibold tracking-tight">Recent Attestations</h2>
        </div>
        <div className="terminal h-[220px] overflow-y-auto">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-muted-foreground/60 shrink-0">14:0{(i % 9)}:1{i % 9}</span>
              <span className="text-success shrink-0">[RAMS]</span>
              <span className="text-foreground/80">attest covenant=§{4 + (i%6)}.{1+(i%4)} root=0x{(Math.random().toString(16).slice(2,10))}…{(Math.random().toString(16).slice(2,6))} quorum=3/5 ✓</span>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
