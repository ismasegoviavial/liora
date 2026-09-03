import BudgetClient from "@/components/dashboard/BudgetClient"

export default function BudgetPage() {
  const initialBudgets = [
    { category: "Supermercado", amount: 300000, spent: 250000, reasoning: "Presupuesto base estimado." },
    { category: "Vivienda y Servicios", amount: 800000, spent: 800000, reasoning: "Gasto fijo mensual." },
    { category: "Transporte", amount: 150000, spent: 170000, reasoning: "Combustible y movilización." },
    { category: "Salud y Farmacia", amount: 100000, spent: 40000, reasoning: "Fondo de emergencia médica." },
    { category: "Entretenimiento", amount: 150000, spent: 120000, reasoning: "Gastos discrecionales." },
  ]

  return <BudgetClient initialBudgets={initialBudgets} />
}
