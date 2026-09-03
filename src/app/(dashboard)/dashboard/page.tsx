import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { OverviewChart } from "@/components/dashboard/OverviewChart"
import { CategoryChart } from "@/components/dashboard/CategoryChart"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-gradient-to-br from-white to-slate-50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-6xl">💰</span>
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Ingresos del Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-slate-800 tracking-tight">$3.800.000</div>
            <p className="text-sm font-medium text-emerald-600 mt-2 flex items-center gap-1">
              <span className="bg-emerald-100 px-1.5 py-0.5 rounded-sm">+5%</span> vs mes anterior
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm bg-gradient-to-br from-white to-slate-50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-6xl">💸</span>
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Gastos del Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-slate-800 tracking-tight">$210.000</div>
            <p className="text-sm font-medium text-emerald-600 mt-2 flex items-center gap-1">
              Dentro de presupuesto
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-white to-slate-50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-6xl">📈</span>
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Tasa de Ahorro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-slate-800 tracking-tight">94.5%</div>
            <p className="text-sm font-medium text-blue-600 mt-2 flex items-center gap-1">
              Ahorro neto: $3.59M
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <span className="text-6xl">🏦</span>
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Patrimonio Neto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold tracking-tight">$14.500.000</div>
            <p className="text-sm font-medium text-slate-300 mt-2 flex items-center gap-1">
              Actualizado hoy
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Ingresos vs Gastos (Histórico)</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <OverviewChart />
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Gastos por Categoría</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <CategoryChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
