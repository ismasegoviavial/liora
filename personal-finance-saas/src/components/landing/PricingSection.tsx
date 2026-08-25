import { Button } from "@/components/ui/button"
import { Check, Sparkles, Building2 } from "lucide-react"
import Link from "next/link"

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 bg-muted/30 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Planes Simples y Transparentes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Organiza tus finanzas gratis o automatiza todo con nuestra Inteligencia Artificial.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="rounded-3xl p-8 bg-card border border-border shadow-md flex flex-col">
            <h3 className="text-2xl font-bold text-foreground mb-2">Plan Básico</h3>
            <p className="text-muted-foreground mb-6">Para organizar tus finanzas diarias de forma manual.</p>
            <div className="text-4xl font-extrabold text-foreground mb-8">
              $0 <span className="text-lg font-normal text-muted-foreground">/mes</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Check className="w-5 h-5 text-emerald-500" /> Cuentas bancarias manuales
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Check className="w-5 h-5 text-emerald-500" /> Presupuesto básico
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Check className="w-5 h-5 text-emerald-500" /> Metas de ahorro y seguimiento de deudas
              </li>
              <li className="flex items-center gap-3 opacity-40">
                <Check className="w-5 h-5" /> Sincronización automática de bancos (Fintoc)
              </li>
              <li className="flex items-center gap-3 opacity-40">
                <Check className="w-5 h-5" /> Asesor Financiero IA Gemini 24/7
              </li>
            </ul>
            <Link href="/dashboard">
              <Button className="w-full rounded-full" variant="outline" size="lg">
                Comenzar Gratis
              </Button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="rounded-3xl p-8 bg-primary text-primary-foreground shadow-2xl relative overflow-hidden flex flex-col border-4 border-primary">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-bl-full blur-2xl" />
            <div className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-accent w-fit">
              Más Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">Plan Pro</h3>
            <p className="text-primary-foreground/70 mb-6">Automatización total e Inteligencia Artificial.</p>
            <div className="text-4xl font-extrabold mb-8">
              $4.990 <span className="text-lg font-normal text-primary-foreground/70">/mes</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-accent" /> Todo lo del plan Básico
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-accent" /> Sincronización automática de Bancos (Fintoc)
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-accent" /> Asesor Financiero IA Gemini 24/7
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-accent" /> Beneficios Geolocalizados en vivo
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-accent" /> Gráficos e historiales avanzados
              </li>
            </ul>
            <Link href="/upgrade">
              <Button
                className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_0_15px_rgba(0,229,255,0.4)] font-bold"
                size="lg"
              >
                Obtener Pro
              </Button>
            </Link>
          </div>
        </div>

        {/* B2B Banner Link */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-600" /> ¿Tienes una marca o tienda física?{" "}
            <Link href="/empresas" className="text-emerald-600 font-bold hover:underline">
              Conoce nuestro programa para Empresas →
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
