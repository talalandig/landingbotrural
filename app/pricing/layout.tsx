import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Precios — BotRural',
  description:
    'Precio por campo: Agricultura en hectáreas o Ganadería/Mixto en animales equivalentes. Con o sin finanzas. Pago mensual o anual (2 meses gratis).',
  alternates: {
    canonical: 'https://pricing.botrural.app',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
