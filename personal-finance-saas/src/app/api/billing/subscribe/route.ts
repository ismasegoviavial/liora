import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    // 1. Validar el usuario de la sesión actual
    const userId = "dummy-user-123" 
    const email = "usuario@correo.cl"

    // 2. Preparar los datos para Flow.cl
    const params = new URLSearchParams()
    params.append("apiKey", process.env.FLOW_API_KEY || "")
    params.append("commerceOrder", `SUB-${Date.now()}`)
    params.append("subject", "Suscripción Premium Mensual")
    params.append("currency", "CLP")
    params.append("amount", "4990")
    params.append("email", email)
    params.append("urlConfirmation", `${process.env.NEXT_PUBLIC_APP_URL}/api/billing/webhook`)
    params.append("urlReturn", `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgrade=success`)
    // IMPORTANTE: En producción usar Flow SDK y encriptar los parámetros con el Secret Key

    // 3. Crear la orden de pago (simulado aquí para el MVP, en prod llamar a api.flow.cl/api/payment/create)
    // const flowUrl = ...
    
    // 4. Redirigir al usuario al portal de Flow
    return NextResponse.json({ url: "https://sandbox.flow.cl/btn.php?token=dummy-token" })

  } catch (error) {
    console.error("Billing error:", error)
    return NextResponse.json({ error: "No se pudo procesar la suscripción" }, { status: 500 })
  }
}
