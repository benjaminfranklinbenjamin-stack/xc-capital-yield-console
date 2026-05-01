import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TrendingUp, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/xc/PageShell";

const apySeries = Array.from({ length: 30 }).map((_, i) => ({
  d: `D${i + 1}`,
  senior: 7.8 + Math.sin(i / 4) * 0.4 + Math.random() * 0.2,
  mezz: 11.2 + Math.cos(i / 5) * 0.6 + Math.random() * 0.3,
  junior: 16.4 + Math.sin(i / 3) * 1.1 + Math.random() * 0.5,
}));

const flows = Array.from({ length: 12 }).map((_, i) => ({
  m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  inflow: 800 + Math.random() * 400,
  outflow: -(500 + Math.random() * 300),
}));

const allocation = [
  { name: "Multi-family", v: 38, c: "hsl(var(--primary))" },
  { name: "Industrial", v: 27, c: "hsl(var(--accent))" },
  { name: "Mixed-Use", v: 18, c: "hsl(var(--info))" },
  { name: "Retail", v: 9, c: "hsl(var(--warning))" },
  { name: "Other", v: 8, c: "hsl(var(--muted-foreground))" },
];

const tooltipStyle = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 6,
  fontSize: 11,
};

export default function YieldAnalytics() {
  return (
    <PageShell
      title="Yield Analytics"
      subtitle="Tranche-level performance · 30d rolling · USDC denominated"
      actions={
        <>
          <Button size="sm" variant="ghost" className="h-8 gap-1.5"><Filter className="h-3.5 w-3.5" /> Filter</Button>
          <Button size="sm" className="h-8 gap-1.5 bg-gradient-gold text-primary-foreground"><Download className="h-3.5 w-3.5" /> Export CSV</Button>
        </>
      }
    >
      <div className="grid md:grid-cols-4 gap-3">
        {[
          { l: "Weighted APY", v: "12.84%", d: "+0.42%" },
          { l: "Realized Yield (30d)", v: "$1.28M", d: "+8.1%" },
          { l: "Avg LTV", v: "64.2%", d: "−1.1%" },
          { l: "Default Rate", v: "0.31%", d: "−0.04%" },
        ].map((s) => (
          <div key={s.l} className="panel p-4">
            <div className="stat-label">{s.l}</div>
            <div className="num text-2xl font-semibold tracking-tight mt-1">{s.v}</div>
            <div className="text-[11px] num text-success mt-0.5">▲ {s.d}</div>
          </div>
        ))}
      </div>

      <section className="panel">
        <div className="panel-header">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-accent" />
            <h2 className="text-sm font-semibold tracking-tight">APY by Tranche · 30d</h2>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Senior</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent" /> Mezzanine</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning" /> Junior</span>
          </div>
        </div>
        <div className="p-4 h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={apySeries}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="d" stroke="hsl(var(--muted-foreground))" fontSize={10} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} unit="%" />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="senior" stroke="hsl(var(--primary))" strokeWidth={1.6} dot={false} />
              <Line type="monotone" dataKey="mezz" stroke="hsl(var(--accent))" strokeWidth={1.6} dot={false} />
              <Line type="monotone" dataKey="junior" stroke="hsl(var(--warning))" strokeWidth={1.6} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4">
        <section className="panel">
          <div className="panel-header">
            <h2 className="text-sm font-semibold tracking-tight">Capital Flows · 12m</h2>
            <span className="text-[11px] text-muted-foreground">USDC, thousands</span>
          </div>
          <div className="p-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={flows}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="inflow" fill="hsl(var(--success))" radius={[2,2,0,0]} />
                <Bar dataKey="outflow" fill="hsl(var(--destructive))" radius={[0,0,2,2]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2 className="text-sm font-semibold tracking-tight">Allocation by Asset Class</h2>
          </div>
          <div className="p-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={allocation} dataKey="v" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
                  {allocation.map((a) => <Cell key={a.name} fill={a.c} stroke="hsl(var(--card))" />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
