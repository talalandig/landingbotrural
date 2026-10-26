'use client'

import { useState } from 'react'
import { Check, ShieldCheck, Sparkles } from 'lucide-react'
import Header from '../components/Header'

type Tipo = 'ganadera' | 'mixta' | 'agricola'
type Empresa = { tipo: Tipo; plus: boolean; vacunos: string; ovinos: string; hectareas: string }
const bands = [
  { max: 500, base: 32.99, plus: 46.99 },
  { max: 1000, base: 34.99, plus: 49.99 },
  { max: 1500, base: 46.99, plus: 66.99 },
  { max: 2500, base: 63.99, plus: 91.99 },
  { max: 4000, base: 78.99, plus: 111.99 },
  { max: 6000, base: 96.99, plus: 133.99 },
  { max: 10000, base: 108.99, plus: 153.99 },
]
const tipos: { value: Tipo; label: string; description: string }[] = [
  { value: 'ganadera', label: 'Ganadera', description: 'Vacunos y ovinos' },
  { value: 'mixta', label: 'Mixta', description: 'Ganadería y cosecha' },
  { value: 'agricola', label: 'Agrícola', description: 'Hectáreas de cosecha' },
]
const features = ['Campos ilimitados', 'Usuarios ilimitados', 'Datos ilimitados', 'Bot de WhatsApp', 'Ganadería y agricultura', 'Tareas, órdenes y recordatorios', 'Inventario', 'Mapa', 'Trazabilidad individual']
const nuevaEmpresa: Empresa = { tipo: 'ganadera', plus: false, vacunos: '', ovinos: '', hectareas: '' }
const numero = (value: string) => Math.max(0, Number(value.replace(',', '.')) || 0)
const usd = (value: number) => value.toLocaleString('es-UY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const cantidad = (value: number) => value.toLocaleString('es-UY', { maximumFractionDigits: 2 })

function cotizar(empresa: Empresa) {
  const pools = [
    { nombre: 'Ganadería', total: empresa.tipo !== 'agricola' ? numero(empresa.vacunos) + numero(empresa.ovinos) / 5 : 0, unidad: 'unidades ganaderas' },
    { nombre: 'Cosecha', total: empresa.tipo !== 'ganadera' ? numero(empresa.hectareas) : 0, unidad: 'hectáreas de cosecha' },
  ]
  return pools.filter(p => p.total > 0).map(p => {
    const band = bands.find(b => p.total <= b.max)
    return { ...p, mensual: band ? (empresa.plus ? band.plus : band.base) : null }
  })
}

export default function PricingPage() {
  const [anual, setAnual] = useState(false)
  const [empresa, setEmpresa] = useState<Empresa>(nuevaEmpresa)
  const [resultado, setResultado] = useState(false)
  const update = (patch: Partial<Empresa>) => setEmpresa(prev => ({ ...prev, ...patch }))
  const pools = cotizar(empresa)
  const contacto = pools.some(p => p.mensual === null)
  const mensual = Math.round(pools.reduce((total, p) => total + (p.mensual ?? 0), 0) * 100) / 100
  const total = Math.round(mensual * (anual ? 12 * 0.8 : 1) * 100) / 100
  const valido = pools.length > 0
  const mensaje = ['Hola, quiero contratar BotRural para mi empresa.', `Pago ${anual ? 'anual (20% de descuento)' : 'mensual'}.`, `Plan: ${empresa.plus ? 'BotRural Plus con finanzas' : 'BotRural'}. Empresa ${empresa.tipo}.`, empresa.tipo !== 'agricola' ? `Total: ${numero(empresa.vacunos)} vacunos y ${numero(empresa.ovinos)} ovinos.` : '', empresa.tipo !== 'ganadera' ? `Total: ${numero(empresa.hectareas)} hectáreas de cosecha.` : '', contacto ? 'Quiero una cotización personalizada.' : `Total: USD ${usd(total)}/${anual ? 'año' : 'mes'}.`].filter(Boolean).join('\n')

  const inputClass = 'mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-lg outline-none focus:border-[#2D5C64] focus:ring-2 focus:ring-[#2D5C64]/15'
  const cardClass = 'rounded-2xl border border-gray-200 bg-white p-5 sm:p-8 shadow-sm'

  return (
    <div className="min-h-screen bg-[#faf9f7] text-gray-900 pb-16">
      <Header />
      <section className="bg-[#234b52] px-5 py-12 text-center text-white sm:py-16">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm"><Sparkles size={16} className="text-[#02C951]" /> Precios BotRural</span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">Tu empresa, tu plan, tu precio.</h1>
        <p className="mx-auto mt-4 max-w-xl text-white/75">Contanos cómo trabajás y calculá tu precio en tres pasos.</p>
      </section>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <section className={cardClass}>
          <p className="text-sm font-semibold text-[#2D5C64]">PASO 1</p>
          <h2 className="mt-2 text-2xl font-bold">¿Cómo querés pagar?</h2>
          <p className="mt-2 text-sm text-gray-500">Elegí cómo pagar la suscripción de tu empresa.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[false, true].map(value => <button key={String(value)} type="button" aria-pressed={anual === value} onClick={() => setAnual(value)} className={`relative rounded-2xl border-2 p-6 text-left transition ${anual === value ? 'border-[#2D5C64] bg-[#f0f5f1]' : 'border-gray-200 hover:border-[#2D5C64]/50'}`}><span className="block text-xl font-bold">{value ? 'Anual' : 'Mensual'}</span><span className="mt-2 block text-sm text-gray-600">{value ? 'Un pago por todo el año.' : 'Se cobra todos los meses.'}</span>{value && <span className="mt-4 inline-block rounded-full bg-[#02C951]/15 px-3 py-1 text-sm font-bold text-[#21613b]">Ahorrás un 20%</span>}{anual === value && <Check size={20} className="absolute right-4 top-5 text-[#2D5C64]" />}</button>)}
          </div>
        </section>

        <section className={`${cardClass} mt-5`}>
          <p className="text-sm font-semibold text-[#2D5C64]">PASO 2</p>
          <h2 className="mt-2 text-2xl font-bold">¿Qué tipo de empresa tenés?</h2>
          <p className="mt-2 text-sm text-gray-500">Así te pedimos solo los datos que corresponden.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">{tipos.map(t => <button key={t.value} type="button" aria-pressed={empresa.tipo === t.value} onClick={() => update({ tipo: t.value })} className={`rounded-xl border-2 p-5 text-left ${empresa.tipo === t.value ? 'border-[#2D5C64] bg-[#f0f5f1]' : 'border-gray-200'}`}><span className="block text-lg font-bold">{t.label}</span><span className="mt-2 block text-sm text-gray-500">{t.description}</span></button>)}</div>
        </section>

        <div className="mt-5 space-y-5">
          <section className={cardClass}>
            <p className="text-sm font-semibold text-[#2D5C64]">PASO 3</p>
            <h2 className="mt-2 text-2xl font-bold">Contanos cuánto producís</h2>
            <p className="mt-2 text-sm text-gray-500">Ingresá los totales de tu empresa o grupo de campos una sola vez.</p>
            <div className="mt-6 rounded-2xl border border-gray-200 bg-[#fafbf9] p-4 sm:p-5">
              {empresa.tipo !== 'agricola' && <><div className="grid grid-cols-2 gap-3">{(['vacunos', 'ovinos'] as const).map(key => <label key={key} className="text-sm font-semibold">{key === 'vacunos' ? 'Vacunos' : 'Ovinos'}<input type="number" min="0" step="1" inputMode="numeric" placeholder="0" value={empresa[key]} onChange={e => update({ [key]: e.target.value })} className={inputClass} /></label>)}</div><p className="mt-2 text-xs text-gray-500">1 vacuno = 1 unidad · 5 ovinos = 1 unidad.</p></>}
              {empresa.tipo !== 'ganadera' && <label className="mt-5 block text-sm font-semibold">Hectáreas de cosecha<div className="relative"><input type="number" min="0" step="any" inputMode="decimal" placeholder="0" value={empresa.hectareas} onChange={e => update({ hectareas: e.target.value })} className={`${inputClass} pr-24`} /><span className="absolute right-4 top-6 text-sm font-normal text-gray-400">hectáreas</span></div><span className="mt-2 block text-xs font-normal leading-relaxed text-gray-500">Solo las que destinás para cosecha. No cuentan pasturas ni verdeos para el ganado.</span></label>}
              <div className="mt-5 border-t border-gray-200 pt-5">
                <p className="text-sm font-semibold text-[#2D5C64]">BotRural incluye toda la gestión de tu empresa</p>
                <label className={`mt-3 flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition ${empresa.plus ? 'border-[#2D5C64] bg-[#edf5ee]' : 'border-gray-200 bg-white hover:border-[#2D5C64]/40'}`}>
                  <input type="checkbox" checked={empresa.plus} onChange={e => update({ plus: e.target.checked })} className="mt-1 h-5 w-5 shrink-0 accent-[#2D5C64]" />
                  <span className="flex-1"><span className="flex flex-wrap items-center justify-between gap-2"><strong className="text-base">Agregar finanzas</strong><span className="rounded-full bg-[#2D5C64] px-2.5 py-1 text-xs font-semibold text-white">BotRural Plus</span></span><span className="mt-2 block text-sm leading-relaxed text-gray-500">Sumá facturas de gastos y ventas e informes financieros para toda tu empresa.</span>{empresa.plus && <span className="mt-2 flex items-center gap-1 text-xs font-semibold text-[#21613b]"><Check size={14} /> Finanzas agregadas · BotRural Plus activado</span>}</span>
                </label>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-gray-500">Sumá los vacunos, ovinos y hectáreas de cosecha de toda tu empresa. Después podés administrar tus campos y tu equipo dentro de BotRural. Las hectáreas de cosecha se calculan por separado.</p>
            <button type="button" disabled={!valido} onClick={() => setResultado(true)} className="mt-6 w-full rounded-xl bg-[#02C951] py-4 font-bold text-[#123b22] disabled:cursor-not-allowed disabled:opacity-40">Calcular mi precio</button>
            {!valido && <p className="mt-2 text-center text-xs text-gray-500">Ingresá al menos una cantidad mayor a cero para tu empresa.</p>}
          </section>
          {resultado && valido && <section aria-live="polite" className="rounded-2xl bg-[#234b52] p-6 text-white sm:p-8">
            <span className="flex items-center gap-2 text-sm text-white/70"><ShieldCheck size={18} /> Tu cotización personalizada</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{contacto ? 'Hablemos de tu empresa' : `USD ${usd(total)}`} {!contacto && <span className="text-base font-normal text-white/60">/{anual ? 'año' : 'mes'}</span>}</h2>
            {contacto ? <p className="mt-3 text-sm text-white/75">Superás las 10.000 unidades ganaderas o hectáreas de cosecha. Te preparamos una propuesta a medida.</p> : anual ? <p className="mt-3 text-sm text-white/80">Un pago anual · Equivale a USD {usd(total / 12)}/mes.<br /><span className="text-[#7ce8a6]">Ahorrás USD {usd(mensual * 12 - total)} al año (20%).</span></p> : <p className="mt-3 text-sm text-white/75">Se cobra todos los meses.</p>}
            <div className="mt-6 space-y-3 border-t border-white/15 pt-5">{pools.map(p => <div key={p.nombre} className="flex flex-wrap justify-between gap-2 text-sm"><span>{cantidad(p.total)} {p.unidad}</span><span className="font-semibold">{p.mensual === null ? 'Contactanos' : `USD ${usd(p.mensual * (anual ? 9.6 : 1))}/${anual ? 'año' : 'mes'}`}</span></div>)}</div>
            <p className="mt-4 text-xs text-white/60">{empresa.plus ? 'BotRural Plus · Finanzas incluidas' : 'BotRural'} · Para toda tu empresa</p>
            {!contacto && <p className="mt-3 text-xs text-white/60">Más impuestos aplicables.</p>}
            <a href={`https://wa.me/59899465242?text=${encodeURIComponent(mensaje)}`} target="_blank" rel="noopener noreferrer" className="mt-6 block rounded-xl bg-[#02C951] px-4 py-4 text-center font-bold text-[#123b22]">{contacto ? 'Pedir mi propuesta por WhatsApp' : 'Continuar por WhatsApp'}</a>
          </section>}
        </div>

        <section className={`${cardClass} mt-8`}><h2 className="text-xl font-bold">Todo esto ya está incluido</h2><p className="mt-2 text-sm text-gray-500">En BotRural y BotRural Plus, para toda tu empresa.</p><ul className="mt-5 grid gap-3 sm:grid-cols-2">{features.map(feature => <li key={feature} className="flex items-center gap-2 text-sm"><Check size={16} className="shrink-0 text-[#16864a]" />{feature}</li>)}</ul><div className="mt-6 rounded-xl bg-[#f0f5f1] p-4 text-sm text-[#2D5C64]"><span className="flex items-center gap-2 font-semibold"><Check size={18} /> Finanzas con BotRural Plus</span><span className="mt-2 block text-gray-600">Un agregado opcional: marcá «Agregar finanzas» para toda tu empresa.</span></div></section>
        <div className="mt-6 rounded-xl border border-[#2D5C64]/15 p-5 text-sm leading-relaxed text-gray-600"><strong className="text-[#2D5C64]">Tu producción puede crecer.</strong> Si te pasás de rango, no se bloquea el servicio. Te avisamos y ajustamos el precio al renovar.</div>
      </main>
    </div>
  )
}
