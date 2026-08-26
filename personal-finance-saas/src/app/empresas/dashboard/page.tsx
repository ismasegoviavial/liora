import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building2, Eye, MapPin, Plus, TrendingUp, Zap, FileText, DollarSign, Wallet, ArrowUpRight, ArrowDownRight, Target, BarChart3, PieChart, ShieldAlert, Receipt, Calculator, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { CreateDealDialog } from "@/components/b2b/CreateDealDialog"
import { ensureInitialSeed } from "@/lib/seed"

export const dynamic = "force-dynamic"

export default async function B2bDashboardPage() {
  await ensureInitialSeed()
  const deals = await prisma.sponsoredDeal.findMany({
    orderBy: { createdAt: "desc" }
  })

  // Simulated P&L & Accounting Metrics for SME
  const pnlData = {
    totalRevenue: 14250000,
    costOfGoodsSold: 4500000,
    grossProfit: 9750000,
    grossMarginPercent: 68.4,
    operatingExpenses: 6300000,
    netProfit: 3450000,
    netMarginPercent: 24.2,
    breakEvenPoint: 5200000,
    liquidityRatio: 2.1,
    estimatedIvaPayment: 680000,
  }

  const invoices = [
    { id: "F-1024", type: "Venta", client: "Haka Honu Chile", amount: 1450000, date: "2026-08-20", status: "Pagada" },
    { id: "F-1025", type: "Venta", client: "Café Rendibu", amount: 280000, date: "2026-08-22", status: "Pendiente" },
    { id: "F-892", type: "Compra", client: "Proveedor Insumos SpA", amount: 520000, date: "2026-08-18", status: "Pagada" },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Corporate B2B Navigation Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-900 font-extrabold flex items-center justify-center text-lg shadow-lg shadow-emerald-500/20">
              🏢
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">FinanzasPro <span className="text-emerald-400 font-normal">Empresas</span></span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full ml-2 uppercase">Contabilidad & Analytics</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/empresas">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800 text-xs">
                Ver Portada B2B
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800 text-xs rounded-full">
                Ir a Modo Personas
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Centro de Contabilidad & Márgenes Financieros</h1>
            <p className="text-slate-500 text-sm mt-1">Monitorea la salud contable de tu empresa, márgenes de ganancia, Estado de Resultados (P&L) y tributación.</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-full font-bold gap-2 text-xs border-slate-300">
              <FileText className="w-4 h-4 text-blue-600" /> Exportar Libro F29 (SII)
            </Button>
            <CreateDealDialog />
          </div>
        </div>

        {/* Financial Health & Margins Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Margen Bruto</span>
                <PieChart className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-extrabold text-emerald-600 mt-2">{pnlData.grossMarginPercent}%</h3>
              <p className="text-xs text-slate-500 mt-1">Utilidad sobre costo de ventas</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Margen Neto (EBITDA)</span>
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-3xl font-extrabold text-blue-600 mt-2">{pnlData.netMarginPercent}%</h3>
              <p className="text-xs text-slate-500 mt-1">${pnlData.netProfit.toLocaleString("es-CL")} ganancia limpia</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Punto de Equilibrio</span>
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">${pnlData.breakEvenPoint.toLocaleString("es-CL")}</h3>
              <p className="text-xs text-emerald-600 font-semibold mt-1">Ventas mínimas para no perder</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">IVA Estimado a Pagar</span>
                <Receipt className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-2xl font-extrabold text-amber-600 mt-2">${pnlData.estimatedIvaPayment.toLocaleString("es-CL")}</h3>
              <p className="text-xs text-slate-500 mt-1">Proyección F29 del mes</p>
            </CardContent>
          </Card>
        </div>

        {/* P&L Financial Statement Card */}
        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-slate-700" /> Estado de Resultados Contable (P&L) - Este Mes
            </CardTitle>
            <span className="text-xs bg-slate-100 text-slate-800 font-bold px-3 py-1 rounded-full border border-slate-200">
              Moneda: CLP ($)
            </span>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <span className="font-semibold text-slate-700 text-sm">(+) Ventas Totales y Facturación</span>
                <span className="font-extrabold text-slate-900 text-base">${pnlData.totalRevenue.toLocaleString("es-CL")}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-red-50/50">
                <span className="font-semibold text-red-700 text-sm">(-) Costo de Ventas e Insumos (COGS)</span>
                <span className="font-bold text-red-600 text-base">-${pnlData.costOfGoodsSold.toLocaleString("es-CL")}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="font-bold text-emerald-900 text-sm">(=) Ganancia Bruta</span>
                <span className="font-extrabold text-emerald-700 text-lg">${pnlData.grossProfit.toLocaleString("es-CL")} ({pnlData.grossMarginPercent}%)</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <span className="font-semibold text-slate-700 text-sm">(-) Gastos Operativos (Arriendos, Sueldos, Marketing)</span>
                <span className="font-bold text-slate-800 text-base">-${pnlData.operatingExpenses.toLocaleString("es-CL")}</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 text-white shadow-md">
                <div>
                  <span className="font-extrabold text-base block text-emerald-400">(=) Utilidad Neta Final (EBITDA)</span>
                  <span className="text-xs text-slate-400">Resultado final para retiro o reinversión</span>
                </div>
                <span className="font-black text-2xl text-emerald-400">${pnlData.netProfit.toLocaleString("es-CL")} CLP</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configured Stores List */}
        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" /> Sucursales y Campañas GPS Configuradas
            </CardTitle>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
              {deals.length} Tiendas Registradas
            </span>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {deals.map((deal) => (
                <div 
                  key={deal.id} 
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-emerald-300 hover:bg-white transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-base">{deal.companyName}</span>
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {deal.tier}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-700">{deal.message}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                      <span>📍 Lat: {deal.latitude.toFixed(4)}, Lng: {deal.longitude.toFixed(4)}</span>
                      <span>🎯 Cobertura: {deal.radiusMeters}m</span>
                      <span>⏳ Expira: {new Date(deal.expiresAt).toLocaleDateString("es-CL")}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right mr-2">
                      <span className="text-xs text-slate-400 block">Clientes Atraídos</span>
                      <span className="text-base font-extrabold text-slate-900">482 visitas</span>
                    </div>
                    <Link href="/deals" target="_blank">
                      <Button variant="outline" size="sm" className="rounded-full border-slate-300 font-bold text-xs">
                        Ver en Mapa
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
