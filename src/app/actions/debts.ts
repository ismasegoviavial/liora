"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createDebt(data: {
  userId: string
  name: string
  currentBalance: number
  annualRate: number
  monthlyPayment: number
}) {
  try {
    const debt = await prisma.debt.create({
      data: {
        userId: data.userId,
        name: data.name,
        currentBalance: data.currentBalance,
        annualRate: data.annualRate,
        monthlyPayment: data.monthlyPayment,
        priority: "medium"
      }
    })

    revalidatePath("/debts")
    return { success: true, debt }
  } catch (error) {
    console.error("Error creating debt:", error)
    throw new Error("No se pudo registrar la deuda")
  }
}
