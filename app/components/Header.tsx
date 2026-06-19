'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/#funcionalidades', label: 'Funcionalidades' },
  { href: '/#whatsapp', label: 'WhatsApp' },
  { href: '/#plataforma', label: 'Plataforma' },
  { href: '/#mapa', label: 'Mapa' },
  { href: 'https://pricing.botrural.app', label: 'Precios' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-[68px]">
            <Link href="/" className="flex items-center shrink-0 hover:opacity-90 transition-opacity" aria-label="BotRural inicio">
              <img src="/BotRural.svg" alt="BotRural" className="h-8 md:h-9 w-auto" />
            </Link>

            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-2 text-[13px] font-medium text-white/70 hover:text-white transition-colors tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center shrink-0 pl-4 ml-2 border-l border-white/10">
              <a
                href="https://app.botrural.app/login"
                className="text-[13px] font-semibold text-white bg-[#02C951] hover:bg-[#02b84a] px-5 py-2.5 rounded-lg transition-colors"
              >
                Ingresar
              </a>
            </div>

            <button
              className="md:hidden text-white p-2 -mr-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 py-3 flex flex-col gap-0.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/90 text-sm py-2.5 px-3 rounded-lg hover:bg-white/10 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://app.botrural.app/login"
                className="bg-[#02C951] hover:bg-[#02b84a] text-white text-sm py-2.5 px-3 rounded-lg font-semibold text-center mt-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ingresar
              </a>
            </div>
          )}
        </div>
      </nav>
      <div className="h-16 md:h-[68px]" />
    </>
  );
}