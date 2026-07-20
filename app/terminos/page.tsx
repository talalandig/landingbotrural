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
              BOTRURAL SAS (RUT: 220775390019) es una plataforma de gestion rural que permite registrar y consultar datos de su campo a traves de WhatsApp e inteligencia artificial. El servicio incluye:
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
              <li>Todos los datos se almacenan en servidores proporcionados por Amazon Web Services, que cuentan con altos estándares de seguridad.</li>
              <li>Nadie fuera de BotRural tiene acceso a los datos almacenados.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Inteligencia Artificial</h2>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Precision de la Informacion</h2>
            <p>
              Aunque nos esforzamos por proporcionar informacion precisa y procesamiento confiable, no garantizamos la exactitud, integridad o idoneidad de la informacion procesada por el sistema para ningun proposito particular. Los reportes generados, los registros automaticos y los datos del panel web son herramientas de apoyo y no reemplazan el juicio profesional.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Disponibilidad del Servicio</h2>
            <p>
              Nos esforzamos por mantener el servicio disponible las 24 horas del dia, los 7 dias de la semana. Sin embargo, pueden ocurrir interrupciones programadas o no programadas, tanto del servicio de BotRural como de WhatsApp. No seremos responsables de ninguna perdida que pueda sufrir como resultado de la falta de disponibilidad del servicio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitacion de Responsabilidad</h2>
            <p>
              En la medida en que lo permita la ley, BotRural no sera responsable de ningun daño directo, indirecto, incidental, especial o consecuente que surja del uso o la imposibilidad de uso del servicio, incluidos daños por:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Perdida de datos o registros.</li>
              <li>Interpretaciones incorrectas de la inteligencia artificial.</li>
              <li>Decisiones de gestion rural basadas en informacion del sistema.</li>
              <li>Interrupciones del servicio de WhatsApp o de terceros.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cancelacion del Servicio</h2>
            <p>
              Usted puede cancelar su suscripcion en cualquier momento. Al cancelar:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Tendra la opcion de exportar sus datos en formato Excel o PDF.</li>
              <li>No ofrecemos reembolsos por pagos realizados, incluso si decide cancelar antes de que finalice el periodo ya abonado.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Soporte Tecnico</h2>
            <p>
              Ofrecemos soporte tecnico para ayudarle a utilizar nuestro servicio. Sin embargo, no somos responsables de problemas causados por su dispositivo, conexion a internet, configuracion de WhatsApp o cualquier otro factor fuera de nuestro control directo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Respaldo de Datos</h2>
            <p>
              Aunque tomamos medidas para proteger y respaldar sus datos, le recomendamos que mantenga copias de seguridad regulares de sus datos importantes. No seremos responsables por la pérdida de datos debido a fallas del sistema u otros eventos imprevistos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Modificaciones a los Terminos</h2>
            <p>
              BotRural se reserva el derecho de modificar estos Terminos y Condiciones en cualquier momento. Le notificaremos cambios significativos a traves de WhatsApp o la plataforma web. Su uso continuado del servicio despues de la publicacion de cambios significara que acepta y esta de acuerdo con los cambios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Fuerza Mayor</h2>
            <p>
              No seremos responsables por el incumplimiento de nuestras obligaciones bajo estos terminos si dicho incumplimiento es causado por circunstancias fuera de nuestro control razonable, incluyendo, pero no limitado a, desastres naturales, conflictos laborales, fallas de energia, interrupciones de internet o cambios en las politicas de WhatsApp/Meta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Ley Aplicable</h2>
            <p>
              Estos Terminos y Condiciones se regiran e interpretaran de acuerdo con las leyes de la Republica Oriental del Uruguay, sin dar efecto a sus principios de conflicto de leyes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Divisibilidad</h2>
            <p>
              Si alguna disposicion de estos Terminos y Condiciones se considera invalida o inaplicable, dicha disposicion se eliminara y las disposiciones restantes se haran cumplir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Acuerdo Completo</h2>
            <p>
              Estos Terminos y Condiciones constituyen el acuerdo completo entre usted y BotRural con respecto al uso de nuestro sitio web y servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Contacto</h2>
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
