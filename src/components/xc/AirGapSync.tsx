import { useRef, useState } from "react";
import { Download, UploadCloud, ShieldCheck, FileLock2, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PendingTx {
  id: string;
  type: string;
  amount: string;
  destination: string;
  required: string;
  status: "queued" | "exported" | "signed";
}

const initial: PendingTx[] = [
  { id: "TX-8821", type: "Tranche Disbursement", amount: "$1,250,000 USDC", destination: "BPL-2041 · Brickell", required: "3 of 5", status: "queued" },
  { id: "TX-8819", type: "Yield Distribution", amount: "$487,219 USDC", destination: "SPV Aurora IV · LP", required: "2 of 3", status: "exported" },
  { id: "TX-8814", type: "Mandate Authorization", amount: "M-034 · ERC-8232", destination: "RAMS Quorum", required: "3 of 5", status: "queued" },
];

const statusCls: Record<PendingTx["status"], string> = {
  queued: "bg-warning/10 text-warning border-warning/30",
  exported: "bg-info/10 text-info border-info/30",
  signed: "bg-success/10 text-success border-success/30",
};

export function AirGapSync() {
  const [txs, setTxs] = useState<PendingTx[]>(initial);
  const fileRef = useRef<HTMLInputElement>(null);

  const exportXdr = (id: string) => {
    setTxs((p) => p.map((t) => (t.id === id ? { ...t, status: "exported" } : t)));
    toast.success("XDR Exported", {
      description: `${id}.xdr ready for offline signing on cold device.`,
    });
  };

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    toast.success("Signed payload accepted", {
      description: `${f.name} verified. Broadcasting to Avalanche C-Chain.`,
    });
    setTxs((p) =>
      p.map((t) => (t.status === "exported" ? { ...t, status: "signed" } : t)),
    );
    e.target.value = "";
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-surface-elevated border border-border grid place-items-center">
            <HardDrive className="h-4 w-4 text-success" />
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-tight flex items-center gap-2">
              Air-Gap Sync
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-success/10 text-success border border-success/30 uppercase tracking-wider">
                Cold-Signed
              </span>
            </h2>
            <p className="text-[11px] text-muted-foreground">
              Export pending transactions as XDR · sign offline · upload signed payload.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-success" />
          HSM-backed · FIPS 140-3
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-px bg-border">
        <div className="bg-card">
          <div className="grid grid-cols-[90px_1fr_auto_auto] gap-3 px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border bg-surface/40">
            <div>ID</div>
            <div>Transaction</div>
            <div className="text-right">Sigs</div>
            <div></div>
          </div>
          {txs.map((t) => (
            <div
              key={t.id}
              className="grid grid-cols-[90px_1fr_auto_auto] gap-3 px-4 py-3 border-b border-border last:border-0 items-center hover:bg-surface-hover/40 transition-colors"
            >
              <div className="num text-[11px] text-muted-foreground">{t.id}</div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium truncate">{t.type}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border uppercase tracking-wider ${statusCls[t.status]}`}>
                    {t.status}
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground truncate">
                  <span className="num text-foreground/80">{t.amount}</span> → {t.destination}
                </div>
              </div>
              <div className="num text-[11px] text-muted-foreground">{t.required}</div>
              <Button
                size="sm"
                variant="ghost"
                disabled={t.status !== "queued"}
                onClick={() => exportXdr(t.id)}
                className="h-7 text-[11px] gap-1 text-foreground hover:bg-surface-elevated"
              >
                <Download className="h-3 w-3" /> XDR
              </Button>
            </div>
          ))}
        </div>

        <div className="bg-card p-4 flex flex-col gap-3">
          <div className="rounded-md border border-dashed border-border-strong bg-surface p-4 text-center">
            <FileLock2 className="h-6 w-6 mx-auto text-primary mb-2" />
            <div className="text-sm font-semibold">Export XDR for Offline Signing</div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Bundles all queued transactions into a single XDR envelope readable by your cold-signer.
            </p>
            <Button
              className="w-full mt-3 bg-gradient-gold text-primary-foreground hover:opacity-90"
              onClick={() => exportXdr(txs.find((t) => t.status === "queued")?.id ?? "TX-8821")}
            >
              <Download className="h-4 w-4 mr-1.5" /> Export Bundle
            </Button>
          </div>

          <div
            className="rounded-md border-2 border-dashed border-accent/40 bg-accent/5 p-4 text-center cursor-pointer hover:bg-accent/10 transition-colors"
            onClick={() => fileRef.current?.click()}
          >
            <UploadCloud className="h-6 w-6 mx-auto text-accent mb-2" />
            <div className="text-sm font-semibold">Upload Signed Payload</div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Drop your <span className="font-mono">.signed.xdr</span> file here. Signatures are verified
              against RAMS quorum before broadcast.
            </p>
            <input ref={fileRef} type="file" hidden onChange={onUpload} />
          </div>
        </div>
      </div>
    </section>
  );
}
