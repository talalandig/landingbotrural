import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politica de Privacidad',
  description: 'Politica de privacidad de BotRural. Como recopilamos, usamos y protegemos tus datos en nuestra plataforma de gestion rural con WhatsApp e IA.',
  alternates: {
    canonical: 'https://botrural.com/privacidad',
  },
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header - same as landing */}
      <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/BoTRURAL.svg" alt="BotRural" className="h-12" />
            </Link>
            <div className="hidden md:flex gap-8 items-center">
              <Link href="/#funcionalidades" className="text-white/80 hover:text-white transition-colors text-sm">Funcionalidades</Link>
              <Link href="/#whatsapp" className="text-white/80 hover:text-white transition-colors text-sm">WhatsApp</Link>
              <Link href="/#plataforma" className="text-white/80 hover:text-white transition-colors text-sm">Plataforma</Link>
              <Link href="/login" className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:bg-purple-700 transition-all">
                Ingresar
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Spacer for fixed nav */}
      <div className="h-[72px]" />

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Politica de Privacidad</h1>
        <p className="text-gray-500 mb-12">Ultima actualizacion: 16/02/2026</p>

        <div className="max-w-none space-y-10 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduccion</h2>
            <p>
              En BotRural nos tomamos muy en serio la privacidad de nuestros usuarios. Esta Politica de Privacidad describe como recopilamos, usamos, almacenamos y protegemos su informacion personal cuando utiliza nuestro sitio web (<a href="https://botrural.com" className="text-[#00934a] hover:underline">botrural.com</a>), nuestro bot de WhatsApp y nuestra plataforma web de gestion rural.
            </p>
            <p className="mt-3">
              Al utilizar nuestros servicios, usted acepta las practicas descritas en esta politica. Si no esta de acuerdo, por favor no utilice nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Responsable del Tratamiento</h2>
            <p>
              El responsable del tratamiento de sus datos personales es:
            </p>
            <ul className="list-none mt-3 space-y-1">
              <li><strong>Empresa:</strong> BotRural</li>
              <li><strong>Sitio web:</strong> <a href="https://botrural.com" className="text-[#00934a] hover:underline">https://botrural.com</a></li>
              <li><strong>Email de contacto:</strong> <a href="mailto:info@botrural.com" className="text-[#00934a] hover:underline">info@botrural.com</a></li>
              <li><strong>Ubicacion:</strong> Uruguay</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Datos que Recopilamos</h2>
            <p>Recopilamos los siguientes tipos de informacion:</p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">2.1 Datos de registro</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nombre y apellido</li>
              <li>Numero de telefono (WhatsApp)</li>
              <li>Direccion de email</li>
              <li>Nombre de la empresa o establecimiento rural</li>
              <li>Pais y region</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">2.2 Datos enviados por WhatsApp</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Mensajes de texto:</strong> procesados por inteligencia artificial para extraer datos de gestion rural (movimientos de ganado, lluvias, gastos, siembras, etc.).</li>
              <li><strong>Mensajes de audio:</strong> transcritos automaticamente por IA. El audio se procesa y se descarta; solo se almacena la transcripcion y los datos extraidos.</li>
              <li><strong>Fotos e imagenes:</strong> procesadas por IA para extraer informacion (ej: facturas, boletas, estado de cultivos). Las imagenes de facturas pueden almacenarse vinculadas al registro contable.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">2.3 Datos de operacion rural</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Registros ganaderos (movimientos, pesadas, sanidad, pariciones)</li>
              <li>Registros agricolas (siembras, pulverizaciones, cosechas)</li>
              <li>Datos climaticos (lluvias, heladas, temperaturas)</li>
              <li>Datos financieros (gastos, ventas, facturas)</li>
              <li>Pastoreo rotativo (movimientos por potrero)</li>
              <li>Informacion de potreros y superficie</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">2.4 Datos de uso</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Direccion IP y tipo de navegador</li>
              <li>Paginas visitadas y tiempo de navegacion</li>
              <li>Interacciones con el bot de WhatsApp (frecuencia, tipo de mensajes)</li>
              <li>Dispositivo utilizado</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Como Usamos sus Datos</h2>
            <p>Utilizamos su informacion para:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Proveer el servicio:</strong> procesar sus mensajes de WhatsApp, registrar datos de su operacion rural y generar reportes.</li>
              <li><strong>Mejorar el servicio:</strong> analizar patrones de uso para optimizar la experiencia y la precision de la inteligencia artificial.</li>
              <li><strong>Comunicarnos con usted:</strong> enviar notificaciones relevantes, actualizaciones del servicio y soporte tecnico.</li>
              <li><strong>Seguridad:</strong> detectar y prevenir fraudes, abusos o actividad no autorizada.</li>
              <li><strong>Investigacion y desarrollo:</strong> utilizar datos agregados y anonimizados para mejorar nuestros modelos de IA y desarrollar nuevas funcionalidades.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Inteligencia Artificial y Procesamiento</h2>
            <p>BotRural utiliza inteligencia artificial para procesar los datos que usted envia. Es importante que sepa:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Los audios se transcriben automaticamente y luego se descartan. No almacenamos grabaciones de voz de forma permanente.</li>
              <li>Las fotos se procesan para extraer informacion relevante. Solo se almacenan permanentemente las imagenes de facturas o documentos vinculados a registros contables.</li>
              <li>Los textos son procesados para identificar y registrar eventos rurales automaticamente.</li>
              <li>No utilizamos sus datos personales o especificos de su operacion para entrenar modelos de IA de terceros.</li>
              <li>Podemos utilizar datos agregados y completamente anonimizados para mejorar nuestros propios modelos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Almacenamiento y Seguridad</h2>
            <p>Protegemos su informacion con las siguientes medidas:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Las contraseñas se almacenan con hashing seguro. Nadie en BotRural puede ver su contraseña.</li>
              <li>Los datos se almacenan en servidores con altos estandares de seguridad y encriptacion.</li>
              <li>Las comunicaciones entre su dispositivo y nuestros servidores estan protegidas con cifrado SSL/TLS.</li>
              <li>El acceso a los datos esta restringido al personal autorizado de BotRural que lo necesite para brindar el servicio.</li>
              <li>Realizamos copias de seguridad periodicas para prevenir perdida de datos.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Compartir Datos con Terceros</h2>
            <p><strong>No vendemos sus datos personales ni los datos de su operacion rural a terceros.</strong></p>
            <p className="mt-3">Solo compartimos informacion en los siguientes casos:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Proveedores de servicio:</strong> servicios de hosting, procesamiento de IA y herramientas de analisis que nos ayudan a operar la plataforma. Estos proveedores estan obligados contractualmente a proteger su informacion.</li>
              <li><strong>WhatsApp/Meta:</strong> los mensajes enviados al bot transitan por la infraestructura de WhatsApp, sujeta a las politicas de Meta Platforms, Inc.</li>
              <li><strong>Requisitos legales:</strong> si la ley nos obliga a divulgar informacion, o para proteger nuestros derechos legales.</li>
              <li><strong>Con su consentimiento:</strong> cualquier otro caso en que compartamos datos sera con su autorizacion explicita.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Sus Derechos</h2>
            <p>Usted tiene derecho a:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Acceso:</strong> solicitar una copia de los datos personales que tenemos sobre usted.</li>
              <li><strong>Rectificacion:</strong> corregir datos inexactos o incompletos.</li>
              <li><strong>Eliminacion:</strong> solicitar la eliminacion de sus datos personales.</li>
              <li><strong>Portabilidad:</strong> exportar sus datos en formato Excel o PDF en cualquier momento desde la plataforma.</li>
              <li><strong>Oposicion:</strong> oponerse al tratamiento de sus datos para fines especificos.</li>
              <li><strong>Revocacion:</strong> retirar su consentimiento en cualquier momento.</li>
            </ul>
            <p className="mt-3">
              Para ejercer cualquiera de estos derechos, contactenos a <a href="mailto:info@botrural.com" className="text-[#00934a] hover:underline">info@botrural.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Retencion de Datos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mientras su cuenta este activa, conservamos todos sus datos de operacion rural.</li>
              <li>Si cancela su cuenta, sus datos seran conservados por 30 dias para permitirle exportarlos. Pasado ese plazo, se eliminan permanentemente.</li>
              <li>Los audios de WhatsApp se procesan y eliminan inmediatamente despues de la transcripcion.</li>
              <li>Los datos anonimizados y agregados pueden conservarse indefinidamente con fines estadisticos y de mejora del servicio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies y Tecnologias Similares</h2>
            <p>Nuestro sitio web puede utilizar:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Cookies esenciales:</strong> necesarias para el funcionamiento del sitio (sesion, autenticacion).</li>
              <li><strong>Cookies de analisis:</strong> para entender como los usuarios interactuan con el sitio y mejorar la experiencia.</li>
              <li><strong>Cookies de rendimiento:</strong> para optimizar la velocidad y el rendimiento del sitio.</li>
            </ul>
            <p className="mt-3">Puede configurar su navegador para rechazar cookies, aunque esto podria afectar el funcionamiento del sitio.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Menores de Edad</h2>
            <p>
              BotRural no esta dirigido a menores de 18 años. No recopilamos intencionalmente datos de menores. Si detectamos que hemos recopilado datos de un menor, los eliminaremos inmediatamente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Transferencias Internacionales</h2>
            <p>
              Sus datos pueden ser procesados en servidores ubicados fuera de Uruguay. En estos casos, nos aseguramos de que los proveedores ofrezcan un nivel adecuado de proteccion de datos conforme a las normas aplicables.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Cambios a esta Politica</h2>
            <p>
              Podemos actualizar esta Politica de Privacidad periodicamente. Le notificaremos cambios significativos a traves de WhatsApp, email o mediante un aviso en nuestra plataforma. La fecha de ultima actualizacion se indica al inicio de este documento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contacto</h2>
            <p>
              Si tiene preguntas, dudas o solicitudes relacionadas con esta Politica de Privacidad o el tratamiento de sus datos personales, contactenos:
            </p>
            <ul className="list-none mt-3 space-y-1">
              <li><strong>Email:</strong> <a href="mailto:info@botrural.com" className="text-[#00934a] hover:underline">info@botrural.com</a></li>
              <li><strong>Sitio web:</strong> <a href="https://botrural.com" className="text-[#00934a] hover:underline">https://botrural.com</a></li>
            </ul>
          </section>

        </div>

        {/* Back to top */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <Link href="/" className="text-[#00934a] hover:underline font-medium">
            Volver al inicio
          </Link>
        </div>
      </main>

    </div>
  );
}
