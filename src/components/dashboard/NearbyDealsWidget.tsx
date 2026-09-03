"use client"

import { useEffect, useState } from "react"
import { MapPin, Tag, X } from "lucide-react"

type Deal = {
  id: string
  companyName: string
  message: string
  category: string
  distance: number
  score: number
}

export function NearbyDealsWidget() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [activeDealIndex, setActiveDealIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocalización no soportada")
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        try {
          const res = await fetch("/api/deals/nearby", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            })
          })
          
          if (!res.ok) throw new Error("Failed to fetch deals")
          
          const data = await res.json()
          if (data.deals && data.deals.length > 0) {
            setDeals(data.deals)
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }
        } catch (err) {
          console.error("Error fetching nearby deals", err)
        }
      },
      (err) => {
        console.error("Geolocation error:", err)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000, // 10 seconds
        timeout: 5000
      }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  if (!isVisible || deals.length === 0) return null

  const currentDeal = deals[activeDealIndex]

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-white rounded-xl shadow-2xl border-2 border-accent p-4 max-w-sm w-full relative overflow-hidden">
        {/* Decoración */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-bl-full -z-10 opacity-50" />
        
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-slate-400 hover:text-slate-700"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4">
          <div className="bg-accent/20 text-accent p-2 rounded-lg shrink-0 mt-1">
            <Tag className="w-6 h-6" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-slate-900">{currentDeal.companyName}</span>
              <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Patrocinado
              </span>
            </div>
            
            <p className="text-slate-600 text-sm mb-3 leading-tight">
              {currentDeal.message}
            </p>
            
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
              <div className="flex items-center text-xs text-slate-500 font-medium">
                <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                Estás a {Math.round(currentDeal.distance)} metros
              </div>
              
              {deals.length > 1 && (
                <div className="flex gap-1">
                  {deals.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`w-1.5 h-1.5 rounded-full ${idx === activeDealIndex ? 'bg-accent' : 'bg-slate-200'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Botones de navegación si hay más de 1 oferta */}
        {deals.length > 1 && (
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-1 pointer-events-none">
             <button 
                className="pointer-events-auto bg-white/80 hover:bg-white shadow-sm p-1 rounded-full text-slate-400 hover:text-slate-700 -ml-2 transition-all opacity-0 group-hover:opacity-100"
                onClick={() => setActiveDealIndex((prev) => (prev > 0 ? prev - 1 : deals.length - 1))}
             >
                {'<'}
             </button>
             <button 
                className="pointer-events-auto bg-white/80 hover:bg-white shadow-sm p-1 rounded-full text-slate-400 hover:text-slate-700 -mr-2 transition-all opacity-0 group-hover:opacity-100"
                onClick={() => setActiveDealIndex((prev) => (prev < deals.length - 1 ? prev + 1 : 0))}
             >
                {'>'}
             </button>
          </div>
        )}
      </div>
    </div>
  )
}
