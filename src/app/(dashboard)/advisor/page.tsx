"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User } from "lucide-react"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "¡Hola! Soy tu Asesor Financiero impulsado por IA. Tengo acceso a tu presupuesto y transacciones. ¿En qué te puedo ayudar hoy?"
    }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content })
      })

      const data = await res.json()
      
      if (data.reply) {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.reply
        }])
      }
    } catch (error) {
      console.error(error)
      alert("Error de conexión con el asesor.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Asesor Financiero IA</h1>
        <p className="text-muted-foreground">Tu copiloto financiero personalizado con Gemini</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardContent className="flex-1 p-6 overflow-y-auto" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === "user" ? "bg-slate-800 text-white" : "bg-accent text-accent-foreground shadow-[0_0_10px_rgba(0,229,255,0.5)]"}`}>
                  {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-3 rounded-lg ${msg.role === "user" ? "bg-slate-800 text-white" : "bg-accent/10 border border-accent/30 text-foreground"}`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 max-w-[80%]">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-[0_0_10px_rgba(0,229,255,0.5)]">
                  <Bot size={16} />
                </div>
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                  <div className="flex gap-1 items-center h-5">
                    <span className="w-2 h-2 rounded-full bg-accent animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-accent animate-bounce delay-75"></span>
                    <span className="w-2 h-2 rounded-full bg-accent animate-bounce delay-150"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <div className="p-4 border-t bg-white">
          <form onSubmit={sendMessage} className="flex gap-2">
            <Input 
              placeholder="Escribe tu consulta financiera (ej. ¿Me alcanza para salir a comer?)" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1"
            />
            <Button type="submit" disabled={loading || !input.trim()}>
              <Send size={18} className={input.trim() && !loading ? "text-white" : ""} />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
