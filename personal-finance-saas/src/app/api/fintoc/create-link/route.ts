import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    // In a real app, you get this from Better Auth session
    const userId = "dummy-user-123"

    const response = await fetch("https://api.fintoc.com/v1/link_intents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": process.env.FINTOC_API_KEY || "sk_test_12345"
      },
      body: JSON.stringify({
        product: "movements",
        country: "cl",
        // Aquí le decimos a Fintoc que guarde un identificador de nuestro usuario 
        // para cuando retorne el webhook
        metadata: {
          userId: userId
        }
      })
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating Fintoc Link Intent", error)
    return NextResponse.json({ error: "Failed to create Link Intent" }, { status: 500 })
  }
}
