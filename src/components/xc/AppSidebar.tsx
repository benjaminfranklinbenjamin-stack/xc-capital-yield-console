import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutGrid,
  LineChart,
  Bot,
  ShieldCheck,
  Settings,
  HardDrive,
  FileBarChart,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";

const main = [
  { title: "Portfolio", url: "/", icon: LayoutGrid },
  { title: "Yield Analytics", url: "/yield", icon: LineChart },
  { title: "Agent Mandates", url: "/agents", icon: Bot },
  { title: "Compliance (RAMS)", url: "/compliance", icon: ShieldCheck },
];

const secondary = [
  { title: "Reports", url: "/reports", icon: FileBarChart },
  { title: "Air-Gap Vault", url: "/vault", icon: HardDrive },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const renderItem = (item: { title: string; url: string; icon: any }) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild tooltip={item.title}>
        <NavLink
          to={item.url}
          end
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md"
          activeClassName="bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-primary"
        >
          <item.icon className="h-4 w-4" />
          {!collapsed && <span className="text-[13px]">{item.title}</span>}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent className="bg-sidebar pt-2">
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-[10px] tracking-[0.18em]">OPERATIONS</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>{main.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-[10px] tracking-[0.18em]">SYSTEM</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>{secondary.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto m-2 p-3 rounded-md border border-sidebar-border bg-sidebar-accent/40">
            <div className="flex items-center gap-2 mb-1">
              <span className="pulse-dot bg-accent after:bg-accent/60" />
              <span className="text-[10px] uppercase tracking-wider text-accent font-semibold">ERC-8232</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-snug">
              RAMS protocol active. 3 mandates currently delegating signature authority.
            </p>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
