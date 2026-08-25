"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createDebt } from "@/app/actions/debts"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe ser más largo"),
  currentBalance: z.coerce.number().positive("El saldo debe ser mayor a 0"),
  annualRate: z.coerce.number().min(0, "La tasa no puede ser negativa"),
  monthlyPayment: z.coerce.number().positive("El pago debe ser mayor a 0"),
})

export function NewDebtDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      currentBalance: 0,
      annualRate: 0,
      monthlyPayment: 0,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      await createDebt({
        userId: "dummy-user-123",
        ...values,
      })
      form.reset()
      setOpen(false)
    } catch (error) {
      alert("Error al registrar deuda")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Agregar Deuda</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Nueva Deuda</DialogTitle>
          <DialogDescription>
            Añade un crédito, tarjeta o préstamo para hacerle seguimiento.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Nombre de la Deuda</Label>
            <Input placeholder="Ej. Crédito Hipotecario" {...form.register("name")} />
            {form.formState.errors.name && <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label>Saldo Pendiente Actual (CLP)</Label>
            <Input type="number" placeholder="500000" {...form.register("currentBalance")} />
            {form.formState.errors.currentBalance && <p className="text-xs text-red-500">{form.formState.errors.currentBalance.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tasa Anual (%)</Label>
              <Input type="number" step="0.01" placeholder="4.5" {...form.register("annualRate")} />
              {form.formState.errors.annualRate && <p className="text-xs text-red-500">{form.formState.errors.annualRate.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Pago Mensual</Label>
              <Input type="number" placeholder="25000" {...form.register("monthlyPayment")} />
              {form.formState.errors.monthlyPayment && <p className="text-xs text-red-500">{form.formState.errors.monthlyPayment.message}</p>}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Registrar Deuda"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
