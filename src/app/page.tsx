import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, MapPin, Wallet, Bot } from "lucide-react"
import { PricingSection } from "@/components/landing/PricingSection"
import { ScienceSection } from "@/components/landing/ScienceSection"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="px-4 md:px-8 h-20 flex items-center justify-between border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
            $
          </div>
          <div className="font-bold text-lg sm:text-2xl text-foreground tracking-tight">Liora</div>
        </div>

        <nav className="flex gap-2 sm:gap-4 items-center shrink-0">
          <Link 
            href="/empresas" 
            className="text-[11px] sm:text-xs font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border border-emerald-300 px-2.5 sm:px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
          >
            🏢 Empresas
          </Link>

          <Link href="/login" className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden xs:inline-block">
            Ingresar
          </Link>

          <Link href="/dashboard">
            <Button className="rounded-full px-3 sm:px-6 text-xs sm:text-sm h-9 sm:h-10">
              Dashboard
            </Button>
          </Link>
        </nav>
      </header>
      
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative px-4 pt-32 pb-40 overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-blue-100 rounded-full blur-[120px] opacity-70 pointer-events-none"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-emerald-50 rounded-full blur-[100px] opacity-70 pointer-events-none"></div>

          <div className="z-10 max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-foreground mb-8 leading-tight">
              Control absoluto de tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">dinero</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              <strong className="text-foreground">Maximiza tu ahorro y optimiza tu tiempo</strong>. Conecta tus bancos en segundos, deja que la IA organice tus finanzas en piloto automático y recibe beneficios geolocalizados en tiempo real.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl">
                  Comenzar Gratis
                </Button>
              </Link>
              <Link href="#pricing">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full">
                  Ver Planes
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-card px-4 border-y border-border">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">Todo lo que necesitas en un solo lugar</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Automatiza tu vida financiera y toma mejores decisiones sin esfuerzo.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <Wallet className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Conexión Bancaria Fintoc</h3>
                <p className="text-muted-foreground">Tus transacciones de Banco de Chile, Santander, Falabella y más, sincronizadas al instante de forma segura.</p>
              </div>
              {/* Feature 2 */}
              <div className="p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-lg bg-accent/20 text-accent-foreground flex items-center justify-center mb-4 border border-accent/30">
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Asesor IA Gemini</h3>
                <p className="text-muted-foreground">Tu propio analista financiero 24/7. Pregúntale cómo optimizar tu presupuesto o pídele que registre un gasto con tu voz.</p>
              </div>
              {/* Feature 3 */}
              <div className="p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Beneficios Geolocalizados</h3>
                <p className="text-muted-foreground">Ahorra en tiempo real. Recibe notificaciones push con descuentos exclusivos cuando camines cerca de tiendas aliadas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Science & Behavioral Economics Section */}
        <ScienceSection />

        <PricingSection />

      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
              $
            </div>
            <span className="font-bold text-foreground">FinanzasPro</span>
          </div>
          
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Términos de Servicio</Link>
            <Link href="#" className="hover:text-foreground">Privacidad</Link>
            <Link href="#" className="hover:text-foreground">Contacto</Link>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2026 FinanzasPro. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
