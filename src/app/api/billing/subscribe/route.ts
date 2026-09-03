import { NextResponse } from "next/server"
import { createFlowPaymentOrder, PaymentPlan } from "@/lib/payments"

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const plan: PaymentPlan = body.plan || "b2c_pro"
    const email = body.email || "usuario@finanzaspro.cl"
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://finanzaspro-chile.vercel.app"

    const returnUrl = `${appUrl}/dashboard?upgrade=success`

    const checkout = await createFlowPaymentOrder({ plan, email, returnUrl })

    return NextResponse.json(checkout)
  } catch (error: any) {
    console.error("Billing error:", error)
    return NextResponse.json(
      { error: error.message || "No se pudo procesar la suscripción" },
      { status: 500 }
    )
  }
}
