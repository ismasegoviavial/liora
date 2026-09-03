import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { NearbyDealsWidget } from "@/components/dashboard/NearbyDealsWidget"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-x-hidden bg-slate-50">
        <div className="flex h-16 items-center gap-4 border-b bg-white px-6">
          <SidebarTrigger />
          <div className="font-semibold text-lg text-slate-800">
            Resumen Financiero
          </div>
        </div>
        <div className="p-6">
          {children}
        </div>
      </main>
      <NearbyDealsWidget />
    </SidebarProvider>
  )
}
