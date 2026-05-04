export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/BotRural.svg" alt="BotRural" className="h-10" />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Gestión agropecuaria por WhatsApp. Registrá, consultá y reportá todo desde el celular, con IA.
            </p>
            <a href="mailto:botruraluy@gmail.com" className="text-gray-400 text-sm hover:text-green-400 transition-colors">
              botruraluy@gmail.com
            </a>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Producto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/#funcionalidades" className="hover:text-green-400 transition-colors">Funcionalidades</a></li>
              <li><a href="/#whatsapp" className="hover:text-green-400 transition-colors">Bot de WhatsApp</a></li>
              <li><a href="/#plataforma" className="hover:text-green-400 transition-colors">Plataforma</a></li>
              <li><a href="https://pricing.botrural.app" className="hover:text-green-400 transition-colors">Precios</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="mailto:botruraluy@gmail.com" className="hover:text-green-400 transition-colors">botruraluy@gmail.com</a></li>
              <li><a href="https://app.botrural.app/login" className="hover:text-green-400 transition-colors">Ingresar</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/terminos" className="hover:text-green-400 transition-colors">Términos y Condiciones</a></li>
              <li><a href="/privacidad" className="hover:text-green-400 transition-colors">Política de Privacidad</a></li>
              <li><a href="/eliminacion-de-datos" className="hover:text-green-400 transition-colors">Eliminación de datos</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} BotRural · Uruguay
        </div>
      </div>
    </footer>
  );
}
