import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '../components/Header';

export const metadata: Metadata = {
  title: 'Terminos y Condiciones',
  description: 'Terminos y condiciones de uso de BotRural. Plataforma de gestion rural con WhatsApp e inteligencia artificial.',
  alternates: {
    canonical: 'https://botrural.com/terminos',
  },
};

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Terminos y Condiciones</h1>
        <p className="text-gray-500 mb-12">Ultima actualizacion: 16/02/2026</p>

        <div className="max-w-none space-y-10 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Aceptacion de los Terminos</h2>
            <p>
              Al acceder y utilizar el sitio web y los servicios de BotRural, usted acepta estar sujeto a estos Terminos y Condiciones. Si no esta de acuerdo con alguna parte de estos terminos, no debe utilizar nuestro sitio web ni nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Descripcion del Servicio</h2>
            <p>
              BotRural es una plataforma de gestion rural que permite registrar y consultar datos de su campo a traves de WhatsApp e inteligencia artificial. El servicio incluye:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Registro de eventos ganaderos, agricolas, climaticos y financieros mediante mensajes de texto, audios y fotos por WhatsApp.</li>
              <li>Procesamiento automatico de la informacion mediante inteligencia artificial.</li>
              <li>Panel web para visualizacion, reportes y exportacion de datos.</li>
              <li>Gestion de equipos con roles y permisos diferenciados.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Uso del Servicio</h2>
            <p>
              BotRural le otorga una licencia limitada para acceder y utilizar el sitio web y el bot de WhatsApp unicamente para fines de gestion de su operacion rural. Queda prohibido:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Modificar, copiar, distribuir o utilizar cualquier contenido del sitio para fines comerciales sin autorizacion previa.</li>
              <li>Usar el servicio de manera que pueda dañar, desactivar o sobrecargar nuestros servidores o interferir con el uso por parte de otros usuarios.</li>
              <li>Intentar obtener acceso no autorizado a cualquier parte del sistema, otras cuentas o redes conectadas al servicio.</li>
              <li>Enviar contenido malicioso, spam o informacion falsa a traves del bot de WhatsApp.</li>
              <li>Utilizar el bot o la plataforma para fines ajenos a la gestion rural.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Propiedad Intelectual</h2>
            <p>
              Todo el contenido del sitio web y del servicio, incluidos textos, graficos, logotipos, iconos, software y los modelos de inteligencia artificial, es propiedad de BotRural o de sus proveedores y esta protegido por las leyes de propiedad intelectual. No se le otorga ningun derecho sobre este contenido, excepto el derecho limitado de uso como se especifica en estos Terminos y Condiciones.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Privacidad y Proteccion de Datos</h2>
            <p>
              Su privacidad es fundamental para nosotros. BotRural toma medidas estrictas para proteger su informacion:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Las contraseñas se almacenan de forma segura utilizando tecnicas de hashing. Nadie en la empresa puede ver las contraseñas.</li>
              <li>Los datos se almacenan en servidores con altos estandares de seguridad.</li>
              <li>Los mensajes de WhatsApp (textos, audios, fotos) son procesados por inteligencia artificial unicamente para extraer la informacion relevante a su operacion rural.</li>
              <li>No almacenamos audios ni fotos mas alla del tiempo necesario para su procesamiento, salvo que usted lo solicite.</li>
              <li>Nadie fuera de BotRural tiene acceso a los datos almacenados, salvo que sea necesario para proporcionar el servicio o cumplir con la ley.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Almacenamiento y Uso de Datos</h2>
            <p>
              BotRural recopila y almacena datos relacionados con sus operaciones rurales. Al utilizar nuestro servicio:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Usted mantiene la propiedad de todos los datos que ingresa o genera a traves de nuestro sistema, ya sea por WhatsApp o por la plataforma web.</li>
              <li>Nos otorga una licencia limitada para almacenar, procesar y analizar estos datos con el fin de proporcionarle nuestros servicios.</li>
              <li>Podemos utilizar datos agregados y anonimos para mejorar nuestros servicios, entrenar modelos de IA y para fines de investigacion y desarrollo.</li>
              <li>Nos comprometemos a no vender sus datos personales o especificos de su operacion a terceros sin su consentimiento explicito.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Uso de WhatsApp</h2>
            <p>
              El servicio de BotRural opera a traves de la plataforma WhatsApp, propiedad de Meta Platforms, Inc. Al utilizar nuestro bot:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Usted acepta que sus mensajes seran procesados por nuestros sistemas de inteligencia artificial.</li>
              <li>BotRural no es responsable por politicas de privacidad, cambios o interrupciones del servicio de WhatsApp.</li>
              <li>El uso de WhatsApp esta sujeto a los terminos y condiciones propios de WhatsApp/Meta.</li>
              <li>Le recomendamos no enviar informacion sensible (datos bancarios, contraseñas, documentos de identidad) a traves del bot.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Inteligencia Artificial</h2>
            <p>
              BotRural utiliza modelos de inteligencia artificial para procesar y registrar la informacion que usted envia. Es importante entender que:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>La IA puede cometer errores en la interpretacion de audios, textos o imagenes. Recomendamos verificar los registros periodicamente.</li>
              <li>BotRural no se hace responsable por decisiones tomadas en base a datos procesados incorrectamente por la IA.</li>
              <li>Los modelos de IA se mejoran continuamente, lo que puede generar cambios en el comportamiento del bot.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Precision de la Informacion</h2>
            <p>
              Aunque nos esforzamos por proporcionar informacion precisa y procesamiento confiable, no garantizamos la exactitud, integridad o idoneidad de la informacion procesada por el sistema para ningun proposito particular. Los reportes generados, los registros automaticos y los datos del panel web son herramientas de apoyo y no reemplazan el juicio profesional.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Disponibilidad del Servicio</h2>
            <p>
              Nos esforzamos por mantener el servicio disponible las 24 horas del dia, los 7 dias de la semana. Sin embargo, pueden ocurrir interrupciones programadas o no programadas, tanto del servicio de BotRural como de WhatsApp. No seremos responsables de ninguna perdida que pueda sufrir como resultado de la falta de disponibilidad del servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitacion de Responsabilidad</h2>
            <p>
              En la medida en que lo permita la ley, BotRural no sera responsable de ningun daño directo, indirecto, incidental, especial o consecuente que surja del uso o la imposibilidad de uso del servicio, incluidos daños por:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Perdida de datos o registros.</li>
              <li>Interpretaciones incorrectas de la inteligencia artificial.</li>
              <li>Decisiones de gestion rural basadas en informacion del sistema.</li>
              <li>Interrupciones del servicio de WhatsApp o de terceros.</li>
              <li>Perdida de beneficios o cualquier otro daño economico.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Cancelacion del Servicio</h2>
            <p>
              Usted puede cancelar su suscripcion en cualquier momento. Al cancelar:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Tendra la opcion de exportar sus datos en formato Excel o PDF.</li>
              <li>Sus datos seran conservados por un plazo de 30 dias tras la cancelacion, luego seran eliminados permanentemente.</li>
              <li>No ofrecemos reembolsos por pagos realizados, incluso si decide cancelar antes de que finalice el periodo ya abonado.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Soporte Tecnico</h2>
            <p>
              Ofrecemos soporte tecnico para ayudarle a utilizar nuestro servicio. Sin embargo, no somos responsables de problemas causados por su dispositivo, conexion a internet, configuracion de WhatsApp o cualquier otro factor fuera de nuestro control directo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Enlaces a Terceros</h2>
            <p>
              El sitio web de BotRural puede contener enlaces a otros sitios web operados por terceros. Estos enlaces se proporcionan unicamente para su conveniencia, y no somos responsables del contenido ni de las politicas de estos sitios de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Respaldo de Datos</h2>
            <p>
              Aunque tomamos medidas para proteger y respaldar sus datos, le recomendamos encarecidamente que exporte sus datos periodicamente y mantenga copias de seguridad. No seremos responsables por la perdida de datos debido a fallas del sistema u otros eventos imprevistos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Modificaciones a los Terminos</h2>
            <p>
              BotRural se reserva el derecho de modificar estos Terminos y Condiciones en cualquier momento. Le notificaremos cambios significativos a traves de WhatsApp o la plataforma web. Su uso continuado del servicio despues de la publicacion de cambios significara que acepta y esta de acuerdo con los cambios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Fuerza Mayor</h2>
            <p>
              No seremos responsables por el incumplimiento de nuestras obligaciones bajo estos terminos si dicho incumplimiento es causado por circunstancias fuera de nuestro control razonable, incluyendo, pero no limitado a, desastres naturales, conflictos laborales, fallas de energia, interrupciones de internet o cambios en las politicas de WhatsApp/Meta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Ley Aplicable</h2>
            <p>
              Estos Terminos y Condiciones se regiran e interpretaran de acuerdo con las leyes de la Republica Oriental del Uruguay, sin dar efecto a sus principios de conflicto de leyes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">18. Divisibilidad</h2>
            <p>
              Si alguna disposicion de estos Terminos y Condiciones se considera invalida o inaplicable, dicha disposicion se eliminara y las disposiciones restantes se haran cumplir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">19. Acuerdo Completo</h2>
            <p>
              Estos Terminos y Condiciones constituyen el acuerdo completo entre usted y BotRural con respecto al uso de nuestro sitio web y servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">20. Contacto</h2>
            <p>
              Si tiene alguna pregunta sobre estos Terminos y Condiciones, puede contactarnos a traves de <a href="mailto:info@botrural.com" className="text-[#00934a] hover:underline">info@botrural.com</a> o por WhatsApp.
            </p>
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
