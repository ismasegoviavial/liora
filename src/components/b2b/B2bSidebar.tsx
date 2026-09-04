"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Store, Target, CreditCard, Users } from "lucide-react"

export function B2bSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { label: "Servicio & Tiendas Incorporadas", href: "/empresas/dashboard", icon: Store },
    { label: "Campañas & Descuentos GPS", href: "/empresas/campanas", icon: Target },
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
            <h2 className="font-extrabold text-white text-base tracking-tight leading-tight">Liora</h2>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full uppercase">Portal de Marcas</span>
          </div>
        </div>

        {/* User Profile Badge */}
        <div className="mx-1 px-3 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
              IS
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate">Ismael Segovia</span>
              <span className="text-[10px] text-emerald-400 font-medium truncate">Cuenta Empresa</span>
            </div>
          </div>
          <Link href="/login" className="text-[11px] text-slate-400 hover:text-red-400 font-bold transition-colors">
            Salir
          </Link>
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

      {/* Footer info */}
      <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
        FinanzasPro Portal Marcas v2.5
      </div>
    </aside>
  )
}
