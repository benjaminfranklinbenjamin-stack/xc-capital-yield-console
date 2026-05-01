import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/xc/AppSidebar";
import { TopBar } from "@/components/xc/TopBar";

interface PageShellProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function PageShell({ title, subtitle, actions, children }: PageShellProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <main className="flex-1 p-4 md:p-6 space-y-6 max-w-[1600px] w-full mx-auto">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-xl md:text-2xl font-semibold tracking-tight">{title}</h1>
                {subtitle && (
                  <p className="text-xs text-muted-foreground">{subtitle}</p>
                )}
              </div>
              {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>

            {children}

            <footer className="pt-4 pb-2 text-center text-[11px] text-muted-foreground border-t border-border">
              XC Capital · ERC-8226 / ERC-8232 RAMS Compliant · © 2026
            </footer>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
