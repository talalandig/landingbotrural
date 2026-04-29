'use client'

import { useMemo, useState } from 'react'
import { Check, Info } from 'lucide-react'

type PlanId = 'PLAN_500' | 'PLAN_1000' | 'PLAN_2000' | 'PLAN_5000' | 'PLAN_7500' | 'PLAN_10000'

interface PlanRow {
  id: PlanId
  rango: string
  monthly: number
}

const PLANS: PlanRow[] = [
  { id: 'PLAN_500', rango: '0 - 500 ha', monthly: 29.99 },
  { id: 'PLAN_1000', rango: '500 - 1.000 ha', monthly: 54.99 },
  { id: 'PLAN_2000', rango: '1.000 - 2.000 ha', monthly: 74.99 },
  { id: 'PLAN_5000', rango: '2.000 - 5.000 ha', monthly: 94.99 },
  { id: 'PLAN_7500', rango: '5.000 - 7.500 ha', monthly: 109.99 },
  { id: 'PLAN_10000', rango: '7.500 - 10.000 ha', monthly: 124.99 },
]

const APP_URL = 'https://app.botrural.app'

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('PLAN_500')
  const [cycle, setCycle] = useState<'monthly' | 'annual'>('monthly')

  const plan = useMemo(
    () => PLANS.find((p) => p.id === selectedPlan)!,
    [selectedPlan]
  )

  // Anual = monthly × 10 (2 meses gratis)
  const annualPrice = plan.monthly * 10
  const totalPrice = cycle === 'monthly' ? plan.monthly : annualPrice
  const totalLabel = cycle === 'monthly' ? '/mes' : '/año'
  const monthlyEquivalent = cycle === 'annual' ? annualPrice / 12 : null

  const checkoutUrl = `${APP_URL}/checkout?plan=${selectedPlan}&cycle=${cycle}`

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Nav simple */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="https://botrural.app" className="flex items-center gap-2 hover:opacity-80">
            <img src="/BotRural.svg" alt="BotRural" className="h-10" />
          </a>
          <div className="flex items-center gap-4">
            <a href="https://botrural.app" className="text-gray-600 hover:text-gray-900 text-sm hidden sm:block">
              Inicio
            </a>
            <a
              href={`${APP_URL}/login`}
              className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
            >
              Ingresar
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Precios simples y transparentes
        </h1>
        <p className="text-lg text-gray-600">
          Elegí el plan según las hectáreas de tu operación
        </p>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-6 pb-16 grid lg:grid-cols-[1fr_380px] gap-6">
        {/* IZQ: selector */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className="text-xl font-bold">Seleccioná tu plan</h2>

            {/* Toggle Mensual/Anual */}
            <div className="inline-flex items-center bg-gray-100 rounded-full p-1 text-sm font-medium">
              <button
                onClick={() => setCycle('monthly')}
                className={`px-4 py-1.5 rounded-full transition ${
                  cycle === 'monthly' ? 'bg-white shadow text-gray-900' : 'text-gray-500'
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setCycle('annual')}
                className={`px-4 py-1.5 rounded-full transition flex items-center gap-2 ${
                  cycle === 'annual' ? 'bg-white shadow text-gray-900' : 'text-gray-500'
                }`}
              >
                Anual
                <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-semibold">
                  -2 meses
                </span>
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {PLANS.map((p) => {
              const selected = p.id === selectedPlan
              const price = cycle === 'monthly' ? p.monthly : p.monthly * 10
              const suffix = cycle === 'monthly' ? '/mes' : '/año'
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlan(p.id)}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${
                    selected
                      ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 ${
                        selected ? 'border-green-600 bg-green-600' : 'border-gray-300'
                      }`}
                    >
                      {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </span>
                    <div className="flex-1">
                      <div className="text-green-700 font-bold text-lg leading-tight">
                        USD {price.toFixed(2)}
                        <span className="text-xs font-normal text-gray-500 ml-1">{suffix}</span>
                      </div>
                      <div className="text-sm text-gray-700 mt-0.5">{p.rango}</div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-6 flex items-start gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
            <Info className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p>
              ¿Necesitás más de 10.000 ha?{' '}
              <a
                href="https://wa.me/59899465242?text=Hola%2C%20necesito%20un%20plan%20enterprise%20de%20BotRural"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 font-medium hover:underline"
              >
                Contactanos
              </a>{' '}
              para precios empresariales.
            </p>
          </div>

          {/* Beneficios */}
          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold mb-3 text-gray-900">Todo lo que incluye:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {[
                'Bot de WhatsApp con IA para registrar datos',
                'Gestión de potreros, animales y cultivos',
                'Pastoreo rotativo y cálculo de descansos',
                'Eventos de siembra, cosecha y sanidad',
                'Finanzas: gastos, ventas y facturas',
                'Registro de lluvias y clima',
                'Reportes y exportación a Excel / PDF',
                'Equipo con roles y permisos',
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* DER: resumen sticky */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold mb-1">Resumen</h3>
            <p className="text-sm text-gray-500 mb-5">Plan seleccionado</p>

            <div className="space-y-3 text-sm border-b pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Hectáreas</span>
                <span className="font-medium text-gray-900">{plan.rango}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Plan</span>
                <span className="font-medium text-gray-900 uppercase">
                  {plan.id.replace('PLAN_', '')} ha
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Facturación</span>
                <span className="font-medium text-gray-900">
                  {cycle === 'monthly' ? 'Mensual' : 'Anual (2 meses gratis)'}
                </span>
              </div>
            </div>

            <div className="mb-5">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-700 font-semibold">Total</span>
                <span className="text-2xl font-bold text-green-700">
                  USD {totalPrice.toFixed(2)}
                  <span className="text-sm font-normal text-gray-500 ml-1">{totalLabel}</span>
                </span>
              </div>
              {monthlyEquivalent && (
                <p className="text-xs text-gray-500 text-right mt-1">
                  Equivale a USD {monthlyEquivalent.toFixed(2)}/mes
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1">Más impuestos aplicables</p>
            </div>

            <a
              href={checkoutUrl}
              className="w-full block text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition shadow-md"
            >
              Suscribirme
            </a>

            <a
              href={`${APP_URL}/register`}
              className="w-full block text-center mt-2 border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-medium transition text-sm"
            >
              Probar gratis primero
            </a>

            <p className="text-xs text-center text-gray-400 mt-4">
              Pago seguro · Cancelás cuando quieras
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
