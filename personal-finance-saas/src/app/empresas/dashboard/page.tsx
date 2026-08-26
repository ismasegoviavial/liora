import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PiggyBank, TrendingUp, Sparkles, Zap, ArrowUpRight, Target, DollarSign, Wallet, RefreshCw, BarChart2, ExternalLink, ShieldCheck, PieChart } from "lucide-react"
import Link from "next/link"
import { CreateDealDialog } from "@/components/b2b/CreateDealDialog"
import { ensureInitialSeed } from "@/lib/seed"

export const dynamic = "force-dynamic"

export default async function B2bDashboardPage() {
  await ensureInitialSeed()
  const deals = await prisma.sponsoredDeal.findMany({
    orderBy: { createdAt: "desc" }
  })

  // Corporate Savings Metrics
  const corporateSavings = {
    totalSavedThisMonth: 1850000,
    annualProjectedSavings: 22200000,
    timeSavedHours: 18,
    potentialAiCuts: 640000,
    savingsCategories: [
      { category: "Licencias & Software SaaS", currentCost: 1200000, optimizedCost: 850000, monthlySaving: 350000, status: "Optimizado con IA" },
      { category: "Servicios Básicos & Telecom", currentCost: 650000, optimizedCost: 480000, monthlySaving: 170000, status: "Optimizado con IA" },
      { category: "Insumos & Compras Proveedores", currentCost: 4500000, optimizedCost: 3800000, monthlySaving: 700000, status: "Oportunidad de Ahorro" },
      { category: "Comisiones Bancarias & POS", currentCost: 480000, optimizedCost: 240000, monthlySaving: 240000, status: "Optimizado con IA" },
    ]
  }

  // Sample embed URL for Looker Studio / Power BI
  const embeddedDashboardUrl = "https://lookerstudio.google.com/embed/reporting/0B1a2b3c4d5e/page/1M"

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
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full ml-2 uppercase">Ahorro Corporativo</span>
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Panel de Ahorro Empresarial & BI</h1>
            <p className="text-slate-500 text-sm mt-1">Visualiza los indicadores de ahorro corporativo integrados directamente con Power BI / Looker Studio.</p>
          </div>

          <div className="flex items-center gap-3">
            <CreateDealDialog />
          </div>
        </div>

        {/* Big Savings Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-emerald-500/30 shadow-md bg-gradient-to-br from-emerald-900 to-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <PiggyBank className="w-24 h-24 text-emerald-400" />
            </div>
            <CardContent className="p-6 relative z-10">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Ahorro Corporativo Generado (Este Mes)</span>
              <h3 className="text-4xl font-black text-white mt-2">${corporateSavings.totalSavedThisMonth.toLocaleString("es-CL")} CLP</h3>
              <p className="text-xs text-emerald-300 font-semibold mt-2 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Proyección anual: ${corporateSavings.annualProjectedSavings.toLocaleString("es-CL")} CLP
              </p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tiempo Optimizado</span>
                <Zap className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-2">{corporateSavings.timeSavedHours} horas</h3>
              <p className="text-xs text-slate-500 mt-1">Ahorradas en gestión de proveedores</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Potencial de Ahorro IA</span>
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-3xl font-extrabold text-emerald-600 mt-2">${corporateSavings.potentialAiCuts.toLocaleString("es-CL")}</h3>
              <p className="text-xs text-emerald-600 font-semibold mt-1">Detectado por IA</p>
            </CardContent>
          </Card>
        </div>

        {/* Embedded Power BI / Looker Studio Live Dashboard */}
        <Card className="border border-slate-200 shadow-lg bg-white overflow-hidden">
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-4 bg-slate-900 text-white p-6">
            <div>
              <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                <BarChart2 className="w-6 h-6 text-emerald-400" /> Tablero de Inteligencia de Negocios (Power BI / Looker Studio)
              </CardTitle>
              <p className="text-xs text-slate-400 mt-1">Gráficos interactivos incrustados en tiempo real conectados con tus datos de empresa.</p>
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
            {/* Interactive Embedded Power BI / DataStudio Iframe Container */}
            <div className="relative w-full h-[600px] bg-slate-100 flex flex-col items-center justify-center border-b border-slate-200">
              <iframe 
                src="https://lookerstudio.google.com/embed/reporting/b648508e-1736-4c4e-b5ff-f2d4f2fa41ec/page/kIVD"
                className="w-full h-full border-0"
                allowFullScreen
                title="Power BI / Looker Studio Dashboard Integrado"
              />
              
              {/* Fallback interactive mock representation if iframe is restricted */}
              <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center text-white space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl border border-emerald-500/30">
                  <BarChart2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Gráfico Interactivo de Power BI / Looker Studio</h3>
                <p className="text-slate-300 max-w-lg text-sm leading-relaxed">
                  Este contenedor incrusta directamente tus reportes de <strong>Power BI</strong> o <strong>Looker Studio</strong> dentro de FinanzasPro. Tus gráficos de ahorro corporativo, gastos por departamento y ROI se visualizan aquí mismo sin salir de la app.
                </p>
                <div className="flex gap-3 pt-2">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold gap-2 text-xs">
                    Conectar mi Reporte de Power BI / DataStudio
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Corporate Savings Breakdown Table */}
        <Card className="border border-slate-200 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-emerald-600" /> Diagnóstico de Recortes y Ahorro en Costos Operativos
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-4">
              {corporateSavings.savingsCategories.map((cat) => (
                <div 
                  key={cat.category}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-emerald-300 hover:bg-white transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-base">{cat.category}</span>
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {cat.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Gasto actual: <span className="line-through">${cat.currentCost.toLocaleString("es-CL")}</span> ➔ Meta optimizada: <strong className="text-slate-800">${cat.optimizedCost.toLocaleString("es-CL")}</strong>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Ahorro Mensual Logrado</span>
                    <span className="text-xl font-black text-emerald-600">+${cat.monthlySaving.toLocaleString("es-CL")} CLP</span>
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
