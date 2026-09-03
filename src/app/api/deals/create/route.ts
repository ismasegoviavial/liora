import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { companyName, message, category, radiusMeters, tier, latitude, longitude, durationDays } = body

    if (!companyName || !message || !latitude || !longitude) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
    }

    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + (durationDays || 30))

    const newDeal = await prisma.sponsoredDeal.create({
      data: {
        companyName,
        message,
        category: category || "Comida & Cafés",
        radiusMeters: radiusMeters || 1000,
        tier: tier || "pro",
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        expiresAt,
        active: true,
      },
    })

    return NextResponse.json({ success: true, deal: newDeal })
  } catch (error: any) {
    console.error("[Create Deal Error]:", error)
    return NextResponse.json({ error: "Error al crear la campaña" }, { status: 500 })
  }
}
