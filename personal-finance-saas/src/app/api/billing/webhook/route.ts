import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const token = formData.get("token")

    if (!token) {
      return NextResponse.json({ error: "Token no proporcionado" }, { status: 400 })
    }

    // 1. En producción: consultar a Flow.cl el estado del token
    // const status = await fetch(`https://api.flow.cl/api/payment/getStatus?apiKey=...&token=${token}&s=...`)
    
    // Asumimos que el pago fue exitoso para el MVP
    const isPaid = true
    
    // Obtenemos el mail o ID del cliente que mandó Flow (normalmente viene en la respuesta del getStatus)
    const mockEmailFromFlow = "usuario@correo.cl"

    if (isPaid) {
      // 2. Marcar al usuario como Premium en la base de datos
      await prisma.user.update({
        where: { email: mockEmailFromFlow },
        data: { isPremium: true }
      })
      
      console.log(`Usuario ${mockEmailFromFlow} actualizado a Premium`)
    }

    return NextResponse.json({ status: "OK" })
  } catch (error) {
    console.error("Flow Webhook Error:", error)
    return NextResponse.json({ error: "Fallo procesando el webhook" }, { status: 500 })
  }
}
