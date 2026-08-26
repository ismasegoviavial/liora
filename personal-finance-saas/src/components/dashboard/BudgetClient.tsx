"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sparkles, TrendingUp, CheckCircle, RefreshCw, Plus, Edit2 } from "lucide-react"

type BudgetItem = {
  category: string
  amount: number
  spent?: number
  reasoning?: string
}

export default function BudgetClient({ initialBudgets }: { initialBudgets: BudgetItem[] }) {
  const [budgets, setBudgets] = useState<BudgetItem[]>(initialBudgets)
  const [loading, setLoading] = useState(false)
  const [generatedSavings, setGeneratedSavings] = useState<number | null>(null)
  const [isAiGenerated, setIsAiGenerated] = useState(false)

  // Manual creation state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const [newAmount, setNewAmount] = useState("")

  async function handleGenerateAiBudget() {
    setLoading(true)
    try {
      const res = await fetch("/api/budget/generate", { method: "POST" })
      if (!res.ok) throw new Error("Failed to generate")
      
      const data = await res.json()
      if (data.budgets) {
        const formatted = data.budgets.map((b: any) => ({
          ...b,
          spent: Math.round(b.amount * (0.4 + Math.random() * 0.5))
        }))
        setBudgets(formatted)
        setGeneratedSavings(data.estimatedSavings || 120000)
        setIsAiGenerated(true)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function handleAddManualBudget(e: React.FormEvent) {
    e.preventDefault()
    if (!newCategory || !newAmount) return

    const amountNum = parseFloat(newAmount)
    if (isNaN(amountNum)) return

    const existingIndex = budgets.findIndex(
      (b) => b.category.toLowerCase() === newCategory.trim().toLowerCase()
    )

    if (existingIndex >= 0) {
      const updated = [...budgets]
      updated[existingIndex] = {
        ...updated[existingIndex],
        amount: amountNum,
        reasoning: "Límite ingresado manualmente."
      }
      setBudgets(updated)
    } else {
      setBudgets([
        ...budgets,
        {
          category: newCategory.trim(),
          amount: amountNum,
          spent: 0,
          reasoning: "Categoría agregada manualmente."
        }
      ])
    }

    setNewCategory("")
    setNewAmount("")
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            Presupuesto Mensual
            {isAiGenerated && (
              <span className="text-xs bg-accent text-accent-foreground font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Optimizado con IA
              </span>
            )}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Configura tus límites manualmente o deja que la IA calcule tus márgenes ideales de ahorro.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Manual Add Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-full font-bold gap-2">
                <Plus className="w-4 h-4" /> Ingresar Manual
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Configurar Límite Manual</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddManualBudget} className="space-y-4 pt-2">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Categoría</label>
                  <Input 
                    placeholder="Ej: Supermercado, Gimnasio, Restaurant" 
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Monto Límite Mensual (CLP)</label>
                  <Input 
                    type="number"
                    placeholder="Ej: 250000" 
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full font-bold rounded-full">
                  Guardar Límite
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Button 
            onClick={handleGenerateAiBudget} 
            disabled={loading}
            className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_0_15px_rgba(0,229,255,0.3)] font-bold rounded-full gap-2 shrink-0"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {loading ? "Analizando Gastos..." : "Auto-Generar con IA"}
          </Button>
        </div>
      </div>

      {/* Ai Savings Banner Alert */}
      {isAiGenerated && generatedSavings && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl p-4 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm">¡Potencial de Ahorro Detectado!</p>
              <p className="text-xs text-emerald-700">
                Siguiendo este presupuesto optimizado, lograrás ahorrar aproximadamente <strong>${generatedSavings.toLocaleString("es-CL")} adicionales al mes</strong>.
              </p>
            </div>
          </div>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full gap-1 shrink-0">
            <CheckCircle className="w-4 h-4" /> Guardar Presupuesto
          </Button>
        </div>
      )}

      {/* Budget Cards List */}
      <div className="grid gap-4">
        {budgets.map((item) => {
          const spent = item.spent || 0
          const percentage = Math.min((spent / item.amount) * 100, 100)
          const isOverBudget = spent > item.amount

          return (
            <Card key={item.category} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                  <div>
                    <div className="font-bold text-lg text-foreground">{item.category}</div>
                    {item.reasoning && (
                      <p className="text-xs text-muted-foreground mt-0.5">{item.reasoning}</p>
                    )}
                  </div>
                  <div className="text-left md:text-right">
                    <span className={`font-bold text-lg ${isOverBudget ? "text-red-500" : "text-foreground"}`}>
                      ${spent.toLocaleString("es-CL")}
                    </span>
                    <span className="text-muted-foreground text-sm ml-1">
                      / ${item.amount.toLocaleString("es-CL")}
                    </span>
                  </div>
                </div>

                <Progress 
                  value={percentage} 
                  className={`h-2.5 ${isOverBudget ? "bg-red-100" : "bg-slate-100"}`}
                />

                <div className="mt-3 text-xs text-muted-foreground flex justify-between items-center">
                  <span className="font-medium">{percentage.toFixed(0)}% utilizado</span>
                  {isOverBudget ? (
                    <span className="text-red-500 font-bold">¡Excedido por ${(spent - item.amount).toLocaleString("es-CL")}!</span>
                  ) : (
                    <span className="text-emerald-600 font-semibold">${(item.amount - spent).toLocaleString("es-CL")} disponibles</span>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
