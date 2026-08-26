"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createTransaction } from "@/app/actions/transactions"
import { MapPin, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const DEFAULT_CATEGORIES = [
  "Supermercado",
  "Vivienda y Servicios",
  "Transporte",
  "Salud y Farmacia",
  "Entretenimiento",
  "Educación",
  "Restaurantes y Cafés",
  "Inversiones",
  "Vestuario y Calzado",
  "Mascotas",
  "Otros"
]

const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.coerce.number().positive("El monto debe ser mayor a 0"),
  originalCurrency: z.string().default("CLP"),
  description: z.string().min(2, "Descripción muy corta"),
  category: z.string().min(1, "Selecciona o ingresa una categoría"),
  date: z.string(),
  paymentMethod: z.string(),
})

export function TransactionForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null)
  const [locating, setLocating] = useState(false)
  const [customCategory, setCustomCategory] = useState(false)

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "expense",
      amount: 0,
      originalCurrency: "CLP",
      description: "",
      category: "Supermercado",
      date: new Date().toISOString().split("T")[0],
      paymentMethod: "debit_card",
    },
  })

  const handleGetLocation = () => {
    setLocating(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          setLocating(false)
        },
        (error) => {
          alert("No se pudo obtener la ubicación.")
          setLocating(false)
        }
      )
    } else {
      alert("Tu navegador no soporta geolocalización.")
      setLocating(false)
    }
  }

  async function onSubmit(values: z.infer<typeof transactionSchema>) {
    setLoading(true)
    try {
      await createTransaction({
        ...values,
        userId: "dummy-user-123",
        latitude: location?.lat,
        longitude: location?.lng,
      } as any)
      form.reset()
      setLocation(null)
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error(error)
      alert("Hubo un error al guardar la transacción")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Tipo</Label>
          <Select 
            onValueChange={(val) => form.setValue("type", val as any)} 
            defaultValue={form.getValues("type")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona el tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="expense">Gasto</SelectItem>
              <SelectItem value="income">Ingreso</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Fecha</Label>
          <Input type="date" {...form.register("date")} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Categoría</Label>
          <button 
            type="button" 
            onClick={() => setCustomCategory(!customCategory)} 
            className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> {customCategory ? "Seleccionar de la lista" : "Crear nueva categoría"}
          </button>
        </div>

        {customCategory ? (
          <Input 
            placeholder="Escribe el nombre de tu nueva categoría" 
            onChange={(e) => form.setValue("category", e.target.value)}
          />
        ) : (
          <Select 
            onValueChange={(val) => form.setValue("category", val)} 
            defaultValue={form.getValues("category")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              {DEFAULT_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="space-y-2">
        <Label>Descripción</Label>
        <Input placeholder="Ej. Lider, Netflix, Copec..." {...form.register("description")} />
        {form.formState.errors.description && (
          <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Monto</Label>
          <Input type="number" step="0.01" {...form.register("amount")} />
        </div>

        <div className="space-y-2">
          <Label>Moneda</Label>
          <Select 
            onValueChange={(val) => form.setValue("originalCurrency", val)} 
            defaultValue={form.getValues("originalCurrency")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona moneda" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CLP">CLP</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Ubicación del Gasto (Opcional)</Label>
        <div className="flex items-center gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleGetLocation} 
            disabled={locating}
            className={location ? "bg-emerald-50 text-emerald-700 border-emerald-200" : ""}
          >
            <MapPin size={16} className="mr-2" />
            {locating ? "Buscando..." : location ? "Ubicación guardada ✓" : "Adjuntar mi ubicación actual"}
          </Button>
        </div>
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold" disabled={loading}>
        {loading ? "Guardando..." : "Guardar Transacción"}
      </Button>
    </form>
  )
}
