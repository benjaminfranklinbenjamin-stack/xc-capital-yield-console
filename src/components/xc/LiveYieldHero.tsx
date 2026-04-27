import { useEffect, useRef, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TrendingUp, Zap } from "lucide-react";

const START = 1284372.412518;
const RATE = 0.184273; // USDC / second

function generateSeries(points: number, base: number, vol: number) {
  let v = base;
  return Array.from({ length: points }).map((_, i) => {
    v += (Math.random() - 0.45) * vol + base * 0.0008;
    return { i, v: Math.max(0, v) };
  });
}

const series24 = generateSeries(48, 12.4, 0.6);
const series7 = generateSeries(56, 84.2, 3.1);
const series30 = generateSeries(60, 362.7, 9.4);

function MiniChart({ data, color, label, value, delta }: any) {
  return (
    <div className="rounded-md border border-border bg-surface/60 p-3 hover:bg-surface-hover transition-colors">
      <div className="flex items-center justify-between mb-1">
        <span className="stat-label">{label}</span>
        <span className={`num text-[11px] ${delta >= 0 ? "text-success" : "text-destructive"}`}>
          {delta >= 0 ? "▲" : "▼"} {Math.abs(delta).toFixed(2)}%
        </span>
      </div>
      <div className="num text-lg font-semibold tracking-tight">{value}</div>
      <div className="h-10 -mx-1 mt-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`g-${label}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.6} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} fill={`url(#g-${label})`} />
            <Tooltip
              cursor={{ stroke: "hsl(var(--border-strong))" }}
              contentStyle={{
                background: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 6,
                fontSize: 11,
              }}
              formatter={(v: any) => [`${Number(v).toFixed(4)} USDC`, "Yield"]}
              labelFormatter={() => ""}
            />
            <XAxis dataKey="i" hide />
            <YAxis hide domain={["dataMin", "dataMax"]} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function LiveYieldHero() {
  const [yieldVal, setYieldVal] = useState(START);
  const startRef = useRef<number>(performance.now());

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const elapsed = (performance.now() - startRef.current) / 1000;
      setYieldVal(START + elapsed * RATE);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const [whole, decimals] = yieldVal.toFixed(6).split(".");
  const wholeFmt = Number(whole).toLocaleString("en-US");

  return (
    <section className="panel relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow-gold pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="relative p-6 md:p-7 grid lg:grid-cols-[1.4fr_1fr] gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="pulse-dot bg-success after:bg-success/60" />
            <span className="stat-label text-success">Live · Streaming from Avalanche C-Chain</span>
          </div>
          <div className="stat-label mb-2 flex items-center gap-2">
            <Zap className="h-3 w-3 text-primary" />
            Accrued Yield (USDC)
          </div>
          <div className="num font-semibold tracking-tighter leading-none flex items-baseline gap-1">
            <span className="text-5xl md:text-6xl xl:text-7xl bg-gradient-gold bg-clip-text text-transparent">
              {wholeFmt}
            </span>
            <span className="text-2xl md:text-3xl text-muted-foreground">.</span>
            <span className="text-3xl md:text-4xl text-foreground/70">{decimals}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
            <div>
              Rate: <span className="num text-foreground">{RATE.toFixed(6)} USDC/s</span>
            </div>
            <div>
              APR Blended: <span className="num text-success">12.84%</span>
            </div>
            <div>
              Next Distribution: <span className="num text-foreground">04d 17h 22m</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-3">
          <MiniChart
            data={series24}
            color="hsl(var(--primary))"
            label="24h Velocity"
            value="$15,924.41"
            delta={2.18}
          />
          <MiniChart
            data={series7}
            color="hsl(var(--accent))"
            label="7d Velocity"
            value="$112,842.07"
            delta={5.47}
          />
          <MiniChart
            data={series30}
            color="hsl(var(--success))"
            label="30d Velocity"
            value="$487,219.55"
            delta={-1.12}
          />
        </div>
      </div>

      <div className="relative border-t border-border px-6 py-3 flex flex-wrap items-center gap-x-8 gap-y-2 text-[11px]">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-3 w-3 text-success" />
          <span className="text-muted-foreground">TVL</span>
          <span className="num font-semibold">$48,271,402.18</span>
        </div>
        <div>
          <span className="text-muted-foreground">Active Tranches</span>{" "}
          <span className="num font-semibold">14</span>
        </div>
        <div>
          <span className="text-muted-foreground">Weighted LTV</span>{" "}
          <span className="num font-semibold">62.8%</span>
        </div>
        <div>
          <span className="text-muted-foreground">Default Rate (TTM)</span>{" "}
          <span className="num text-success">0.41%</span>
        </div>
        <div>
          <span className="text-muted-foreground">Block</span>{" "}
          <span className="num">#52,841,229</span>
        </div>
      </div>
    </section>
  );
}
