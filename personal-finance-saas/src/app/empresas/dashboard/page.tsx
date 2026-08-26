import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building2, Eye, MapPin, Plus, TrendingUp, Zap, FileText, DollarSign, Wallet, ArrowUpRight, ArrowDownRight, Target, Users, Calendar } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function B2bDashboardPage() {
  const deals = await prisma.sponsoredDeal.findMany({
    orderBy: { createdAt: "desc" }
  })

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
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full ml-2 uppercase">Portal Corporativo</span>
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Panel de Control de Marcas & Tesorería</h1>
            <p className="text-slate-500 text-sm mt-1">Gestiona tus campañas de marketing por geofencing GPS y el flujo de caja de tu PyME.</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-full font-bold gap-2 text-xs border-slate-300">
              <FileText className="w-4 h-4 text-blue-600" /> Emitir Factura SII
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold gap-2 shadow-lg shadow-emerald-600/20 text-xs">
              <Plus className="w-4 h-4" /> Crear Campaña GPS
            </Button>
          </div>
        </div>

        {/* Corporate Metrics KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Caja & Bancos PyME</span>
                <Wallet className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">$8.450.000</h3>
              <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +12% saldo disponible
              </p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Impactos GPS (Mapa)</span>
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">12.450</h3>
              <p className="text-xs text-blue-600 font-semibold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> 1.840 visitas físicas
              </p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Facturas por Cobrar</span>
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-2xl font-extrabold text-amber-600 mt-2">$280.000</h3>
              <p className="text-xs text-slate-500 mt-1">1 factura pendiente SII</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">ROI Publicitario Est.</span>
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-2">4.8x</h3>
              <p className="text-xs text-slate-500 mt-1">Retorno por cada $1 gastado</p>
            </CardContent>
          </Card>
        </div>

        {/* Section 1: Active GPS Promotions Engine */}
        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" /> Campañas Publicitarias Activas en el Mapa GPS
            </CardTitle>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
              Motor de Proximidad Activo
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
                      <span>📍 Coordenadas activas</span>
                      <span>🎯 Radio de cobertura: {deal.radiusMeters}m</span>
                      <span>⏳ Expira: {new Date(deal.expiresAt).toLocaleDateString("es-CL")}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right mr-2">
                      <span className="text-xs text-slate-400 block">Visitas enviadas</span>
                      <span className="text-base font-extrabold text-slate-900">482 clientes</span>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full border-slate-300 font-bold text-xs">
                      Editar Campaña
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Invoices & SII Integration */}
        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> Control de Facturación Electrónica (SII)
            </CardTitle>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Sincronizado con Servicio de Impuestos Internos
            </span>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {invoices.map((inv) => (
                <div key={inv.id} className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${inv.type === 'Venta' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                      {inv.type === 'Venta' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{inv.client} ({inv.id})</div>
                      <div className="text-xs text-slate-500">Fecha: {inv.date} • Tipo: Factura de {inv.type}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-extrabold text-slate-900">${inv.amount.toLocaleString("es-CL")} CLP</div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${inv.status === 'Pagada' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {inv.status}
                    </span>
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
