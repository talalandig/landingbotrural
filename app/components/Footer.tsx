export default function Footer() {
  return (
    <footer className="bg-[#2D5C64] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/BotRural.svg" alt="BotRural" className="h-10" />
            </div>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              Gestión agropecuaria por WhatsApp. Registrá, consultá y reportá todo desde el celular, con IA.
            </p>
            <a href="mailto:botruraluy@gmail.com" className="text-[#02C951] text-sm font-medium hover:text-[#02C951]/80 transition-colors">
              botruraluy@gmail.com
            </a>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#F0E8D8]">Producto</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="/#funcionalidades" className="hover:text-[#02C951] transition-colors">Funcionalidades</a></li>
              <li><a href="/#whatsapp" className="hover:text-[#02C951] transition-colors">Bot de WhatsApp</a></li>
              <li><a href="/#funcionalidades" className="hover:text-[#02C951] transition-colors">Módulos</a></li>
              <li><a href="https://pricing.botrural.app" className="hover:text-[#02C951] transition-colors">Precios</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#F0E8D8]">Contacto</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="mailto:botruraluy@gmail.com" className="hover:text-[#02C951] transition-colors">botruraluy@gmail.com</a></li>
              <li><a href="https://app.botrural.app/login" className="hover:text-[#02C951] transition-colors">Ingresar</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#F0E8D8]">Legal</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="/terminos" className="hover:text-[#02C951] transition-colors">Términos y Condiciones</a></li>
              <li><a href="/privacidad" className="hover:text-[#02C951] transition-colors">Política de Privacidad</a></li>
              <li><a href="/eliminacion-de-datos" className="hover:text-[#02C951] transition-colors">Eliminación de datos</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/15 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">© {new Date().getFullYear()} BotRural · Uruguay</p>
          <a href="https://app.botrural.app/register" className="text-sm bg-[#02C951] hover:bg-[#02C951]/90 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-md">
            Probar gratis
          </a>
        </div>
      </div>
    </footer>
  );
}