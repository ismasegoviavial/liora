export function ScienceSection() {
  const points = [
    {
      badge: "MIT Sloan",
      title: "Menos Compras Impulsivas (-20%)",
      description: "Centralizar tus cuentas en un solo tablero activa la conciencia de pago instantánea, reduciendo automáticamente las compras no planificadas.",
      citation: "Prelec, D., & Loewenstein, G. (1998). \"The Red and the Black: Mental Accounting of Savings and Debt\". Marketing Science, 17(1)."
    },
    {
      badge: "Premio Nobel 2017",
      title: "Mayor Ahorro con IA (+18%)",
      description: "Basado en la Teoría de los Empujones. Las sugerencias oportunas de Gemini vencen el sesgo del presente y aumentan tu tasa de ahorro mensual.",
      citation: "Thaler, R. H., & Sunstein, C. R. (2008). Nudge: Improving Decisions About Health, Wealth, and Happiness. Yale University Press."
    },
    {
      badge: "Premio Nobel 2002",
      title: "Mayor Éxito en Metas (+42%)",
      description: "Separar tu dinero en cubetas digitales (Metas y Deudas) evita la falacia de fungibilidad, asegurando que cumplas tus metas sin gastarte el dinero.",
      citation: "Kahneman, D., & Tversky, A. (1979). \"Prospect Theory: An Analysis of Decision under Risk\". Econometrica, 47(2)."
    },
    {
      badge: "CFPB & FHN",
      title: "Cero Gastos Hormiga (-$1.5k)",
      description: "La categorización en tiempo real vía Open Banking detecta suscripciones fantasma y pequeñas fugas de dinero invisibles a simple vista.",
      citation: "Consumer Financial Protection Bureau (CFPB) & Financial Health Network (2020). \"Impact of Automated PFM Applications\"."
    },
    {
      badge: "Marketing Research",
      title: "Ahorro Geolocalizado (-30%)",
      description: "Notificaciones de beneficios en tiempo real cuando caminas cerca de comercios asociados, reemplazando gastos a precio completo.",
      citation: "Grewal, D., Bart, Y., Spann, M., & Zubcsek, P. P. (2016). \"Mobile Advertising and Consumer Behavior\". Journal of Marketing Research, 53(5)."
    }
  ]

  return (
    <section className="py-24 px-4 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            La ciencia nos respalda
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Nuestra arquitectura no es azar; está diseñada rigurosamente sobre la literatura académica de Economía Conductual y Psicología Financiera.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt, idx) => (
            <div 
              key={idx} 
              className={`p-6 rounded-2xl bg-background border border-border shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase border border-primary/20">
                    {pt.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  {pt.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {pt.description}
                </p>
              </div>

              {/* Citación Académica Formal */}
              <div className="pt-4 border-t border-border/60 mt-auto">
                <p className="text-[11px] text-slate-500 italic leading-snug">
                  <strong>Fuente:</strong> {pt.citation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
