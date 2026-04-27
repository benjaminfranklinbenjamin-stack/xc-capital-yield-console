import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/xc/AppSidebar";
import { TopBar } from "@/components/xc/TopBar";
import { LiveYieldHero } from "@/components/xc/LiveYieldHero";
import { TrancheCards } from "@/components/xc/TrancheCards";
import { AgentModule } from "@/components/xc/AgentModule";
import { AirGapSync } from "@/components/xc/AirGapSync";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <main className="flex-1 p-4 md:p-6 space-y-6 max-w-[1600px] w-full mx-auto">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Portfolio Overview</h1>
              <p className="text-xs text-muted-foreground">
                Autonomous Private Credit Layer · SPV Aurora Credit IV · Avalanche C-Chain
              </p>
            </div>

            <LiveYieldHero />
            <TrancheCards />
            <AgentModule />
            <AirGapSync />

            <footer className="pt-4 pb-2 text-center text-[11px] text-muted-foreground border-t border-border">
              XC Capital · ERC-8226 / ERC-8232 RAMS Compliant · © 2026
            </footer>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
