import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.formData().catch(() => null)
    
    if (body) {
      const token = body.get("token")
      console.log("[Flow Webhook Received] Payment Token:", token)

      // When Flow confirms payment in production, update user plan in DB:
      // await prisma.user.update({
      //   where: { id: "dummy-user-123" },
      //   data: { plan: "pro" }
      // })
    }

    return NextResponse.json({ status: "OK" })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json({ error: "Webhook failed" }, { status: 400 })
  }
}
