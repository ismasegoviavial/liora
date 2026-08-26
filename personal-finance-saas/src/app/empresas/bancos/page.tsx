import { B2bSidebar } from "@/components/b2b/B2bSidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, CreditCard, Plus, ShieldCheck, CheckCircle2 } from "lucide-react"

export const dynamic = "force-dynamic"

export default function B2bBanksPage() {
  const bankAccounts = [
    { bank: "Banco de Chile", type: "Cuenta Corriente Empresa", number: "**** 8912", balance: 14250000, status: "Sincronizado (Fintoc)" },
    { bank: "Banco Santander", type: "Cuenta Corriente Empresa", number: "**** 4102", balance: 4200000, status: "Sincronizado (Fintoc)" },
    { bank: "Tarjeta Crédito Corporativa", type: "Visa Business (Chile)", number: "**** 9921", balance: -1850000, status: "Activa" },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50">
      <B2bSidebar />

      <main className="flex-1 p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Cuentas & Tarjetas Bancarias Corporativas</h1>
            <p className="text-slate-500 text-sm mt-1">Conecta las cuentas corrientes y tarjetas de crédito de tu empresa vía Open Banking (Fintoc).</p>
          </div>

          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full gap-2 text-xs">
            <Plus className="w-4 h-4" /> Conectar Nueva Cuenta Bancaria
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bankAccounts.map((acc, idx) => (
            <Card key={idx} className="border border-slate-200 shadow-sm bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-slate-900 text-white p-5 flex flex-row items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">{acc.type}</span>
                  <span className="font-extrabold text-base text-white">{acc.bank}</span>
                </div>
                <CreditCard className="w-6 h-6 text-emerald-400" />
              </CardHeader>

              <CardContent className="p-5 space-y-3">
                <div className="text-xs text-slate-400">Número de Cuenta: <span className="font-mono text-slate-700 font-bold">{acc.number}</span></div>
                
                <div>
                  <span className="text-xs text-slate-400 block">Saldo Disponible</span>
                  <span className={`text-2xl font-black ${acc.balance >= 0 ? 'text-slate-900' : 'text-red-500'}`}>
                    ${acc.balance.toLocaleString("es-CL")} CLP
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold border-t border-slate-100 pt-3">
                  <CheckCircle2 className="w-4 h-4" /> {acc.status}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
