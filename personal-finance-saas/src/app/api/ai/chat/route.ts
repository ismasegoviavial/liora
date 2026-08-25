import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { aiModel } from "@/lib/gemini"

// Declaración de las herramientas (Functions) que el Agente podrá usar
const agentTools = [{
  functionDeclarations: [
    {
      name: "addTransaction",
      description: "Agrega una nueva transacción (ingreso o gasto) a la cuenta del usuario.",
      parameters: {
        type: "OBJECT",
        properties: {
          type: { type: "STRING", description: "Debe ser 'income' (ingreso) o 'expense' (gasto)" },
          amount: { type: "NUMBER", description: "El monto en pesos chilenos (CLP)" },
          description: { type: "STRING", description: "Descripción del gasto o ingreso" },
          paymentMethod: { type: "STRING", description: "Método de pago: 'cash', 'debit_card', etc." }
        },
        required: ["type", "amount", "description"]
      }
    },
    {
      name: "getNetWorth",
      description: "Obtiene el patrimonio neto actual del usuario.",
    }
  ]
}]

export async function POST(req: Request) {
  try {
    const { message, userId = "dummy-user-123" } = await req.json()

    // 1. Contexto Financiero Inicial
    const expenses = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { userId, type: "expense" }
    })
    
    const systemPrompt = `Eres un Agente Financiero Autónomo para usuarios en Chile. 
    Además de dar consejos, tienes permisos para ejecutar acciones en la cuenta del usuario usando tus herramientas (tools).
    Si el usuario te pide registrar un gasto o ingreso, ¡hazlo usando la herramienta 'addTransaction'!
    Si te piden saber su patrimonio, usa 'getNetWorth'.
    Actúa de forma proactiva y resuelve el problema del usuario.`

    // 2. Configurar el Agente con Tools
    const chat = aiModel.startChat({
      tools: agentTools,
    })

    // Enviar instrucción del sistema (Workaround para system prompt en chat mode)
    await chat.sendMessage(systemPrompt)

    // 3. Enviar mensaje del usuario al Agente
    const result = await chat.sendMessage(message)
    const response = result.response
    const functionCalls = response.functionCalls()

    let finalResponseText = response.text()

    // 4. Si el Agente decidió ejecutar una función (Es 100% Autónomo)
    if (functionCalls && functionCalls.length > 0) {
      for (const call of functionCalls) {
        if (call.name === "addTransaction") {
          const args = call.args as any
          await prisma.transaction.create({
            data: {
              userId,
              date: new Date(),
              type: args.type,
              amount: args.amount,
              description: args.description,
              paymentMethod: args.paymentMethod || "debit_card",
              source: "ai_agent"
            }
          })
          
          // Le informamos al agente que la función se ejecutó con éxito
          const fnResponse = await chat.sendMessage([{
            functionResponse: {
              name: "addTransaction",
              response: { success: true, message: "Transacción guardada en la base de datos exitosamente." }
            }
          }])
          finalResponseText = fnResponse.response.text()
        }
        else if (call.name === "getNetWorth") {
          // Lógica ficticia para el ejemplo
          const fnResponse = await chat.sendMessage([{
            functionResponse: {
              name: "getNetWorth",
              response: { netWorth: 15000000, currency: "CLP" }
            }
          }])
          finalResponseText = fnResponse.response.text()
        }
      }
    }

    // 5. Guardar la conversación
    await prisma.chatMessage.create({ data: { userId, role: "user", content: message } })
    await prisma.chatMessage.create({ data: { userId, role: "assistant", content: finalResponseText } })

    return NextResponse.json({ reply: finalResponseText })
  } catch (error) {
    console.error("Agent Error:", error)
    return NextResponse.json({ error: "Fallo en el Agente AI" }, { status: 500 })
  }
}
