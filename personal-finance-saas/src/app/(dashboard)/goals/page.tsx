import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import prisma from "@/lib/prisma"
import { NewGoalDialog } from "@/components/goals/NewGoalDialog"

export default async function GoalsPage() {
  const goals = await prisma.savingsGoal.findMany({
    where: { userId: "dummy-user-123" },
    orderBy: { targetDate: "asc" }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Metas de Ahorro</h1>
        <NewGoalDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {goals.length === 0 ? (
          <div className="col-span-2 text-center p-8 text-slate-500">
            No tienes metas de ahorro configuradas. ¡Crea una nueva!
          </div>
        ) : goals.map((goal) => {
          const percentage = (goal.currentAmount / goal.targetAmount) * 100

          return (
            <Card key={goal.id}>
              <CardHeader>
                <CardTitle className="text-lg">{goal.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">${goal.currentAmount.toLocaleString("es-CL")}</span>
                    <span className="text-muted-foreground">de ${goal.targetAmount.toLocaleString("es-CL")}</span>
                  </div>
                  <Progress value={percentage} className="h-3 bg-blue-100" />
                </div>
                
                <div className="text-sm text-muted-foreground flex justify-between items-center">
                  <span>Meta para: {new Date(goal.targetDate).toLocaleDateString("es-CL", { month: 'short', year: 'numeric' })}</span>
                  <span className="font-semibold text-blue-600">{percentage.toFixed(1)}%</span>
                </div>
                
                <div className="mt-4 pt-4 border-t flex justify-end">
                  <Button variant="outline" size="sm">Abonar</Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
