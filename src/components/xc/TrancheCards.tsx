import { Building2, MapPin, ArrowUpRight, AlertTriangle, Gavel, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "active" | "warning" | "foreclosure";

interface Tranche {
  id: string;
  name: string;
  location: string;
  principal: number;
  rate: number;
  maturity: string;
  ltv: number;
  status: Status;
  funded: number; // 0..1
  category: string;
}

const tranches: Tranche[] = [
  { id: "BPL-2041", name: "Brickell Heights · Tower B", location: "Miami, FL", principal: 8_400_000, rate: 12.5, maturity: "2026-08-14", ltv: 65, status: "active", funded: 0.92, category: "Multi-family" },
  { id: "BPL-2039", name: "Sunset Industrial Park", location: "Phoenix, AZ", principal: 5_750_000, rate: 11.75, maturity: "2026-04-02", ltv: 58, status: "active", funded: 1.0, category: "Industrial" },
  { id: "BPL-2034", name: "Harborline Mixed-Use", location: "Charleston, SC", principal: 12_200_000, rate: 13.25, maturity: "2027-01-30", ltv: 71, status: "warning", funded: 0.74, category: "Mixed-Use" },
  { id: "BPL-2028", name: "Cedar Ridge Apartments", location: "Austin, TX", principal: 4_100_000, rate: 12.0, maturity: "2025-11-22", ltv: 63, status: "active", funded: 0.88, category: "Multi-family" },
  { id: "BPL-2017", name: "Northgate Retail Center", location: "Cleveland, OH", principal: 2_850_000, rate: 14.0, maturity: "2025-09-08", ltv: 78, status: "foreclosure", funded: 1.0, category: "Retail" },
  { id: "BPL-2012", name: "Mesa Logistics Hub", location: "Reno, NV", principal: 9_900_000, rate: 11.25, maturity: "2027-06-19", ltv: 55, status: "active", funded: 0.65, category: "Industrial" },
];

const statusMap: Record<Status, { label: string; cls: string; icon: any }> = {
  active: {
    label: "Active",
    cls: "bg-success/10 text-success border-success/30",
    icon: CheckCircle2,
  },
  warning: {
    label: "Default Warning",
    cls: "bg-warning/10 text-warning border-warning/30",
    icon: AlertTriangle,
  },
  foreclosure: {
    label: "Foreclosure Pending",
    cls: "bg-destructive/10 text-destructive border-destructive/30",
    icon: Gavel,
  },
};

function fmtUsd(n: number) {
  return "$" + n.toLocaleString("en-US");
}

function Card({ t }: { t: Tranche }) {
  const s = statusMap[t.status];
  const SIcon = s.icon;
  return (
    <article className="panel group relative overflow-hidden hover:border-border-strong transition-colors">
      <div className="p-4 flex items-start justify-between gap-3 border-b border-border">
        <div className="flex items-start gap-3 min-w-0">
          <div className="h-9 w-9 rounded-md bg-surface-elevated border border-border grid place-items-center shrink-0">
            <Building2 className="h-4 w-4 text-accent" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="num text-[10px] text-muted-foreground tracking-wider">{t.id}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-foreground">
                {t.category}
              </span>
            </div>
            <h3 className="text-sm font-semibold truncate mt-0.5">{t.name}</h3>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <MapPin className="h-3 w-3" /> {t.location}
            </div>
          </div>
        </div>
        <span className={`shrink-0 text-[10px] px-2 py-1 rounded-md border font-medium uppercase tracking-wider flex items-center gap-1 ${s.cls}`}>
          <SIcon className="h-3 w-3" />
          {s.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-px bg-border">
        <div className="p-3 bg-card">
          <div className="stat-label">Principal</div>
          <div className="num text-sm font-semibold mt-0.5">{fmtUsd(t.principal)}</div>
        </div>
        <div className="p-3 bg-card">
          <div className="stat-label">Interest Rate</div>
          <div className="num text-sm font-semibold text-primary mt-0.5">{t.rate.toFixed(2)}%</div>
        </div>
        <div className="p-3 bg-card">
          <div className="stat-label">Maturity</div>
          <div className="num text-sm font-semibold mt-0.5">{t.maturity}</div>
        </div>
        <div className="p-3 bg-card">
          <div className="stat-label">LTV</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="num text-sm font-semibold">{t.ltv}%</div>
            <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
              <div
                className={`h-full ${t.ltv > 70 ? "bg-warning" : "bg-success"}`}
                style={{ width: `${t.ltv}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20 font-medium">
            Private Credit
          </span>
          <span className="text-muted-foreground">→</span>
          <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 font-medium">
            Real Estate
          </span>
        </div>
        <Button size="sm" variant="ghost" className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground">
          Inspect <ArrowUpRight className="h-3 w-3" />
        </Button>
      </div>
    </article>
  );
}

export function TrancheCards() {
  return (
    <section>
      <div className="flex items-end justify-between mb-3">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Active Tranches</h2>
          <p className="text-xs text-muted-foreground">Real-estate-backed Business Purpose Loans (BPL) under SPV custody.</p>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <button className="px-2.5 py-1 rounded-md border border-border bg-surface text-foreground">All · 14</button>
          <button className="px-2.5 py-1 rounded-md border border-transparent text-muted-foreground hover:text-foreground">Active</button>
          <button className="px-2.5 py-1 rounded-md border border-transparent text-warning hover:bg-warning/10">Warning · 1</button>
          <button className="px-2.5 py-1 rounded-md border border-transparent text-destructive hover:bg-destructive/10">Foreclosure · 1</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {tranches.map((t) => (
          <Card key={t.id} t={t} />
        ))}
      </div>
    </section>
  );
}
