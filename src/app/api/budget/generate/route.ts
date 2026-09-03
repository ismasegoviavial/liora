import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { aiModel } from "@/lib/gemini"

export async function POST(req: Request) {
  try {
    const userId = "dummy-user-123"

    // 1. Fetch user's transaction history to analyze spending habits
    const transactions = await prisma.transaction.findMany({
      where: { userId, type: "expense" },
      include: { category: true }
    })

    if (transactions.length === 0) {
      // Return a default baseline budget if no transactions exist yet
      const defaultBudgets = [
        { category: "Supermercado", amount: 250000, reasoning: "Estimación estándar para alimentos y hogar." },
        { category: "Vivienda / Cuentas", amount: 450000, reasoning: "Estimación base de arriendo y servicios básicos." },
        { category: "Transporte", amount: 80000, reasoning: "Transporte público o combustible mensual." },
        { category: "Salud y Bienestar", amount: 50000, reasoning: "Fondo mensual para imprevistos médicos." },
        { category: "Entretenimiento y Ocio", amount: 70000, reasoning: "Presupuesto controlado de recreación." }
      ]
      return NextResponse.json({ budgets: defaultBudgets, estimatedSavings: 150000 })
    }

    // Group transactions by category
    const categoryTotals: Record<string, number> = {}
    transactions.forEach(t => {
      const catName = t.category?.name || "Otros"
      categoryTotals[catName] = (categoryTotals[catName] || 0) + Math.abs(t.amount)
    })

    // 2. Prepare prompt for Gemini to optimize expenses and generate a healthy budget
    const prompt = `
Eres un asesor financiero experto. Analiza los siguientes gastos mensuales acumulados de un usuario y genera un presupuesto optimizado y saludable. 
Tu objetivo es reducir los gastos no esenciales en un 15-25% para aumentar su capacidad de ahorro mensual.

Gastos actuales por categoría (CLP):
${JSON.stringify(categoryTotals, null, 2)}

Responde estrictamente en formato JSON válido con la siguiente estructura (sin markdown adicional, sin bloques de código \`\`\`json):
{
  "estimatedSavings": 120000,
  "budgets": [
    { "category": "Nombre Categoría", "amount": 200000, "reasoning": "Breve explicación de la reducción o meta" }
  ]
}
`

    const response = await aiModel.generateContent(prompt)
    const rawText = response.response.text().trim().replace(/^```json\s*/, '').replace(/\s*```$/, '')
    const parsed = JSON.parse(rawText)

    return NextResponse.json(parsed)
  } catch (error) {
    console.error("Error generating budget with AI:", error)
    
    // Fallback if AI call fails or response isn't formatted properly
    const fallbackBudgets = [
      { category: "Supermercado", amount: 250000, reasoning: "Optimizado para compras eficientes." },
      { category: "Vivienda", amount: 500000, reasoning: "Costo fijo esencial." },
      { category: "Transporte", amount: 70000, reasoning: "Reducción del 10% en viajes." },
      { category: "Ocio / Salidas", amount: 50000, reasoning: "Tope máximo recomendado para ahorro." }
    ]
    return NextResponse.json({ budgets: fallbackBudgets, estimatedSavings: 100000 })
  }
}
