import prisma from "./prisma"

export async function ensureInitialSeed() {
  try {
    const dealsCount = await prisma.sponsoredDeal.count()
    if (dealsCount === 0) {
      await prisma.sponsoredDeal.createMany({
        data: [
          {
            companyName: "Café Rendibu (Providencia)",
            message: "2x1 en Cappuccino presentando FinanzasPro",
            latitude: -33.4250,
            longitude: -70.6120,
            radiusMeters: 800,
            category: "Comida",
            tier: "premium",
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            active: true
          },
          {
            companyName: "Haka Honu (Costanera Center)",
            message: "20% desc en vestuario outdoor para usuarios Pro",
            latitude: -33.4170,
            longitude: -70.6060,
            radiusMeters: 1200,
            category: "Ropa",
            tier: "enterprise",
            expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            active: true
          }
        ]
      })
    }

    const goalsCount = await prisma.savingsGoal.count()
    if (goalsCount === 0) {
      await prisma.savingsGoal.createMany({
        data: [
          {
            userId: "dummy-user-123",
            name: "Fondo de Emergencia",
            targetAmount: 2000000,
            currentAmount: 1200000,
            startDate: new Date("2026-01-01"),
            targetDate: new Date("2026-12-31"),
            status: "in_progress"
          },
          {
            userId: "dummy-user-123",
            name: "Vacaciones Verano 2027",
            targetAmount: 800000,
            currentAmount: 350000,
            startDate: new Date("2026-03-01"),
            targetDate: new Date("2026-11-30"),
            status: "in_progress"
          }
        ]
      })
    }

    const debtsCount = await prisma.debt.count()
    if (debtsCount === 0) {
      await prisma.debt.createMany({
        data: [
          {
            userId: "dummy-user-123",
            name: "Crédito de Consumo Santander",
            currentBalance: 3200000,
            annualRate: 14.5,
            monthlyPayment: 145000,
            priority: "high"
          },
          {
            userId: "dummy-user-123",
            name: "Tarjeta CMR Falabella",
            currentBalance: 850000,
            annualRate: 22.0,
            monthlyPayment: 85000,
            priority: "high"
          }
        ]
      })
    }
  } catch (err) {
    console.error("Seed check failed:", err)
  }
}
