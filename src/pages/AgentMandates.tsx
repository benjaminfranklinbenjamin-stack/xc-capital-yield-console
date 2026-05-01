import { PageShell } from "@/components/xc/PageShell";
import { AgentModule } from "@/components/xc/AgentModule";
import { Bot, Cpu, Pause, Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const mandates = [
  { id: "M-031", title: "Yield Sweep → AVAX-USDC LP", scope: "Treasury", quota: "$50,000", used: 24.8, ttl: "24h", state: "live" },
  { id: "M-029", title: "Auto-rollover matured BPLs", scope: "Portfolio", quota: "$2,500,000", used: 62.1, ttl: "7d", state: "live" },
  { id: "M-027", title: "Hedge LTV>70% via 5y CDS", scope: "Risk", quota: "$1,200,000", used: 8.4, ttl: "30d", state: "live" },
  { id: "M-024", title: "Stable rebalance USDC↔USDT", scope: "Treasury", quota: "$200,000", used: 100, ttl: "—", state: "expired" },
  { id: "M-019", title: "Sweep dust > $25 to vault", scope: "Ops", quota: "$5,000", used: 47.0, ttl: "∞", state: "paused" },
];

const stateCls: Record<string, string> = {
  live: "bg-success/10 text-success border-success/30",
  paused: "bg-warning/10 text-warning border-warning/30",
  expired: "bg-muted text-muted-foreground border-border",
};

export default function AgentMandates() {
  return (
    <PageShell
      title="Agent Mandates"
      subtitle="ERC-8232 intent-based delegation · RAMS-bounded execution"
    >
      <div className="grid md:grid-cols-4 gap-3">
        {[
          { l: "Active Mandates", v: "12" },
          { l: "Quota Consumed (24h)", v: "$184,210" },
          { l: "Auto-Executions", v: "1,284" },
          { l: "Success Rate", v: "99.92%" },
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
            <Bot className="h-4 w-4 text-accent" />
            <h2 className="text-sm font-semibold tracking-tight">All Mandates</h2>
          </div>
        </div>
        <div className="grid grid-cols-[80px_1fr_110px_120px_60px_90px_120px] gap-3 px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border bg-surface/40">
          <div>ID</div><div>Intent</div><div>Scope</div><div>Quota</div><div>TTL</div><div>State</div><div className="text-right">Actions</div>
        </div>
        {mandates.map((m) => (
          <div key={m.id} className="grid grid-cols-[80px_1fr_110px_120px_60px_90px_120px] gap-3 px-4 py-3 border-b border-border last:border-0 items-center hover:bg-surface-hover/40 transition-colors">
            <div className="num text-[11px] text-muted-foreground flex items-center gap-1.5"><Cpu className="h-3 w-3 text-accent" />{m.id}</div>
            <div>
              <div className="text-[13px] font-medium">{m.title}</div>
              <div className="mt-1 h-1 rounded-full bg-secondary overflow-hidden w-40">
                <div className="h-full bg-accent" style={{ width: `${m.used}%` }} />
              </div>
            </div>
            <div className="text-[11px] text-muted-foreground">{m.scope}</div>
            <div className="num text-[12px]">{m.quota}</div>
            <div className="num text-[11px] text-muted-foreground">{m.ttl}</div>
            <div><span className={`text-[10px] px-1.5 py-0.5 rounded border uppercase tracking-wider ${stateCls[m.state]}`}>{m.state}</span></div>
            <div className="flex items-center justify-end gap-1">
              <Button size="icon" variant="ghost" className="h-7 w-7"><Pause className="h-3.5 w-3.5" /></Button>
              <Button size="icon" variant="ghost" className="h-7 w-7"><Play className="h-3.5 w-3.5" /></Button>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        ))}
      </section>

      <AgentModule />
    </PageShell>
  );
}
