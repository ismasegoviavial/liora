import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PiggyBank, TrendingUp, Sparkles, Zap, ArrowUpRight, ArrowDownRight, Target, DollarSign, Wallet, RefreshCw, BarChart2, ExternalLink, ShieldCheck, PieChart, AlertTriangle, Clock, Calendar, CheckCircle2, Building2 } from "lucide-react"
import Link from "next/link"
import { CreateDealDialog } from "@/components/b2b/CreateDealDialog"
import { ensureInitialSeed } from "@/lib/seed"

export const dynamic = "force-dynamic"

export default async function B2bDashboardPage() {
  await ensureInitialSeed()
  const deals = await prisma.sponsoredDeal.findMany({
    orderBy: { createdAt: "desc" }
  })

  // Management Control KPIs (Control de Gestión)
  const managementKpis = {
    currentCash: 18450000,
    monthlyBurnRate: 4200000,
    runwayMonths: 4.4,
    overdueInvoicesAmount: 1450000,
    timeSavedHours: 18,
    totalSavedThisMonth: 1850000,
  }

  // 90-Day Cash Flow Projection
  const cashFlowProjection = [
    { month: "Este Mes (Agosto)", incoming: 14250000, outgoing: 10800000, netCash: 18450000 },
    { month: "Septiembre (Proyectado)", incoming: 15100000, outgoing: 11200000, netCash: 22350000 },
    { month: "Octubre (Proyectado)", incoming: 16500000, outgoing: 11500000, netCash: 27350000 },
  ]

  // AI Management Alerts
  const aiAlerts = [
    { id: 1, type: "danger", title: "Factura Vencida Pendiente de Cobro", desc: "Haka Honu SpA registra $1.450.000 CLP con 12 días de mora.", action: "Enviar Recordatorio de Cobro" },
    { id: 2, type: "warning", title: "Desvío en Presupuesto de Marketing", desc: "El gasto publicitario superó en $180.000 CLP la meta estimada del mes.", action: "Ajustar Límite" },
    { id: 3, type: "success", title: "Oportunidad de Ahorro en Telecomunicaciones", desc: "Detectamos un sobreprecio del 24% en tu plan de internet corporativo.", action: "Ver Oferta Optimizada" },
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
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full ml-2 uppercase">Control de Gestión</span>
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Cuadro de Mando & Control de Gestión</h1>
            <p className="text-slate-500 text-sm mt-1">Monitorea el flujo de caja proyectado, Burn Rate, salud financiera y dashboards integrados.</p>
          </div>

          <div className="flex items-center gap-3">
            <CreateDealDialog />
          </div>
        </div>

        {/* Management Control KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Caja Disponible Real</span>
                <Wallet className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mt-2">${managementKpis.currentCash.toLocaleString("es-CL")}</h3>
              <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> Saldo disponible en bancos
              </p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Burn Rate Mensual</span>
                <ArrowDownRight className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-2xl font-black text-red-600 mt-2">${managementKpis.monthlyBurnRate.toLocaleString("es-CL")}</h3>
              <p className="text-xs text-slate-500 mt-1">Gasto operativo neto mensual</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Runway Operativo</span>
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black text-blue-600 mt-2">{managementKpis.runwayMonths} meses</h3>
              <p className="text-xs text-blue-600 font-semibold mt-1">Meses de vida con la caja actual</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cobranza Vencida</span>
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-2xl font-black text-amber-600 mt-2">${managementKpis.overdueInvoicesAmount.toLocaleString("es-CL")}</h3>
              <p className="text-xs text-slate-500 mt-1">Facturas sin cobrar con mora</p>
            </CardContent>
          </Card>
        </div>

        {/* 90-Day Cash Flow Projection Card */}
        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" /> Proyección de Flujo de Caja a 90 Días (Cash Flow)
            </CardTitle>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
              Modelo Predictivo Activo
            </span>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cashFlowProjection.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600" /> {item.month}
                  </div>
                  
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>(+) Ingresos Proyectados</span>
                      <span>+${item.incoming.toLocaleString("es-CL")}</span>
                    </div>
                    <div className="flex justify-between text-red-600 font-semibold">
                      <span>(-) Egresos Proyectados</span>
                      <span>-${item.outgoing.toLocaleString("es-CL")}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-2 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500">Saldo Final de Caja</span>
                    <span className="text-base font-black text-slate-900">${item.netCash.toLocaleString("es-CL")}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Management Alerts Engine */}
        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" /> Alertas Automáticas de Control de Gestión (IA Gemini)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {aiAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                    alert.type === 'danger' ? 'bg-red-50/60 border-red-200 text-red-900' :
                    alert.type === 'warning' ? 'bg-amber-50/60 border-amber-200 text-amber-900' :
                    'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full shrink-0 mt-0.5">
                      {alert.type === 'danger' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                      {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                      {alert.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{alert.title}</div>
                      <p className="text-xs opacity-90 mt-0.5">{alert.desc}</p>
                    </div>
                  </div>

                  <Button size="sm" variant="outline" className="rounded-full font-bold text-xs shrink-0 border-current bg-white">
                    {alert.action}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Embedded Power BI / Looker Studio Live Dashboard */}
        <Card className="border border-slate-200 shadow-lg bg-white overflow-hidden">
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-4 bg-slate-900 text-white p-6">
            <div>
              <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                <BarChart2 className="w-6 h-6 text-emerald-400" /> Tablero de Control Incrustado (Power BI / Looker Studio)
              </CardTitle>
              <p className="text-xs text-slate-400 mt-1">Gráficos interactivos en tiempo real incrustados en la plataforma.</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Sincronización en Vivo
              </span>
              <a 
                href="/api/v1/export/metrics" 
                target="_blank" 
                className="text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-700 font-medium flex items-center gap-1 transition-colors"
              >
                API Endpoint <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="relative w-full h-[550px] bg-slate-100 flex flex-col items-center justify-center border-b border-slate-200">
              <iframe 
                src="https://lookerstudio.google.com/embed/reporting/b648508e-1736-4c4e-b5ff-f2d4f2fa41ec/page/kIVD"
                className="w-full h-full border-0"
                allowFullScreen
                title="Power BI / Looker Studio Dashboard Integrado"
              />
              
              <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center text-white space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl border border-emerald-500/30">
                  <BarChart2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Gráfico Interactivo de Power BI / Looker Studio</h3>
                <p className="text-slate-300 max-w-lg text-sm leading-relaxed">
                  Tus tableros ejecutivos personalizados de <strong>Power BI</strong> o <strong>Looker Studio</strong> se renderizan aquí en vivo para el control de gestión de tu empresa.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
