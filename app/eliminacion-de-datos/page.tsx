import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '../components/Header';

export const metadata: Metadata = {
  title: 'Eliminacion de Datos - BotRural',
  description: 'Solicita la eliminacion de todos tus datos personales y registros en BotRural. Proceso simple por email.',
  alternates: {
    canonical: 'https://botrural.app/eliminacion-de-datos',
  },
};

export default function EliminacionDeDatosPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Eliminacion de Datos</h1>
        <p className="text-gray-500 mb-12">Solicitud de eliminacion de datos personales</p>

        <div className="max-w-none space-y-10 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Como solicitar la eliminacion de tus datos</h2>
            <p>
              Si queres eliminar todos tus datos almacenados en BotRural (registros ganaderos, agricolas, transcripciones, fotos, facturas, etc.), segui estos pasos:
            </p>

            <ol className="list-decimal pl-6 mt-6 space-y-4">
              <li>
                <strong>Envia un email a </strong>
                <a href="mailto:info@botrural.app" className="text-[#00934a] hover:underline">info@botrural.app</a>
                <strong> desde tu correo registrado.</strong>
              </li>
              <li>
                <strong>Asunto del email:</strong> <span className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">SOLICITUD DE ELIMINACION DE DATOS</span>
              </li>
              <li>
                <strong>Inclui en el cuerpo del email:</strong> el email asociado a tu cuenta de BotRural.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Plazo de procesamiento</h2>
            <p>
              Procesamos tu solicitud en un plazo maximo de <strong>30 dias habiles</strong> y te confirmamos la eliminacion por email.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exporta tus datos antes</h2>
            <p>
              Antes de solicitar la eliminacion, podes exportar todos tus datos desde tu{' '}
              <a href="https://app.botrural.app" className="text-[#00934a] hover:underline">dashboard web</a>{' '}
              en formato Excel o PDF.
            </p>
          </section>

          <section>
            <p>
              Para mas informacion sobre como tratamos tus datos, consulta nuestra{' '}
              <Link href="/privacidad" className="text-[#00934a] hover:underline font-medium">
                Politica de Privacidad
              </Link>.
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
