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
  const update = (patch: Partial<Empresa>) => setEmpresa(prev => ({ ...prev, ...patch }))
  const pools = cotizar(empresa)
  const contacto = pools.some(p => p.mensual === null)
  const mensual = Math.round(pools.reduce((total, p) => total + (p.mensual ?? 0), 0) * 100) / 100
  const total = Math.round(mensual * (anual ? 12 * 0.8 : 1) * 100) / 100
  const valido = pools.length > 0
  const mensaje = ['Hola, quiero contratar BotRural para mi empresa.', `Pago ${anual ? 'anual (20% de descuento)' : 'mensual'}.`, `Plan: ${empresa.plus ? 'BotRural Plus con finanzas' : 'BotRural'}. Empresa ${empresa.tipo}.`, empresa.tipo !== 'agricola' ? `Total: ${numero(empresa.vacunos)} vacunos y ${numero(empresa.ovinos)} ovinos.` : '', empresa.tipo !== 'ganadera' ? `Total: ${numero(empresa.hectareas)} hectáreas de cosecha.` : '', contacto ? 'Quiero una cotización personalizada.' : `Total: USD ${usd(total)}/${anual ? 'año' : 'mes'}.`].filter(Boolean).join('\n')

  const inputClass = 'mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-base outline-none focus:border-[#2D5C64] focus:ring-2 focus:ring-[#2D5C64]/15'
  const cardClass = 'rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm'

  return (
    <div className="min-h-screen bg-[#faf9f7] text-gray-900 pb-16">
      <Header />
      <section className="bg-[#234b52] px-4 py-7 text-center text-white sm:py-9">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs"><Sparkles size={16} className="text-[#02C951]" /> Precios BotRural</span>
        <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">Tu empresa, tu plan, tu precio.</h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/75">Contanos cómo trabajás y calculá tu precio en tres pasos.</p>
      </section>

      <main className="mx-auto grid max-w-6xl items-start gap-4 px-4 pt-5 pb-28 md:grid-cols-[minmax(0,1fr)_300px] lg:gap-6 lg:pt-7">
        <div>
        <section className={cardClass}>
          <p className="text-xs font-semibold tracking-wide text-[#2D5C64]">PASO 1</p>
          <h2 className="mt-1 text-lg font-bold sm:text-xl">¿Cómo querés pagar?</h2>
          <p className="mt-1.5 text-sm text-gray-500">Elegí cómo pagar la suscripción de tu empresa.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[false, true].map(value => <button key={String(value)} type="button" aria-pressed={anual === value} onClick={() => setAnual(value)} className={`relative rounded-xl border-2 px-3 py-3 text-left transition sm:px-4 ${anual === value ? 'border-[#2D5C64] bg-[#f0f5f1]' : 'border-gray-200 hover:border-[#2D5C64]/50'}`}><span className="block text-base font-semibold">{value ? 'Anual' : 'Mensual'}</span><span className="mt-1 block text-xs leading-relaxed text-gray-600">{value ? 'Un pago por todo el año.' : 'Se cobra todos los meses.'}</span>{value && <span className="mt-2 inline-block rounded-full bg-[#02C951]/15 px-2 py-0.5 text-xs font-semibold text-[#21613b]">Ahorrás un 20%</span>}{anual === value && <Check size={20} className="absolute right-3 top-3 text-[#2D5C64]" />}</button>)}
          </div>
        </section>

        <section className={`${cardClass} mt-3`}>
          <p className="text-xs font-semibold tracking-wide text-[#2D5C64]">PASO 2</p>
          <h2 className="mt-1 text-lg font-bold sm:text-xl">¿Qué tipo de empresa tenés?</h2>
          <p className="mt-1.5 text-sm text-gray-500">Así te pedimos solo los datos que corresponden.</p>
          <div className="mt-4 grid grid-cols-3 gap-2">{tipos.map(t => <button key={t.value} type="button" aria-pressed={empresa.tipo === t.value} onClick={() => update({ tipo: t.value })} className={`min-w-0 rounded-xl border-2 px-2 py-3 text-left sm:px-3 ${empresa.tipo === t.value ? 'border-[#2D5C64] bg-[#f0f5f1]' : 'border-gray-200'}`}><span className="block text-sm font-semibold">{t.label}</span><span className="mt-1 block text-[11px] leading-relaxed text-gray-500">{t.description}</span></button>)}</div>
        </section>

        <div className="mt-3 space-y-3">
          <section className={cardClass}>
            <h2 className="mt-1 text-lg font-bold sm:text-xl">El tamaño de tu operación</h2>
            <p className="mt-1.5 text-sm text-gray-500">Sumamos las cantidades para ubicarte en un rango de precio.</p>
            <div className="mt-4 rounded-xl bg-[#fafbf9] p-3 sm:p-4">
              {empresa.tipo !== 'agricola' && <><div className="grid grid-cols-2 gap-3">{(['vacunos', 'ovinos'] as const).map(key => <label key={key} className="text-sm font-semibold">{key === 'vacunos' ? 'Cantidad promedio de vacunos' : 'Ovinos'}<input type="number" min="0" step="1" inputMode="numeric" placeholder="0" value={empresa[key]} onChange={e => update({ [key]: e.target.value })} className={inputClass} /></label>)}</div><p className="mt-2 text-xs text-gray-500">1 vacuno = 1 unidad · 5 ovinos = 1 unidad.</p></>}
              {empresa.tipo !== 'ganadera' && <label className="mt-4 block text-sm font-semibold">Hectáreas de cosecha<div className="relative"><input type="number" min="0" step="any" inputMode="decimal" placeholder="0" value={empresa.hectareas} onChange={e => update({ hectareas: e.target.value })} className={`${inputClass} pr-24`} /><span className="absolute right-3 top-5 text-sm font-normal text-gray-400">hectáreas</span></div><span className="mt-2 block text-xs font-normal leading-relaxed text-gray-500">Solo las que destinás para cosecha. No cuentan pasturas ni verdeos para el ganado.</span></label>}
              <div className="mt-4 border-t border-gray-200 pt-4">
                <p className="text-sm font-semibold text-[#2D5C64]">BotRural incluye toda la gestión de tu empresa</p>
                <label className={`mt-3 flex cursor-pointer items-start gap-3 rounded-xl border-2 p-3 transition ${empresa.plus ? 'border-[#2D5C64] bg-[#edf5ee]' : 'border-gray-200 bg-white hover:border-[#2D5C64]/40'}`}>
                  <input type="checkbox" checked={empresa.plus} onChange={e => update({ plus: e.target.checked })} className="mt-1 h-5 w-5 shrink-0 accent-[#2D5C64]" />
                  <span className="flex-1"><span className="flex flex-wrap items-center justify-between gap-2"><strong className="text-base">Agregar finanzas</strong><span className="rounded-full bg-[#2D5C64] px-2.5 py-1 text-xs font-semibold text-white">BotRural Plus</span></span><span className="mt-2 block text-sm leading-relaxed text-gray-500">Sumá facturas de gastos y ventas e informes financieros para toda tu empresa.</span>{empresa.plus && <span className="mt-2 flex items-center gap-1 text-xs font-semibold text-[#21613b]"><Check size={14} /> Finanzas agregadas · BotRural Plus activado</span>}</span>
                </label>
              </div>
            </div>
          </section>

        </div>

        <section className={`${cardClass} mt-4`}><h2 className="text-xl font-bold">Todo esto ya está incluido</h2><p className="mt-1.5 text-sm text-gray-500">En BotRural y BotRural Plus, para toda tu empresa.</p><ul className="mt-4 grid gap-2 sm:grid-cols-2">{features.map(feature => <li key={feature} className="flex items-center gap-2 text-sm"><Check size={16} className="shrink-0 text-[#16864a]" />{feature}</li>)}</ul><div className="mt-4 rounded-xl bg-[#f0f5f1] p-3 text-sm text-[#2D5C64]"><span className="flex items-center gap-2 font-semibold"><Check size={18} /> Finanzas con BotRural Plus</span><span className="mt-2 block text-gray-600">Un agregado opcional: marcá «Agregar finanzas» para toda tu empresa.</span></div></section>
        <div className="mt-4 rounded-xl border border-[#2D5C64]/15 p-4 text-sm leading-relaxed text-gray-600"><strong className="text-[#2D5C64]">Tu producción puede crecer.</strong> Si te pasás de rango, no se bloquea el servicio. Te avisamos y ajustamos el precio al renovar.</div>
        </div>
        <aside aria-label="Resumen de tu suscripción" className="self-start md:sticky md:top-24">
          <div className="overflow-hidden rounded-2xl border border-[#2D5C64]/15 bg-white shadow-lg shadow-[#234b52]/5">
            <div className="bg-[#f0f5f1] p-4">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#2D5C64]"><ShieldCheck size={16} /> Tu suscripción</span>
              <div className="mt-3 flex items-center justify-between gap-2"><h2 className="text-2xl font-bold text-[#234b52]">BotRural{empresa.plus ? ' Plus' : ''}</h2><span className="rounded-full border border-[#2D5C64]/20 bg-white px-3 py-1 text-xs font-semibold text-[#2D5C64]">{anual ? 'Anual' : 'Mensual'}</span></div>
              <p className="mt-1.5 text-sm text-gray-500">Una suscripción para toda tu empresa.</p>
            </div>
            <div className="p-4">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-gray-500">Empresa</dt><dd className="font-semibold">{tipos.find(t => t.value === empresa.tipo)?.label}</dd></div>
                {empresa.tipo !== 'agricola' && <><div className="flex justify-between"><dt className="text-gray-500">Vacunos</dt><dd className="font-semibold tabular-nums">{cantidad(numero(empresa.vacunos))}</dd></div><div className="flex justify-between"><dt className="text-gray-500">Ovinos</dt><dd className="font-semibold tabular-nums">{cantidad(numero(empresa.ovinos))}</dd></div></>}
                {empresa.tipo !== 'ganadera' && <div className="flex justify-between"><dt className="text-gray-500">Hectáreas de cosecha</dt><dd className="font-semibold tabular-nums">{cantidad(numero(empresa.hectareas))}</dd></div>}
                <div className="flex justify-between"><dt className="text-gray-500">Finanzas</dt><dd className="font-semibold text-[#2D5C64]">{empresa.plus ? 'Incluidas' : 'Sin agregar'}</dd></div>
              </dl>
              {valido && <div className="mt-5 space-y-2 border-t border-gray-100 pt-4">{pools.map(pool => <p key={pool.nombre} className="flex justify-between gap-2 text-xs text-gray-500"><span>{pool.nombre}</span><span>{cantidad(pool.total)} {pool.unidad}</span></p>)}</div>}
              <div aria-live="polite" aria-atomic="true" className="mt-4 border-t border-gray-100 pt-4">
                {!valido ? <><p className="text-xl font-bold text-[#234b52]">Tu precio aparece acá</p><p className="mt-2 text-sm leading-relaxed text-gray-500">Ingresá tus cantidades. El total se actualiza automáticamente.</p></> : contacto ? <><p className="text-2xl font-bold text-[#234b52]">Una propuesta a tu medida</p><p className="mt-1.5 text-sm text-gray-500">Superás las 10.000 unidades ganaderas o hectáreas de cosecha. Contactanos para cotizar.</p></> : <><p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{anual ? 'Equivalente mensual' : 'Total mensual'}</p><p className="mt-2 text-4xl font-bold tracking-tight text-[#234b52]">USD {usd(anual ? total / 12 : total)}<span className="ml-1 text-sm font-normal text-gray-500">/mes</span></p>{anual ? <><p className="mt-3 text-sm text-gray-600">Un pago de <strong>USD {usd(total)}</strong> por año.</p><p className="mt-3 inline-flex items-center gap-1 rounded-lg bg-[#eaf6ed] px-3 py-2 text-xs font-semibold text-[#21613b]"><Check size={14} /> Ahorrás USD {usd(mensual * 12 - total)} al año · 20%</p></> : <p className="mt-3 text-sm text-gray-500">Se cobra todos los meses.</p>}<p className="mt-3 text-xs text-gray-400">Más impuestos aplicables.</p></>}
              </div>
              {valido ? <a href={`https://wa.me/59899465242?text=${encodeURIComponent(mensaje)}`} target="_blank" rel="noopener noreferrer" className="mt-4 block rounded-xl bg-[#2D5C64] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#234b52]">{contacto ? 'Pedir una propuesta' : 'Continuar por WhatsApp'}</a> : <button type="button" disabled className="mt-4 w-full rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-400">Completá tus cantidades</button>}
            </div>
          </div>
        </aside>
        <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-[#2D5C64]/15 bg-white px-4 py-3 shadow-lg md:hidden"><div><p className="text-xs text-gray-500">BotRural{empresa.plus ? ' Plus' : ''} · {anual ? 'Anual' : 'Mensual'}</p><p className="mt-1 font-bold text-[#234b52]">{!valido ? 'Ingresá tus cantidades' : contacto ? 'Contactanos' : `USD ${usd(anual ? total / 12 : total)}/mes`}</p></div>{valido && <a href={`https://wa.me/59899465242?text=${encodeURIComponent(mensaje)}`} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#2D5C64] px-4 py-3 text-sm font-semibold text-white">{contacto ? 'Consultar' : 'Continuar'}</a>}</div>
      </main>
    </div>
  )
}
