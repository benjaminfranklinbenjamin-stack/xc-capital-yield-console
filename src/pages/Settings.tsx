import { PageShell } from "@/components/xc/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Bell, Network, ShieldCheck } from "lucide-react";

export default function Settings() {
  return (
    <PageShell
      title="Settings"
      subtitle="Workspace · network · security preferences"
    >
      <div className="grid lg:grid-cols-2 gap-4">
        <section className="panel p-5 space-y-4">
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4 text-accent" />
            <h2 className="text-sm font-semibold tracking-tight">Workspace</h2>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-xs">Organization</Label>
              <Input defaultValue="XC Capital · Aurora Credit IV" className="bg-surface border-border mt-1.5" />
            </div>
            <div>
              <Label className="text-xs">Default Currency</Label>
              <Input defaultValue="USDC" className="bg-surface border-border mt-1.5 font-mono" />
            </div>
            <div>
              <Label className="text-xs">Reporting Timezone</Label>
              <Input defaultValue="America/New_York" className="bg-surface border-border mt-1.5" />
            </div>
          </div>
        </section>

        <section className="panel p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Network className="h-4 w-4 text-accent" />
            <h2 className="text-sm font-semibold tracking-tight">Network</h2>
          </div>
          <div className="space-y-3">
            <div>
              <Label className="text-xs">RPC Endpoint (Avalanche C-Chain)</Label>
              <Input defaultValue="https://api.avax.network/ext/bc/C/rpc" className="bg-surface border-border mt-1.5 font-mono text-xs" />
            </div>
            <div>
              <Label className="text-xs">Chainlink Oracle</Label>
              <Input defaultValue="0x0A77230d17318075983913bC2145DB16C7366156" className="bg-surface border-border mt-1.5 font-mono text-xs" />
            </div>
            <div className="flex items-center justify-between rounded-md border border-border bg-surface p-3">
              <div>
                <div className="text-sm font-medium">Auto-Failover RPC</div>
                <div className="text-[11px] text-muted-foreground">Switch to backup on >100ms latency</div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </section>

        <section className="panel p-5 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-success" />
            <h2 className="text-sm font-semibold tracking-tight">Security</h2>
          </div>
          <div className="space-y-2.5">
            {[
              { t: "Require Air-Gap for >$100k", d: "Force cold-signing above threshold" },
              { t: "RAMS 3-of-5 Quorum", d: "Enforce validator quorum on mandates" },
              { t: "Session timeout · 15 min", d: "Auto-logout inactive sessions" },
              { t: "Hardware key for login", d: "WebAuthn / FIDO2 required" },
            ].map((s) => (
              <div key={s.t} className="flex items-center justify-between rounded-md border border-border bg-surface p-3">
                <div>
                  <div className="text-sm font-medium">{s.t}</div>
                  <div className="text-[11px] text-muted-foreground">{s.d}</div>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </section>

        <section className="panel p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-warning" />
            <h2 className="text-sm font-semibold tracking-tight">Notifications</h2>
          </div>
          <div className="space-y-2.5">
            {[
              { t: "Covenant breach alerts", d: "Email + in-app" },
              { t: "Mandate executions", d: "In-app stream" },
              { t: "Daily NAV summary", d: "Email at 17:00 ET" },
              { t: "Air-Gap signature requests", d: "Push to mobile signer" },
            ].map((s) => (
              <div key={s.t} className="flex items-center justify-between rounded-md border border-border bg-surface p-3">
                <div>
                  <div className="text-sm font-medium">{s.t}</div>
                  <div className="text-[11px] text-muted-foreground">{s.d}</div>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="ghost">Reset</Button>
        <Button className="bg-gradient-gold text-primary-foreground">Save Changes</Button>
      </div>
    </PageShell>
  );
}
