"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, MapPin, Sparkles } from "lucide-react"

export function CreateDealDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // Form State
  const [companyName, setCompanyName] = useState("")
  const [message, setMessage] = useState("")
  const [category, setCategory] = useState("Comida & Cafés")
  const [radiusMeters, setRadiusMeters] = useState("1000")
  const [tier, setTier] = useState("pro")
  const [durationDays, setDurationDays] = useState("30")
  const [latitude, setLatitude] = useState("-33.4250")
  const [longitude, setLongitude] = useState("-70.6120")
  const [locating, setLocating] = useState(false)

  const handleGetCurrentLocation = () => {
    setLocating(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude.toFixed(6))
          setLongitude(pos.coords.longitude.toFixed(6))
          setLocating(false)
        },
        () => {
          alert("No se pudo obtener la ubicación GPS automática.")
          setLocating(false)
        }
      )
    } else {
      alert("Navegador no soporta geolocalización.")
      setLocating(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/deals/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          message,
          category,
          radiusMeters: parseInt(radiusMeters),
          tier,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          durationDays: parseInt(durationDays),
        }),
      })

      if (!res.ok) throw new Error("Error al crear la campaña")

      alert("¡Campaña GPS creada y activa en el mapa con éxito! 🎉")
      setOpen(false)
      // Refresh page to show new deal
      window.location.reload()
    } catch (err: any) {
      alert(err.message || "No se pudo crear la campaña GPS")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold gap-2 shadow-lg shadow-emerald-600/20 text-xs">
          <Plus className="w-4 h-4" /> Crear Campaña GPS
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" /> Nueva Campaña Geolocalizada (GPS)
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <Label className="text-xs font-semibold text-slate-500 uppercase">Nombre de la Sucursal / Marca</Label>
            <Input 
              placeholder="Ej: Café Rendibu (Providencia)" 
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label className="text-xs font-semibold text-slate-500 uppercase">Mensaje de la Oferta / Descuento</Label>
            <Input 
              placeholder="Ej: 2x1 en Cappuccino de 15:00 a 18:00 hrs" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold text-slate-500 uppercase">Categoría</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Comida & Cafés">Comida & Cafés</SelectItem>
                  <SelectItem value="Ropa & Moda">Ropa & Moda</SelectItem>
                  <SelectItem value="Entretenimiento">Entretenimiento</SelectItem>
                  <SelectItem value="Salud & Bienestar">Salud & Bienestar</SelectItem>
                  <SelectItem value="Servicios">Servicios</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-semibold text-slate-500 uppercase">Radio Cobertura GPS</Label>
              <Select value={radiusMeters} onValueChange={setRadiusMeters}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500">500 metros</SelectItem>
                  <SelectItem value="1000">1 km (Recomendado)</SelectItem>
                  <SelectItem value="2000">2 km</SelectItem>
                  <SelectItem value="5000">5 km (Zona amplia)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold text-slate-500 uppercase">Nivel de Plan</Label>
              <Select value={tier} onValueChange={setTier}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Básico</SelectItem>
                  <SelectItem value="pro">Pro (Destacado)</SelectItem>
                  <SelectItem value="enterprise">Enterprise VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs font-semibold text-slate-500 uppercase">Duración Campaña</Label>
              <Select value={durationDays} onValueChange={setDurationDays}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 Días (1 Mes)</SelectItem>
                  <SelectItem value="60">60 Días (2 Meses)</SelectItem>
                  <SelectItem value="90">90 Días (3 Meses)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Coordinates */}
          <div className="space-y-2 border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-slate-500 uppercase">Ubicación GPS de la Tienda</Label>
              <button 
                type="button" 
                onClick={handleGetCurrentLocation}
                disabled={locating}
                className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-1"
              >
                <MapPin className="w-3.5 h-3.5" /> {locating ? "Obteniendo..." : "Usar mi ubicación"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Input 
                placeholder="Latitud (ej: -33.4250)" 
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                required
              />
              <Input 
                placeholder="Longitud (ej: -70.6120)" 
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full mt-2">
            {loading ? "Creando Campaña..." : "Lanzar Campaña en el Mapa GPS"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
