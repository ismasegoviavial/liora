import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, ShieldCheck, ArrowUpRight, Lock, DollarSign } from "lucide-react"

export default function InvestmentsPage() {
  const etfs = [
    {
      symbol: "VOO",
      name: "Vanguard S&P 500 ETF",
      category: "Acciones EE.UU.",
      priceUsd: 512.40,
      changePercent: +1.42,
      riskLevel: "Moderado",
      description: "Invierte en las 500 empresas más grandes de EE.UU. (Apple, Microsoft, Amazon)."
    },
    {
      symbol: "QQQ",
      name: "Invesco QQQ Trust",
      category: "Tecnología Gigante",
      priceUsd: 480.15,
      changePercent: +2.18,
      riskLevel: "Alto",
      description: "Las 100 empresas tecnológicas líderes del Nasdaq."
    },
    {
      symbol: "SCHD",
      name: "Schwab US Dividend Equity",
      category: "Dividendos Pasivos",
      priceUsd: 82.30,
      changePercent: +0.65,
      riskLevel: "Bajo-Moderado",
      description: "Empresas estables con pago de dividendos trimestrales crecientes."
    },
    {
      symbol: "CSPX",
      name: "iShares Core S&P 500 UCITS",
      category: "Acumulativo (Irlanda)",
      priceUsd: 545.90,
      changePercent: +1.35,
      riskLevel: "Moderado",
      description: "Optimizado fiscalmente para inversionistas fuera de EE.UU."
    }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary to-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 text-accent text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-accent/30">
            <ShieldCheck className="w-4 h-4" /> Ejecución Nativa con Corredora Regulada (XTB / Vector Capital)
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Inversiones en ETFs en 1-Clic
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            Construye tu patrimonio comprando fracciones de los fondos indexados más importantes del mundo desde $5.000 CLP.
          </p>

          <div className="flex flex-wrap gap-4 items-center pt-2">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <span className="text-xs text-slate-400 block">Tu Portafolio</span>
              <span className="text-xl font-bold text-white">$1.250.000 CLP</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <span className="text-xs text-slate-400 block">Ganancia Histórica</span>
              <span className="text-xl font-bold text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> +12.4%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ETF Catalog Grid */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">ETFs Recomendados por la IA</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {etfs.map((etf) => (
            <Card key={etf.symbol} className="hover:border-accent/50 transition-all shadow-sm flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
                      {etf.category}
                    </span>
                    <CardTitle className="text-xl font-bold mt-2">{etf.name} ({etf.symbol})</CardTitle>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-extrabold text-foreground">${etf.priceUsd} USD</span>
                    <span className={`block text-xs font-bold ${etf.changePercent >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                      {etf.changePercent >= 0 ? '+' : ''}{etf.changePercent}% hoy
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">{etf.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    Riesgo: <strong className="text-foreground">{etf.riskLevel}</strong>
                  </span>

                  <Button className="bg-primary hover:bg-slate-800 text-white rounded-full font-bold gap-1 text-xs">
                    Invertir en 1-Clic <ArrowUpRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
