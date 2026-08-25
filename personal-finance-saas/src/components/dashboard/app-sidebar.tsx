import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Receipt, PiggyBank, CreditCard, LineChart, MessageSquare, Landmark, Settings, Sparkles, MapPin } from "lucide-react"
import Link from "next/link"

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Transacciones", url: "/transactions", icon: Receipt },
  { title: "Presupuesto", url: "/budget", icon: PiggyBank },
  { title: "Metas de Ahorro", url: "/goals", icon: Landmark },
  { title: "Deudas", url: "/debts", icon: CreditCard },
  { title: "Patrimonio", url: "/net-worth", icon: LineChart },
  { title: "Promociones", url: "/deals", icon: MapPin },
  { title: "Asesor IA", url: "/advisor", icon: MessageSquare, isPremium: true },
  { title: "Cuentas Bancarias", url: "/accounts", icon: Landmark },
  { title: "Configuración", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <div className="p-6 flex items-center gap-3 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
          $
        </div>
        <span className="font-bold text-xl text-sidebar-foreground tracking-tight">FinanzasPro</span>
      </div>
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Mi Dinero</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors rounded-lg px-3 py-2 text-sidebar-foreground font-medium group">
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 group-hover:text-sidebar-accent-foreground text-slate-500 transition-colors" />
                      <span className="flex-1">{item.title}</span>
                      {item.isPremium && (
                        <Sparkles className="w-4 h-4 text-accent" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="p-4 mt-auto">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500 rounded-full blur-2xl opacity-20"></div>
          <p className="font-bold text-white mb-1 relative z-10 text-lg">Plan Gratis</p>
          <p className="text-slate-300 mb-4 text-sm relative z-10 leading-relaxed">Pásate a Premium y deja que la IA haga el trabajo por ti.</p>
          <Link href="/upgrade" className="block text-center bg-blue-500 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-400 transition-all shadow-md shadow-blue-500/20 relative z-10">
            Mejorar Plan
          </Link>
        </div>
      </div>
    </Sidebar>
  )
}
