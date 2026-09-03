import crypto from "crypto"

export type PaymentPlan = "b2c_pro" | "b2b_basic" | "b2b_pro" | "b2b_enterprise"

const PLAN_PRICES: Record<PaymentPlan, number> = {
  b2c_pro: 4990,
  b2b_basic: 29900,
  b2b_pro: 69900,
  b2b_enterprise: 149900,
}

const PLAN_TITLES: Record<PaymentPlan, string> = {
  b2c_pro: "Plan Pro Personas - FinanzasPro",
  b2b_basic: "Plan Básico Empresa - FinanzasPro B2B",
  b2b_pro: "Plan Pro Empresa - FinanzasPro B2B",
  b2b_enterprise: "Plan Enterprise - FinanzasPro B2B",
}

// 1. Flow.cl Payment Order Creation (Chile)
export async function createFlowPaymentOrder({
  plan,
  email,
  returnUrl,
}: {
  plan: PaymentPlan
  email: string
  returnUrl: string
}) {
  const apiKey = process.env.FLOW_API_KEY
  const secretKey = process.env.FLOW_SECRET_KEY
  const baseUrl = process.env.FLOW_API_URL || "https://sandbox.flow.cl/api"

  const amount = PLAN_PRICES[plan]
  const subject = PLAN_TITLES[plan]
  const commerceOrder = `ORD-${plan}-${Date.now()}`

  if (!apiKey || !secretKey) {
    // Return sandbox simulation URL if keys are not configured yet
    console.log("[Payments] FLOW keys missing, returning sandbox checkout simulation")
    return {
      url: `https://sandbox.flow.cl/btn.php?token=simulated-${commerceOrder}`,
      token: `simulated-${commerceOrder}`,
      isSimulation: true,
    }
  }

  const params: Record<string, string> = {
    apiKey,
    commerceOrder,
    subject,
    currency: "CLP",
    amount: amount.toString(),
    email,
    urlConfirmation: `${process.env.NEXT_PUBLIC_APP_URL || "https://finanzaspro-chile.vercel.app"}/api/billing/webhook`,
    urlReturn: returnUrl,
  }

  // Signature generation for Flow API
  const keys = Object.keys(params).sort()
  let toSign = ""
  for (const key of keys) {
    toSign += key + params[key]
  }

  const hmac = crypto.createHmac("sha256", secretKey)
  hmac.update(toSign)
  params["s"] = hmac.digest("hex")

  const body = new URLSearchParams(params)

  const res = await fetch(`${baseUrl}/payment/create`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  })

  const data = await res.json()
  if (!res.ok || !data.url) {
    throw new Error(data.message || "Error al crear la orden de pago en Flow")
  }

  return {
    url: `${data.url}?token=${data.token}`,
    token: data.token,
    isSimulation: false,
  }
}

// 2. MercadoPago Preference Creation (LatAm)
export async function createMercadoPagoPreference({
  plan,
  email,
}: {
  plan: PaymentPlan
  email: string
}) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN

  if (!accessToken) {
    console.log("[Payments] MercadoPago ACCESS_TOKEN missing, returning fallback")
    return { url: "https://www.mercadopago.cl", isSimulation: true }
  }

  const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          title: PLAN_TITLES[plan],
          unit_price: PLAN_PRICES[plan],
          currency_id: "CLP",
          quantity: 1,
        },
      ],
      payer: { email },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL || "https://finanzaspro-chile.vercel.app"}/dashboard?payment=success`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL || "https://finanzaspro-chile.vercel.app"}/upgrade?payment=failed`,
      },
      auto_return: "approved",
    }),
  })

  const data = await res.json()
  return { url: data.init_point, isSimulation: false }
}
