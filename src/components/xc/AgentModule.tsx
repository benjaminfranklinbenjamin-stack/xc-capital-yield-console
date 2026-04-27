import { useEffect, useRef, useState } from "react";
import { Bot, Cpu, Sparkles, ShieldCheck, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface LogLine {
  ts: string;
  tag: "Agent-1" | "Agent-2" | "Security" | "Execution" | "Oracle" | "RAMS";
  msg: string;
  tone?: "default" | "ok" | "warn" | "info";
}

const seed: LogLine[] = [
  { ts: "14:02:11", tag: "Agent-1", msg: "Intent Received: Rebalance yield to AVAX-USDC pool.", tone: "info" },
  { ts: "14:02:11", tag: "Security", msg: "Policy Check: ERC-8226 Compliance Verified.", tone: "ok" },
  { ts: "14:02:12", tag: "Oracle", msg: "Chainlink AVAX/USD = $34.82 · deviation 0.04%", tone: "default" },
  { ts: "14:02:12", tag: "Execution", msg: "Signed via Delegate Key. Tx: 0x9a4c…b71e", tone: "ok" },
  { ts: "14:02:13", tag: "RAMS", msg: "Mandate M-031 quota consumed: 12,400 / 50,000 USDC", tone: "default" },
];

const stream: LogLine[] = [
  { ts: "—", tag: "Agent-2", msg: "Scanning BPL-2034 covenant breach … threshold within 4.2%", tone: "warn" },
  { ts: "—", tag: "Security", msg: "ERC-8232 attestation signed by 3/5 RAMS validators.", tone: "ok" },
  { ts: "—", tag: "Agent-1", msg: "Intent Drafted: Hedge tranche BPL-2034 with 5y CDS.", tone: "info" },
  { ts: "—", tag: "Oracle", msg: "RedStone real-estate index pulled (block 52,841,231).", tone: "default" },
  { ts: "—", tag: "Execution", msg: "Submitted via Air-Gap queue · awaiting offline signature.", tone: "warn" },
  { ts: "—", tag: "RAMS", msg: "Audit log committed. Merkle root 0x14ae…03c2.", tone: "ok" },
];

const toneCls: Record<NonNullable<LogLine["tone"]>, string> = {
  default: "text-foreground/80",
  ok: "text-success",
  warn: "text-warning",
  info: "text-accent",
};

const tagCls: Record<LogLine["tag"], string> = {
  "Agent-1": "text-accent",
  "Agent-2": "text-accent",
  Security: "text-success",
  Execution: "text-primary",
  Oracle: "text-info",
  RAMS: "text-warning",
};

function nowTs() {
  const d = new Date();
  return d.toTimeString().slice(0, 8);
}

export function AgentModule() {
  const [logs, setLogs] = useState<LogLine[]>(seed);
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState(
    "Swap $50k yield to AVAX if price drops below $35 within 24 hours.",
  );
  const idx = useRef(0);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      const next = stream[idx.current % stream.length];
      idx.current += 1;
      setLogs((prev) => [...prev.slice(-40), { ...next, ts: nowTs() }]);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [logs]);

  const issue = () => {
    setOpen(false);
    toast.success("Mandate signed", {
      description: "ERC-8232 intent broadcast to RAMS quorum (M-034).",
    });
    setLogs((p) => [
      ...p,
      { ts: nowTs(), tag: "Agent-1", msg: `Intent Received: ${prompt}`, tone: "info" },
      { ts: nowTs(), tag: "Security", msg: "Policy Check: ERC-8226 Compliance Verified.", tone: "ok" },
    ]);
  };

  return (
    <section className="panel relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow-purple opacity-60 pointer-events-none" />

      <div className="panel-header relative">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-purple grid place-items-center">
            <Bot className="h-4 w-4 text-accent-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-tight flex items-center gap-2">
              Autonomous Agent
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20 font-mono">
                ERC-8232 / RAMS
              </span>
            </h2>
            <p className="text-[11px] text-muted-foreground">Intent-based execution with delegated, policy-bound keys.</p>
          </div>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-gradient-purple text-accent-foreground hover:opacity-90 gap-1.5">
              <Plus className="h-3.5 w-3.5" /> Issue New Mandate
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" /> New Autonomous Mandate
              </DialogTitle>
              <DialogDescription>
                Describe the intent in natural language. The agent will compile it into an ERC-8232 policy
                bounded by your RAMS limits.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <Label className="text-xs">Intent Prompt</Label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="font-mono text-sm bg-surface border-border"
              />
              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <div className="rounded-md border border-border bg-surface p-2">
                  <div className="stat-label">Max Notional</div>
                  <div className="num font-semibold">$50,000</div>
                </div>
                <div className="rounded-md border border-border bg-surface p-2">
                  <div className="stat-label">TTL</div>
                  <div className="num font-semibold">24h</div>
                </div>
                <div className="rounded-md border border-border bg-surface p-2">
                  <div className="stat-label">Validators</div>
                  <div className="num font-semibold">3 / 5</div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={issue} className="bg-gradient-purple text-accent-foreground">
                <ShieldCheck className="h-4 w-4 mr-1.5" /> Sign &amp; Broadcast
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative grid lg:grid-cols-[1fr_1.6fr] gap-px bg-border">
        <div className="bg-card p-4 space-y-3">
          <div className="stat-label">Active Mandates</div>

          {[
            { id: "M-031", title: "Yield Sweep → AVAX-USDC LP", used: 24.8, tone: "accent" },
            { id: "M-029", title: "Auto-rollover matured BPLs", used: 62.1, tone: "primary" },
            { id: "M-027", title: "Hedge LTV>70% via CDS", used: 8.4, tone: "warning" },
          ].map((m) => (
            <div key={m.id} className="rounded-md border border-border bg-surface p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="h-3.5 w-3.5 text-accent" />
                  <span className="num text-[10px] text-muted-foreground">{m.id}</span>
                </div>
                <span className="text-[10px] text-success uppercase tracking-wider">Live</span>
              </div>
              <div className="text-[13px] font-medium mt-1">{m.title}</div>
              <div className="mt-2 h-1 rounded-full bg-secondary overflow-hidden">
                <div
                  className={`h-full ${
                    m.tone === "accent" ? "bg-accent" : m.tone === "primary" ? "bg-primary" : "bg-warning"
                  }`}
                  style={{ width: `${m.used}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] num text-muted-foreground mt-1">
                <span>Quota used</span>
                <span>{m.used.toFixed(1)}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="stat-label">Execution Log</div>
            <div className="flex items-center gap-2">
              <span className="pulse-dot bg-accent after:bg-accent/60" />
              <span className="text-[10px] uppercase tracking-wider text-accent">Streaming</span>
            </div>
          </div>
          <div ref={scroller} className="terminal h-[320px] overflow-y-auto">
            {logs.map((l, i) => (
              <div key={i} className="flex gap-2 animate-[ticker_0.3s_ease-out]">
                <span className="text-muted-foreground/60 shrink-0">{l.ts}</span>
                <span className={`shrink-0 ${tagCls[l.tag]}`}>[{l.tag}]</span>
                <span className={toneCls[l.tone ?? "default"]}>{l.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
