"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function UpgradePage() {
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/billing/subscribe", { method: "POST" })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Error al procesar el pago")
      }
    } catch (e) {
      alert("Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-120px)]">
      <Card className="w-full max-w-md border-blue-200 shadow-lg shadow-blue-50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-slate-800">Premium</CardTitle>
          <CardDescription>Potencia tus finanzas con IA</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <span className="text-5xl font-extrabold">$4.990</span>
            <span className="text-muted-foreground font-medium">/ mes</span>
          </div>
          
          <div className="space-y-3">
            {[
              "Conexión automática a bancos (Fintoc)",
              "Asesor IA personalizado",
              "Auto-categorización inteligente",
              "Metas de ahorro ilimitadas",
              "Control de deudas ilimitado"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="bg-blue-100 p-1 rounded-full text-blue-600">
                  <Check size={16} />
                </div>
                <span className="text-slate-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full text-lg h-12 bg-blue-600 hover:bg-blue-700" 
            onClick={handleSubscribe}
            disabled={loading}
          >
            {loading ? "Redirigiendo a Flow.cl..." : "Pasarme a Premium"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
