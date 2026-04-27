import { Activity, ChevronDown, ShieldCheck, Bell } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function TopBar() {
  return (
    <header className="h-14 flex items-center gap-3 border-b border-border bg-[hsl(222_50%_5%)]/80 backdrop-blur px-3 sticky top-0 z-30">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

      <div className="flex items-center gap-2 pl-1">
        <div className="h-7 w-7 rounded-md bg-gradient-gold grid place-items-center text-primary-foreground font-bold text-[13px]">
          XC
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight">XC Capital</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">RWA Console</div>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 ml-4 px-3 h-9 rounded-md border border-border bg-surface">
        <span className="pulse-dot bg-success after:bg-success/60" />
        <span className="text-xs text-muted-foreground">Network</span>
        <span className="text-xs font-medium">Avalanche C-Chain</span>
        <span className="num text-[11px] text-muted-foreground">· 43114</span>
        <span className="num text-[11px] text-success ml-1">28ms</span>
      </div>

      <div className="hidden lg:flex items-center gap-2 px-3 h-9 rounded-md border border-border bg-surface">
        <ShieldCheck className="h-3.5 w-3.5 text-accent" />
        <span className="text-xs text-muted-foreground">SPV</span>
        <span className="text-xs font-medium">Aurora Credit IV</span>
        <span className="num text-[11px] text-muted-foreground">0x7a..f3c1</span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-2 px-3 h-9 rounded-md border border-success/30 bg-success/10">
        <span className="pulse-dot bg-success after:bg-success/60" />
        <span className="text-[11px] uppercase tracking-wider text-success font-semibold">Air-Gap Sync</span>
        <span className="text-xs text-foreground/80">Online</span>
        <span className="num text-[10px] text-muted-foreground">· last 00:42</span>
      </div>

      <Button size="icon" variant="ghost" className="h-9 w-9 text-muted-foreground">
        <Bell className="h-4 w-4" />
      </Button>
      <div className="h-9 w-9 rounded-md bg-surface-elevated grid place-items-center text-xs font-semibold border border-border">
        OD
      </div>
    </header>
  );
}
