"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default marker icon in Leaflet + Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// Custom Icon for User
const userIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Custom Icon for Deals
const dealIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

type Deal = {
  id: string
  companyName: string
  message: string
  latitude: number
  longitude: number
  radiusMeters: number
  tier: string
}

export default function DealsMap({ deals }: { deals: Deal[] }) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.error("Map geolocation error:", err),
        { enableHighAccuracy: true }
      )
    }
  }, [])

  // Si no tenemos ubicación, mostrar Santiago por defecto
  const center: [number, number] = userLocation || [-33.4489, -70.6693]

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-border shadow-sm relative z-0">
      <MapContainer center={center} zoom={13} scrollWheelZoom={true} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <strong>Tu ubicación actual</strong>
            </Popup>
          </Marker>
        )}

        {deals.map(deal => (
          <div key={deal.id}>
            <Marker position={[deal.latitude, deal.longitude]} icon={dealIcon}>
              <Popup>
                <div className="min-w-[150px]">
                  <h3 className="font-bold text-foreground mb-1">{deal.companyName}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{deal.message}</p>
                  <span className="text-[10px] uppercase font-bold text-white bg-accent px-2 py-0.5 rounded">
                    {deal.tier === 'enterprise' ? 'Sponsor Pro' : 'Local'}
                  </span>
                </div>
              </Popup>
            </Marker>
            
            {/* Dibujar el radio del deal */}
            <Circle 
              center={[deal.latitude, deal.longitude]} 
              radius={deal.radiusMeters} 
              pathOptions={{ 
                color: '#00E5FF', 
                fillColor: '#00E5FF', 
                fillOpacity: 0.1,
                weight: 1
              }} 
            />
          </div>
        ))}
      </MapContainer>
    </div>
  )
}
