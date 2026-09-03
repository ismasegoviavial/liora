import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (body.type === "link.created") {
      const linkToken = body.data.link_token
      const linkId = body.data.id
      const institutionName = body.data.institution.name
      const userId = body.data.metadata?.userId || "dummy-user-123" // from Link Intent

      // Save the link in BankAccount temporarily (a user can have multiple accounts under a link, 
      // but we simplify by associating the link ID)
      await prisma.bankAccount.create({
        data: {
          userId,
          fintocLinkId: linkId,
          institutionName,
          accountName: `Cuenta ${institutionName}`,
        }
      })
      
      // Trigger an initial sync here or let a background job do it
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 })
  }
}
