'use client'

import { useMemo, useState } from 'react'
import { Check, Info, Plus, Shield, Sparkles, Trash2 } from 'lucide-react'
import Header from '../components/Header'

type TipoCampo = 'agricultura' | 'ganaderia' | 'mixto'
type Modalidad = 'con' | 'sin'
type Cycle = 'monthly' | 'annual'

type CampoDraft = {
  id: string
  nombre: string
  tipo: TipoCampo
  hectareas: string
  vacunos: string
  ovinos: string
}

type PrecioCampo =
  | { kind: 'usd'; monthly: number; bandLabel: string; unidades: number; unidad: string }
  | { kind: 'contact'; bandLabel: string; unidades: number; unidad: string }

const OVINO_EQ = 0.16
const WHATSAPP_NUMBER = '59899465242'

const BANDS: { max: number; con: number; sin: number; labelHa: string; labelAn: string }[] = [
  { max: 500, con: 34.99, sin: 24.49, labelHa: '0 – 500 ha', labelAn: '0 – 500 animales' },
  { max: 1000, con: 54.99, sin: 38.49, labelHa: '500 – 1.000 ha', labelAn: '500 – 1.000 animales' },
  { max: 2000, con: 69.99, sin: 48.99, labelHa: '1.000 – 2.000 ha', labelAn: '1.000 – 2.000 animales' },
  { max: 5000, con: 84.99, sin: 59.49, labelHa: '2.000 – 5.000 ha', labelAn: '2.000 – 5.000 animales' },
  { max: 7500, con: 99.99, sin: 69.99, labelHa: '5.000 – 7.500 ha', labelAn: '5.000 – 7.500 animales' },
  { max: 10000, con: 114.99, sin: 80.49, labelHa: '7.500 – 10.000 ha', labelAn: '7.500 – 10.000 animales' },
]

const INCLUDED_BASE = [
  'Bot de WhatsApp con IA para registrar datos',
  'Gestión de potreros, animales y cultivos',
  'Pastoreo rotativo y cálculo de descansos',
  'Eventos de siembra, cosecha y sanidad',
  'Registro de lluvias y clima',
  'Reportes y exportación a Excel / PDF',
  'Equipo con roles y permisos',
]

const INCLUDED_FINANZAS = 'Finanzas: gastos, ventas y facturas'

const TIPO_LABEL: Record<TipoCampo, string> = {
  agricultura: 'Agricultura',
  ganaderia: 'Ganadería',
  mixto: 'Mixto',
}

function newCampo(index: number): CampoDraft {
  return {
    id: `c-${Date.now()}-${index}`,
    nombre: `Campo ${index}`,
    tipo: 'ganaderia',
    hectareas: '',
    vacunos: '',
    ovinos: '',
  }
}

function parseNum(raw: string): number {
  const t = raw.trim().replace(/\s/g, '').replace(',', '.')
  if (!t) return 0
  const n = Number(t)
  return Number.isFinite(n) && n > 0 ? n : 0
}

function fmtUsd(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function fmtNum(n: number): string {
  return n.toLocaleString('es-UY', { maximumFractionDigits: n % 1 === 0 ? 0 : 2 })
}

function equivalentes(c: CampoDraft): number {
  return parseNum(c.vacunos) + parseNum(c.ovinos) * OVINO_EQ
}

function unidadesCampo(c: CampoDraft): { unidades: number; unidad: string } {
  if (c.tipo === 'agricultura') {
    return { unidades: parseNum(c.hectareas), unidad: 'ha' }
  }
  return { unidades: equivalentes(c), unidad: 'animales eq.' }
}

function cotizarCampo(c: CampoDraft, modalidad: Modalidad): PrecioCampo {
  const { unidades, unidad } = unidadesCampo(c)
  const esHa = c.tipo === 'agricultura'
  if (unidades > 10000) {
    return {
      kind: 'contact',
      bandLabel: esHa ? '+10.000 ha' : '+10.000 animales',
      unidades,
      unidad,
    }
  }
  const band = BANDS.find((b) => unidades <= b.max) ?? BANDS[BANDS.length - 1]
  return {
    kind: 'usd',
    monthly: modalidad === 'con' ? band.con : band.sin,
    bandLabel: esHa ? band.labelHa : band.labelAn,
    unidades,
    unidad,
  }
}

export default function PricingPage() {
  const [campos, setCampos] = useState<CampoDraft[]>(() => [newCampo(1)])
  const [modalidad, setModalidad] = useState<Modalidad>('con')
  const [cycle, setCycle] = useState<Cycle>('monthly')

  const quotes = useMemo(
    () => campos.map((c) => ({ campo: c, quote: cotizarCampo(c, modalidad) })),
    [campos, modalidad]
  )

  const needsContact = quotes.some((q) => q.quote.kind === 'contact')
  const monthlyTotal = quotes.reduce(
    (s, q) => s + (q.quote.kind === 'usd' ? q.quote.monthly : 0),
    0
  )
  const displayTotal = cycle === 'monthly' ? monthlyTotal : monthlyTotal * 10
  const totalLabel = cycle === 'monthly' ? '/mes' : '/año'

  const included = modalidad === 'con' ? [...INCLUDED_BASE, INCLUDED_FINANZAS] : INCLUDED_BASE

  const contactUrl = useMemo(() => {
    const billing = cycle === 'monthly' ? 'mensual' : 'anual'
    const fin = modalidad === 'con' ? 'Con Finanzas' : 'Sin Finanzas'
    const lineas = quotes.map(({ campo, quote }, i) => {
      const nom = campo.nombre.trim() || `Campo ${i + 1}`
      if (quote.kind === 'contact') {
        return `• ${nom} (${TIPO_LABEL[campo.tipo]}): ${fmtNum(quote.unidades)} ${quote.unidad} — Contáctanos`
      }
      const precio = cycle === 'monthly' ? quote.monthly : quote.monthly * 10
      return `• ${nom} (${TIPO_LABEL[campo.tipo]}): ${fmtNum(quote.unidades)} ${quote.unidad} — USD ${fmtUsd(precio)}${cycle === 'monthly' ? '/mes' : '/año'}`
    })
    const totalTxt = needsContact
      ? 'Total: Contáctanos (+10.000 en al menos un campo)'
      : `Total: USD ${fmtUsd(displayTotal)} ${totalLabel}`
    const message = [
      'Hola, quiero BotRural.',
      `Modalidad: ${fin} · Facturación ${billing}`,
      ...lineas,
      totalTxt,
    ].join('\n')
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }, [quotes, cycle, modalidad, needsContact, displayTotal, totalLabel])

  const updateCampo = (id: string, patch: Partial<CampoDraft>) => {
    setCampos((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)))
  }

  const addCampo = () => {
    setCampos((prev) => [...prev, newCampo(prev.length + 1)])
  }

  const removeCampo = (id: string) => {
    setCampos((prev) => (prev.length <= 1 ? prev : prev.filter((c) => c.id !== id)))
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] text-gray-900">
      <Header />

      <section className="relative overflow-hidden border-b border-[#2D5C64]/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2D5C64] via-[#2D5C64] to-[#1e4349]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(2,201,81,0.15)_0%,_transparent_55%)]" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#F0E8D8]/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20 text-center">
          <span className="inline-flex items-center gap-1.5 bg-white/10 text-[#F0E8D8] px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-6 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#02C951]" />
            Precios BotRural
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 max-w-3xl mx-auto leading-tight">
            Configurá tus campos y ves el precio
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto">
            Cada establecimiento se cobra por su actividad: hectáreas en Agricultura, o animales equivalentes en Ganadería y Mixto.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
            {['Empezá con un campo', 'Agregá más cuando quieras', 'Pago mensual o anual'].map((item) => (
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

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14 grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-8">
        <div className="space-y-5">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-5 md:p-7">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Tus campos</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Podés contratar uno solo y sumar establecimientos después.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center bg-gray-100 rounded-full p-1 text-sm font-medium">
                  <button
                    type="button"
                    onClick={() => setModalidad('con')}
                    className={`px-3.5 py-1.5 rounded-full transition ${
                      modalidad === 'con' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Con Finanzas
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalidad('sin')}
                    className={`px-3.5 py-1.5 rounded-full transition ${
                      modalidad === 'sin' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Sin Finanzas
                  </button>
                </div>
                <div className="inline-flex items-center bg-gray-100 rounded-full p-1 text-sm font-medium">
                  <button
                    type="button"
                    onClick={() => setCycle('monthly')}
                    className={`px-3.5 py-1.5 rounded-full transition ${
                      cycle === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Mensual
                  </button>
                  <button
                    type="button"
                    onClick={() => setCycle('annual')}
                    className={`px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5 ${
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
            </div>

            <div className="space-y-4">
              {campos.map((c, i) => {
                const q = quotes[i].quote
                const esAgri = c.tipo === 'agricultura'
                const eq = equivalentes(c)
                const precioTxt =
                  q.kind === 'contact'
                    ? 'Contáctanos'
                    : `USD ${fmtUsd(cycle === 'monthly' ? q.monthly : q.monthly * 10)}`
                return (
                  <div
                    key={c.id}
                    className="rounded-xl border border-gray-200 bg-gray-50/40 p-4 md:p-5"
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wide text-[#2D5C64] mb-1.5">
                          Campo {i + 1}
                        </p>
                        <input
                          value={c.nombre}
                          onChange={(e) => updateCampo(c.id, { nombre: e.target.value })}
                          placeholder={`Campo ${i + 1}`}
                          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02C951]/30 focus:border-[#02C951]"
                        />
                      </div>
                      {campos.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeCampo(c.id)}
                          className="shrink-0 p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                          aria-label={`Quitar ${c.nombre || `Campo ${i + 1}`}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 mb-4">
                      {(['agricultura', 'ganaderia', 'mixto'] as TipoCampo[]).map((t) => {
                        const on = c.tipo === t
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => updateCampo(c.id, { tipo: t })}
                            className={`px-2 py-2 rounded-lg text-xs sm:text-sm font-semibold border-2 transition ${
                              on
                                ? 'border-[#02C951] bg-[#F0E8D8]/50 text-[#2D5C64]'
                                : 'border-gray-200 bg-white text-gray-600 hover:border-[#2D5C64]/25'
                            }`}
                          >
                            {TIPO_LABEL[t]}
                          </button>
                        )
                      })}
                    </div>

                    {esAgri ? (
                      <label className="block">
                        <span className="text-xs font-medium text-gray-600">Hectáreas totales (ha)</span>
                        <input
                          inputMode="decimal"
                          value={c.hectareas}
                          onChange={(e) => updateCampo(c.id, { hectareas: e.target.value })}
                          placeholder="Ej: 350"
                          className="mt-1.5 w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02C951]/30 focus:border-[#02C951]"
                        />
                      </label>
                    ) : (
                      <div>
                        <p className="text-xs font-medium text-gray-600 mb-1.5">
                          Animales equivalentes
                          <span className="font-normal text-gray-500">
                            {' '}
                            · 1 vacuno = 1 · 1 ovino = 0,16
                          </span>
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <label className="block">
                            <span className="text-[11px] text-gray-500">Vacunos</span>
                            <input
                              inputMode="decimal"
                              value={c.vacunos}
                              onChange={(e) => updateCampo(c.id, { vacunos: e.target.value })}
                              placeholder="0"
                              className="mt-1 w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02C951]/30 focus:border-[#02C951]"
                            />
                          </label>
                          <label className="block">
                            <span className="text-[11px] text-gray-500">Ovinos</span>
                            <input
                              inputMode="decimal"
                              value={c.ovinos}
                              onChange={(e) => updateCampo(c.id, { ovinos: e.target.value })}
                              placeholder="0"
                              className="mt-1 w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02C951]/30 focus:border-[#02C951]"
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Equivale a <strong className="text-gray-800">{fmtNum(eq)}</strong> animales
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between gap-3 pt-3 border-t border-gray-200/80">
                      <span className="text-xs text-gray-500">{q.bandLabel}</span>
                      <span
                        className={`text-sm font-bold tabular-nums ${
                          q.kind === 'contact' ? 'text-[#2D5C64]' : 'text-gray-900'
                        }`}
                      >
                        {precioTxt}
                        {q.kind === 'usd' && (
                          <span className="text-xs font-normal text-gray-500 ml-1">{totalLabel}</span>
                        )}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            <button
              type="button"
              onClick={addCampo}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#2D5C64]/25 bg-white px-4 py-3 text-sm font-semibold text-[#2D5C64] hover:border-[#02C951] hover:bg-[#F0E8D8]/40 transition"
            >
              <Plus className="w-4 h-4" />
              Agregar campo
            </button>

            <div className="mt-5 flex items-start gap-2.5 text-sm text-gray-600 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <Info className="w-4 h-4 text-[#2D5C64] flex-shrink-0 mt-0.5" />
              <p>
                El total es la suma de cada campo. Si un establecimiento supera 10.000 ha o 10.000
                animales equivalentes,{' '}
                <a
                  href={contactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2D5C64] font-semibold hover:underline"
                >
                  Contáctanos
                </a>
                .
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 md:p-8">
            <h3 className="font-bold text-gray-900 mb-4">Todo lo que incluye</h3>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-gray-700">
              {included.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#02C951] flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {modalidad === 'sin' && (
              <p className="text-xs text-gray-500 mt-4">
                Sin Finanzas no incluye gastos, ventas ni facturas. Podés cambiar a Con Finanzas
                cuando quieras.
              </p>
            )}
          </div>
        </div>

        <div className="lg:sticky lg:top-24 self-start">
          <div className="bg-white rounded-2xl shadow-md border border-gray-200/80 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-[#2D5C64] via-[#02C951] to-[#2D5C64]" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-[#2D5C64]" />
                <h3 className="text-lg font-bold text-gray-900">Resumen</h3>
              </div>
              <p className="text-sm text-gray-500 mb-5">
                {campos.length === 1 ? '1 campo' : `${campos.length} campos`}
              </p>

              <div className="space-y-3 text-sm border-b border-gray-100 pb-5 mb-5">
                {quotes.map(({ campo, quote }, i) => {
                  const nom = campo.nombre.trim() || `Campo ${i + 1}`
                  const mag =
                    quote.unidad === 'ha'
                      ? `${fmtNum(quote.unidades)} ha`
                      : `${fmtNum(quote.unidades)} animales equivalentes`
                  return (
                    <div key={campo.id} className="flex justify-between gap-3">
                      <span className="text-gray-500 min-w-0">
                        <span className="font-medium text-gray-800 block truncate">{nom}</span>
                        <span className="text-xs">
                          {TIPO_LABEL[campo.tipo]} · {mag}
                        </span>
                      </span>
                      <span className="font-semibold text-gray-900 text-right shrink-0 tabular-nums">
                        {quote.kind === 'contact'
                          ? 'Contáctanos'
                          : `USD ${fmtUsd(cycle === 'monthly' ? quote.monthly : quote.monthly * 10)}`}
                      </span>
                    </div>
                  )
                })}
                <div className="flex justify-between gap-4 pt-1">
                  <span className="text-gray-500">Modalidad</span>
                  <span className="font-semibold text-gray-900">
                    {modalidad === 'con' ? 'Con Finanzas' : 'Sin Finanzas'}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Facturación</span>
                  <span className="font-semibold text-gray-900 text-right">
                    {cycle === 'monthly' ? 'Mensual' : 'Anual · 2 meses gratis'}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-baseline gap-3">
                  <span className="text-gray-600 font-medium">Total</span>
                  {needsContact ? (
                    <span className="text-2xl font-bold text-[#2D5C64]">Contáctanos</span>
                  ) : (
                    <span className="text-3xl font-bold text-[#2D5C64] tabular-nums">
                      USD {fmtUsd(displayTotal)}
                      <span className="text-sm font-normal text-gray-500 ml-1">{totalLabel}</span>
                    </span>
                  )}
                </div>
                {!needsContact && cycle === 'annual' && (
                  <p className="text-xs text-gray-500 text-right mt-1.5">
                    Equivale a USD {fmtUsd(displayTotal / 12)}/mes
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-2">Más impuestos aplicables</p>
              </div>

              <a
                href={contactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center bg-[#02C951] hover:bg-[#02b84a] text-white py-3.5 rounded-xl font-semibold transition shadow-sm"
              >
                {needsContact ? 'Contáctanos' : 'Continuar por WhatsApp'}
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
