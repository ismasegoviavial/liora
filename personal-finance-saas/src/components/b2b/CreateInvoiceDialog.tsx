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
import { FileText, CheckCircle, Sparkles } from "lucide-react"

export function CreateInvoiceDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [clientRut, setClientRut] = useState("")
  const [clientName, setClientName] = useState("")
  const [netAmount, setNetAmount] = useState("")
  const [documentType, setDocumentType] = useState("factura_afecta")

  const netNum = parseFloat(netAmount) || 0
  const ivaNum = Math.round(netNum * 0.19)
  const totalNum = netNum + ivaNum

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      alert(`¡Factura Electrónica emitida exitosamente al SII para ${clientName}! Total: $${totalNum.toLocaleString("es-CL")} CLP (IVA $${ivaNum.toLocaleString("es-CL")}) 🎉`)
      setLoading(false)
      setOpen(false)
      setClientRut("")
      setClientName("")
      setNetAmount("")
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full font-bold gap-2 text-xs border-slate-300">
          <FileText className="w-4 h-4 text-blue-600" /> Emitir Factura SII
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" /> Emitir Factura Electrónica (SII)
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <Label className="text-xs font-semibold text-slate-500 uppercase">Tipo de Documento</Label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="factura_afecta">Factura Electrónica Afecta (33)</SelectItem>
                <SelectItem value="factura_exenta">Factura Electrónica Exenta (34)</SelectItem>
                <SelectItem value="boleta_electronica">Boleta Electrónica (39)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs font-semibold text-slate-500 uppercase">RUT del Cliente / Receptor</Label>
            <Input 
              placeholder="Ej: 76.432.190-K" 
              value={clientRut}
              onChange={(e) => setClientRut(e.target.value)}
              required
            />
          </div>

          <div>
            <Label className="text-xs font-semibold text-slate-500 uppercase">Razón Social del Cliente</Label>
            <Input 
              placeholder="Ej: Comercializadora del Sur SpA" 
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label className="text-xs font-semibold text-slate-500 uppercase">Monto Neto (CLP)</Label>
            <Input 
              type="number"
              placeholder="Ej: 1000000" 
              value={netAmount}
              onChange={(e) => setNetAmount(e.target.value)}
              required
            />
          </div>

          {/* Breakdown Preview */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Monto Neto:</span>
              <span className="font-semibold">${netNum.toLocaleString("es-CL")} CLP</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>IVA (19%):</span>
              <span className="font-semibold">${ivaNum.toLocaleString("es-CL")} CLP</span>
            </div>
            <div className="flex justify-between text-slate-900 font-extrabold border-t border-slate-200 pt-1 text-sm">
              <span>Total Factura:</span>
              <span className="text-blue-600">${totalNum.toLocaleString("es-CL")} CLP</span>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full mt-2">
            {loading ? "Firmando y Enviando al SII..." : "Emitir Factura Electrónica"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
