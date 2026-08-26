"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Wallet, PiggyBank, Bot, Target, FileText, Building2, User } from "lucide-react"

export function B2bSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { label: "Estado de Resultados (P&L)", href: "/empresas/dashboard", icon: LayoutDashboard },
    { label: "Presupuesto Empresarial", href: "/empresas/presupuesto", icon: PiggyBank },
    { label: "Cuentas & Tarjetas Bancarias", href: "/empresas/bancos", icon: Wallet },
    { label: "Asesor Financiero IA", href: "/empresas/asesor-ia", icon: Bot },
    { label: "Campañas & Descuentos GPS", href: "/empresas/campanas", icon: Target },
    { label: "Facturas SII & F29", href: "/empresas/facturas", icon: FileText },
  ]

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen p-4 flex flex-col justify-between shrink-0 border-r border-slate-800">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-2 border-b border-slate-800 pb-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-900 font-extrabold flex items-center justify-center text-lg shadow-lg shadow-emerald-500/20">
            🏢
          </div>
          <div>
            <h2 className="font-extrabold text-white text-base tracking-tight leading-tight">FinanzasPro</h2>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full uppercase">Portal Empresas</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                  isActive 
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20" 
                    : "hover:bg-slate-800 hover:text-white text-slate-400"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Switch Mode Footer */}
      <div className="pt-4 border-t border-slate-800">
        <Link href="/dashboard">
          <button className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold transition-all border border-slate-700">
            <User className="w-4 h-4 text-emerald-400" /> Ir a Modo Personas
          </button>
        </Link>
      </div>
    </aside>
  )
}
