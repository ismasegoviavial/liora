import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewChart } from "@/components/dashboard/OverviewChart" // Reusing bar chart temporarily or we can make a line chart

export default async function NetWorthPage() {
  const assets = 18500000
  const liabilities = 4000000
  const netWorth = assets - liabilities

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Patrimonio Neto</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Activos Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${assets.toLocaleString("es-CL")}
            </div>
            <p className="text-xs text-muted-foreground">Cuentas, inversiones, propiedades</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pasivos Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ${liabilities.toLocaleString("es-CL")}
            </div>
            <p className="text-xs text-muted-foreground">Deudas, créditos, tarjetas</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Patrimonio Neto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${netWorth.toLocaleString("es-CL")}
            </div>
            <p className="text-xs text-slate-400">Activos - Pasivos</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Patrimonio</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Reusing overview chart component as a placeholder for a line chart */}
          <OverviewChart />
        </CardContent>
      </Card>
    </div>
  )
}
