import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  ScrollText,
  ShieldCheck,
  FileSignature,
  Fingerprint,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Download,
} from "lucide-react";
import { toast } from "sonner";

interface CovenantCheck {
  clause: string;
  ref: string;
  status: "pass" | "warn";
  detail: string;
}

interface AuditEntry {
  id: string;
  ts: string;
  agent: "Agent-1" | "Agent-2";
  action: string;
  notional: string;
  txHash: string;
  merkle: string;
  signers: string;
  covenants: CovenantCheck[];
}

const entries: AuditEntry[] = [
  {
    id: "M-031",
    ts: "2026-04-28 14:02:13 UTC",
    agent: "Agent-1",
    action: "Yield Sweep → AVAX-USDC LP",
    notional: "$12,400.00 USDC",
    txHash: "0x9a4c8f21d3e0b7a1c45e9b2f78a0d3c61b9e44a82e7f1c0d6a3b58e9f4c1b71e",
    merkle: "0x14ae9c…03c2",
    signers: "3 / 5 RAMS validators",
    covenants: [
      {
        clause: "§4.2(a) Permitted Investments",
        ref: "Aurora Credit IV LPA",
        status: "pass",
        detail: "AVAX-USDC LP within whitelisted DeFi venues (Trader Joe v2.1).",
      },
      {
        clause: "§6.1 Concentration Limit",
        ref: "SPV Operating Agreement",
        status: "pass",
        detail: "Post-trade DeFi exposure 6.8% < 15% cap.",
      },
      {
        clause: "ERC-8226 Policy Bound",
        ref: "Mandate M-031",
        status: "pass",
        detail: "Notional $12.4k ≤ $50k mandate quota.",
      },
    ],
  },
  {
    id: "M-029",
    ts: "2026-04-28 13:47:55 UTC",
    agent: "Agent-2",
    action: "Auto-rollover BPL-2018 (matured)",
    notional: "$1,250,000.00",
    txHash: "0x44e1c0a87b6f9d2e15a7c83b29e0f4a16d8b71c2e93a4f5d6c8b0e1a7f2c44e1",
    merkle: "0x77b1a4…91de",
    signers: "4 / 5 RAMS validators",
    covenants: [
      {
        clause: "§3.4 Reinvestment Period",
        ref: "Aurora Credit IV LPA",
        status: "pass",
        detail: "Within reinvestment window (ends 2027-02-01).",
      },
      {
        clause: "§5.2 Borrower Eligibility",
        ref: "Underwriting Policy v3",
        status: "pass",
        detail: "Sponsor FICO 742, DSCR 1.38 — approved tier.",
      },
      {
        clause: "Lien Perfection",
        ref: "UCC-1 Filing #2026-0412-AZ",
        status: "pass",
        detail: "First-position deed of trust verified by title agent.",
      },
    ],
  },
  {
    id: "M-027",
    ts: "2026-04-28 13:21:08 UTC",
    agent: "Agent-2",
    action: "Hedge BPL-2034 via 5y CDS",
    notional: "$420,000.00 notional",
    txHash: "0x2c7be3a9011f4d8e6b5c2a17e09d3b4f8c6a0e1b29d7f4a3c6b8e0a14d2c2c7b",
    merkle: "0x3091ee…ab07",
    signers: "3 / 5 RAMS validators",
    covenants: [
      {
        clause: "§7.3 Hedging Authority",
        ref: "Aurora Credit IV LPA",
        status: "pass",
        detail: "Credit derivatives permitted for LTV>70% tranches.",
      },
      {
        clause: "ISDA Counterparty",
        ref: "Master Agreement 2025-NK-08",
        status: "warn",
        detail: "Counterparty rating BBB+ — within tolerance, monitor.",
      },
      {
        clause: "ERC-8232 Intent",
        ref: "Mandate M-027",
        status: "pass",
        detail: "Hedge ratio 0.62 ≤ 1.0 mandated cap.",
      },
    ],
  },
  {
    id: "M-024",
    ts: "2026-04-28 12:55:42 UTC",
    agent: "Agent-1",
    action: "Distribute Q2 interest to LPs",
    notional: "$284,910.55 USDC",
    txHash: "0x88af0c2b1e5d7a6f9c3b40e2a18d7c5b6e9f013a4c2d8b71e0f5a3c9b6d188af",
    merkle: "0x55c7d2…1e09",
    signers: "5 / 5 RAMS validators",
    covenants: [
      {
        clause: "§8.1 Waterfall",
        ref: "Aurora Credit IV LPA",
        status: "pass",
        detail: "Pref return 8% paid before carry — sequence verified.",
      },
      {
        clause: "Reg D 506(c)",
        ref: "Subscription Docs",
        status: "pass",
        detail: "All 47 LP wallets carry valid AI attestation NFTs.",
      },
      {
        clause: "Reserve Floor",
        ref: "§4.5 Operating Reserve",
        status: "pass",
        detail: "Post-distribution reserve $812k > $500k floor.",
      },
    ],
  },
  {
    id: "M-021",
    ts: "2026-04-28 12:14:19 UTC",
    agent: "Agent-2",
    action: "Mark-to-market re-pricing — BPL-2029",
    notional: "Δ −$8,420.00",
    txHash: "0x61d3e9b40a72c8f51b9e6a04d2c7f3b18a5e0c91d6b4a2f7e3c8b09d1a4561d3",
    merkle: "0x9af201…7c4b",
    signers: "3 / 5 RAMS validators",
    covenants: [
      {
        clause: "§9.2 Valuation Policy",
        ref: "PwC-vetted NAV manual",
        status: "pass",
        detail: "RedStone real-estate index used per §9.2(b).",
      },
      {
        clause: "Oracle Deviation",
        ref: "ERC-8226 Policy",
        status: "pass",
        detail: "Two-source consensus (Chainlink + RedStone) within 0.4%.",
      },
      {
        clause: "Auditor Notice",
        ref: "§11.4 Reporting",
        status: "pass",
        detail: "Variance < 1% — no auditor escalation required.",
      },
    ],
  },
];

const copy = (v: string, label: string) => {
  navigator.clipboard.writeText(v);
  toast.success(`${label} copied`);
};

export function ComplianceAudit() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 gap-1.5 border-accent/30 bg-accent/5 text-accent hover:bg-accent/10 hover:text-accent"
        >
          <ScrollText className="h-3.5 w-3.5" />
          <span className="hidden md:inline text-xs font-medium">Compliance Audit</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-xl bg-card border-l border-border p-0 flex flex-col"
      >
        <SheetHeader className="px-5 py-4 border-b border-border bg-gradient-glow-purple/40">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-purple grid place-items-center">
              <ShieldCheck className="h-4 w-4 text-accent-foreground" />
            </div>
            <div>
              <SheetTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
                Compliance Audit
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-success/10 text-success border border-success/20 font-mono">
                  RAMS · last 5
                </span>
              </SheetTitle>
              <SheetDescription className="text-[11px] text-muted-foreground">
                Cryptographically signed mandates checked against the Aurora Credit IV SPV legal covenants.
              </SheetDescription>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3">
            <div className="rounded-md border border-border bg-surface p-2">
              <div className="stat-label">Actions</div>
              <div className="num text-sm font-semibold">5 / 5</div>
            </div>
            <div className="rounded-md border border-border bg-surface p-2">
              <div className="stat-label">Covenants OK</div>
              <div className="num text-sm font-semibold text-success">14 / 15</div>
            </div>
            <div className="rounded-md border border-border bg-surface p-2">
              <div className="stat-label">Quorum</div>
              <div className="num text-sm font-semibold">≥ 3 / 5</div>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {entries.map((e) => {
            const warns = e.covenants.filter((c) => c.status === "warn").length;
            return (
              <article
                key={e.id}
                className="rounded-lg border border-border bg-surface overflow-hidden"
              >
                <header className="flex items-start justify-between gap-2 p-3 border-b border-border bg-surface-elevated/50">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="num text-[10px] text-muted-foreground">{e.id}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20 font-mono">
                        {e.agent}
                      </span>
                      {warns === 0 ? (
                        <span className="text-[10px] uppercase tracking-wider text-success flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Verified
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase tracking-wider text-warning flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" /> Monitor
                        </span>
                      )}
                    </div>
                    <div className="text-[13px] font-medium mt-0.5 truncate">{e.action}</div>
                    <div className="num text-[10px] text-muted-foreground mt-0.5">{e.ts}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="stat-label">Notional</div>
                    <div className="num text-sm font-semibold">{e.notional}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{e.signers}</div>
                  </div>
                </header>

                <div className="p-3 space-y-2 border-b border-border">
                  <div className="stat-label flex items-center gap-1.5">
                    <Fingerprint className="h-3 w-3" /> Cryptographic Proof
                  </div>
                  <button
                    onClick={() => copy(e.txHash, "Tx hash")}
                    className="w-full text-left flex items-center gap-2 rounded border border-border bg-card px-2 py-1.5 hover:border-accent/40 transition-colors group"
                  >
                    <span className="text-[10px] text-muted-foreground shrink-0 w-10">tx</span>
                    <span className="num text-[11px] truncate flex-1">{e.txHash}</span>
                    <Copy className="h-3 w-3 text-muted-foreground group-hover:text-accent" />
                  </button>
                  <button
                    onClick={() => copy(e.merkle, "Merkle root")}
                    className="w-full text-left flex items-center gap-2 rounded border border-border bg-card px-2 py-1.5 hover:border-accent/40 transition-colors group"
                  >
                    <span className="text-[10px] text-muted-foreground shrink-0 w-10">merkle</span>
                    <span className="num text-[11px] truncate flex-1">{e.merkle}</span>
                    <Copy className="h-3 w-3 text-muted-foreground group-hover:text-accent" />
                  </button>
                </div>

                <div className="p-3 space-y-2">
                  <div className="stat-label flex items-center gap-1.5">
                    <FileSignature className="h-3 w-3" /> SPV Covenant Checks
                  </div>
                  <ul className="space-y-1.5">
                    {e.covenants.map((c, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 rounded border border-border bg-card px-2 py-1.5"
                      >
                        {c.status === "pass" ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
                        ) : (
                          <AlertTriangle className="h-3.5 w-3.5 text-warning mt-0.5 shrink-0" />
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[12px] font-medium">{c.clause}</span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              · {c.ref}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                            {c.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <footer className="border-t border-border p-3 flex items-center justify-between bg-surface-elevated/40">
          <div className="text-[10px] text-muted-foreground">
            Audit window: 24h · stream signed by RAMS quorum
          </div>
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1.5 border-accent/30 text-accent hover:bg-accent/10 hover:text-accent"
            onClick={() => toast.success("Audit bundle exported", { description: "rams-audit-2026-04-28.json" })}
          >
            <Download className="h-3.5 w-3.5" /> Export Bundle
          </Button>
        </footer>
      </SheetContent>
    </Sheet>
  );
}
