import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Precios — BotRural',
  description:
    'Planes de BotRural según hectáreas: desde USD 29.99/mes para hasta 500 ha. Pago anual con 2 meses gratis. Sin tarjeta para la prueba.',
  alternates: {
    canonical: 'https://pricing.botrural.app',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
