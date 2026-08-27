import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, MapPin, Target, BarChart3, Building2, ArrowRight } from "lucide-react"

export default function EmpresasPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      {/* B2B Header */}
      <header className="px-4 md:px-8 h-20 flex items-center justify-between border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xl">
            $
          </div>
          <div className="font-bold text-lg sm:text-2xl text-foreground tracking-tight flex items-center gap-1">
            FinanzasPro <span className="text-[10px] sm:text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase font-bold">Business</span>
          </div>
        </div>

        <nav className="flex items-center gap-3 shrink-0">
          <Link href="https://wa.me/?text=Hola!%20Me%20interesa%20anunciar%20mi%20empresa" target="_blank">
            <Button className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 sm:px-6 text-xs sm:text-sm h-9 sm:h-10 shadow-md shadow-emerald-200">
              Hablemos
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col">
        {/* B2B Hero */}
        <section className="relative px-4 pt-24 pb-32 overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-emerald-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />
          
          <div className="z-10 max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm mb-6">
              <Building2 className="w-4 h-4" /> Marketing de Proximidad Hiper-Localizado
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-8 leading-tight">
              Atrae clientes reales a tu tienda física en el <span className="text-emerald-600">momento exacto</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Conecta tu marca con miles de usuarios cuando caminen a metros de tu sucursal. Notificaciones push inteligentes basadas en hábitos de gasto.
            </p>
            <div className="flex justify-center">
              <Link href="https://wa.me/?text=Hola!%20Quiero%20una%20demostraci%C3%B3n%20para%20mi%20empresa" target="_blank">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xl shadow-emerald-200 gap-2">
                  Agendar Demostración <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-20 bg-card border-y border-border px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">¿Por qué anunciarte en FinanzasPro?</h2>
              <p className="text-muted-foreground">La única plataforma que cruza ubicación GPS en tiempo real con historial de compra.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-background border border-border">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Geofencing de Precisión</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Configura un radio de 50m a 500m. Tu promoción salta en la pantalla del celular únicamente cuando el cliente va caminando por la puerta.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-background border border-border">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Segmentación por Gastos</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Llega a usuarios con hábitos de compra compatibles. Si vendes ropa outdoor, tu alerta se muestra a quienes compran frecuentemente en esa categoría.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-background border border-border">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Analytics de Conversión</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Mide exactamente cuántas personas vieron tu notificación, cuántas hicieron clic y cuántas ingresaron físicamente a tu tienda.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* B2B Pricing Plans */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">Planes para Marcas y Tiendas</h2>
              <p className="text-muted-foreground">Soluciones adaptadas al tamaño de tu negocio.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
              {/* Básico */}
              <div className="rounded-3xl p-6 lg:p-8 bg-card border border-border shadow-md flex flex-col justify-between">
                <div>
                  <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-slate-200 w-fit">
                    Locales Únicos
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Básico Empresa</h3>
                  <p className="text-muted-foreground text-sm mb-6 min-h-[3rem] flex items-center">Para locales comerciales pequeños o independientes.</p>
                  <div className="text-2xl font-extrabold text-emerald-600 mb-8 py-3 border-y border-border/50">
                    A la medida
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-muted-foreground text-sm"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> 1 Local Comercial</li>
                    <li className="flex items-center gap-3 text-muted-foreground text-sm"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> 3 Ofertas activas simultáneas</li>
                    <li className="flex items-center gap-3 text-muted-foreground text-sm"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> Radio de cobertura hasta 200m</li>
                    <li className="flex items-center gap-3 text-muted-foreground text-sm"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> Notificaciones push geolocalizadas</li>
                  </ul>
                </div>
                <Link href="https://wa.me/?text=Hola!%20Me%20interesa%20el%20Plan%20B%C3%A1sico%20Empresa" target="_blank">
                  <Button className="w-full rounded-full" variant="outline" size="lg">Hablemos</Button>
                </Link>
              </div>

              {/* Pro */}
              <div className="rounded-3xl p-6 lg:p-8 bg-card border-2 border-emerald-500 shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-emerald-200 w-fit">
                    Recomendado
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Pro Empresa</h3>
                  <p className="text-muted-foreground text-sm mb-6 min-h-[3rem] flex items-center">Para marcas en expansión con múltiples sucursales.</p>
                  <div className="text-2xl font-extrabold text-emerald-600 mb-8 py-3 border-y border-emerald-100">
                    A la medida
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-muted-foreground text-sm"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> 3 Locales Comerciales</li>
                    <li className="flex items-center gap-3 text-muted-foreground text-sm"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> Ofertas activas ilimitadas</li>
                    <li className="flex items-center gap-3 text-muted-foreground text-sm"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> Radio de cobertura personalizable</li>
                    <li className="flex items-center gap-3 text-muted-foreground text-sm"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> Dashboard de Analytics y Conversiones</li>
                    <li className="flex items-center gap-3 text-muted-foreground text-sm"><Check className="w-5 h-5 text-emerald-500 shrink-0" /> Prioridad alta en el mapa</li>
                  </ul>
                </div>
                <Link href="https://wa.me/?text=Hola!%20Me%20interesa%20el%20Plan%20Pro%20Empresa" target="_blank">
                  <Button className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 font-bold" size="lg">Hablemos</Button>
                </Link>
              </div>

              {/* Enterprise */}
              <div className="rounded-3xl p-6 lg:p-8 bg-slate-900 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="inline-block px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-full uppercase tracking-wider mb-4 border border-slate-700 w-fit">
                    Cadenas y Franquicias
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                  <p className="text-slate-400 text-sm mb-6 min-h-[3rem] flex items-center">Para grandes cadenas de retail y restaurantes.</p>
                  <div className="text-2xl font-extrabold text-emerald-400 mb-8 py-3 border-y border-slate-800">
                    Personalizado
                  </div>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-slate-200 text-sm"><Check className="w-5 h-5 text-emerald-400 shrink-0" /> Locales ilimitados a nivel nacional</li>
                    <li className="flex items-center gap-3 text-slate-200 text-sm"><Check className="w-5 h-5 text-emerald-400 shrink-0" /> Integración por API propia</li>
                    <li className="flex items-center gap-3 text-slate-200 text-sm"><Check className="w-5 h-5 text-emerald-400 shrink-0" /> Segmentación avanzada por hábitos</li>
                    <li className="flex items-center gap-3 text-slate-200 text-sm"><Check className="w-5 h-5 text-emerald-400 shrink-0" /> Account Manager dedicado 24/7</li>
                  </ul>
                </div>
                <Link href="https://wa.me/?text=Hola!%20Me%20interesa%20el%20Plan%20Enterprise" target="_blank">
                  <Button className="w-full rounded-full bg-white text-slate-900 hover:bg-slate-100 font-bold" size="lg">Hablemos</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4 text-center text-sm text-muted-foreground">
        © 2026 FinanzasPro Business. Todos los derechos reservados.
      </footer>
    </div>
  )
}
