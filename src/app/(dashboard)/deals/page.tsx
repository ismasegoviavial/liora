import prisma from "@/lib/prisma"
import MapWrapper from "@/components/dashboard/MapWrapper"
import { Info } from "lucide-react"
import { ensureInitialSeed } from "@/lib/seed"

export const dynamic = "force-dynamic"

export default async function DealsPage() {
  await ensureInitialSeed()
  // Fetch active deals
  const now = new Date()
  const deals = await prisma.sponsoredDeal.findMany({
    where: {
      active: true,
      expiresAt: { gt: now }
    }
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Promociones Cercanas</h1>
        <p className="text-muted-foreground mt-1">Descubre beneficios exclusivos basados en tu ubicación.</p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-800">
        <Info className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="text-sm leading-relaxed">
          <strong>¿Cómo funciona?</strong> Este mapa muestra ofertas geolocalizadas. 
          Al caminar dentro del círculo celeste (radio de cobertura) de cualquier promoción, 
          recibirás una notificación instantánea en la aplicación si la tienes abierta.
        </div>
      </div>

      <MapWrapper deals={deals} />
    </div>
  )
}
