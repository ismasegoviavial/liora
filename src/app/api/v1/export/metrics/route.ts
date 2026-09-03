import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const deals = await prisma.sponsoredDeal.findMany()

    const exportData = {
      timestamp: new Date().toISOString(),
      companyName: "Mi Empresa SpA",
      corporateSavings: {
        totalSavedThisMonthCLP: 1850000,
        annualProjectedSavingsCLP: 22200000,
        timeSavedHours: 18,
      },
      activeDealsCount: deals.length,
      deals: deals.map((d) => ({
        id: d.id,
        name: d.companyName,
        message: d.message,
        category: d.category,
        radiusMeters: d.radiusMeters,
        active: d.active,
      })),
    }

    return NextResponse.json(exportData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Error al exportar datos" }, { status: 500 })
  }
}
