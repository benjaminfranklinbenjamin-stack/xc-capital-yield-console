import { PageShell } from "@/components/xc/PageShell";
import { AirGapSync } from "@/components/xc/AirGapSync";
import { HardDrive, KeyRound, ShieldCheck, Cpu } from "lucide-react";

const devices = [
  { id: "HSM-A1", model: "YubiHSM 2 FIPS", role: "Primary signer", status: "online", lastSeen: "00:00:42" },
  { id: "HSM-B2", model: "Ledger Nano X", role: "Co-signer · CFO", status: "online", lastSeen: "00:01:18" },
  { id: "HSM-C3", model: "Trezor Safe 5", role: "Co-signer · Custodian", status: "offline", lastSeen: "00:14:02" },
  { id: "HSM-D4", model: "Ledger Stax", role: "Co-signer · Director", status: "online", lastSeen: "00:00:11" },
  { id: "HSM-E5", model: "GridPlus Lattice1", role: "Backup", status: "cold", lastSeen: "3d ago" },
];

const stateCls: Record<string, string> = {
  online: "bg-success/10 text-success border-success/30",
  offline: "bg-warning/10 text-warning border-warning/30",
  cold: "bg-info/10 text-info border-info/30",
};

export default function Vault() {
  return (
    <PageShell
      title="Air-Gap Vault"
      subtitle="HSM-backed cold-signing infrastructure · FIPS 140-3"
    >
      <div className="grid md:grid-cols-4 gap-3">
        {[
          { l: "Signers Online", v: "3 / 5", i: KeyRound },
          { l: "Quorum Threshold", v: "3 of 5", i: ShieldCheck },
          { l: "Pending TX", v: "7", i: HardDrive },
          { l: "HSM Firmware", v: "v2.4.1", i: Cpu },
        ].map((s) => (
          <div key={s.l} className="panel p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-surface-elevated border border-border grid place-items-center">
              <s.i className="h-4 w-4 text-success" />
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
            <KeyRound className="h-4 w-4 text-accent" />
            <h2 className="text-sm font-semibold tracking-tight">Hardware Signers</h2>
          </div>
        </div>
        <div className="grid grid-cols-[100px_1fr_1fr_120px_120px] gap-3 px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border bg-surface/40">
          <div>ID</div><div>Device</div><div>Role</div><div>Status</div><div>Last Seen</div>
        </div>
        {devices.map((d) => (
          <div key={d.id} className="grid grid-cols-[100px_1fr_1fr_120px_120px] gap-3 px-4 py-3 border-b border-border last:border-0 items-center">
            <div className="num text-[11px] text-muted-foreground">{d.id}</div>
            <div className="text-[13px] font-medium">{d.model}</div>
            <div className="text-[12px] text-muted-foreground">{d.role}</div>
            <div><span className={`text-[10px] px-1.5 py-0.5 rounded border uppercase tracking-wider ${stateCls[d.status]}`}>{d.status}</span></div>
            <div className="num text-[11px] text-muted-foreground">{d.lastSeen}</div>
          </div>
        ))}
      </section>

      <AirGapSync />
    </PageShell>
  );
}
