import { TransactionForm } from "@/components/transactions/TransactionForm"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import prisma from "@/lib/prisma"

export default async function TransactionsPage() {
  // En el futuro filtar por el usuario logueado
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: "desc" },
    take: 50,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Transacciones</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>+ Nueva Transacción</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Añadir Transacción Manual</DialogTitle>
              <DialogDescription>
                Ingresa los detalles. Si eliges USD o EUR, se convertirá a CLP automáticamente.
              </DialogDescription>
            </DialogHeader>
            <TransactionForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Método de Pago</TableHead>
              <TableHead className="text-right">Monto (CLP)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  No hay transacciones aún.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.date.toLocaleDateString("es-CL")}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {t.description}
                      {t.originalCurrency && t.originalCurrency !== "CLP" && (
                        <span className="text-xs text-muted-foreground">
                          ({t.originalCurrency} {t.originalAmount?.toString()})
                        </span>
                      )}
                      {t.latitude && t.longitude && (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${t.latitude},${t.longitude}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                          title="Ver ubicación de la compra"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={t.type === "income" ? "text-green-600" : "text-red-600"}>
                      {t.type === "income" ? "Ingreso" : "Gasto"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {t.paymentMethod === "debit_card" && "Débito"}
                    {t.paymentMethod === "credit_card" && "Crédito"}
                    {t.paymentMethod === "cash" && "Efectivo"}
                    {t.paymentMethod === "transfer" && "Transferencia"}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${Number(t.amount).toLocaleString("es-CL")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
