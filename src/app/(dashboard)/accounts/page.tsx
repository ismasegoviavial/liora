"use client"

import { useState } from "react"
import Script from "next/script"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AccountsPage() {
  const [loading, setLoading] = useState(false)
  const [fintocWidget, setFintocWidget] = useState<any>(null)

  const initFintoc = () => {
    // @ts-ignore
    if (window.Fintoc && !fintocWidget) {
      // @ts-ignore
      const widget = Fintoc.create({
        publicKey: process.env.NEXT_PUBLIC_FINTOC_PUBLIC_KEY || "pk_test_12345",
        holderType: "individual",
        product: "movements",
        webhookUrl: "https://tudominio.com/api/fintoc/webhook", 
        onSuccess: (link: any) => {
          console.log("Link creado!", link)
          fetch("/api/fintoc/sync", {
            method: "POST",
            body: JSON.stringify({ linkId: link.id }),
            headers: { "Content-Type": "application/json" }
          }).then(() => alert("Sincronización inicial completada"))
        },
        onExit: () => {
          console.log("Widget cerrado")
          setLoading(false)
        }
      })
      setFintocWidget(widget)
    }
  }

  const openFintoc = () => {
    setLoading(true)
    if (fintocWidget) {
      fintocWidget.open()
    } else {
      // Intentar inicializar de nuevo por si cargó tarde
      // @ts-ignore
      if (window.Fintoc) {
         initFintoc()
         setTimeout(() => {
           setLoading(false)
           alert("Widget inicializado, intenta hacer clic de nuevo.")
         }, 500)
      } else {
         alert("El widget de Fintoc aún no ha cargado. Intenta de nuevo en unos segundos.")
         setLoading(false)
      }
    }
  }

  return (
    <div className="space-y-6">
      <Script 
        src="https://js.fintoc.com/v1/" 
        onLoad={initFintoc} 
      />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Cuentas Bancarias</h1>
      </div>

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Conectar Banco (Premium)</CardTitle>
          <CardDescription>
            Conecta tu banco chileno usando Fintoc para sincronizar y categorizar tus movimientos automáticamente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={openFintoc} disabled={loading} className="w-full">
            {loading ? "Abriendo Fintoc..." : "Conectar Cuenta Bancaria"}
          </Button>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Tus credenciales están seguras y nunca son almacenadas por nosotros. 
            Regulado por la CMF.
          </p>
        </CardContent>
      </Card>
      
      {/* Aquí iría la lista de bancos ya conectados desde Prisma */}
    </div>
  )
}
