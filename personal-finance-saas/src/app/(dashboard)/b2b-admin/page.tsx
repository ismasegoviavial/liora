import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Eye, MapPin, Plus, TrendingUp, Zap, FileText, DollarSign, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react"

export default async function B2bAdminPage() {
  const deals = await prisma.sponsoredDeal.findMany({
    orderBy: { createdAt: "desc" }
  })

  const invoices = [
    { id: "F-1024", type: "Venta", client: "Haka Honu Chile", amount: 1450000, date: "2026-08-20", status: "Pagada" },
    { id: "F-1025", type: "Venta", client: "Café Rendibu", amount: 280000, date: "2026-08-22", status: "Pendiente" },
    { id: "F-892", type: "Compra", client: "Proveedor Insumos SpA", amount: 520000, date: "2026-08-18", status: "Pagada" },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Finanzas & Marketing B2B
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Panel Corporativo PyME</h1>
          <p className="text-muted-foreground mt-1">Monitorea tus ventas, facturas (SII), ahorro empresarial y campañas de proximidad.</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="rounded-full font-bold gap-2">
            <FileText className="w-4 h-4" /> Emitir Factura
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold gap-2 shadow-lg shadow-emerald-200">
            <Plus className="w-4 h-4" /> Nueva Campaña GPS
          </Button>
        </div>
      </div>

      {/* Corporate Financial Summary */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border border-border shadow-sm">
          <CardContent className="p-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Caja & Bancos Empresa</p>
            <h3 className="text-2xl font-extrabold text-foreground mt-2">$8.450.000</h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12% este mes
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardContent className="p-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ahorro Operativo Generado</p>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-2">$1.240.000</h3>
            <p className="text-xs text-muted-foreground mt-1">Optimización de insumos e impuestos</p>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardContent className="p-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Facturación por Cobrar</p>
            <h3 className="text-2xl font-extrabold text-amber-600 mt-2">$280.000</h3>
            <p className="text-xs text-muted-foreground mt-1">1 factura pendiente</p>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardContent className="p-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Impresiones GPS (Mapa)</p>
            <h3 className="text-2xl font-extrabold text-foreground mt-2">12.450</h3>
            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> 1.840 visitas físicas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Facturas e Integración SII */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" /> Monitoreo de Facturas Electrónicas (SII)
          </CardTitle>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Sincronizado con SII
          </span>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv.id} className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${inv.type === 'Venta' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                    {inv.type === 'Venta' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{inv.client} ({inv.id})</div>
                    <div className="text-xs text-muted-foreground">Fecha: {inv.date} • Tipo: Factura de {inv.type}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-extrabold text-foreground">${inv.amount.toLocaleString("es-CL")} CLP</div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${inv.status === 'Pagada' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Campaigns Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" /> Campañas Publicitarias en el Mapa
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
                    <span>📍 Coordenadas activas</span>
                    <span>🎯 Radio: {deal.radiusMeters}m</span>
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
