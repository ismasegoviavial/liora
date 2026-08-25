import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building2, Eye, MapPin, Plus, TrendingUp, Zap } from "lucide-react"

export default async function B2bAdminPage() {
  const deals = await prisma.sponsoredDeal.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Panel Anunciantes B2B
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Gestión de Campañas Publicitarias</h1>
          <p className="text-muted-foreground mt-1">Crea y administra promociones geolocalizadas para tus sucursales.</p>
        </div>

        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold gap-2 shadow-lg shadow-emerald-200">
          <Plus className="w-4 h-4" /> Nueva Campaña
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border border-border shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Impresiones GPS (Este Mes)</p>
              <h3 className="text-3xl font-extrabold text-foreground mt-2">12.450</h3>
              <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +18.4% vs mes anterior
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Visitas Físicas en Tienda</p>
              <h3 className="text-3xl font-extrabold text-foreground mt-2">1.840</h3>
              <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> 14.7% conversión GPS
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">ROI Publicitario Estimado</p>
              <h3 className="text-3xl font-extrabold text-foreground mt-2">4.8x</h3>
              <p className="text-xs text-muted-foreground mt-1">Por cada $1 invertido</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" /> Campañas Activas en el Mapa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deals.map((deal) => (
              <div 
                key={deal.id} 
                className="p-4 rounded-xl border border-border bg-card flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-emerald-200 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">{deal.companyName}</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      {deal.tier}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{deal.message}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                    <span>📍 Lat: {deal.latitude.toFixed(4)}, Lng: {deal.longitude.toFixed(4)}</span>
                    <span>🎯 Cobertura: {deal.radiusMeters}m</span>
                    <span>⏳ Expira: {new Date(deal.expiresAt).toLocaleDateString("es-CL")}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`w-2.5 h-2.5 rounded-full ${deal.active ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                  <span className="text-xs font-semibold text-muted-foreground mr-2">
                    {deal.active ? 'Activa' : 'Pausada'}
                  </span>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Editar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
