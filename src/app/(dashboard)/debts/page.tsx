import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { NewDebtDialog } from "@/components/debts/NewDebtDialog"
import { Button } from "@/components/ui/button"
import { ensureInitialSeed } from "@/lib/seed"

export const dynamic = "force-dynamic"

export default async function DebtsPage() {
  await ensureInitialSeed()
  const debts = await prisma.debt.findMany({
    where: { userId: "dummy-user-123" },
    orderBy: { currentBalance: "desc" }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Mis Deudas</h1>
        <NewDebtDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {debts.length === 0 ? (
          <div className="col-span-full text-center p-8 text-slate-500">
            No tienes deudas registradas. ¡Estás al día!
          </div>
        ) : debts.map((debt) => (
          <Card key={debt.id} className="border-red-100">
            <CardHeader className="bg-red-50/50 border-b border-red-100 pb-4">
              <CardTitle className="text-lg text-slate-800">{debt.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Saldo Pendiente</p>
                  <p className="text-2xl font-bold text-red-600">${debt.currentBalance.toLocaleString("es-CL")}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Tasa de Interés</p>
                    <p className="font-semibold text-slate-700">{debt.annualRate}% anual</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Pago Mensual</p>
                    <p className="font-semibold text-slate-700">${debt.monthlyPayment.toLocaleString("es-CL")}</p>
                  </div>
                </div>

                <Button className="w-full mt-4" variant="secondary">
                  Simular Amortización
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
