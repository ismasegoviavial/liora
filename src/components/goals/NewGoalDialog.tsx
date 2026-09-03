"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createSavingsGoal } from "@/app/actions/goals"

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
  targetAmount: z.coerce.number().positive("La meta debe ser mayor a 0"),
  targetDate: z.string().min(1, "Debes seleccionar una fecha"),
})

export function NewGoalDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      targetAmount: 0,
      targetDate: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      await createSavingsGoal({
        userId: "dummy-user-123", // Dummy ID por ahora
        ...values,
      })
      form.reset()
      setOpen(false)
    } catch (error) {
      alert("Error al crear la meta")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Nueva Meta</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Meta de Ahorro</DialogTitle>
          <DialogDescription>
            Establece un nuevo objetivo financiero.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Nombre de la Meta</Label>
            <Input placeholder="Ej. Pie de departamento" {...form.register("name")} />
            {form.formState.errors.name && <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label>Monto a Ahorrar (CLP)</Label>
            <Input type="number" placeholder="1000000" {...form.register("targetAmount")} />
            {form.formState.errors.targetAmount && <p className="text-xs text-red-500">{form.formState.errors.targetAmount.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Fecha Objetivo</Label>
            <Input type="date" {...form.register("targetDate")} />
            {form.formState.errors.targetDate && <p className="text-xs text-red-500">{form.formState.errors.targetDate.message}</p>}
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Crear Meta"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
