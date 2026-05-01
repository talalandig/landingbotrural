'use client'

import React from 'react'

interface IconoEventoProps {
  tipo: string
  className?: string
}

export default function IconoEvento({ tipo, className = 'w-4 h-4' }: IconoEventoProps) {
  const p = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '24',
    height: '24',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  }

  switch (tipo) {
    case 'CAMBIO_POTRERO':
    case 'cambio-potrero':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M16 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M6 12v-2a6 6 0 1 1 12 0v2" /><path d="M15 9l3 3l3 -3" /></svg>

    case 'TRATAMIENTO':
    case 'tratamiento':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3l4 4" /><path d="M19 5l-4.5 4.5" /><path d="M11.5 6.5l6 6" /><path d="M16.5 11.5l-6.5 6.5h-4v-4l6.5 -6.5" /><path d="M7.5 12.5l1.5 1.5" /><path d="M10.5 9.5l1.5 1.5" /><path d="M3 21l3 -3" /></svg>

    case 'NACIMIENTO':
    case 'nacimiento':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" /><path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" /><path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" /><path d="M8.56 20.31a9 9 0 0 0 3.44 .69" /><path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" /><path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" /><path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" /><path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>

    case 'LLUVIA':
    case 'lluvia':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" /><path d="M11 13v2m0 3v2m4 -5v2m0 3v2" /></svg>

    case 'HELADA':
    case 'helada':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 4l2 1l2 -1" /><path d="M12 2v6.5l3 1.72" /><path d="M17.928 6.268l.134 2.232l1.866 1.232" /><path d="M20.66 7l-5.629 3.25l.01 3.458" /><path d="M19.928 14.268l-1.866 1.232l-.134 2.232" /><path d="M20.66 17l-5.629 -3.25l-2.99 1.738" /><path d="M14 20l-2 -1l-2 1" /><path d="M12 22v-6.5l-3 -1.72" /><path d="M6.072 17.732l-.134 -2.232l-1.866 -1.232" /><path d="M3.34 17l5.629 -3.25l-.01 -3.458" /><path d="M4.072 9.732l1.866 -1.232l.134 -2.232" /><path d="M3.34 7l5.629 3.25l2.99 -1.738" /></svg>

    case 'USO_INSUMO':
    case 'uso-insumos':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" /><path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" /><path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" /><path d="M8.56 20.31a9 9 0 0 0 3.44 .69" /><path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" /><path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" /><path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" /><path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" /><path d="M9 12h6" /></svg>

    case 'INGRESO_INSUMO':
    case 'ingreso-insumos':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" /><path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" /><path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" /><path d="M8.56 20.31a9 9 0 0 0 3.44 .69" /><path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" /><path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" /><path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" /><path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>

    case 'RIEGO':
    case 'riego':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4.072 20.3a2.999 2.999 0 0 0 3.856 0a3.002 3.002 0 0 0 .67 -3.798l-2.095 -3.227a.6 .6 0 0 0 -1.005 0l-2.098 3.227a3.003 3.003 0 0 0 .671 3.798" /><path d="M16.072 20.3a2.999 2.999 0 0 0 3.856 0a3.002 3.002 0 0 0 .67 -3.798l-2.095 -3.227a.6 .6 0 0 0 -1.005 0l-2.098 3.227a3.003 3.003 0 0 0 .671 3.798" /><path d="M10.072 10.3a2.999 2.999 0 0 0 3.856 0a3.002 3.002 0 0 0 .67 -3.798l-2.095 -3.227a.6 .6 0 0 0 -1.005 0l-2.098 3.227a3.003 3.003 0 0 0 .671 3.798l.001 0" /></svg>

    case 'COSECHA':
    case 'cosecha':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.412 7.407a6.025 6.025 0 0 0 -2.82 -2.82m-4.592 -.587h-1v2a6 6 0 0 0 6 6h3" /><path d="M12 14a6 6 0 0 1 .255 -1.736m1.51 -2.514a5.981 5.981 0 0 1 4.235 -1.75h3v1c0 2.158 -1.14 4.05 -2.85 5.107m-3.15 .893h-3" /><path d="M12 20v-8" /><path d="M3 3l18 18" /></svg>

    case 'SIEMBRA':
    case 'siembra':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 15a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M7 15l0 .01" /><path d="M17 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M10.5 17l6.5 0" /><path d="M20 15.2v-4.2a1 1 0 0 0 -1 -1h-6l-2 -5h-6v6.5" /><path d="M18 5h-1a1 1 0 0 0 -1 1v4" /></svg>

    case 'OTROS_LABORES':
    case 'otros-labores':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 4l3 3" /><path d="M18.5 5.5l-8 8" /><path d="M8.276 11.284l4.44 4.44a.968 .968 0 0 1 0 1.369l-2.704 2.704a4.108 4.108 0 0 1 -5.809 -5.81l2.704 -2.703a.968 .968 0 0 1 1.37 0l-.001 0" /></svg>

    case 'MONITOREO':
    case 'monitoreo':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>

    case 'PULVERIZACION':
    case 'pulverizacion':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 12a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2l0 -7" /><path d="M6 10v-4a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v4" /><path d="M15 7h.01" /><path d="M18 9h.01" /><path d="M18 5h.01" /><path d="M21 3h.01" /><path d="M21 7h.01" /><path d="M21 11h.01" /><path d="M10 7h1" /></svg>

    case 'REFERTILIZACION':
    case 'refertilizacion':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 20l9 -7" /><path d="M12 3v10l9 7" /><path d="M17 12v.015" /><path d="M17 4.015v.015" /><path d="M21 8.015v.015" /><path d="M12 19.015v.015" /><path d="M3 12.015v.015" /><path d="M7 8.015v.015" /><path d="M3 4.015v.015" /></svg>

    case 'TACTO':
    case 'tacto':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 13v-7.5a1.5 1.5 0 0 1 3 0v6.5" /><path d="M11 5.5v-2a1.5 1.5 0 1 1 3 0v8.5" /><path d="M14 5.5a1.5 1.5 0 0 1 3 0v6.5" /><path d="M17 7.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" /></svg>

    case 'INSEMINACION':
    case 'inseminacion':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14.828 14.828a4 4 0 1 0 -5.656 -5.656a4 4 0 0 0 5.656 5.656" /><path d="M9.172 20.485a4 4 0 1 0 -5.657 -5.657" /><path d="M14.828 3.515a4 4 0 0 0 5.657 5.657" /></svg>

    case 'DESTETE':
    case 'destete':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 21l4 -4l-4 -4" /><path d="M21 17h-11a3 3 0 0 1 -3 -3v-11" /><path d="M11 7l-4 -4l-4 4" /></svg>

    case 'CONSUMO':
    case 'consumo':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13.62 8.382l1.966 -1.967a2 2 0 1 1 3.414 -1.415a2 2 0 1 1 -1.413 3.414l-1.82 1.821" /><path d="M5.904 18.596c2.733 2.734 5.9 4 7.07 2.829c1.172 -1.172 -.094 -4.338 -2.828 -7.071c-2.733 -2.734 -5.9 -4 -7.07 -2.829c-1.172 1.172 .094 4.338 2.828 7.071" /><path d="M7.5 16l1 1" /><path d="M12.975 21.425c3.905 -3.906 4.855 -9.288 2.121 -12.021c-2.733 -2.734 -8.115 -1.784 -12.02 2.121" /></svg>

    case 'MORTANDAD':
    case 'mortandad':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 4c4.418 0 8 3.358 8 7.5c0 1.901 -.755 3.637 -2 4.96l0 2.54a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-2.54c-1.245 -1.322 -2 -3.058 -2 -4.96c0 -4.142 3.582 -7.5 8 -7.5" /><path d="M10 17v3" /><path d="M14 17v3" /><path d="M8 11a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M14 11a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>

    case 'PESAJE':
    case 'pesaje':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 20l10 0" /><path d="M6 6l6 -1l6 1" /><path d="M12 3l0 17" /><path d="M9 12l-3 -6l-3 6a3 3 0 0 0 6 0" /><path d="M21 12l-3 -6l-3 6a3 3 0 0 0 6 0" /></svg>

    case 'TRASLADO':
    case 'traslado':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" /></svg>

    case 'RECATEGORIZACION':
    case 'recategorizacion':
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16.52 7h-10.52a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h10.52a1 1 0 0 0 .78 -.375l3.7 -4.625l-3.7 -4.625a1 1 0 0 0 -.78 -.375" /></svg>

    default:
      return <svg {...p}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="9" /></svg>
  }
}
