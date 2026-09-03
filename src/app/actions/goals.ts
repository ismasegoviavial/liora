"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createSavingsGoal(data: {
  userId: string
  name: string
  targetAmount: number
  targetDate: string
}) {
  try {
    const goal = await prisma.savingsGoal.create({
      data: {
        userId: data.userId,
        name: data.name,
        targetAmount: data.targetAmount,
        currentAmount: 0,
        startDate: new Date(),
        targetDate: new Date(data.targetDate),
        status: "in_progress"
      }
    })

    revalidatePath("/goals")
    return { success: true, goal }
  } catch (error) {
    console.error("Error creating goal:", error)
    throw new Error("No se pudo crear la meta de ahorro")
  }
}
