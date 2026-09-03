"use client"

import dynamic from "next/dynamic"
import { MapPin } from "lucide-react"

// Dynamic import with SSR disabled inside a Client Component
const DealsMap = dynamic(() => import("@/components/dashboard/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-2xl bg-muted flex items-center justify-center animate-pulse border border-border">
      <span className="text-muted-foreground flex items-center gap-2">
        <MapPin className="animate-bounce" /> Cargando mapa interactivo...
      </span>
    </div>
  )
})

export default function MapWrapper({ deals }: { deals: any[] }) {
  return <DealsMap deals={deals} />
}
