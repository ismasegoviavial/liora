import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// Endpoint para ser llamado por Google Cloud Scheduler
export async function GET(req: Request) {
  // Verificar header de seguridad si viene de Cloud Scheduler
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const bankAccounts = await prisma.bankAccount.findMany({
      where: { fintocLinkId: { not: null } }
    })

    const results = []
    
    // Lo ideal en producción es usar una queue (Cloud Tasks) 
    // pero para MVP hacemos el fetch directo.
    for (const account of bankAccounts) {
      if (!account.fintocLinkId) continue
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/fintoc/sync`, {
        method: "POST",
        body: JSON.stringify({ linkId: account.fintocLinkId }),
        headers: { "Content-Type": "application/json" }
      })
      
      const data = await res.json()
      results.push({ link: account.fintocLinkId, status: res.status, data })
    }

    return NextResponse.json({ success: true, processed: results.length, results })
  } catch (error) {
    console.error("Cron error:", error)
    return NextResponse.json({ error: "Cron failed" }, { status: 500 })
  }
}
