'use client'

import { useMemo, useState } from 'react'
import { Check, Info, Shield, Sparkles } from 'lucide-react'
import Header from '../components/Header'

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

const INCLUDED = [
  'Bot de WhatsApp con IA para registrar datos',
  'Campos / establecimientos ilimitados',
  'Gestión de potreros, animales y cultivos',
  'Pastoreo rotativo y cálculo de descansos',
  'Eventos de siembra, cosecha y sanidad',
  'Finanzas: gastos, ventas y facturas',
  'Registro de lluvias y clima',
  'Reportes y exportación a Excel / PDF',
  'Equipo con roles y permisos',
]

const APP_URL = 'https://app.botrural.app'

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('PLAN_500')
  const [cycle, setCycle] = useState<'monthly' | 'annual'>('monthly')

  const plan = useMemo(
    () => PLANS.find((p) => p.id === selectedPlan)!,
    [selectedPlan]
  )

  const baseMonthly = plan.monthly
  const baseAnnual = plan.monthly * 10

  const totalPrice = cycle === 'monthly' ? baseMonthly : baseAnnual
  const totalLabel = cycle === 'monthly' ? '/mes' : '/año'
  const monthlyEquivalent = cycle === 'annual' ? baseAnnual / 12 : null

  const checkoutUrl = `${APP_URL}/checkout?plan=${selectedPlan}&cycle=${cycle}`

  return (
    <div className="min-h-screen bg-[#faf9f7] text-gray-900">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#2D5C64]/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2D5C64] via-[#2D5C64] to-[#1e4349]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(2,201,81,0.15)_0%,_transparent_55%)]" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#F0E8D8]/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20 text-center">
          <span className="inline-flex items-center gap-1.5 bg-white/10 text-[#F0E8D8] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-6 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#02C951]" />
            Planes BotRural
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 max-w-3xl mx-auto leading-tight">
            El plan según las hectáreas de tu operación
          </h1>
          <p className="text-base md:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            Un solo precio por rango de hectáreas. Campos ilimitados, todo incluido. Sin permanencia.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
            {[
              'Sin tarjeta para probar',
              'Cancelás cuando quieras',
              'Pago mensual o anual',
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 bg-white/10 text-white/90 px-3 py-1.5 rounded-full border border-white/10"
              >
                <Check className="w-3.5 h-3.5 text-[#02C951]" strokeWidth={3} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-8">
        {/* Plan selector */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Seleccioná tu plan</h2>
              <p className="text-sm text-gray-500 mt-1">El límite de hectáreas es global del plan</p>
            </div>

            <div className="inline-flex items-center self-start sm:self-auto bg-gray-100 rounded-full p-1 text-sm font-medium">
              <button
                onClick={() => setCycle('monthly')}
                className={`px-4 py-2 rounded-full transition ${
                  cycle === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setCycle('annual')}
                className={`px-4 py-2 rounded-full transition flex items-center gap-2 ${
                  cycle === 'annual' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Anual
                <span className="text-[10px] bg-[#F0E8D8] text-[#2D5C64] px-1.5 py-0.5 rounded-full font-semibold">
                  2 meses gratis
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
                  className={`text-left p-4 md:p-5 rounded-xl border-2 transition-all ${
                    selected
                      ? 'border-[#02C951] bg-[#F0E8D8]/40 shadow-sm ring-1 ring-[#02C951]/20'
                      : 'border-gray-200 hover:border-[#2D5C64]/25 hover:bg-gray-50/80 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                        selected ? 'border-[#02C951] bg-[#02C951]' : 'border-gray-300'
                      }`}
                    >
                      {selected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#2D5C64] mb-1">{p.rango}</div>
                      <div className="text-gray-900 font-bold text-xl leading-none">
                        USD {price.toFixed(2)}
                        <span className="text-xs font-normal text-gray-500 ml-1">{suffix}</span>
                      </div>
                      {cycle === 'annual' && (
                        <p className="text-xs text-gray-500 mt-1">
                          ≈ USD {(price / 12).toFixed(2)}/mes
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-6 flex items-start gap-2.5 text-sm text-gray-600 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <Info className="w-4 h-4 text-[#2D5C64] flex-shrink-0 mt-0.5" />
            <p>
              ¿Necesitás más de 10.000 ha?{' '}
              <a
                href="https://wa.me/59899465242?text=Hola%2C%20necesito%20un%20plan%20enterprise%20de%20BotRural"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2D5C64] font-semibold hover:underline"
              >
                Contactanos
              </a>{' '}
              para un plan a medida.
            </p>
          </div>

          <div className="mt-3 flex items-start gap-2.5 text-sm text-gray-700 bg-[#F0E8D8]/50 border border-[#2D5C64]/10 rounded-xl p-4">
            <Check className="w-4 h-4 text-[#02C951] flex-shrink-0 mt-0.5" />
            <p>
              Podés crear <strong>todos los campos / establecimientos que quieras</strong> sin costo extra.
            </p>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-7">
            <h3 className="font-bold text-gray-900 mb-4">Todo lo que incluye</h3>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-gray-700">
              {INCLUDED.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#02C951] flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="bg-white rounded-2xl shadow-md border border-gray-200/80 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-[#2D5C64] via-[#02C951] to-[#2D5C64]" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-[#2D5C64]" />
                <h3 className="text-lg font-bold text-gray-900">Resumen</h3>
              </div>
              <p className="text-sm text-gray-500 mb-5">Plan seleccionado</p>

              <div className="space-y-3 text-sm border-b border-gray-100 pb-5 mb-5">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Hectáreas</span>
                  <span className="font-semibold text-gray-900 text-right">{plan.rango}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Campos</span>
                  <span className="font-semibold text-gray-900">Ilimitados</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Facturación</span>
                  <span className="font-semibold text-gray-900 text-right">
                    {cycle === 'monthly' ? 'Mensual' : 'Anual · 2 meses gratis'}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-600 font-medium">Total</span>
                  <span className="text-3xl font-bold text-[#2D5C64] tabular-nums">
                    USD {totalPrice.toFixed(2)}
                    <span className="text-sm font-normal text-gray-500 ml-1">{totalLabel}</span>
                  </span>
                </div>
                {monthlyEquivalent && (
                  <p className="text-xs text-gray-500 text-right mt-1.5">
                    Equivale a USD {monthlyEquivalent.toFixed(2)}/mes
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-2">Más impuestos aplicables</p>
              </div>

              <a
                href={checkoutUrl}
                className="w-full block text-center bg-[#02C951] hover:bg-[#02b84a] text-white py-3.5 rounded-xl font-semibold transition shadow-sm"
              >
                Suscribirme
              </a>

              <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
                Pago seguro · Sin permanencia · Cancelás cuando quieras
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}