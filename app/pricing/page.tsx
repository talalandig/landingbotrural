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
  modalidad: Modalidad
  hectareas: string
  vacunos: string
  ovinos: string
}

type PrecioPool =
  | {
      kind: 'usd'
      monthly: number
      bandLabel: string
      unidades: number
      unidad: string
      detalle: string
    }
  | { kind: 'contact'; bandLabel: string; unidades: number; unidad: string; detalle: string }

const OVINO_EQ = 0.16
const WHATSAPP_NUMBER = '59899465242'

const BANDS: { max: number; con: number; sin: number; rango: string; labelHa: string; labelAn: string }[] = [
  { max: 500, con: 34.99, sin: 24.49, rango: '0 – 500', labelHa: '0 – 500 ha', labelAn: '0 – 500 animales' },
  { max: 1000, con: 54.99, sin: 38.49, rango: '500 – 1.000', labelHa: '500 – 1.000 ha', labelAn: '500 – 1.000 animales' },
  { max: 2000, con: 64.99, sin: 45.49, rango: '1.000 – 2.000', labelHa: '1.000 – 2.000 ha', labelAn: '1.000 – 2.000 animales' },
  { max: 5000, con: 74.99, sin: 52.49, rango: '2.000 – 5.000', labelHa: '2.000 – 5.000 ha', labelAn: '2.000 – 5.000 animales' },
  { max: 7500, con: 84.99, sin: 59.49, rango: '5.000 – 7.500', labelHa: '5.000 – 7.500 ha', labelAn: '5.000 – 7.500 animales' },
  { max: 10000, con: 94.99, sin: 66.49, rango: '7.500 – 10.000', labelHa: '7.500 – 10.000 ha', labelAn: '7.500 – 10.000 animales' },
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

const INCLUDED_FINANZAS =
  'Finanzas: facturas de gastos y ventas, e informes de dinero del ejercicio'

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
    modalidad: 'con',
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

function detalleMix(con: number, sin: number, u: string): string {
  const total = con + sin
  if (con > 0 && sin > 0) {
    return `${fmtNum(total)} ${u} en total · tarifa Con Finanzas`
  }
  if (con > 0) return `${fmtNum(con)} ${u} · tarifa Con Finanzas`
  if (sin > 0) return `${fmtNum(sin)} ${u} · tarifa Sin Finanzas`
  return `0 ${u}`
}

function cotizarPool(
  unidadesCon: number,
  unidadesSin: number,
  unidad: 'ha' | 'animales eq.'
): PrecioPool | null {
  const unidades = unidadesCon + unidadesSin
  if (unidades <= 0) return null
  const esHa = unidad === 'ha'
  const detalle = detalleMix(unidadesCon, unidadesSin, esHa ? 'ha' : 'an. eq.')
  if (unidades > 10000) {
    return {
      kind: 'contact',
      bandLabel: esHa ? '+10.000 ha' : '+10.000 animales eq.',
      unidades,
      unidad,
      detalle,
    }
  }
  const band = BANDS.find((b) => unidades <= b.max) ?? BANDS[BANDS.length - 1]
  const monthly = unidadesCon > 0 ? band.con : band.sin
  return {
    kind: 'usd',
    monthly,
    bandLabel: esHa ? band.labelHa : band.labelAn,
    unidades,
    unidad,
    detalle,
  }
}

function montoPool(p: PrecioPool, cycle: Cycle): number | null {
  if (p.kind !== 'usd') return null
  return cycle === 'monthly' ? p.monthly : p.monthly * 10
}

type PoolLinea = { titulo: string; quote: PrecioPool }

function armarPools(campos: CampoDraft[]): PoolLinea[] {
  let aniCon = 0
  let aniSin = 0
  let haCon = 0
  let haSin = 0
  for (const c of campos) {
    if (c.tipo === 'agricultura') {
      const u = parseNum(c.hectareas)
      if (c.modalidad === 'con') haCon += u
      else haSin += u
    } else {
      const u = equivalentes(c)
      if (c.modalidad === 'con') aniCon += u
      else aniSin += u
    }
  }
  const out: PoolLinea[] = []
  const ani = cotizarPool(aniCon, aniSin, 'animales eq.')
  if (ani) out.push({ titulo: 'Ganadería / Mixto', quote: ani })
  const ha = cotizarPool(haCon, haSin, 'ha')
  if (ha) out.push({ titulo: 'Agricultura', quote: ha })
  return out
}

export default function PricingPage() {
  const [campos, setCampos] = useState<CampoDraft[]>(() => [newCampo(1)])
  const [cycle, setCycle] = useState<Cycle>('monthly')

  const pools = armarPools(campos)
  const hayCon = campos.some((c) => c.modalidad === 'con')
  const haySin = campos.some((c) => c.modalidad === 'sin')
  const needsContact = pools.some((p) => p.quote.kind === 'contact')
  const monthlyTotal = pools.reduce(
    (s, p) => s + (p.quote.kind === 'usd' ? p.quote.monthly : 0),
    0
  )
  const displayTotal = cycle === 'monthly' ? monthlyTotal : monthlyTotal * 10
  const totalLabel = cycle === 'monthly' ? '/mes' : '/año'

  const included = hayCon ? [...INCLUDED_BASE, INCLUDED_FINANZAS] : INCLUDED_BASE

  const contactUrl = useMemo(() => {
    const billing = cycle === 'monthly' ? 'mensual' : 'anual'
    const lineasCampos = campos.map((campo, i) => {
      const nom = campo.nombre.trim() || `Campo ${i + 1}`
      const mag =
        campo.tipo === 'agricultura'
          ? `${fmtNum(parseNum(campo.hectareas))} ha`
          : `${fmtNum(equivalentes(campo))} animales eq.`
      const mod = campo.modalidad === 'con' ? 'Con Finanzas' : 'Sin Finanzas'
      return `• ${nom} (${TIPO_LABEL[campo.tipo]}, ${mod}): ${mag}`
    })
    const lineasPool = pools.map(({ titulo, quote }) => {
      if (quote.kind === 'contact') {
        return `Pool ${titulo}: ${fmtNum(quote.unidades)} ${quote.unidad} — Contáctanos`
      }
      const precio = cycle === 'monthly' ? quote.monthly : quote.monthly * 10
      return `Pool ${titulo}: ${quote.detalle} (${quote.bandLabel}) — USD ${fmtUsd(precio)}${totalLabel}`
    })
    const totalTxt = needsContact
      ? 'Total: Contáctanos (+10.000 en el pool)'
      : `Total: USD ${fmtUsd(displayTotal)} ${totalLabel}`
    const message = [
      'Hola, quiero BotRural.',
      `Facturación ${billing}`,
      ...lineasCampos,
      ...lineasPool,
      totalTxt,
    ].join('\n')
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }, [campos, pools, cycle, needsContact, displayTotal, totalLabel])

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
    <div className="min-h-screen bg-[#faf9f7] text-gray-900 pb-20 sm:pb-16">
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

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 xl:pr-20 py-10 md:py-14 grid grid-cols-1 xl:grid-cols-[minmax(0,1.15fr)_minmax(280px,340px)_340px] gap-6 lg:gap-7">
        <div className="space-y-5 min-w-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-5 md:p-7">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Tus campos</h2>
              <p className="text-sm text-gray-500 mt-1">
                Podés contratar uno solo y sumar establecimientos después. Con o Sin Finanzas se elige en cada campo.
              </p>
            </div>

            <div className="space-y-4">
              {campos.map((c, i) => {
                const esAgri = c.tipo === 'agricultura'
                const eq = equivalentes(c)
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

                    <div className="grid grid-cols-3 gap-1.5 mb-3">
                      {(['ganaderia', 'mixto', 'agricultura'] as TipoCampo[]).map((t) => {
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

                    <div className="inline-flex w-full sm:w-auto items-center bg-white rounded-full p-1 text-xs font-medium border border-gray-200 mb-4">
                      <button
                        type="button"
                        onClick={() => updateCampo(c.id, { modalidad: 'con' })}
                        className={`flex-1 sm:flex-none px-3 py-1.5 rounded-full transition ${
                          c.modalidad === 'con' ? 'bg-[#F0E8D8] text-[#2D5C64] shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Con Finanzas
                      </button>
                      <button
                        type="button"
                        onClick={() => updateCampo(c.id, { modalidad: 'sin' })}
                        className={`flex-1 sm:flex-none px-3 py-1.5 rounded-full transition ${
                          c.modalidad === 'sin' ? 'bg-[#F0E8D8] text-[#2D5C64] shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Sin Finanzas
                      </button>
                    </div>
                    {c.modalidad === 'sin' && (
                      <p className="text-[11px] text-gray-500 -mt-2 mb-3">
                        Ventas y compras de animales sin montos. No incluye facturas ni informes de dinero del ejercicio.
                      </p>
                    )}

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

                    <p className="mt-3 pt-3 border-t border-gray-200/80 text-xs text-gray-500">
                      {esAgri
                        ? `Suma al pool Agricultura: ${fmtNum(parseNum(c.hectareas))} ha`
                        : `Suma al pool Ganadería / Mixto: ${fmtNum(eq)} an. eq.`}
                    </p>
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
                Agricultura: se suman todas las ha en un pool. Ganadería/Mixto: todos los
                animales eq. en otro. Un campo Sin Finanzas suma a ese total; no resta. Si hay
                algún Con Finanzas en el pool, la tarifa es Con (no un promedio). Si un pool
                supera 10.000,{' '}
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
            {haySin && (
              <p className="text-xs text-gray-500 mt-4">
                En los campos Sin Finanzas las ventas y compras de animales van sin montos. No
                incluye facturas de gastos/ventas ni los informes de dinero del ejercicio. Podés
                pasar ese campo a Con Finanzas cuando quieras.
              </p>
            )}
          </div>
        </div>

        <div className="xl:sticky xl:top-24 self-start space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-5">
            <h3 className="font-bold text-gray-900">Rangos</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              Ganadería / Mixto en <strong className="font-semibold text-gray-700">animales eq.</strong>
              {' · '}
              Agricultura en <strong className="font-semibold text-gray-700">ha</strong>.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="font-medium pb-2 pr-2">
                      Rango
                      <span className="block font-normal text-[10px] text-gray-400">an. eq. / ha</span>
                    </th>
                    <th
                      className={`font-medium pb-2 pr-2 text-right ${
                        hayCon ? 'text-[#2D5C64]' : ''
                      }`}
                    >
                      Con finanzas
                    </th>
                    <th
                      className={`font-medium pb-2 text-right ${
                        haySin ? 'text-[#2D5C64]' : ''
                      }`}
                    >
                      Sin finanzas
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {BANDS.map((b) => (
                    <tr key={b.max} className="border-t border-gray-100">
                      <td className="py-2 pr-2 text-gray-700">
                        <span className="whitespace-nowrap">{b.rango} an. eq.</span>
                        <span className="block text-[10px] text-gray-400 whitespace-nowrap">{b.rango} ha</span>
                      </td>
                      <td
                        className={`py-2 pr-2 text-right tabular-nums ${
                          hayCon ? 'font-semibold text-gray-900' : 'text-gray-500'
                        }`}
                      >
                        USD {fmtUsd(b.con)}
                      </td>
                      <td
                        className={`py-2 text-right tabular-nums ${
                          haySin ? 'font-semibold text-gray-900' : 'text-gray-500'
                        }`}
                      >
                        USD {fmtUsd(b.sin)}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-gray-100">
                    <td className="py-2 pr-2 text-gray-700">
                      <span className="whitespace-nowrap">+10.000 an. eq.</span>
                      <span className="block text-[10px] text-gray-400 whitespace-nowrap">+10.000 ha</span>
                    </td>
                    <td colSpan={2} className="py-2 text-right font-semibold text-[#2D5C64]">
                      Contáctanos
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-gray-400 mt-3 leading-relaxed">
              Un rango por pool (no por campo), por mes. El anual aplica 2 meses gratis sobre el total.
            </p>
          </div>
        </div>

        <div className="xl:sticky xl:top-24 self-start">
          <div className="bg-white rounded-2xl shadow-md border border-gray-200/80 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-[#2D5C64] via-[#02C951] to-[#2D5C64]" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-[#2D5C64]" />
                <h3 className="text-lg font-bold text-gray-900">Resumen</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                {campos.length === 1 ? '1 campo' : `${campos.length} campos`}
              </p>

              <div className="mb-5">
                <p className="text-xs font-medium text-gray-500 mb-2">Facturación (todos los campos)</p>
                <div className="inline-flex w-full items-center bg-gray-100 rounded-full p-1 text-sm font-medium">
                  <button
                    type="button"
                    onClick={() => setCycle('monthly')}
                    className={`flex-1 px-3 py-1.5 rounded-full transition ${
                      cycle === 'monthly' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Mensual
                  </button>
                  <button
                    type="button"
                    onClick={() => setCycle('annual')}
                    className={`flex-1 px-3 py-1.5 rounded-full transition flex items-center justify-center gap-1.5 ${
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

              <div className="space-y-3 text-sm border-b border-gray-100 pb-5 mb-5">
                {campos.map((campo, i) => {
                  const nom = campo.nombre.trim() || `Campo ${i + 1}`
                  const mag =
                    campo.tipo === 'agricultura'
                      ? `${fmtNum(parseNum(campo.hectareas))} ha`
                      : `${fmtNum(equivalentes(campo))} an. eq.`
                  return (
                    <div key={campo.id} className="flex justify-between gap-3">
                      <span className="text-gray-500 min-w-0">
                        <span className="font-medium text-gray-800 block truncate">{nom}</span>
                        <span className="text-xs">
                          {TIPO_LABEL[campo.tipo]} · {campo.modalidad === 'con' ? 'Con Finanzas' : 'Sin Finanzas'} · {mag}
                        </span>
                      </span>
                    </div>
                  )
                })}
                {pools.map(({ titulo, quote }, idx) => (
                  <div
                    key={titulo}
                    className={`flex justify-between gap-3 ${idx === 0 ? 'pt-2 border-t border-gray-100' : ''}`}
                  >
                    <span className="text-gray-500 min-w-0">
                      <span className="font-medium text-gray-800 block">Pool {titulo}</span>
                      <span className="text-xs">
                        {quote.detalle} · {quote.bandLabel}
                      </span>
                    </span>
                    <span className="font-semibold text-gray-900 text-right shrink-0 tabular-nums">
                      {quote.kind === 'contact'
                        ? 'Contáctanos'
                        : `USD ${fmtUsd(montoPool(quote, cycle)!)}`}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between gap-4 pt-1">
                  <span className="text-gray-500">Modalidad</span>
                  <span className="font-semibold text-gray-900 text-right">
                    {hayCon && haySin ? 'Mixto por campo' : hayCon ? 'Con Finanzas' : 'Sin Finanzas'}
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
