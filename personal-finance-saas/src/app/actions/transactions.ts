"use server"

import { revalidatePath } from "next/cache"
// Using a mock Prisma client here if we don't have a real one set up yet,
// but let's assume we have lib/prisma.ts
import prisma from "@/lib/prisma"

// mindicador.cl API types
type MindicadorResponse = {
  version: string
  autor: string
  codigo: string
  nombre: string
  unidad_medida: string
  serie: Array<{ fecha: string; valor: number }>
}

export async function createTransaction(data: {
  userId: string
  date: string
  type: string
  categoryId?: string
  description: string
  amount: number
  originalCurrency: string
  paymentMethod: string
  latitude?: number
  longitude?: number
}) {
  let finalAmountCLP = data.amount
  let exchangeRate: number | null = null
  let originalAmount: number | null = null

  // Si la moneda no es CLP, consultamos mindicador.cl
  if (data.originalCurrency !== "CLP" && data.originalCurrency) {
    originalAmount = data.amount
    try {
      // mindicador soporta 'dolar', 'euro'.
      const indicator = data.originalCurrency === "USD" ? "dolar" : "euro"
      
      // Consultamos el valor actual
      const response = await fetch(`https://mindicador.cl/api/${indicator}`, {
        next: { revalidate: 3600 } // Cache por 1 hora
      })
      
      if (response.ok) {
        const result = (await response.json()) as MindicadorResponse
        if (result.serie && result.serie.length > 0) {
          exchangeRate = result.serie[0].valor
          finalAmountCLP = originalAmount * exchangeRate
        }
      } else {
        console.warn("No se pudo obtener el tipo de cambio de mindicador.cl")
        // Aquí podríamos lanzar un error o usar un tipo de cambio de fallback
      }
    } catch (error) {
      console.error("Error al consultar mindicador:", error)
    }
  }

  // Guardar en la base de datos
  const transaction = await prisma.transaction.create({
    data: {
      userId: data.userId, // Idealmente viene de la sesión autenticada
      date: new Date(data.date),
      type: data.type,
      categoryId: data.categoryId,
      description: data.description,
      amount: finalAmountCLP,
      originalAmount: originalAmount,
      originalCurrency: data.originalCurrency !== "CLP" ? data.originalCurrency : null,
      exchangeRate: exchangeRate,
      paymentMethod: data.paymentMethod,
      source: "manual",
      latitude: data.latitude,
      longitude: data.longitude,
    },
  })

  revalidatePath("/transactions")
  revalidatePath("/dashboard")
  
  return transaction
}
