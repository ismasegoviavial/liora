import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, Plus, Users, ShieldCheck, CheckCircle2, Navigation, Target, Sparkles, Store, CreditCard } from "lucide-react"
import Link from "next/link"
import { CreateDealDialog } from "@/components/b2b/CreateDealDialog"
import { ensureInitialSeed } from "@/lib/seed"

export const dynamic = "force-dynamic"

export default async function B2bDashboardPage() {
  await ensureInitialSeed()
  const deals = await prisma.sponsoredDeal.findMany({
    orderBy: { createdAt: "desc" }
  })

  // Contracted Service Plan Info
  const contractedPlan = {
    name: "Plan Pro Destacado",
    price: 69990,
    billingCycle: "Mensual",
    status: "Suscripción Activa",
    renewalDate: "2026-09-25",
    features: [
      "Geofencing GPS hasta 2 km de radio",
      "Soporte multi-sucursal",
      "Métricas de visitas en tiempo real",
      "Publicación prioritaria en mapa"
    ]
  }

  // Traffic / People Attracted Metrics
  const trafficMetrics = {
    totalPeopleReached: 12450, // Personas que vieron la oferta en la app
    totalPhysicalVisits: 1840,  // Personas que llegaron físicamente a las tiendas por la app
    conversionRatePercent: 14.8,
  }

  // Pre-configured store addresses mapped by company
  const storeAddresses: Record<string, string> = {
    "Café Rendibu": "Av. Providencia 2140, Providencia, Santiago",
    "Haka Honu": "Av. Andrés Bello 2425, Local 201, Costanera Center, Providencia",
    "Gimnasio Pacific Fitness": "Av. Vitacura 5400, Vitacura, Santiago",
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Corporate Header Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-900 font-extrabold flex items-center justify-center text-lg shadow-lg shadow-emerald-500/20">
              🏢
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">FinanzasPro <span className="text-emerald-400 font-normal">Empresas</span></span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full ml-2 uppercase">Portal de Marcas</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/empresas">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800 text-xs">
                Ver Planes B2B
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Top Title & Quick Action */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Panel de Control de Tiendas & Métricas de Tráfico</h1>
            <p className="text-slate-500 text-sm mt-1">Revisa tu plan contratado, las personas que han llegado a tus locales por la app y tus sucursales.</p>
          </div>

          <div className="flex items-center gap-3">
            <CreateDealDialog />
          </div>
        </div>

        {/* Section 1: Contracted Service Plan (Servicio Contratado) */}
        <Card className="border border-slate-200 shadow-sm bg-white rounded-3xl overflow-hidden">
          <CardHeader className="bg-slate-900 text-white p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {contractedPlan.status}
                </span>
                <span className="text-xs text-slate-400">Renovación: {contractedPlan.renewalDate}</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-2 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-emerald-400" /> {contractedPlan.name}
              </h2>
            </div>

            <div className="text-left md:text-right">
              <span className="text-3xl font-black text-emerald-400">${contractedPlan.price.toLocaleString("es-CL")} CLP</span>
              <span className="text-xs text-slate-400 block">/ {contractedPlan.billingCycle}</span>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Beneficios Incluidos en tu Plan:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {contractedPlan.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  {feat}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Indicator of People Attracted Through the App (Personas Atraídas) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-emerald-500/30 shadow-md bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">Personas Enviadas a tus Tiendas</span>
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-4xl font-black text-white mt-3">{trafficMetrics.totalPhysicalVisits.toLocaleString("es-CL")} clientes</h3>
              <p className="text-xs text-emerald-300 font-semibold mt-2 flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5" /> Personas que llegaron presencialmente por la app
              </p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm bg-white rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Visualizaciones de Ofertas</span>
                <Store className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 mt-2">{trafficMetrics.totalPeopleReached.toLocaleString("es-CL")} usuarios</h3>
              <p className="text-xs text-slate-500 mt-1">Personas que vieron tus cupones en el mapa</p>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 shadow-sm bg-white rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tasa de Conversión de Tráfico</span>
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-3xl font-black text-emerald-600 mt-2">{trafficMetrics.conversionRatePercent}%</h3>
              <p className="text-xs text-emerald-600 font-semibold mt-1">Porcentaje de usuarios que visitó el local</p>
            </CardContent>
          </Card>
        </div>

        {/* Section 3: Incorporated Stores and Addresses (Tiendas Incorporadas y Dirección) */}
        <Card className="border border-slate-200 shadow-sm bg-white rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4 p-6">
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Store className="w-5 h-5 text-emerald-600" /> Tiendas y Sucursales Incorporadas ({deals.length})
            </CardTitle>
            <CreateDealDialog />
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-4">
              {deals.map((deal) => {
                const address = storeAddresses[deal.companyName] || `Av. Principal ${Math.floor(Math.random() * 2000 + 500)}, Santiago, Chile`

                return (
                  <div 
                    key={deal.id} 
                    className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-emerald-300 hover:bg-white transition-all"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-lg">{deal.companyName}</span>
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {deal.tier}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{address}</span>
                      </div>

                      <p className="text-xs font-medium text-slate-600 bg-emerald-50 text-emerald-900 p-2 rounded-xl inline-block">
                        🎁 Oferta Activa: <strong>{deal.message}</strong>
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                        <span>📍 Coordenadas: Lat {deal.latitude.toFixed(4)}, Lng {deal.longitude.toFixed(4)}</span>
                        <span>🎯 Cobertura GPS: {deal.radiusMeters} metros</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right mr-2">
                        <span className="text-xs text-slate-400 block">Clientes Atraídos</span>
                        <span className="text-lg font-black text-emerald-600">482 visitas</span>
                      </div>

                      <Link href="/deals" target="_blank">
                        <Button variant="outline" size="sm" className="rounded-full border-slate-300 font-bold text-xs">
                          Ver en Mapa GPS
                        </Button>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
