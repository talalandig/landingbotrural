'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import Header from '../components/Header'
import styles from './pricing.module.css'

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
const features = ['Campos ilimitados', 'Usuarios ilimitados', 'Bot de WhatsApp', 'Ganadería', 'Agricultura', 'Tareas, órdenes y recordatorios', 'Inventario', 'Mapa', 'Trazabilidad individual']
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

  const inputClass = styles.input
  const cardClass = styles.panel

  return (
    <div className={`${styles.page} min-h-screen text-black pb-16`}>
      <Header />
      <section className={styles.hero}>
        <span className={styles.eyebrow}>Precios BotRural</span>
        <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">Tu empresa, tu plan, tu precio.</h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/70">Contanos cómo trabajás y calculá tu precio en cuatro pasos.</p>
      </section>

      <main className={styles.workspace}>
        <div>
        <section className={cardClass}>
          <p className={styles.step}>Paso 1</p>
          <h2 className="mt-1 text-lg font-bold sm:text-xl">¿Cómo querés pagar?</h2>
          <p className="mt-1.5 text-sm text-gray-500">Elegí cómo pagar la suscripción de tu empresa.</p>
          <div className={styles.billing}>
            {[false, true].map(value => <button key={String(value)} type="button" aria-pressed={anual === value} onClick={() => setAnual(value)} className={`${styles.option} relative rounded-xl border-2 px-3 py-3 text-left transition sm:px-4 ${anual === value ? 'border-[#2D5C64] bg-[#2D5C64]/10' : 'border-gray-200 hover:border-[#2D5C64]/50'}`}><span className="block text-base font-semibold">{value ? 'Anual' : 'Mensual'}</span><span className="mt-1 block text-xs leading-relaxed text-gray-600">{value ? 'Un pago por todo el año.' : 'Se cobra todos los meses.'}</span>{value && <span className="mt-2 inline-block rounded-full bg-[#00DD59]/15 px-2 py-0.5 text-xs font-semibold text-[#2D5C64]">Ahorrás un 20%</span>}{anual === value && <Check size={20} className="absolute right-3 top-3 text-[#2D5C64]" />}</button>)}
          </div>
        </section>

        <section className={`${cardClass} mt-3`}>
          <p className={styles.step}>Paso 2</p>
          <h2 className="mt-1 text-lg font-bold sm:text-xl">¿Qué tipo de empresa tenés?</h2>
          <p className="mt-1.5 text-sm text-gray-500">Así te pedimos solo los datos que corresponden.</p>
          <div className="mt-4 grid grid-cols-3 gap-2">{tipos.map(t => <button key={t.value} type="button" aria-pressed={empresa.tipo === t.value} onClick={() => update({ tipo: t.value })} className={`${styles.option} min-w-0 rounded-xl border-2 px-2 py-3 text-left sm:px-3 ${empresa.tipo === t.value ? 'border-[#2D5C64] bg-[#2D5C64]/10' : 'border-gray-200'}`}><span className="block text-sm font-semibold">{t.label}</span><span className="mt-1 block text-[11px] leading-relaxed text-gray-500">{t.description}</span></button>)}</div>
        </section>

        <div className="mt-3 space-y-3">
          <section className={cardClass}>
            <p className={styles.step}>Paso 3</p>
            <h2 className="mt-1 text-lg font-bold sm:text-xl">El tamaño de tu operación</h2>
            <p className="mt-1.5 text-sm text-gray-500">Sumamos las cantidades para ubicarte en un rango de precio.</p>
            <div className={styles.quantities}>
              {empresa.tipo !== 'agricola' && <><div className={styles.animalGrid}>{(['vacunos', 'ovinos'] as const).map(key => <label key={key} className="text-sm font-semibold"><span className={styles.inputLabel}><span>{key === 'vacunos' ? 'Cantidad promedio de vacunos' : 'Ovinos'}</span>{key === 'ovinos' && <span className={styles.equivalence}><span>1 vacuno = 1 unidad</span><span>5 ovinos = 1 unidad</span></span>}</span><input type="number" min="0" step="1" inputMode="numeric" placeholder="0" value={empresa[key]} onChange={e => update({ [key]: e.target.value })} className={inputClass} /></label>)}</div></>}
              {empresa.tipo !== 'ganadera' && <label className="mt-4 block text-sm font-semibold">Hectáreas de cosecha<div className="relative"><input type="number" min="0" step="any" inputMode="decimal" placeholder="0" value={empresa.hectareas} onChange={e => update({ hectareas: e.target.value })} className={`${inputClass} pr-24`} /><span className="absolute right-3 top-5 text-sm font-normal text-gray-400">hectáreas</span></div><span className="mt-2 block text-xs font-normal leading-relaxed text-gray-500">Solo las que destinás para cosecha. No cuentan pasturas ni verdeos para el ganado.</span></label>}

            </div>
          </section>

        </div>

        <section className={cardClass}>
          <p className={styles.step}>Paso 4</p>
          <h2 className="mt-1 text-lg font-bold sm:text-xl">Elegí tu plan</h2>
          <p className="mt-1.5 text-sm text-gray-500">La única diferencia es finanzas. Todo lo demás está incluido en ambos.</p>
          <div className={styles.planGrid} role="group" aria-label="Elegí tu plan">
            {[false, true].map(plus => <button key={String(plus)} type="button" aria-pressed={empresa.plus === plus} onClick={() => update({ plus })} className={styles.planCard}>
              <span className={styles.planTitle}><strong>BotRural</strong>{plus && <span className={styles.planBadge}>Plus</span>}<span className={styles.planIndicator} aria-hidden="true">{empresa.plus === plus && <Check size={12} strokeWidth={3} />}</span></span>
              <span className={styles.planDescription}>{plus ? 'Todo BotRural + finanzas. Organizá facturas, pagos y cobros, y conocé el resultado económico de tu operación.' : 'Ganadería, agricultura, recordatorios por WhatsApp, inventario, mapas y trazabilidad individual.'}</span>
            </button>)}
          </div>
        </section>

        <section className={`${cardClass} mt-4`}>
          <h2 className="text-lg font-bold">Todo lo que incluye tu plan</h2>
          <div className="mt-4 overflow-x-auto"><table className="w-full text-left text-xs sm:text-sm"><thead><tr className="border-b border-gray-200"><th scope="col" className="py-3 pr-2 font-medium text-gray-500">Funciones</th><th scope="col" className="px-2 py-3 text-center font-semibold">BotRural</th><th scope="col" className="rounded-t-lg bg-[#2D5C64]/5 px-2 py-3 text-center font-semibold text-[#2D5C64]">BotRural Plus</th></tr></thead><tbody>{features.map(feature => <tr key={feature} className="border-b border-gray-100"><th scope="row" className="py-2.5 pr-2 font-normal">{feature}</th><td className="px-2 py-2.5 text-center"><Check size={16} aria-label="Incluido" className="mx-auto text-[#2D5C64]" /></td><td className="bg-[#2D5C64]/5 px-2 py-2.5 text-center"><Check size={16} aria-label="Incluido" className="mx-auto text-[#2D5C64]" /></td></tr>)}<tr><th scope="row" className="py-3 pr-2 font-semibold">Finanzas<span className="mt-1 block max-w-xs text-xs font-normal leading-relaxed text-gray-500">Organizá facturas, pagos y cobros, y conocé el resultado económico de tu operación.</span></th><td className="px-2 py-3 text-center text-gray-400"><span aria-label="No incluido">—</span></td><td className="rounded-b-lg bg-[#2D5C64]/5 px-2 py-3 text-center"><Check size={20} strokeWidth={3} aria-label="Incluido" className="mx-auto text-[#00DD59]" /></td></tr></tbody></table></div>
        </section>
        </div>
        <aside aria-label="Resumen de tu suscripción" className={styles.summary}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryHeader}>
              <div className={styles.summaryTopline}><span>Tu suscripción</span><span className={styles.cycleTag}>{anual ? 'Pago anual' : 'Pago mensual'}</span></div>
              <h2 className={styles.summaryPlan}>BotRural{empresa.plus && <span className={styles.summaryPlus}>Plus</span>}</h2>

            </div>
            <div className={styles.summaryBody}>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-gray-500">Empresa</dt><dd className="font-semibold">{tipos.find(t => t.value === empresa.tipo)?.label}</dd></div>
                {empresa.tipo !== 'agricola' && <><div className="flex justify-between"><dt className="text-gray-500">Vacunos</dt><dd className="font-semibold tabular-nums">{cantidad(numero(empresa.vacunos))}</dd></div><div className="flex justify-between"><dt className="text-gray-500">Ovinos</dt><dd className="font-semibold tabular-nums">{cantidad(numero(empresa.ovinos))}</dd></div></>}
                {empresa.tipo !== 'ganadera' && <div className="flex justify-between"><dt className="text-gray-500">Hectáreas de cosecha</dt><dd className="font-semibold tabular-nums">{cantidad(numero(empresa.hectareas))}</dd></div>}
                <div className="flex justify-between"><dt className="text-gray-500">Finanzas</dt><dd className="font-semibold text-[#2D5C64]">{empresa.plus ? 'Incluidas' : 'Sin agregar'}</dd></div>
              </dl>
              {valido && <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">{pools.map(pool => {
                const index = bands.findIndex(b => pool.total <= b.max)
                const range = index < 0 ? 'Más de 10.000' : `Rango ${index === 0 ? '0' : cantidad(bands[index - 1].max + 1)} – ${cantidad(bands[index].max)}`
                return <div key={pool.nombre}><div className="flex items-baseline justify-between gap-2"><span className="text-sm font-semibold">{pool.nombre === 'Ganadería' ? 'Unidades' : 'Hectáreas de cosecha'}</span><span className="text-xl font-bold tabular-nums">{cantidad(pool.total)}</span></div><p className="mt-1 text-xs text-gray-500">{range}</p></div>
              })}</div>}
              <div aria-live="polite" aria-atomic="true" className="mt-4 border-t border-gray-100 pt-4">
                {!valido ? <><p className="text-xl font-bold text-[#2D5C64]">Tu precio aparece acá</p><p className="mt-2 text-sm leading-relaxed text-gray-500">Ingresá tus cantidades. El total se actualiza automáticamente.</p></> : contacto ? <><p className="text-2xl font-bold text-[#2D5C64]">Una propuesta a tu medida</p><p className="mt-1.5 text-sm text-gray-500">Superás las 10.000 unidades ganaderas o hectáreas de cosecha. Contactanos para cotizar.</p></> : <><p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{anual ? 'Tu precio con pago anual' : 'Tu precio mensual'}</p><p className={styles.price}>US$ {usd(anual ? total / 12 : total)}<span className="ml-1 text-sm font-normal text-gray-500">/mes</span></p>{anual ? <><p className={styles.billingNote}>Se cobra <strong>US$ {usd(total)}</strong> una vez por año.</p><p className="mt-3 inline-flex items-center gap-1 rounded-lg bg-[#00DD59]/15 px-3 py-2 text-xs font-semibold text-[#2D5C64]"><Check size={14} /> Ahorrás USD {usd(mensual * 12 - total)} al año · 20%</p></> : <p className={styles.billingNote}>Se cobra todos los meses.</p>}<p className="mt-3 text-xs text-gray-400">Más impuestos aplicables.</p></>}
              </div>
              {valido ? <a href="https://app.botrural.app/register" className={styles.cta}>Probar 25 días gratis</a> : <button type="button" disabled className="mt-4 w-full rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-400">Completá tus cantidades</button>}
            </div>
          </div>
        </aside>
        <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-[#2D5C64]/15 bg-white px-4 py-3 shadow-lg md:hidden"><div><p className="text-xs text-gray-500">BotRural{empresa.plus ? ' Plus' : ''} · {anual ? 'Anual' : 'Mensual'}</p><p className="mt-1 font-bold text-[#2D5C64]">{!valido ? 'Ingresá tus cantidades' : contacto ? 'Contactanos' : `USD ${usd(anual ? total / 12 : total)}/mes`}</p></div>{valido && <a href="https://app.botrural.app/register" className="rounded-xl bg-[#00DD59] px-4 py-3 text-sm font-semibold text-black">Probar 25 días gratis</a>}</div>
      </main>
    </div>
  )
}
