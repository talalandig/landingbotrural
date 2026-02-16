export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/BotRural.svg" alt="BotRural" className="h-10" />
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Gestion de campo simplificada con inteligencia artificial y WhatsApp.
            </p>
            <a href="mailto:info@botrural.com" className="text-gray-500 text-sm hover:text-purple-400 transition-colors">
              info@botrural.com
            </a>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-300">Producto</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="/#funcionalidades" className="hover:text-purple-400 transition-colors">Funcionalidades</a></li>
              <li><a href="/#whatsapp" className="hover:text-purple-400 transition-colors">Bot WhatsApp</a></li>
              <li><a href="/#plataforma" className="hover:text-purple-400 transition-colors">Plataforma</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-300">Recursos</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Guia de uso</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Soporte</a></li>
              <li><a href="mailto:info@botrural.com" className="hover:text-purple-400 transition-colors">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-300">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="/terminos" className="hover:text-purple-400 transition-colors">Terminos y Condiciones</a></li>
              <li><a href="/privacidad" className="hover:text-purple-400 transition-colors">Politica de Privacidad</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-600 text-sm">
          2026 BotRural. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
