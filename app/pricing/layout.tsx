import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Precios — BotRural',
  description:
    'Calculá tu precio BotRural según tus vacunos, ovinos y hectáreas de cosecha. BotRural Plus incluye finanzas. Pago mensual o anual con 20% de descuento.',
  alternates: {
    canonical: 'https://pricing.botrural.app',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
