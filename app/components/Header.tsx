'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/BotRural.svg" alt="BotRural" className="h-12" />
            </Link>

            <div className="hidden md:flex gap-8 items-center">
              <Link href="/#funcionalidades" className="text-white/80 hover:text-white transition-colors text-sm">Funcionalidades</Link>
              <Link href="/#whatsapp" className="text-white/80 hover:text-white transition-colors text-sm">WhatsApp</Link>
              <Link href="/#plataforma" className="text-white/80 hover:text-white transition-colors text-sm">Plataforma</Link>
              <Link href="/login" className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:bg-purple-700 transition-all">
                Ingresar
              </Link>
            </div>

            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 flex flex-col gap-4">
              <Link href="/#funcionalidades" className="text-white/90" onClick={() => setMobileMenuOpen(false)}>Funcionalidades</Link>
              <Link href="/#whatsapp" className="text-white/90" onClick={() => setMobileMenuOpen(false)}>WhatsApp</Link>
              <Link href="/#plataforma" className="text-white/90" onClick={() => setMobileMenuOpen(false)}>Plataforma</Link>
              <Link href="/login" className="bg-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold text-center">Ingresar</Link>
            </div>
          )}
        </div>
      </nav>
      {/* Spacer for fixed nav */}
      <div className="h-[72px]" />
    </>
  );
}
