import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import fintocClient from "@/lib/fintoc"

export async function POST(req: Request) {
  try {
    const { linkId } = await req.json()

    // 1. Get Link from DB
    const bankAccount = await prisma.bankAccount.findUnique({
      where: { fintocLinkId: linkId },
    })

    if (!bankAccount) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 })
    }

    // 2. Call Fintoc SDK to get accounts under this link
    const link = await fintocClient.getLink(linkId)
    const accounts = await link.findAll({ type: "checking_account" }) // fetch checking for MVP
    
    if (accounts.length === 0) {
      return NextResponse.json({ message: "No checking accounts found" })
    }

    const account = accounts[0] // take the first one for simplicity
    
    // Update DB with the specific account ID from Fintoc
    await prisma.bankAccount.update({
      where: { id: bankAccount.id },
      data: { fintocAccountId: account.id, accountType: account.type }
    })

    // 3. Pull movements
    // fetch movements from yesterday to today, or all since lastSync
    const movements = await account.getMovements({ since: "2026-08-01" }) 

    // 4. Save to DB handling duplicates
    for (const mov of movements) {
      // Determine if it's income or expense based on amount
      const isIncome = mov.amount > 0
      const amountValue = Math.abs(mov.amount)

      // Simple auto-categorization based on description
      const descLower = mov.description.toLowerCase()
      let categoryType = isIncome ? "income" : "expense"
      let categoryName = isIncome ? "Otros Ingresos" : "Otros Gastos"

      if (!isIncome) {
        if (descLower.includes("uber") || descLower.includes("bip") || descLower.includes("copec")) {
          categoryName = "Transporte (Bencina/Bip)"
        } else if (descLower.includes("jumbo") || descLower.includes("lider") || descLower.includes("unimarc")) {
          categoryName = "Supermercado"
        } else if (descLower.includes("farmacia") || descLower.includes("cruz verde")) {
          categoryName = "Salud y Farmacia"
        } else if (descLower.includes("netflix") || descLower.includes("spotify") || descLower.includes("cine")) {
          categoryName = "Entretenimiento y Restaurantes"
        }
      }

      // Find category ID
      let categoryId = null
      const cat = await prisma.category.findFirst({
        where: { name: categoryName }
      })
      if (cat) categoryId = cat.id

      // Upsert transaction to avoid duplicates
      await prisma.transaction.upsert({
        where: { fintocMovementId: mov.id },
        update: {}, // if exists, don't update anything
        create: {
          userId: bankAccount.userId,
          accountId: bankAccount.id,
          date: new Date(mov.post_date),
          type: isIncome ? "income" : "expense",
          description: mov.description,
          amount: amountValue,
          originalCurrency: mov.currency, // e.g. "CLP", usually already converted by bank
          paymentMethod: "transfer", // default for bank movements
          fintocMovementId: mov.id,
          source: "fintoc",
          categoryId,
        }
      })
    }

    // Update last sync time
    await prisma.bankAccount.update({
      where: { id: bankAccount.id },
      data: { lastSync: new Date() }
    })

    return NextResponse.json({ message: "Sync successful", count: movements.length })
  } catch (error) {
    console.error("Fintoc sync error:", error)
    return NextResponse.json({ error: "Sync failed" }, { status: 500 })
  }
}
