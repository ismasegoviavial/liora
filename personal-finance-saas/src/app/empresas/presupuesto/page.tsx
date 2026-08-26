import { B2bSidebar } from "@/components/b2b/B2bSidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus, PiggyBank, Sparkles, TrendingUp } from "lucide-react"

export const dynamic = "force-dynamic"

export default function B2bBudgetPage() {
  const companyBudgets = [
    { category: "Sueldos & Honorarios", amount: 4500000, spent: 4500000, reasoning: "Gasto fijo mensual de planilla." },
    { category: "Arriendos & Gastos Comunes", amount: 1800000, spent: 1800000, reasoning: "Arriendo de oficina y sucursal." },
    { category: "Marketing & Publicidad GPS", amount: 1200000, spent: 850000, reasoning: "Inversión en atracción de clientes." },
    { category: "Insumos & Inventario", amount: 3500000, spent: 2900000, reasoning: "Compras a proveedores del mes." },
    { category: "Licencias & Software (SaaS)", amount: 850000, spent: 620000, reasoning: "AWS, Google Workspace, Zoom, ERP." },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50">
      <B2bSidebar />

      <main className="flex-1 p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Presupuesto Empresarial por Departamentos</h1>
            <p className="text-slate-500 text-sm mt-1">Configura límites de gasto mensuales para cada área de tu empresa y controla desvíos.</p>
          </div>

          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full gap-2 text-xs">
            <Plus className="w-4 h-4" /> Agregar Límite Empresarial
          </Button>
        </div>

        <div className="grid gap-4">
          {companyBudgets.map((item) => {
            const percentage = Math.min((item.spent / item.amount) * 100, 100)
            const isOver = item.spent > item.amount

            return (
              <Card key={item.category} className="overflow-hidden bg-white border border-slate-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg">{item.category}</h3>
                      <p className="text-xs text-slate-500">{item.reasoning}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-slate-900 text-lg">${item.spent.toLocaleString("es-CL")}</span>
                      <span className="text-slate-400 text-sm ml-1">/ ${item.amount.toLocaleString("es-CL")} CLP</span>
                    </div>
                  </div>

                  <Progress value={percentage} className="h-2.5 bg-slate-100" />

                  <div className="flex justify-between items-center text-xs text-slate-500 mt-2">
                    <span>{percentage.toFixed(0)}% ejecutado</span>
                    <span className="text-emerald-600 font-bold">${(item.amount - item.spent).toLocaleString("es-CL")} disponibles</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
