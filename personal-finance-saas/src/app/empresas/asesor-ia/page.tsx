"use client"

import { useState } from "react"
import { B2bSidebar } from "@/components/b2b/B2bSidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send, Sparkles, Building2, User } from "lucide-react"

export default function B2bAiAdvisorPage() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "¡Hola! Soy tu Asesor Financiero IA para Empresas (Gemini 2.0). Analicé tus facturas del SII y tus movimientos bancarios. ¿En qué puedo ayudarte a optimizar la caja o reducir costos hoy?" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg = input
    setInput("")
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }])
    setLoading(true)

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, mode: "corporate" }),
      })

      const data = await res.json()
      setMessages((prev) => [...prev, { sender: "ai", text: data.reply || "Analizando el flujo de caja corporativo..." }])
    } catch {
      setMessages((prev) => [...prev, { sender: "ai", text: "Hubo un error al conectar con Gemini IA." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <B2bSidebar />

      <main className="flex-1 p-8 space-y-6 flex flex-col h-screen">
        <div className="border-b border-slate-200 pb-4 shrink-0">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Bot className="w-8 h-8 text-emerald-600" /> Asesor Financiero IA Corporativo
          </h1>
          <p className="text-slate-500 text-sm mt-1">Consulta en lenguaje natural sobre la salud financiera, margen de utilidad y recortes de tu empresa.</p>
        </div>

        {/* Chat Messages Container */}
        <Card className="flex-1 border border-slate-200 shadow-sm bg-white rounded-2xl flex flex-col overflow-hidden">
          <CardContent className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                    🤖
                  </div>
                )}
                <div 
                  className={`max-w-xl p-4 rounded-2xl text-sm leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-slate-900 text-white rounded-tr-none font-medium' 
                      : 'bg-slate-100 text-slate-900 rounded-tl-none border border-slate-200'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Sparkles className="w-4 h-4 animate-spin text-emerald-600" /> Asesor Gemini analizando datos de empresa...
              </div>
            )}
          </CardContent>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-slate-100 flex gap-2 bg-slate-50 shrink-0">
            <Input 
              placeholder="Ej: ¿Cuál es mi proyección de pago de IVA F29 para este mes?" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-white"
            />
            <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold px-6">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </Card>
      </main>
    </div>
  )
}
