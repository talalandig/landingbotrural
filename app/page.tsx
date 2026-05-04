'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import IconoEvento from './components/IconoEvento';
import {
  ArrowRight,
  Check,
  Menu,
  X,
  Users,
  BarChart3,
  Mic,
  MessageSquare,
  Wheat,
  Sprout,
  DollarSign,
  Camera,
  FileText,
  Calendar,
  MapPin,
  Shield,
  PieChart,
  ClipboardList,
  RefreshCw,
  Bell,
  Globe,
  ArrowUpRight,
  Play,
  Package,
  CalendarDays,
  CloudRain,
  Heart,
  Truck,
  Stethoscope,
  AlertTriangle,
  Smartphone,
  Monitor,
  TrendingUp,
  ArrowRightLeft,
  Scale,
  Activity,
  Receipt,
  Banknote,
} from 'lucide-react';

// ============================================================
// DATOS DE LA LANDING
// ============================================================

const STATS = [
  { value: '100+', label: 'Productores' },
  { value: '250K+', label: 'Eventos registrados' },
  { value: '98%', label: 'Retención' },
  { value: '24/7', label: 'Disponibilidad' },
];

const HERO_CATEGORIES = [
  { icon: <Users className="w-5 h-5" />, label: 'Ganaderia' },
  { icon: <Wheat className="w-5 h-5" />, label: 'Agricultura' },
  { icon: <Sprout className="w-5 h-5" />, label: 'Insumos' },
  { icon: <DollarSign className="w-5 h-5" />, label: 'Finanzas' },
  { icon: <Calendar className="w-5 h-5" />, label: 'Calendario' },
];

const WHATSAPP_FEATURES = [
  {
    icon: <Mic className="w-6 h-6" />,
    title: 'Audio inteligente',
    description: 'Graba un audio describiendo lo que paso y el bot lo interpreta y registra solo.',
    demo: 'audio',
  },
  {
    icon: <Camera className="w-6 h-6" />,
    title: 'Facturas con foto',
    description: 'Saca una foto a la factura. El bot lee proveedor, monto y categoria automaticamente.',
    demo: 'factura',
  },
  {
    icon: <Camera className="w-6 h-6" />,
    title: 'Foto + evento',
    description: 'Envia una foto con descripcion y queda guardada con el evento. Despues la consultas y te llega la imagen.',
    demo: 'fotoevento',
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Consulta tus datos',
    description: '"Pasame los datos de los ultimos 5 dias" — recibis PDF + fotos adjuntas directo al chat.',
    demo: 'consulta',
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: 'Calendario con IA',
    description: '"En 14 dias hacer tacto" — el bot programa el recordatorio y te avisa.',
    demo: 'calendario',
  },
];

const PLATFORM_FEATURES = [
  {
    icon: <PieChart className="w-7 h-7" />,
    title: 'Indicadores en tiempo real',
    description: 'Eficiencia tecnica, indicadores ganaderos y economicos. Carga animal por hectarea, costo por UG, rentabilidad — todo calculado automaticamente.',
    color: 'from-emerald-500 to-green-700',
    tag: 'Dashboard',
  },
  {
    icon: <DollarSign className="w-7 h-7" />,
    title: 'Finanzas completas',
    description: 'Gastos pendientes y pagados, ingresos por cobrar y cobrados. Filtra por categoria, proveedor, fecha. Vincula facturas con fotos.',
    color: 'from-green-500 to-emerald-600',
    tag: 'Finanzas',
  },
  {
    icon: <RefreshCw className="w-7 h-7" />,
    title: 'Pastoreo Rotativo',
    description: 'Genera el historial de movimientos por modulo: dias de pastoreo, dias de descanso, hectareas. Exporta como PDF desde WhatsApp o la web.',
    color: 'from-amber-500 to-orange-600',
    tag: 'Reportes',
  },
  {
    icon: <ClipboardList className="w-7 h-7" />,
    title: 'Stock y categorias',
    description: 'Controla el stock por potrero y categoria. Nacimientos, mortandad, ventas y compras actualizan automaticamente.',
    color: 'from-lime-500 to-green-600',
    tag: 'Ganaderia',
  },
  {
    icon: <BarChart3 className="w-7 h-7" />,
    title: 'Costos desglosados',
    description: 'Costos directos vinculados a diferentes rubros y cultivos, costos generales de la empresa claros. Costo por hectarea y por UG. Sabes exactamente cuanto te sale cada animal.',
    color: 'from-rose-500 to-pink-600',
    tag: 'Economia',
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: 'Equipo y roles',
    description: 'Suma a tu capataz, veterinario o contador. Cada uno con su rol y permisos. Todos cargan datos por WhatsApp, vos controlas desde la web.',
    color: 'from-cyan-500 to-teal-600',
    tag: 'Equipo',
  },
];

const DETAILED_SECTIONS = [
  {
    badge: 'Indicadores',
    title: 'Toma decisiones con datos, no con intuicion',
    subtitle: 'Indicadores ganaderos, de eficiencia tecnica y economicos actualizados en tiempo real.',
    items: [
      'Carga animal por hectarea (UG/ha) con equivalencias personalizables',
      'Porcentaje de preñez, destete y señalada',
      'Costo por UG y rentabilidad por especie',
      'Evolucion de UG mes a mes con grafico historico',
      'Relacion lanar-vacuno y superficie mejorada',
      'Indicadores de eficiencia reproductiva (DAO, tacto)',
    ],
    visual: 'indicadores',
  },
  {
    badge: 'Pastoreo',
    title: 'Reporte de Pastoreo Rotativo en un click',
    subtitle: 'Historial completo de movimientos por modulo. Genera el PDF desde WhatsApp.',
    items: [
      'Fecha de entrada y salida por modulo',
      'Dias de pastoreo y dias de descanso calculados',
      'Hectareas por rotacion',
      'PDF del historial completo de pastoreo, generalo desde la web o WhatsApp como quieras',
    ],
    visual: 'pastoreo',
  },
  {
    badge: 'Agricultura',
    title: 'Gestiona tus potreros, cultivos y labores',
    subtitle: 'Registra siembras, pulverizaciones y labores desde WhatsApp. Visualiza que hay sembrado en cada potrero, filtra por cultivo y controla gastos y ventas agricolas.',
    items: [
      'Treemap interactivo: clickea un cultivo y se iluminan los potreros donde esta sembrado',
      'Registra siembras, pulverizaciones, cosechas y mas desde WhatsApp',
      'Gastos y ventas vinculados a cada labor agricola',
      'Superficie total por cultivo con detalle por potrero',
    ],
    visual: 'agricultura',
  },
];

const WHATSAPP_EXAMPLES = [
  { user: 'llovieron 25mm', bot: 'Lluvia 25mm registrada' },
  { user: 'vacune 50 vacas contra aftosa en el sur', bot: 'Tratamiento: vacuna aftosa a 50 vacas en Sur' },
  { user: 'pasame los datos de los ultimos 5 dias', bot: 'PDF + fotos adjuntas enviadas' },
  { user: '[Foto] + murio un ternero en el norte', bot: 'Mortandad con foto guardada' },
  { user: 'movi 30 novillos del norte al sur', bot: 'Movimiento: 30 novillos de Norte a Sur' },
  { user: 'reporte de carga', bot: 'Generando PDF de carga actual...' },
  { user: 'en 14 dias hacer tacto', bot: 'Recordatorio programado' },
  { user: '[Foto de factura]', bot: 'Factura: Veterinaria Sur - $15.000' },
];


// ============================================================
// COMPONENTES AUXILIARES
// ============================================================

function CountUp({ target, suffix = '' }: { target: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(target.replace(/\D/g, ''));
    if (isNaN(num)) { setDisplay(target); return; }
    const duration = 1500;
    const steps = 40;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        clearInterval(timer);
        setDisplay(target);
      } else {
        setDisplay(Math.floor(current).toLocaleString());
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// ============================================================
// AGRICULTURA VISUAL (mockup interactivo)
// ============================================================

const AGRI_CULTIVOS = [
  { id: 'tb-lotus', nombre: 'Trebol + Lotus', ha: '145 ha', hex: '#10b981', hexLight: '#d1fae5', hexBorder: '#6ee7b7' },
  { id: 'avena', nombre: 'Avena', ha: '95 ha', hex: '#f59e0b', hexLight: '#fef3c7', hexBorder: '#fcd34d' },
  { id: 'sorgo', nombre: 'Sorgo', ha: '60 ha', hex: '#ec4899', hexLight: '#fce7f3', hexBorder: '#f9a8d4' },
  { id: 'campo', nombre: 'Campo natural', ha: '120 ha', hex: '#8b5cf6', hexLight: '#ede9fe', hexBorder: '#c4b5fd' },
  { id: 'festuca', nombre: 'Festuca', ha: '80 ha', hex: '#06b6d4', hexLight: '#cffafe', hexBorder: '#67e8f9' },
];

const AGRI_POTREROS = [
  { nombre: 'Norte', ha: '120', cultivo: 'tb-lotus', x: 0, y: 0, w: 60, h: 40 },
  { nombre: 'Sur', ha: '95', cultivo: 'avena', x: 60, y: 0, w: 40, h: 40 },
  { nombre: 'Rincon', ha: '45', cultivo: 'tb-lotus', x: 0, y: 40, w: 20, h: 30 },
  { nombre: 'Este', ha: '60', cultivo: 'sorgo', x: 20, y: 40, w: 40, h: 30 },
  { nombre: 'Costa', ha: '80', cultivo: 'campo', x: 60, y: 40, w: 40, h: 30 },
  { nombre: 'Oeste', ha: '55', cultivo: 'campo', x: 0, y: 70, w: 35, h: 30 },
  { nombre: 'Bajo', ha: '40', cultivo: 'festuca', x: 35, y: 70, w: 30, h: 30 },
  { nombre: 'Cuchilla', ha: '35', cultivo: 'avena', x: 65, y: 70, w: 35, h: 30 },
];

function AgriculturaVisual() {
  const [activeCultivo, setActiveCultivo] = useState<string | null>(null);
  const getCultivoData = (id: string) => AGRI_CULTIVOS.find(c => c.id === id)!;

  return (
    <div className="w-full flex flex-col lg:flex-row gap-3 md:gap-4">
      <div className="lg:w-[60%] bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-sm">
        <div className="relative w-full" style={{ paddingBottom: '75%' }}>
          {AGRI_POTREROS.map((p, i) => {
            const cultivo = getCultivoData(p.cultivo);
            const isActive = !activeCultivo || activeCultivo === p.cultivo;
            const gap = 2;
            return (
              <div
                key={i}
                className="absolute overflow-hidden flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
                style={{
                  left: `${p.x}%`, top: `${p.y}%`,
                  width: `calc(${p.w}% - ${gap}px)`, height: `calc(${p.h}% - ${gap}px)`,
                  backgroundColor: isActive ? cultivo.hexLight : '#f9fafb',
                  border: `2px solid ${isActive ? cultivo.hexBorder : '#e5e7eb'}`,
                  borderRadius: '8px',
                  opacity: isActive ? 1 : 0.2,
                  transform: isActive ? 'scale(1)' : 'scale(0.98)',
                }}
                onClick={() => setActiveCultivo(activeCultivo === p.cultivo ? null : p.cultivo)}
              >
                <span className="font-bold leading-none text-[10px] md:text-xs truncate max-w-full px-1" style={{ color: cultivo.hex }}>{p.nombre}</span>
                <span className="text-[8px] md:text-[10px] leading-none mt-0.5 opacity-70" style={{ color: cultivo.hex }}>{p.ha} ha</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lg:w-[40%] bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-sm flex flex-col">
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5 md:gap-2 flex-1">
          {AGRI_CULTIVOS.map((c) => {
            const isSelected = activeCultivo === c.id;
            const isDimmed = activeCultivo && !isSelected;
            return (
              <button key={c.id} onClick={() => setActiveCultivo(isSelected ? null : c.id)}
                className="text-left flex items-center gap-2 md:gap-3 px-2.5 py-2 md:px-3.5 md:py-3 rounded-lg md:rounded-xl transition-all duration-300 group relative overflow-hidden"
                style={{
                  backgroundColor: isSelected ? c.hexLight : isDimmed ? '#f9fafb' : `${c.hex}08`,
                  border: `2px solid ${isSelected ? c.hexBorder : 'transparent'}`,
                  opacity: isDimmed ? 0.35 : 1,
                }}
              >
                <div className="w-3 h-3 md:w-4 md:h-4 rounded shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: c.hex }} />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] md:text-sm font-semibold leading-tight truncate" style={{ color: isSelected ? c.hex : '#374151' }}>{c.nombre}</div>
                  <div className="text-[10px] md:text-xs text-gray-400">{c.ha}</div>
                </div>
                {isSelected && (
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: c.hex }}>
                    <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        {activeCultivo && (
          <button onClick={() => setActiveCultivo(null)} className="mt-2 md:mt-4 text-[10px] md:text-xs text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 px-2 py-1.5 md:px-3 md:py-2.5 rounded-lg md:rounded-xl transition-all duration-200 text-center flex items-center justify-center gap-1">
            <X className="w-2.5 h-2.5 md:w-3 md:h-3" />
            Limpiar filtro
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================
// VENTAS VISUAL — tabs por sector (estilo dashboard real)
// Datos con precios y rindes realistas de Uruguay (zafra 2025).
// ============================================================

function fmt(n: number) {
  return n.toLocaleString('es-UY', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

type Col = { key: string; label: string; align?: 'left' | 'right'; hide?: 'sm' | 'md' | 'lg'; fmt?: (v: number) => string };
type Row = { cat: string; color: string; [k: string]: number | string };
type Sector = {
  id: string;
  label: string;
  headerBg: string;
  headerText: string;
  headerLabel: string;
  cols: Col[];
  rows: Row[];
  totals: Record<string, number | string>;
  metrics?: { key: string; label: string; rowKey: string }[]; // toggle de donut
  defaultMetric?: string;
};

// ===== BOVINO (precios pie ~2025: novillo gancho ~US$4.50 → pie ~US$2.50)
const BOVINO_ROWS: Row[] = [
  { cat: 'Novillo gordo',     color: '#10b981', n: 285, kgKg: 2.55, kgAn: 478, usAn: 1219, kgTot: 136230, bruto: 347386 },
  { cat: 'Vaca gorda',        color: '#8b5cf6', n: 142, kgKg: 2.20, kgAn: 440, usAn: 968,  kgTot: 62480,  bruto: 137456 },
  { cat: 'Vaquillona',        color: '#ec4899', n: 96,  kgKg: 2.45, kgAn: 365, usAn: 894,  kgTot: 35040,  bruto: 85848  },
  { cat: 'Ternero',           color: '#f59e0b', n: 180, kgKg: 3.30, kgAn: 185, usAn: 611,  kgTot: 33300,  bruto: 109890 },
  { cat: 'Ternera',           color: '#06b6d4', n: 95,  kgKg: 2.90, kgAn: 170, usAn: 493,  kgTot: 16150,  bruto: 46835  },
  { cat: 'Vaca de invernada', color: '#ef4444', n: 64,  kgKg: 1.75, kgAn: 425, usAn: 744,  kgTot: 27200,  bruto: 47600  },
  { cat: 'Toro',              color: '#3b82f6', n: 4,   kgKg: 1.95, kgAn: 720, usAn: 1404, kgTot: 2880,   bruto: 5616   },
];
const BOVINO_TOT = BOVINO_ROWS.reduce((s, r) => ({
  n: s.n + (r.n as number), kgTot: s.kgTot + (r.kgTot as number), bruto: s.bruto + (r.bruto as number)
}), { n: 0, kgTot: 0, bruto: 0 });

// ===== OVINO (precios pie 2025: cordero pesado ~US$4.20/kg)
const OVINO_ROWS: Row[] = [
  { cat: 'Cordero pesado',   color: '#10b981', n: 320, kgKg: 4.20, kgAn: 38, usAn: 160, kgTot: 12160, bruto: 51072 },
  { cat: 'Cordero liviano',  color: '#f59e0b', n: 240, kgKg: 4.00, kgAn: 28, usAn: 112, kgTot: 6720,  bruto: 26880 },
  { cat: 'Borrego',          color: '#06b6d4', n: 110, kgKg: 3.20, kgAn: 42, usAn: 134, kgTot: 4620,  bruto: 14784 },
  { cat: 'Capón',            color: '#8b5cf6', n: 90,  kgKg: 2.80, kgAn: 50, usAn: 140, kgTot: 4500,  bruto: 12600 },
  { cat: 'Oveja de descarte',color: '#ef4444', n: 180, kgKg: 1.90, kgAn: 45, usAn: 86,  kgTot: 8100,  bruto: 15390 },
  { cat: 'Carnero',          color: '#3b82f6', n: 6,   kgKg: 2.20, kgAn: 70, usAn: 154, kgTot: 420,   bruto: 924   },
];
const OVINO_TOT = OVINO_ROWS.reduce((s, r) => ({
  n: s.n + (r.n as number), kgTot: s.kgTot + (r.kgTot as number), bruto: s.bruto + (r.bruto as number)
}), { n: 0, kgTot: 0, bruto: 0 });

// ===== LANA (zafra 2025: Merino fino ~US$8/kg, Corriedale ~US$2.6/kg)
const LANA_ROWS: Row[] = [
  { cat: 'Merino fino (18-19μ)',  color: '#10b981', n: 420, kgAn: 4.5,  usKg: 8.50, kgTot: 1890, bruto: 16065 },
  { cat: 'Cruza fina (24-25μ)',   color: '#06b6d4', n: 380, kgAn: 4.2,  usKg: 4.20, kgTot: 1596, bruto: 6703  },
  { cat: 'Corriedale (26-28μ)',   color: '#f59e0b', n: 540, kgAn: 4.8,  usKg: 2.60, kgTot: 2592, bruto: 6739  },
  { cat: 'Romney (29-32μ)',       color: '#ef4444', n: 210, kgAn: 5.2,  usKg: 1.80, kgTot: 1092, bruto: 1965  },
  { cat: 'Vellones de cordero',   color: '#8b5cf6', n: 480, kgAn: 2.5,  usKg: 3.00, kgTot: 1200, bruto: 3600  },
];
const LANA_TOT = LANA_ROWS.reduce((s, r) => ({
  n: s.n + (r.n as number), kgTot: s.kgTot + (r.kgTot as number), bruto: s.bruto + (r.bruto as number)
}), { n: 0, kgTot: 0, bruto: 0 });

// ===== AGRICULTURA (precios FOB UY 2025, rindes promedio nacionales)
const AGRI_ROWS: Row[] = [
  { cat: 'Soja',              color: '#10b981', has: 320, rinde: 2700, usTn: 360, tnTot: 864,  bruto: 311040 },
  { cat: 'Maíz',              color: '#f59e0b', has: 180, rinde: 7500, usTn: 200, tnTot: 1350, bruto: 270000 },
  { cat: 'Trigo',             color: '#06b6d4', has: 240, rinde: 3800, usTn: 210, tnTot: 912,  bruto: 191520 },
  { cat: 'Cebada cervecera',  color: '#8b5cf6', has: 120, rinde: 4500, usTn: 240, tnTot: 540,  bruto: 129600 },
  { cat: 'Sorgo',             color: '#ef4444', has: 90,  rinde: 5500, usTn: 180, tnTot: 495,  bruto: 89100  },
  { cat: 'Colza',             color: '#3b82f6', has: 80,  rinde: 1800, usTn: 480, tnTot: 144,  bruto: 69120  },
];
const AGRI_TOT = AGRI_ROWS.reduce((s, r) => ({
  has: s.has + (r.has as number), tnTot: s.tnTot + (r.tnTot as number), bruto: s.bruto + (r.bruto as number)
}), { has: 0, tnTot: 0, bruto: 0 });

// ===== OTROS INGRESOS
const OTROS_ROWS: Row[] = [
  { cat: 'Alquiler de campo',     color: '#10b981', cant: 250, unidad: 'ha/año',     usUn: 75, bruto: 18750 },
  { cat: 'Venta de fardos',       color: '#f59e0b', cant: 800, unidad: 'fardos',     usUn: 18, bruto: 14400 },
  { cat: 'Servicio de pastoreo',  color: '#06b6d4', cant: 1200,unidad: 'cab/mes',    usUn: 8,  bruto: 9600  },
  { cat: 'Servicio de cosecha',   color: '#8b5cf6', cant: 120, unidad: 'ha',         usUn: 75, bruto: 9000  },
  { cat: 'Venta de leña',         color: '#ef4444', cant: 80,  unidad: 'm³',         usUn: 35, bruto: 2800  },
];
const OTROS_TOT = OTROS_ROWS.reduce((s, r) => ({ bruto: s.bruto + (r.bruto as number) }), { bruto: 0 });

const SECTORS: Sector[] = [
  {
    id: 'bovino',
    label: 'Bovino',
    headerBg: 'bg-yellow-400',
    headerText: 'text-gray-900',
    headerLabel: 'BOVINO',
    cols: [
      { key: 'cat', label: 'Categoría', align: 'left' },
      { key: 'n', label: 'Nº Anim.', align: 'right' },
      { key: 'kgKg', label: 'US$/KG', align: 'right', hide: 'sm', fmt: (v) => v.toFixed(2) },
      { key: 'kgAn', label: 'KG/Anim', align: 'right', hide: 'md', fmt: fmt },
      { key: 'usAn', label: 'US$/Anim', align: 'right', hide: 'lg', fmt: fmt },
      { key: 'kgTot', label: 'KG Tot.', align: 'right', hide: 'md', fmt: fmt },
      { key: 'bruto', label: 'US$ Bruto', align: 'right', fmt: fmt },
    ],
    rows: BOVINO_ROWS,
    totals: {
      cat: 'TOTAL', n: BOVINO_TOT.n,
      kgKg: (BOVINO_TOT.bruto / BOVINO_TOT.kgTot).toFixed(2),
      kgAn: fmt(BOVINO_TOT.kgTot / BOVINO_TOT.n),
      usAn: fmt(BOVINO_TOT.bruto / BOVINO_TOT.n),
      kgTot: fmt(BOVINO_TOT.kgTot), bruto: fmt(BOVINO_TOT.bruto),
    },
    metrics: [{ key: 'usd', label: 'U$S', rowKey: 'bruto' }, { key: 'kg', label: 'KG', rowKey: 'kgTot' }, { key: 'anim', label: 'Animales', rowKey: 'n' }],
    defaultMetric: 'usd',
  },
  {
    id: 'ovino',
    label: 'Ovino',
    headerBg: 'bg-rose-400',
    headerText: 'text-white',
    headerLabel: 'OVINO',
    cols: [
      { key: 'cat', label: 'Categoría', align: 'left' },
      { key: 'n', label: 'Nº Anim.', align: 'right' },
      { key: 'kgKg', label: 'US$/KG', align: 'right', hide: 'sm', fmt: (v) => v.toFixed(2) },
      { key: 'kgAn', label: 'KG/Anim', align: 'right', hide: 'md', fmt: fmt },
      { key: 'usAn', label: 'US$/Anim', align: 'right', hide: 'lg', fmt: fmt },
      { key: 'kgTot', label: 'KG Tot.', align: 'right', hide: 'md', fmt: fmt },
      { key: 'bruto', label: 'US$ Bruto', align: 'right', fmt: fmt },
    ],
    rows: OVINO_ROWS,
    totals: {
      cat: 'TOTAL', n: OVINO_TOT.n,
      kgKg: (OVINO_TOT.bruto / OVINO_TOT.kgTot).toFixed(2),
      kgAn: fmt(OVINO_TOT.kgTot / OVINO_TOT.n),
      usAn: fmt(OVINO_TOT.bruto / OVINO_TOT.n),
      kgTot: fmt(OVINO_TOT.kgTot), bruto: fmt(OVINO_TOT.bruto),
    },
    metrics: [{ key: 'usd', label: 'U$S', rowKey: 'bruto' }, { key: 'kg', label: 'KG', rowKey: 'kgTot' }, { key: 'anim', label: 'Animales', rowKey: 'n' }],
    defaultMetric: 'usd',
  },
  {
    id: 'lana',
    label: 'Lana',
    headerBg: 'bg-amber-100',
    headerText: 'text-amber-900',
    headerLabel: 'LANA · Zafra 2025',
    cols: [
      { key: 'cat', label: 'Tipo / Finura', align: 'left' },
      { key: 'n', label: 'Nº Anim.', align: 'right' },
      { key: 'kgAn', label: 'KG/Vellón', align: 'right', hide: 'sm', fmt: (v) => v.toFixed(1) },
      { key: 'usKg', label: 'US$/KG', align: 'right', hide: 'md', fmt: (v) => v.toFixed(2) },
      { key: 'kgTot', label: 'KG Tot.', align: 'right', hide: 'md', fmt: fmt },
      { key: 'bruto', label: 'US$ Bruto', align: 'right', fmt: fmt },
    ],
    rows: LANA_ROWS,
    totals: {
      cat: 'TOTAL', n: LANA_TOT.n, kgAn: '—',
      usKg: (LANA_TOT.bruto / LANA_TOT.kgTot).toFixed(2),
      kgTot: fmt(LANA_TOT.kgTot), bruto: fmt(LANA_TOT.bruto),
    },
    metrics: [{ key: 'usd', label: 'U$S', rowKey: 'bruto' }, { key: 'kg', label: 'KG', rowKey: 'kgTot' }, { key: 'anim', label: 'Animales', rowKey: 'n' }],
    defaultMetric: 'usd',
  },
  {
    id: 'agri',
    label: 'Agricultura',
    headerBg: 'bg-green-600',
    headerText: 'text-white',
    headerLabel: 'AGRICULTURA · Zafra 24/25',
    cols: [
      { key: 'cat', label: 'Cultivo', align: 'left' },
      { key: 'has', label: 'Hás', align: 'right' },
      { key: 'rinde', label: 'kg/ha', align: 'right', hide: 'sm', fmt: fmt },
      { key: 'usTn', label: 'US$/Tn', align: 'right', hide: 'md' },
      { key: 'tnTot', label: 'Tn Tot.', align: 'right', hide: 'md', fmt: fmt },
      { key: 'bruto', label: 'US$ Bruto', align: 'right', fmt: fmt },
    ],
    rows: AGRI_ROWS,
    totals: {
      cat: 'TOTAL', has: AGRI_TOT.has,
      rinde: '—',
      usTn: fmt(AGRI_TOT.bruto / AGRI_TOT.tnTot),
      tnTot: fmt(AGRI_TOT.tnTot), bruto: fmt(AGRI_TOT.bruto),
    },
    metrics: [{ key: 'usd', label: 'U$S', rowKey: 'bruto' }, { key: 'tn', label: 'Tn', rowKey: 'tnTot' }, { key: 'has', label: 'Hás', rowKey: 'has' }],
    defaultMetric: 'usd',
  },
  {
    id: 'otros',
    label: 'Otros',
    headerBg: 'bg-slate-700',
    headerText: 'text-white',
    headerLabel: 'OTROS INGRESOS',
    cols: [
      { key: 'cat', label: 'Concepto', align: 'left' },
      { key: 'cant', label: 'Cantidad', align: 'right', fmt: fmt },
      { key: 'unidad', label: 'Unidad', align: 'right', hide: 'sm' },
      { key: 'usUn', label: 'US$/Un.', align: 'right', hide: 'md', fmt: fmt },
      { key: 'bruto', label: 'US$ Bruto', align: 'right', fmt: fmt },
    ],
    rows: OTROS_ROWS,
    totals: { cat: 'TOTAL', cant: '—', unidad: '—', usUn: '—', bruto: fmt(OTROS_TOT.bruto) },
    metrics: [{ key: 'usd', label: 'U$S', rowKey: 'bruto' }],
    defaultMetric: 'usd',
  },
];

function Donut({ data, valueKey }: { data: Row[]; valueKey: string }) {
  const values = data.map(d => Number(d[valueKey] || 0));
  const total = values.reduce((s, v) => s + v, 0) || 1;
  const r = 60, c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg viewBox="0 0 160 160" className="w-full max-w-[200px] mx-auto">
      <circle cx="80" cy="80" r={r} fill="none" stroke="#f3f4f6" strokeWidth="22" />
      {data.map((d, i) => {
        const v = values[i];
        const len = (v / total) * c;
        const offset = c - acc;
        acc += len;
        return (
          <circle key={i} cx="80" cy="80" r={r} fill="none"
            stroke={d.color} strokeWidth="22"
            strokeDasharray={`${len} ${c - len}`}
            strokeDashoffset={offset}
            transform="rotate(-90 80 80)"
          />
        );
      })}
    </svg>
  );
}

function hideCls(h?: 'sm' | 'md' | 'lg') {
  return h === 'sm' ? 'hidden sm:table-cell' : h === 'md' ? 'hidden md:table-cell' : h === 'lg' ? 'hidden lg:table-cell' : '';
}

function VentasVisual() {
  const [tab, setTab] = useState(0);
  const [metric, setMetric] = useState<string>('usd');
  const sector = SECTORS[tab];
  const activeMetric = sector.metrics?.find(m => m.key === metric) ?? sector.metrics?.[0];
  const donutKey = activeMetric?.rowKey ?? 'bruto';

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1 -mx-1 px-1">
        {SECTORS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setTab(i); setMetric(s.defaultMetric ?? 'usd'); }}
            className={`shrink-0 text-xs md:text-sm px-3.5 py-1.5 rounded-full font-semibold transition border ${
              i === tab
                ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
        <div className={`${sector.headerBg} px-4 md:px-6 py-3 md:py-4`}>
          <h4 className={`font-bold ${sector.headerText} text-sm md:text-base tracking-wide`}>{sector.headerLabel}</h4>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-0">
          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="w-full text-[10px] md:text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider">
                <tr>
                  {sector.cols.map((c) => (
                    <th
                      key={c.key}
                      className={`${c.align === 'left' ? 'text-left' : 'text-right'} px-2 md:px-3 py-2 md:py-3 font-semibold ${hideCls(c.hide)} ${c.key === 'cat' ? 'pl-3 md:pl-4' : ''} ${c.key === 'bruto' ? 'pr-3 md:pr-4' : ''}`}
                    >
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sector.rows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    {sector.cols.map((c) => {
                      const raw = row[c.key];
                      const display = typeof raw === 'number' && c.fmt ? c.fmt(raw) : raw;
                      return (
                        <td
                          key={c.key}
                          className={`${c.align === 'left' ? 'text-left' : 'text-right'} px-2 md:px-3 py-2 md:py-2.5 ${hideCls(c.hide)} ${c.key === 'cat' ? 'pl-3 md:pl-4 text-gray-700 font-medium' : c.key === 'bruto' ? 'pr-3 md:pr-4 font-bold text-gray-900' : 'text-gray-600'}`}
                        >
                          {c.key === 'cat' && (
                            <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: row.color }} />
                          )}
                          {display}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr className="bg-gray-100 font-bold">
                  {sector.cols.map((c) => {
                    const v = sector.totals[c.key];
                    return (
                      <td
                        key={c.key}
                        className={`${c.align === 'left' ? 'text-left' : 'text-right'} px-2 md:px-3 py-2.5 text-gray-900 ${hideCls(c.hide)} ${c.key === 'cat' ? 'pl-3 md:pl-4' : ''} ${c.key === 'bruto' ? 'pr-3 md:pr-4' : ''}`}
                      >
                        {v as any}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Donut */}
          <div className="border-t lg:border-t-0 lg:border-l border-gray-100 p-4 md:p-6 bg-gray-50/50">
            {sector.metrics && sector.metrics.length > 1 && (
              <div className="flex gap-1 mb-3 md:mb-4 justify-center">
                {sector.metrics.map((m) => (
                  <button key={m.key} onClick={() => setMetric(m.key)}
                    className={`text-[10px] md:text-xs px-2.5 py-1 rounded-md font-medium transition ${
                      metric === m.key ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200'
                    }`}
                  >{m.label}</button>
                ))}
              </div>
            )}
            <Donut data={sector.rows} valueKey={donutKey} />
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-3 md:mt-4 text-[9px] md:text-[10px]">
              {sector.rows.map((row, i) => (
                <div key={i} className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                  <span className="text-gray-600 truncate">{row.cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAPA VISUAL — potreros con polígonos SVG
// ============================================================

const MAPA_POTREROS = [
  { id: 'norte', nombre: 'Norte', ha: 120, color: '#10b981', d: 'M 30,40 L 200,30 L 220,120 L 35,135 Z' },
  { id: 'sur', nombre: 'Sur', ha: 95, color: '#f59e0b', d: 'M 220,120 L 200,30 L 380,40 L 360,140 Z' },
  { id: 'este', nombre: 'Este', ha: 60, color: '#ec4899', d: 'M 360,140 L 380,40 L 470,80 L 440,200 Z' },
  { id: 'rincon', nombre: 'Rincon', ha: 45, color: '#10b981', d: 'M 35,135 L 220,120 L 210,210 L 40,220 Z' },
  { id: 'costa', nombre: 'Costa', ha: 80, color: '#8b5cf6', d: 'M 220,120 L 360,140 L 350,240 L 210,210 Z' },
  { id: 'oeste', nombre: 'Oeste', ha: 55, color: '#8b5cf6', d: 'M 40,220 L 210,210 L 220,310 L 50,310 Z' },
  { id: 'bajo', nombre: 'Bajo', ha: 40, color: '#06b6d4', d: 'M 220,310 L 210,210 L 350,240 L 340,330 Z' },
  { id: 'cuchilla', nombre: 'Cuchilla', ha: 35, color: '#f59e0b', d: 'M 340,330 L 350,240 L 440,200 L 430,330 Z' },
];

// Capas reales del mapa de Los Álamos (screenshots de la app)
const MAPA_CAPAS = [
  { id: 'mapa',    label: 'Mapa',    src: '/mapa-los-alamos/mapa.jpeg',    desc: 'Potreros dibujados sobre satélite con visualización de los animales presentes' },
  { id: 'ndvi',    label: 'NDVI',    src: '/mapa-los-alamos/ndvi.jpeg',    desc: 'Índice de verdor por satélite (Sentinel-2)' },
  { id: 'curvas',  label: 'Curvas',  src: '/mapa-los-alamos/curvas.jpeg',  desc: 'Curvas de nivel y relieve del campo' },
  { id: 'coneat', label: 'CONEAT',  src: '/mapa-los-alamos/coneat.jpeg',  desc: 'Índice CONEAT y aptitud del suelo' },
];

function MapaVisual() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % MAPA_CAPAS.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused]);

  const capa = MAPA_CAPAS[active];

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="bg-gradient-to-br from-emerald-50 to-green-100 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-green-700" />
          <span className="text-sm font-bold text-gray-800">Campo Rodazo</span>
        </div>
        <span className="text-xs text-gray-500">{capa.desc}</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 px-3 pt-3 pb-2 overflow-x-auto bg-white">
        {MAPA_CAPAS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => { setActive(i); setPaused(true); }}
            className={`shrink-0 text-xs md:text-sm px-3.5 py-1.5 rounded-full font-semibold transition border ${
              i === active
                ? 'bg-green-600 text-white border-green-600 shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Imagen */}
      <div className="relative bg-gray-100 aspect-[16/10] overflow-hidden">
        {MAPA_CAPAS.map((c, i) => (
          <img
            key={c.id}
            src={c.src}
            alt={c.label}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Indicador de progreso */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1.5">
          {MAPA_CAPAS.map((c, i) => (
            <span
              key={c.id}
              className={`block h-1.5 rounded-full transition-all ${
                i === active ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function getCentroid(d: string): { x: number; y: number } {
  const points = d.match(/[\d.]+,[\d.]+/g)?.map(p => p.split(',').map(Number)) || [];
  const sum = points.reduce((s, [x, y]) => ({ x: s.x + x, y: s.y + y }), { x: 0, y: 0 });
  return { x: sum.x / points.length, y: sum.y / points.length };
}

// ============================================================
// EVENTOS TIMELINE
// ============================================================

const EVENTOS = [
  { tipo: 'lluvia',         label: 'Lluvia',         color: 'text-sky-600',    bg: 'bg-sky-50',     desc: '25 mm registrados en Norte',                hora: 'Hace 2 h',  via: 'WhatsApp · texto' },
  { tipo: 'nacimiento',     label: 'Nacimiento',     color: 'text-emerald-600',bg: 'bg-emerald-50', desc: '3 terneros · categoría Ternero · potrero Sur', hora: 'Hoy 09:14', via: 'WhatsApp · audio' },
  { tipo: 'tacto',          label: 'Tacto',          color: 'text-rose-600',   bg: 'bg-rose-50',    desc: '120 vacas tactadas · 94 preñadas (78%)',    hora: 'Ayer 16:00',via: 'Web' },
  { tipo: 'pulverizacion',  label: 'Pulverización',  color: 'text-green-700',  bg: 'bg-green-50',   desc: 'Glifosato 200L en Soja · Sur',              hora: 'Ayer 11:30',via: 'WhatsApp · audio' },
  { tipo: 'tratamiento',    label: 'Tratamiento',    color: 'text-red-600',    bg: 'bg-red-50',     desc: 'Vacuna aftosa · 50 vacas · potrero Norte',  hora: 'Lun 17:30', via: 'WhatsApp · audio' },
  { tipo: 'pesaje',         label: 'Pesaje',         color: 'text-slate-700',  bg: 'bg-slate-100',  desc: '40 novillos · 376 kg promedio',             hora: 'Sáb 09:00', via: 'WhatsApp · audio' },
];

// ============================================================
// INSUMOS MOCKUP
// ============================================================

const INSUMOS_STOCK = [
  { nombre: 'Sal mineral', unidad: 'kg', ingresos: 500, usos: 180, stock: 320 },
  { nombre: 'Vacuna aftosa', unidad: 'dosis', ingresos: 200, usos: 100, stock: 100 },
  { nombre: 'Glifosato', unidad: 'L', ingresos: 400, usos: 120, stock: 280 },
  { nombre: 'Urea', unidad: 'kg', ingresos: 5000, usos: 0, stock: 5000 },
  { nombre: 'Gasoil', unidad: 'L', ingresos: 800, usos: 520, stock: 280 },
];

// ============================================================
// FINANZAS MOCKUP — gastos reales con sector + categoría + factura
// ============================================================

const FIN_GASTOS = [
  { fecha: '28/01', proveedor: 'Veterinaria Sur', concepto: 'Vacunas aftosa x100', categoria: 'Sanidad y Manejo', cat_color: '#dc2626', sector: 'GANADERÍA', cultivo: null, monto: 15000, usd: 380, pagado: true, factura: true },
  { fecha: '27/01', proveedor: 'Coop. Agraria', concepto: 'Urea 5 tn', categoria: 'Insumos de Cultivos', cat_color: '#22c55e', sector: 'AGRICULTURA', cultivo: 'Maíz · Norte', monto: 48000, usd: 1218, pagado: false, factura: true },
  { fecha: '26/01', proveedor: 'Agroquímicos UY', concepto: 'Glifosato 200L', categoria: 'Insumos de Cultivos', cat_color: '#22c55e', sector: 'AGRICULTURA', cultivo: 'Soja · Sur', monto: 32000, usd: 811, pagado: true, factura: true },
  { fecha: '25/01', proveedor: 'Estación Esso', concepto: 'Gasoil tractor', categoria: 'Combustible', cat_color: '#f97316', sector: 'GENERAL EMPRESA', cultivo: null, monto: 9200, usd: 233, pagado: true, factura: true },
  { fecha: '23/01', proveedor: 'Forrajera', concepto: 'Sal mineral 500kg', categoria: 'Alimentación Animal', cat_color: '#ef4444', sector: 'GANADERÍA', cultivo: null, monto: 18500, usd: 469, pagado: true, factura: true },
  { fecha: '20/01', proveedor: 'Estudio Cr. Pérez', concepto: 'Honorarios Enero', categoria: 'Asesoramiento', cat_color: '#06b6d4', sector: 'GENERAL EMPRESA', cultivo: null, monto: 12000, usd: 305, pagado: false, factura: true },
];

const FIN_INGRESOS = [
  { fecha: '28/01', concepto: '30 novillos · Frigorífico', categoria: 'Venta hacienda', cat_color: '#10b981', monto: 1850000, usd: 46900, cobrado: false },
  { fecha: '15/01', concepto: 'Consignación lana', categoria: 'Venta lana', cat_color: '#06b6d4', monto: 320000, usd: 8120, cobrado: true },
];

const FIN_SECTORES = [
  { sector: 'GANADERÍA', total: 33500, color: '#16a34a' },
  { sector: 'AGRICULTURA', total: 80000, color: '#22c55e' },
  { sector: 'GENERAL EMPRESA', total: 21200, color: '#06b6d4' },
];

function FinanzasVisual() {
  const [tab, setTab] = useState<'gastos' | 'ingresos'>('gastos');
  const [showFactura, setShowFactura] = useState<number | null>(null);
  const totalGastos = FIN_GASTOS.reduce((s, g) => s + g.monto, 0);
  const totalIngresos = FIN_INGRESOS.reduce((s, g) => s + g.monto, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-700 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <Receipt className="w-4 h-4" />
          <span className="font-bold text-sm">Finanzas · Enero 2026</span>
        </div>
        <span className="text-xs text-green-100 hidden sm:inline">Cotización USD: $39.46</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        <button onClick={() => setTab('gastos')}
          className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
            tab === 'gastos' ? 'text-green-700 border-b-2 border-green-700 bg-white' : 'text-gray-500 hover:text-gray-700'
          }`}>
          <Banknote className="w-4 h-4" /> Gastos
          <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-bold">{FIN_GASTOS.length}</span>
        </button>
        <button onClick={() => setTab('ingresos')}
          className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
            tab === 'ingresos' ? 'text-green-700 border-b-2 border-green-700 bg-white' : 'text-gray-500 hover:text-gray-700'
          }`}>
          <DollarSign className="w-4 h-4" /> Ingresos
          <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">{FIN_INGRESOS.length}</span>
        </button>
      </div>

      {tab === 'gastos' && (
        <>
          {/* Sectores */}
          <div className="p-3 md:p-4 border-b border-gray-100 grid grid-cols-3 gap-2">
            {FIN_SECTORES.map((s, i) => (
              <div key={i} className="rounded-lg p-2.5 border" style={{ backgroundColor: `${s.color}10`, borderColor: `${s.color}30` }}>
                <div className="text-[9px] font-bold uppercase tracking-wider" style={{ color: s.color }}>{s.sector}</div>
                <div className="text-sm md:text-base font-bold text-gray-900">${(s.total / 1000).toFixed(1)}k</div>
              </div>
            ))}
          </div>

          {/* Tabla gastos */}
          <div className="overflow-x-auto">
            <table className="w-full text-[10px] md:text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold">Fecha</th>
                  <th className="text-left px-3 py-2 font-semibold">Proveedor / Concepto</th>
                  <th className="text-left px-3 py-2 font-semibold hidden md:table-cell">Categoría</th>
                  <th className="text-left px-3 py-2 font-semibold hidden lg:table-cell">Sector</th>
                  <th className="text-right px-3 py-2 font-semibold">Monto</th>
                  <th className="text-center px-3 py-2 font-semibold">Estado</th>
                  <th className="text-center px-2 py-2 font-semibold"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {FIN_GASTOS.map((g, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2.5 text-gray-500">{g.fecha}</td>
                    <td className="px-3 py-2.5">
                      <div className="font-semibold text-gray-800">{g.proveedor}</div>
                      <div className="text-gray-500 text-[10px]">
                        {g.concepto}
                        {g.cultivo && (
                          <span className="ml-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-medium">
                            <Sprout className="w-2.5 h-2.5" />{g.cultivo}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2.5 hidden md:table-cell">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-medium"
                        style={{ backgroundColor: `${g.cat_color}15`, color: g.cat_color }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: g.cat_color }} />
                        {g.categoria}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 hidden lg:table-cell text-[10px] font-bold text-gray-500">{g.sector}</td>
                    <td className="px-3 py-2.5 text-right">
                      <div className="font-bold text-gray-900">${fmt(g.monto)}</div>
                      <div className="text-[9px] text-gray-400">USD {fmt(g.usd)}</div>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        g.pagado ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>{g.pagado ? 'Pagado' : 'Pendiente'}</span>
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      {g.factura && (
                        <button onClick={() => setShowFactura(showFactura === i ? null : i)}
                          className="text-green-700 hover:text-green-800 transition-colors" title="Ver factura">
                          <Camera className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-bold">
                  <td colSpan={4} className="px-3 py-2.5 text-gray-900 text-right hidden md:table-cell">TOTAL</td>
                  <td className="px-3 py-2.5 text-gray-900 text-left md:hidden" colSpan={2}>TOTAL</td>
                  <td className="px-3 py-2.5 text-right text-gray-900">${fmt(totalGastos)}</td>
                  <td colSpan={2}></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mini factura preview */}
          {showFactura !== null && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex items-start gap-3">
                <div className="w-20 h-24 bg-white rounded border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 shrink-0">
                  <Camera className="w-5 h-5 mb-1" />
                  <span className="text-[8px]">Factura.jpg</span>
                </div>
                <div className="flex-1 text-xs">
                  <div className="font-bold text-gray-800 mb-1">{FIN_GASTOS[showFactura].proveedor}</div>
                  <div className="text-gray-500 mb-2">Adjuntada por WhatsApp · OCR automático</div>
                  <div className="space-y-0.5 text-[11px]">
                    <div><span className="text-gray-500">Concepto:</span> <span className="text-gray-800 font-medium">{FIN_GASTOS[showFactura].concepto}</span></div>
                    <div><span className="text-gray-500">Categoría:</span> <span className="text-gray-800 font-medium">{FIN_GASTOS[showFactura].categoria}</span></div>
                    <div><span className="text-gray-500">Monto:</span> <span className="text-gray-800 font-medium">${fmt(FIN_GASTOS[showFactura].monto)}</span></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}

      {tab === 'ingresos' && (
        <div className="overflow-x-auto">
          <table className="w-full text-[10px] md:text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="text-left px-3 py-2 font-semibold">Fecha</th>
                <th className="text-left px-3 py-2 font-semibold">Concepto</th>
                <th className="text-left px-3 py-2 font-semibold hidden md:table-cell">Categoría</th>
                <th className="text-right px-3 py-2 font-semibold">Monto</th>
                <th className="text-center px-3 py-2 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {FIN_INGRESOS.map((g, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-3 py-2.5 text-gray-500">{g.fecha}</td>
                  <td className="px-3 py-2.5 font-semibold text-gray-800">{g.concepto}</td>
                  <td className="px-3 py-2.5 hidden md:table-cell">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-medium"
                      style={{ backgroundColor: `${g.cat_color}15`, color: g.cat_color }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: g.cat_color }} />
                      {g.categoria}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <div className="font-bold text-gray-900">${fmt(g.monto)}</div>
                    <div className="text-[9px] text-gray-400">USD {fmt(g.usd)}</div>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      g.cobrado ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>{g.cobrado ? 'Cobrado' : 'Por cobrar'}</span>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold">
                <td colSpan={3} className="px-3 py-2.5 text-gray-900 text-right hidden md:table-cell">TOTAL</td>
                <td className="px-3 py-2.5 text-gray-900 text-left md:hidden" colSpan={2}>TOTAL</td>
                <td className="px-3 py-2.5 text-right text-gray-900">${fmt(totalIngresos)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ============================================================
// AGENDA MOCKUP
// ============================================================

const AGENDA_TAREAS = [
  { dia: 5, color: 'bg-emerald-500', label: 'Tacto · Sur' },
  { dia: 12, color: 'bg-amber-500', label: 'Vacuna brucelosis' },
  { dia: 18, color: 'bg-blue-500', label: 'Esquila · Norte' },
  { dia: 22, color: 'bg-rose-500', label: 'Carga · 30 novillos' },
];

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showMaiz, setShowMaiz] = useState(false);
  const [autoPlayIndex, setAutoPlayIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const demoTimeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const whatsappRef = useRef<HTMLDivElement>(null);
  const activeDemoRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setShowMaiz(prev => !prev), 3400);
    return () => clearInterval(interval);
  }, []);

  const demoOrder = WHATSAPP_FEATURES.map(f => f.demo);

  const clearAllDemoTimeouts = () => {
    demoTimeoutsRef.current.forEach(t => clearTimeout(t));
    demoTimeoutsRef.current = [];
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
  };

  const runDemo = (demoType: string, demoIndex: number, sessionId: number) => {
    clearAllDemoTimeouts();
    activeDemoRef.current = sessionId;
    setSelectedDemo(demoType);
    setChatMessages([]);
    setIsTyping(false);
    const demo = getDemoData(demoType);
    const t1 = setTimeout(() => { if (activeDemoRef.current !== sessionId) return; setChatMessages([demo.userMsg]); }, 300);
    const t2 = setTimeout(() => { if (activeDemoRef.current !== sessionId) return; setIsTyping(true); }, 1200);
    const t3 = setTimeout(() => { if (activeDemoRef.current !== sessionId) return; setIsTyping(false); setChatMessages([demo.userMsg, demo.botResponse]); }, 2400);
    const t4 = setTimeout(() => {
      if (activeDemoRef.current !== sessionId) return;
      const nextIndex = (demoIndex + 1) % demoOrder.length;
      setAutoPlayIndex(nextIndex);
      runDemo(demoOrder[nextIndex], nextIndex, sessionId);
    }, 5000);
    demoTimeoutsRef.current = [t1, t2, t3, t4];
  };

  useEffect(() => {
    const el = whatsappRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const session = Date.now();
          activeDemoRef.current = session;
          runDemo(demoOrder[0], 0, session);
        } else { clearAllDemoTimeouts(); }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); clearAllDemoTimeouts(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDemoData = (demoType: string) => {
    const demos: Record<string, { userMsg: any; botResponse: any }> = {
      audio: {
        userMsg: { type: 'audio', sender: 'user', duration: '0:04', timestamp: '10:00' },
        botResponse: { type: 'text', sender: 'bot', timestamp: '10:01',
          text: { title: 'Entendi:', icon: '💉', summary: 'Tratamiento: vacuna aftosa a 50 vacas en Sur', buttons: ['Confirmar', 'Editar', 'Cancelar'] } } },
      factura: {
        userMsg: { type: 'image', sender: 'user', timestamp: '10:00' },
        botResponse: { type: 'text', sender: 'bot', timestamp: '10:01',
          text: { title: 'Factura de Gasto detectada:', icon: '🧾',
            data: [{ label: 'Proveedor', value: 'Veterinaria Sur' }, { label: 'Monto', value: '$15.000' }, { label: 'Concepto', value: 'Medicamentos' }],
            buttons: ['Confirmar', 'Cancelar'] } } },
      fotoevento: {
        userMsg: { type: 'imageWithCaption', sender: 'user', caption: 'murio un ternero en el norte', timestamp: '10:00' },
        botResponse: { type: 'text', sender: 'bot', timestamp: '10:01',
          text: { title: 'Entendi:', icon: '💀', summary: 'Mortandad: 1 ternero en Norte, con foto adjunta', buttons: ['Confirmar', 'Editar', 'Cancelar'] } } },
      consulta: {
        userMsg: { type: 'text', sender: 'user', message: 'pasame los datos de los ultimos 5 dias', timestamp: '10:00' },
        botResponse: { type: 'text', sender: 'bot', timestamp: '10:01',
          text: { title: '23 registros', icon: '📊', summary: 'Generando PDF... + 3 fotos adjuntas',
            data: [{ label: 'Lluvias', value: '4 registros' }, { label: 'Tratamientos', value: '8 registros' }, { label: 'Mortandades', value: '2 registros 📷' }, { label: 'Tactos', value: '3 registros' }] } } },
      calendario: {
        userMsg: { type: 'text', sender: 'user', message: 'en 14 dias hacer tacto en el sur', timestamp: '10:00' },
        botResponse: { type: 'text', sender: 'bot', timestamp: '10:01',
          text: { title: 'Actividad programada', icon: '📅',
            data: [{ label: 'Tarea', value: 'Hacer tacto en el sur' }, { label: 'Fecha', value: '13/02/2026' }],
            buttons: ['Confirmar', 'Cancelar'] } } },
    };
    return demos[demoType] || demos.audio;
  };

  const startChatDemo = (demoType: string) => {
    const clickedIndex = demoOrder.indexOf(demoType);
    const session = Date.now();
    runDemo(demoType, clickedIndex, session);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ============================================================ NAV */}
      <motion.nav
        initial={{ y: -100 }} animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{
          backgroundColor: scrollY > 50 || mobileMenuOpen ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
          backdropFilter: scrollY > 50 || mobileMenuOpen ? 'blur(10px)' : 'none'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
              <img src="/BotRural.svg" alt="BotRural" className="h-9 md:h-12" />
            </motion.div>

            <div className="hidden md:flex gap-8 items-center">
              <a href="#funcionalidades" className="text-white/80 hover:text-white transition-colors text-sm">Funcionalidades</a>
              <a href="#whatsapp" className="text-white/80 hover:text-white transition-colors text-sm">WhatsApp</a>
              <a href="#plataforma" className="text-white/80 hover:text-white transition-colors text-sm">Plataforma</a>
              <a href="https://pricing.botrural.app" className="text-white/80 hover:text-white transition-colors text-sm">Precios</a>
              <motion.a href="https://app.botrural.app/login" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:bg-green-700 transition-all">
                Ingresar
              </motion.a>
            </div>

            <button className="md:hidden text-white p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden">
                <div className="py-4 flex flex-col gap-1 border-t border-white/10 mt-3">
                  <a href="#funcionalidades" onClick={() => setMobileMenuOpen(false)} className="text-white/90 text-sm py-2.5 px-3 rounded-lg hover:bg-white/10 transition-colors">Funcionalidades</a>
                  <a href="#whatsapp" onClick={() => setMobileMenuOpen(false)} className="text-white/90 text-sm py-2.5 px-3 rounded-lg hover:bg-white/10 transition-colors">WhatsApp</a>
                  <a href="#plataforma" onClick={() => setMobileMenuOpen(false)} className="text-white/90 text-sm py-2.5 px-3 rounded-lg hover:bg-white/10 transition-colors">Plataforma</a>
                  <a href="https://pricing.botrural.app" onClick={() => setMobileMenuOpen(false)} className="text-white/90 text-sm py-2.5 px-3 rounded-lg hover:bg-white/10 transition-colors">Precios</a>
                  <a href="https://app.botrural.app/login" onClick={() => setMobileMenuOpen(false)} className="bg-green-600 text-white text-sm py-2.5 px-3 rounded-lg font-semibold text-center mt-2">Ingresar</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* ============================================================ HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.img animate={{ opacity: showMaiz ? 0 : 1 }} transition={{ duration: 1.5 }}
            src="campo.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Campo" />
          <motion.img animate={{ opacity: showMaiz ? 1 : 0 }} transition={{ duration: 1.5 }}
            src="maiz.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Maiz" />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-8 md:pt-20 w-full">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                className="inline-block bg-green-500/20 text-green-300 border border-green-400/30 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
                Plataforma de gestión rural con IA
              </motion.span>

              <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 text-white leading-[1.1]">
                Gestioná tu campo<br />
                con <span className="text-[#00934a]">WhatsApp</span>
              </h1>

              <p className="text-sm md:text-lg lg:text-xl text-white/80 mb-5 md:mb-8 leading-relaxed max-w-lg">
                Registrá eventos, facturas y datos con un audio o una foto.
                Consultá indicadores, generá reportes y controlá finanzas — todo desde el celular.
              </p>

              <div className="flex flex-wrap gap-2 md:gap-3 mb-5 md:mb-8">
                {HERO_CATEGORIES.map((cat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-2.5 py-1.5 md:px-4 md:py-2.5 rounded-full text-xs md:text-sm">
                    <span className="text-green-300 [&>svg]:w-3.5 [&>svg]:h-3.5 md:[&>svg]:w-5 md:[&>svg]:h-5">{cat.icon}</span>
                    <span className="text-white font-medium">{cat.label}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                className="flex flex-row gap-3 md:gap-4 mb-4 md:mb-6">
                <motion.a href="https://app.botrural.app/register" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="group bg-green-600 hover:bg-green-700 text-white px-5 py-3 md:px-8 md:py-4 rounded-xl text-sm md:text-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2">
                  Probar gratis
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('whatsapp')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-5 py-3 md:px-8 md:py-4 rounded-xl text-sm md:text-lg font-semibold bg-white/10 border border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all flex items-center justify-center gap-2">
                  <Play className="w-4 h-4 md:w-5 md:h-5" />
                  Ver demo
                </motion.button>
              </motion.div>

              <p className="text-white/50 text-xs md:text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full" />
                Sin tarjeta de crédito
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
          className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center">
          <motion.button onClick={() => document.getElementById('whatsapp')?.scrollIntoView({ behavior: 'smooth' })}
            animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1 md:gap-2 text-white/70 hover:text-white transition-colors cursor-pointer">
            <span className="text-xs md:text-sm font-medium">Ver más</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6">
              <path d="M7 13l5 5 5-5" /><path d="M7 6l5 5 5-5" />
            </svg>
          </motion.button>
        </motion.div>
      </section>

      {/* ============================================================ STATS BAR */}
      <section className="bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {STATS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center text-white">
              <div className="text-2xl md:text-4xl font-bold mb-1"><CountUp target={s.value} /></div>
              <div className="text-xs md:text-sm opacity-90 uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================ WHATSAPP DEMO */}
      <section id="whatsapp" ref={whatsappRef} className="py-16 md:py-24 px-4 md:px-6 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-16">
            <span className="bg-[#00934a]/20 text-[#00934a] px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4 inline-block">
              WhatsApp + IA
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6">Tan simple como mandar un audio</h2>
            <p className="text-sm md:text-xl text-gray-400 max-w-3xl mx-auto">
              Tu capataz no necesita aprender ninguna app. Manda un audio, un texto o una foto por WhatsApp y el bot registra todo con inteligencia artificial.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="space-y-2 md:space-y-4">
              <h3 className="text-sm md:text-xl font-bold mb-3 md:mb-6 text-gray-300">Toca para ver la demo en vivo:</h3>
              {WHATSAPP_FEATURES.map((feature, index) => (
                <motion.button key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }} onClick={() => startChatDemo(feature.demo)}
                  className={`w-full text-left p-3 md:p-5 rounded-xl md:rounded-2xl transition-all ${
                    selectedDemo === feature.demo ? 'bg-[#00934a]/20 border-2 border-[#00934a]' : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                  }`}>
                  <div className="flex items-center md:items-start gap-3 md:gap-4">
                    <div className={`p-2 md:p-3 rounded-lg md:rounded-xl shrink-0 ${selectedDemo === feature.demo ? 'bg-[#00934a]' : 'bg-white/10'}`}>{feature.icon}</div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm md:text-lg mb-0 md:mb-1">{feature.title}</h4>
                      <p className="text-gray-400 text-xs md:text-sm hidden md:block">{feature.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}

              <div className="hidden md:block mt-8 pt-6 border-t border-white/10">
                <p className="text-gray-500 text-sm mb-4">Ejemplos de lo que podes decirle:</p>
                <div className="space-y-2">
                  {WHATSAPP_EXAMPLES.slice(0, 5).map((ex, i) => (
                    <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 text-sm">
                      <span className="text-[#00934a] shrink-0">{">"}</span>
                      <span className="text-gray-300">"{ex.user}"</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative flex justify-center order-first lg:order-last">
              <div className="relative w-full max-w-[280px] md:max-w-sm">
                <div className="bg-gray-800 rounded-[2rem] md:rounded-[3rem] p-2 md:p-3 shadow-2xl border-2 md:border-4 border-gray-700">
                  <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden">
                    <div className="bg-[#075e54] px-3 py-3 md:px-4 md:py-5 flex items-center gap-2 md:gap-3">
                      <img src="/BotRural.svg" alt="BotRural" className="w-7 h-7 md:w-10 md:h-10 rounded-full" />
                      <div>
                        <div className="font-bold text-white text-xs md:text-sm">BotRural</div>
                        <div className="text-green-200 text-[10px] md:text-xs">en linea</div>
                      </div>
                    </div>

                    <div className="bg-[#ece5dd] p-2 md:p-3 space-y-2 min-h-[220px] md:min-h-[420px] flex flex-col justify-end">
                      <AnimatePresence mode="wait">
                        {chatMessages.map((msg, i) => (
                          <motion.div key={`${selectedDemo}-${i}`} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.type === 'imageWithCaption' ? (
                              <div className="bg-[#dcf8c6] rounded-lg rounded-tr-none p-1 md:p-1.5 max-w-[80%] shadow-sm">
                                <div className="bg-gray-200 rounded-md h-16 md:h-28 flex items-center justify-center">
                                  <div className="text-center text-gray-400">
                                    <Camera className="w-4 h-4 md:w-6 md:h-6 mx-auto mb-0.5" />
                                    <span className="text-[8px] md:text-[10px]">IMG_2847.jpg</span>
                                  </div>
                                </div>
                                <p className="text-[11px] md:text-sm text-gray-800 px-1 pt-1">{msg.caption}</p>
                                <div className="text-[8px] md:text-[10px] text-gray-500 text-right mt-0.5 px-1">{msg.timestamp}</div>
                              </div>
                            ) : msg.type === 'audio' ? (
                              <div className="bg-[#dcf8c6] rounded-lg rounded-tr-none p-2 md:p-3 max-w-[85%] shadow-sm">
                                <div className="flex items-center gap-1.5 md:gap-2">
                                  <div className="w-6 h-6 md:w-8 md:h-8 bg-[#00934a] rounded-full flex items-center justify-center shrink-0">
                                    <Play className="w-2.5 h-2.5 md:w-3 md:h-3 text-white ml-0.5" />
                                  </div>
                                  <div className="flex-1 flex items-end gap-[1px] md:gap-[2px] h-4 md:h-6">
                                    {[...Array(20)].map((_, j) => (
                                      <div key={j} className="w-[2px] md:w-[3px] bg-[#075e54]/60 rounded-full" style={{ height: `${5 + Math.random() * 11}px` }} />
                                    ))}
                                  </div>
                                  <span className="text-[10px] md:text-xs text-gray-500">{msg.duration}</span>
                                </div>
                                <div className="text-[8px] md:text-[10px] text-gray-500 text-right mt-1">{msg.timestamp}</div>
                              </div>
                            ) : msg.type === 'image' ? (
                              <div className="bg-[#dcf8c6] rounded-lg rounded-tr-none p-1 md:p-1.5 max-w-[75%] shadow-sm">
                                <div className="bg-gray-200 rounded-md h-20 md:h-36 flex items-center justify-center">
                                  <div className="text-center text-gray-400">
                                    <Camera className="w-5 h-5 md:w-8 md:h-8 mx-auto mb-0.5" />
                                    <span className="text-[10px] md:text-xs">Factura.jpg</span>
                                  </div>
                                </div>
                                <div className="text-[8px] md:text-[10px] text-gray-500 text-right mt-1 px-1">{msg.timestamp}</div>
                              </div>
                            ) : msg.sender === 'user' ? (
                              <div className="bg-[#dcf8c6] rounded-lg rounded-tr-none px-2 py-1.5 md:px-3 md:py-2 max-w-[85%] shadow-sm">
                                <p className="text-[11px] md:text-sm text-gray-800">{msg.message}</p>
                                <div className="text-[8px] md:text-[10px] text-gray-500 text-right mt-0.5">{msg.timestamp}</div>
                              </div>
                            ) : (
                              <div className="bg-white rounded-lg rounded-tl-none px-2 py-1.5 md:px-3 md:py-2.5 max-w-[90%] shadow-sm">
                                <div className="flex items-center gap-1 md:gap-1.5 mb-1 md:mb-2">
                                  <span className="text-sm md:text-lg">{msg.text.icon}</span>
                                  <span className="font-bold text-[11px] md:text-sm text-gray-800">{msg.text.title}</span>
                                </div>
                                {msg.text.summary && (<p className="text-[11px] md:text-sm text-gray-700 mb-1 md:mb-2">{msg.text.summary}</p>)}
                                {msg.text.data && (
                                  <div className="space-y-0.5 md:space-y-1 text-[11px] md:text-sm">
                                    {msg.text.data.map((item: any, j: number) => (
                                      <div key={j}><span className="font-semibold text-gray-700">{item.label}:</span>{' '}<span className="text-gray-600">{item.value}</span></div>
                                    ))}
                                  </div>
                                )}
                                {msg.text.buttons && (
                                  <div className="flex flex-wrap gap-1 md:gap-2 mt-1.5 md:mt-3 pt-1 md:pt-2 border-t border-gray-100">
                                    {msg.text.buttons.map((btn: string, j: number) => (
                                      <span key={j} className={`text-[10px] md:text-xs px-2 py-1 md:px-3 md:py-1.5 rounded-full font-medium ${j === 0 ? 'bg-[#075e54]/10 text-[#00934a]' : 'bg-gray-100 text-gray-500'}`}>{btn}</span>
                                    ))}
                                  </div>
                                )}
                                <div className="text-[8px] md:text-[10px] text-gray-400 text-right mt-0.5 md:mt-1">{msg.timestamp}</div>
                              </div>
                            )}
                          </motion.div>
                        ))}

                        {isTyping && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                            <div className="bg-white rounded-lg px-3 py-2 md:px-4 md:py-3 shadow-sm">
                              <div className="flex gap-1 md:gap-1.5">
                                {[0, 1, 2].map(i => (
                                  <motion.div key={i} animate={{ y: [0, -3, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }} className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full" />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {!selectedDemo && (
                        <div className="flex items-center justify-center min-h-[180px] md:min-h-[380px]">
                          <div className="text-center px-4">
                            <div className="flex gap-1 md:gap-1.5 justify-center mb-2">
                              {[0, 1, 2].map(i => (
                                <motion.div key={i} animate={{ y: [0, -3, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }} className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full" />
                              ))}
                            </div>
                            <p className="text-gray-500 text-[10px] md:text-sm">Cargando demo...</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-[#f0f0f0] px-2 py-1.5 md:px-3 md:py-2.5 flex items-center gap-1.5 md:gap-2">
                      <div className="flex-1 bg-white rounded-full px-3 py-1.5 md:px-4 md:py-2 text-gray-400 text-[11px] md:text-sm">Mensaje...</div>
                      <div className="bg-[#075e54] rounded-full p-1.5 md:p-2.5">
                        <Mic className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-20 md:w-28 h-20 md:h-28 bg-[#00934a]/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-24 md:w-36 h-24 md:h-36 bg-[#00934a]/15 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ PLATFORM FEATURES GRID */}
      <section id="funcionalidades" className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6 text-gray-900">Todo lo que necesitás en un solo lugar</h2>
            <p className="text-sm md:text-xl text-gray-500 max-w-2xl mx-auto">
              Gestión completa de tu establecimiento: ganadería, finanzas, costos, equipo y más.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {PLATFORM_FEATURES.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white border border-gray-200 p-4 md:p-7 rounded-xl md:rounded-2xl hover:shadow-xl hover:border-gray-300 transition-all">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                  <div className={`bg-gradient-to-br ${feature.color} w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform [&>svg]:w-5 [&>svg]:h-5 md:[&>svg]:w-7 md:[&>svg]:h-7`}>
                    {feature.icon}
                  </div>
                  <span className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider">{feature.tag}</span>
                </div>
                <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-xs md:text-sm hidden md:block">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ DETAILED SECTIONS */}
      <section id="plataforma" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto space-y-32">
          {DETAILED_SECTIONS.map((section, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
              className={section.visual === 'agricultura' ? '' : `grid lg:grid-cols-2 gap-16 items-center`}>
              <div className={index % 2 === 1 && section.visual !== 'agricultura' ? 'lg:order-2' : ''}>
                <span className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">{section.badge}</span>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{section.title}</h3>
                <p className="text-lg text-gray-500 mb-8">{section.subtitle}</p>
                <ul className={`space-y-3 ${section.visual === 'agricultura' ? 'grid sm:grid-cols-2 gap-x-8 gap-y-3 space-y-0 mb-10' : ''}`}>
                  {section.items.map((item, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-600">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className={index % 2 === 1 && section.visual !== 'agricultura' ? 'lg:order-1' : ''}>
                <motion.div whileHover={{ scale: 1.02 }}
                  className={`bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 flex items-center justify-center border border-gray-200 shadow-lg ${
                    section.visual === 'agricultura' ? 'min-h-[500px]' : 'aspect-[4/3]'
                  }`}>
                  {section.visual === 'indicadores' && (
                    <div className="w-full space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: 'UG/ha', value: '0.82', trend: '+5%' },
                          { label: 'Costo/UG', value: '$420', trend: '-3%' },
                          { label: 'Preñez', value: '78%', trend: '+2%' },
                        ].map((kpi, i) => (
                          <div key={i} className="bg-white rounded-xl p-3 text-center shadow-sm">
                            <div className="text-xs text-gray-400 mb-1">{kpi.label}</div>
                            <div className="text-xl font-bold text-gray-800">{kpi.value}</div>
                            <div className="text-xs text-green-600 font-medium">{kpi.trend}</div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="text-xs text-gray-400 mb-3">Evolución UG (12 meses)</div>
                        <div className="flex items-end gap-1 h-20">
                          {[40, 45, 42, 48, 52, 55, 50, 58, 62, 60, 65, 68].map((h, i) => (
                            <div key={i} className="flex-1 bg-green-500 rounded-t" style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {section.visual === 'finanzas' && (
                    <div className="w-full space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                          <div className="text-xs text-red-400">Gastos pendientes</div>
                          <div className="text-lg font-bold text-red-600">$245.000</div>
                        </div>
                        <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                          <div className="text-xs text-green-500">Ingresos cobrados</div>
                          <div className="text-lg font-bold text-green-600">$890.000</div>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                            <FileText className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-xs font-bold text-gray-700">exportar_campo.xlsx</span>
                        </div>
                        <div className="flex gap-1 mb-2">
                          <span className="text-[9px] px-2 py-0.5 bg-green-100 text-green-700 rounded font-medium">Ventas</span>
                          <span className="text-[9px] px-2 py-0.5 bg-green-100 text-green-700 rounded font-medium">Gastos</span>
                          <span className="text-[9px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded">Eventos</span>
                          <span className="text-[9px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded">Stock</span>
                        </div>
                        <div className="space-y-1 text-[9px]">
                          <div className="grid grid-cols-5 gap-1 text-gray-400 font-medium border-b border-gray-100 pb-1">
                            <span>Fecha</span><span>Detalle</span><span>Monto</span><span>USD</span><span>Factura</span>
                          </div>
                          <div className="grid grid-cols-5 gap-1 text-gray-600">
                            <span>28/01</span><span>30 novillos</span><span>$450k</span><span>$423</span><span className="text-blue-500 underline">Ver</span>
                          </div>
                          <div className="grid grid-cols-5 gap-1 text-gray-600">
                            <span>25/01</span><span>Veterinaria</span><span>$15k</span><span>$14</span><span className="text-blue-500 underline">Ver</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-100 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-amber-600" />
                        <span className="text-[10px] text-amber-700 font-medium">Cotización dólar del día anterior incluida en cada registro</span>
                      </div>
                    </div>
                  )}
                  {section.visual === 'pastoreo' && (
                    <div className="w-full space-y-3">
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="text-sm font-bold text-gray-700 mb-3">Reporte de Pastoreo Rotativo</div>
                        <div className="space-y-2">
                          {[
                            { modulo: 'Norte', entrada: '05/01', salida: '19/01', dias: 14, descanso: 42 },
                            { modulo: 'Sur', entrada: '19/01', salida: '02/02', dias: 14, descanso: 38 },
                            { modulo: 'Este', entrada: '02/02', salida: '-', dias: 8, descanso: '-' },
                          ].map((row, i) => (
                            <div key={i} className="grid grid-cols-5 text-xs gap-2 py-2 border-b border-gray-50">
                              <span className="font-semibold text-gray-700">{row.modulo}</span>
                              <span className="text-gray-500">{row.entrada}</span>
                              <span className="text-gray-500">{row.salida}</span>
                              <span className="text-green-600 font-medium">{row.dias}d</span>
                              <span className="text-amber-600">{row.descanso}{typeof row.descanso === 'number' ? 'd' : ''}</span>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-5 text-[10px] text-gray-400 mt-1 gap-2">
                          <span>Módulo</span><span>Entrada</span><span>Salida</span><span>Pastoreo</span><span>Descanso</span>
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-700">pastoreo_rotativo.pdf</div>
                          <div className="text-xs text-gray-400">Generado desde WhatsApp</div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  )}
                  {section.visual === 'agricultura' && (<AgriculturaVisual />)}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================ VENTAS / GANADERIA */}
      <section className="py-20 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid lg:grid-cols-[400px_1fr] gap-10 lg:gap-12 items-center">
            <div>
              <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">Ventas · Bovino · Ovino</span>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Tus ventas de hacienda, claras como un Excel</h3>
              <p className="text-lg text-gray-500 mb-6">
                Cargás cada venta con un mensaje y la tabla se llena sola. KG, US$/KG, US$ bruto por categoría, total general y gráfico de torta — listo para el contador.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                {['Desglose por categoría (Novillo, Vaca, Vaquillona…)', 'Cambia entre US$, KG y Animales con un toque', 'Promedios y totales calculados', 'Exportá todo a Excel con un click'].map((it, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
            <VentasVisual />
          </motion.div>
        </div>
      </section>

      {/* ============================================================ MAPA */}
      <section className="py-20 md:py-24 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid lg:grid-cols-2 gap-10 items-center">
            <MapaVisual />
            <div>
              <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">Mapa interactivo</span>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Tu campo dibujado, no en una libreta</h3>
              <p className="text-lg text-gray-500 mb-6">
                Dibujá los potreros una vez y todo se conecta: animales, cultivos, lluvias, pastoreo. Un click y ves qué hay en cada potrero hoy.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                {['Polígonos de cada potrero con superficie real', 'Filtrá por cultivo, categoría animal o evento', 'Visualización del pastoreo rotativo en el mapa', 'Compartilo con tu equipo en segundos'].map((it, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ EVENTOS */}
      <section className="py-20 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">Eventos del campo</span>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Todo lo que pasa en el campo, en un solo timeline</h3>
              <p className="text-lg text-gray-500 mb-6">
                Lluvias, sanidades, pariciones, mortandades, movimientos. Cada cosa que mandás por WhatsApp queda registrada y filtrable.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                {['Lluvias y clima', 'Sanidad: vacunas, tratamientos, dosificaciones', 'Pariciones, destetes, mortandades', 'Movimientos entre potreros', 'Fotos adjuntas a cualquier evento'].map((it, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 md:p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-bold text-gray-700">Últimos eventos</span>
                </div>
                <span className="text-xs text-gray-400">Hoy · 5 nuevos</span>
              </div>
              <div className="space-y-3">
                {EVENTOS.map((e, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3 bg-white rounded-xl p-3 shadow-sm">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${e.bg} ${e.color}`}>
                      <IconoEvento tipo={e.tipo} className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-gray-800">{e.label}</span>
                        <span className="text-[10px] text-gray-400">· {e.hora}</span>
                      </div>
                      <p className="text-sm text-gray-600">{e.desc}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{e.via}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ FINANZAS DETALLADA */}
      <section className="py-20 md:py-24 px-4 md:px-6 bg-gradient-to-b from-white to-green-50/40">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-12">
            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">Finanzas</span>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Gastos e ingresos como en una planilla, pero viva</h3>
            <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
              Cada gasto con su <strong>categoría real</strong>, su <strong>sector</strong> (Ganadería, Agricultura, Mixto, Estructura) y su <strong>factura adjunta</strong>. Cargás todo desde WhatsApp.
            </p>
          </motion.div>

          <FinanzasVisual />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-8">
            {[
              { icon: <Receipt className="w-5 h-5" />, title: 'Categorías reales', desc: 'Sanidad, Alimentación, Insumos de Cultivos, Combustible, Asesoramiento, etc.' },
              { icon: <Banknote className="w-5 h-5" />, title: 'Sector + tipo', desc: 'Variable o fijo, ganadería o agricultura, asignable o puro.' },
              { icon: <Camera className="w-5 h-5" />, title: 'Factura adjunta', desc: 'Foto por WhatsApp = gasto cargado con OCR.' },
              { icon: <DollarSign className="w-5 h-5" />, title: 'Pesos + dólares', desc: 'Cotización del día anterior incluida en cada movimiento.' },
            ].map((it, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <div className="w-9 h-9 bg-green-100 text-green-700 rounded-lg flex items-center justify-center mb-2">{it.icon}</div>
                <div className="font-bold text-sm text-gray-900 mb-1">{it.title}</div>
                <div className="text-xs text-gray-500">{it.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ INSUMOS */}
      <section className="py-20 md:py-24 px-4 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-200 shadow-sm order-2 lg:order-1">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-bold text-gray-700">Stock de insumos</span>
                </div>
                <span className="text-xs text-gray-400">Ingresos · usos · stock</span>
              </div>
              <div className="overflow-x-auto -mx-2">
                <table className="w-full text-[11px] md:text-xs">
                  <thead className="text-gray-400 uppercase tracking-wider">
                    <tr>
                      <th className="text-left px-2 py-2 font-semibold">Insumo</th>
                      <th className="text-right px-2 py-2 font-semibold">Ingresos</th>
                      <th className="text-right px-2 py-2 font-semibold">Usos</th>
                      <th className="text-right px-2 py-2 font-semibold">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {INSUMOS_STOCK.map((it, i) => (
                      <motion.tr key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                        <td className="px-2 py-2.5 font-semibold text-gray-800">{it.nombre}</td>
                        <td className="px-2 py-2.5 text-right text-green-600 font-medium">+{fmt(it.ingresos)}</td>
                        <td className="px-2 py-2.5 text-right text-rose-600">−{fmt(it.usos)}</td>
                        <td className="px-2 py-2.5 text-right">
                          <span className="font-bold text-gray-900">{fmt(it.stock)}</span>
                          <span className="text-gray-400 text-[10px] ml-1">{it.unidad}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-[11px] text-gray-500">
                <MessageSquare className="w-3.5 h-3.5 text-green-600" />
                <span>"<span className="text-gray-700 italic">usé 50kg de sal en el norte</span>" → stock actualizado</span>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-block bg-lime-100 text-lime-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">Insumos</span>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Stock de insumos al día, sin planillas</h3>
              <p className="text-lg text-gray-500 mb-6">
                Cargá los <strong>ingresos</strong>, registrá los <strong>usos</strong> y el sistema calcula el <strong>stock actual</strong>. Lo hacés por WhatsApp o desde la web.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                {['Registrá ingresos de insumos al campo', 'Cargá los usos cuando se aplican', 'Stock actual calculado automáticamente', 'Mismo dato accesible desde WhatsApp y web'].map((it, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ AGENDA */}
      <section className="py-20 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">Agenda con IA</span>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">"En 14 días hacer tacto" — el bot lo agenda solo</h3>
              <p className="text-lg text-gray-500 mb-6">
                Decile al bot lo que hay que hacer y cuándo. Él arma la agenda, te recuerda el día y lo deja listo para que lo veas en el calendario.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                {['Recordatorios automáticos por WhatsApp', 'Calendario mensual con todas las tareas', 'Tareas recurrentes: vacunas, esquila, sanidad', 'Cargá tareas con un audio o un texto natural'].map((it, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-5 md:p-6 border border-green-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-green-700" />
                  <span className="text-sm font-bold text-gray-800">Febrero 2026</span>
                </div>
                <span className="text-xs text-gray-500">4 tareas</span>
              </div>
              <div className="bg-white rounded-xl p-3 mb-3">
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-gray-400 font-semibold mb-1">
                  {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => <div key={i}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 28 }, (_, i) => i + 1).map(day => {
                    const t = AGENDA_TAREAS.find(t => t.dia === day);
                    return (
                      <div key={day} className={`aspect-square flex flex-col items-center justify-center rounded text-xs ${t ? 'bg-gray-50 font-bold' : 'text-gray-400'}`}>
                        <span>{day}</span>
                        {t && <span className={`w-1.5 h-1.5 rounded-full ${t.color} mt-0.5`} />}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-1.5">
                {AGENDA_TAREAS.map((t, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 text-xs">
                    <span className={`w-2 h-2 rounded-full ${t.color}`} />
                    <span className="font-medium text-gray-700">{t.dia} feb</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-600">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ MULTI-CANAL */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl md:text-4xl font-bold mb-3">Donde sea, como te quede cómodo</h3>
          <p className="text-gray-400 mb-10 md:mb-14 max-w-2xl mx-auto">Cada uno del equipo carga datos por su canal. Todos ven la misma información en tiempo real.</p>
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {[
              { icon: <MessageSquare className="w-8 h-8" />, title: 'WhatsApp', desc: 'Para el capataz, el equipo, vos.' },
              { icon: <Monitor className="w-8 h-8" />, title: 'Web', desc: 'Reportes, indicadores y finanzas.' },
              { icon: <Smartphone className="w-8 h-8" />, title: 'Equipo y roles', desc: 'Capataz, vet, contador. Cada uno con sus permisos.' },
            ].map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-8 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-green-600/20 text-green-400 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">{c.icon}</div>
                <h4 className="font-bold text-sm md:text-lg mb-1">{c.title}</h4>
                <p className="text-gray-400 text-xs md:text-sm">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ EXTRA FEATURES BAR */}
      <section className="py-16 px-6 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-center text-lg font-semibold text-gray-400 mb-10 uppercase tracking-wider">Y también...</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { icon: <MapPin className="w-5 h-5" />, label: 'Mapa interactivo' },
              { icon: <Calendar className="w-5 h-5" />, label: 'Calendario IA' },
              { icon: <Shield className="w-5 h-5" />, label: 'Roles y permisos' },
              { icon: <Globe className="w-5 h-5" />, label: 'Multi-campo' },
              { icon: <FileText className="w-5 h-5" />, label: 'Exportar Excel' },
              { icon: <Bell className="w-5 h-5" />, label: 'Recordatorios' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex flex-col items-center gap-2 text-center py-4">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">{item.icon}</div>
                <span className="text-sm text-gray-600 font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ PRICING TEASER */}
      <section className="py-20 md:py-24 px-4 md:px-6 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-white text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-4 shadow-sm">Precios</span>
          <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Un precio simple, según tus hectáreas</h3>
          <p className="text-lg text-gray-600 mb-8">Sin permanencias. Sin sorpresas. Cancelás cuando quieras.</p>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-green-200 max-w-md mx-auto">
            <div className="text-sm text-gray-500 mb-2">Plan Inicial · hasta 500 ha</div>
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="text-5xl md:text-6xl font-bold text-gray-900">USD 29.99</span>
            </div>
            <div className="text-sm text-gray-500 mb-6">/mes · todo incluido</div>
            <ul className="text-left space-y-2 mb-6 text-sm text-gray-600">
              {['Bot de WhatsApp con IA', 'Campos / establecimientos ilimitados', 'Equipo con roles y permisos', 'Reportes y exportación a Excel'].map((it, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            <a href="https://pricing.botrural.app" className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition shadow-md">
              Ver todos los planes
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ FINAL CTA */}
      <section className="py-24 px-6 bg-white">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Empezá a gestionar tu campo hoy</h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              En 2 minutos tenés tu campo configurado. Sin tarjeta, sin compromiso. Tu equipo registra datos por WhatsApp desde el primer día.
            </p>
            <motion.a href="https://app.botrural.app/register" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="group bg-white hover:bg-green-50 text-green-700 px-10 py-5 rounded-xl text-xl font-bold shadow-lg transition-all inline-flex items-center gap-3">
              Crear cuenta gratis
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
