import { NextRequest, NextResponse } from 'next/server'

/**
 * Rewrite del subdominio pricing.botrural.app → /pricing
 * Así pricing.botrural.app/ sirve la página /pricing transparentemente.
 */
export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  const url = req.nextUrl

  if (host.startsWith('pricing.') && url.pathname === '/') {
    const rewritten = url.clone()
    rewritten.pathname = '/pricing'
    return NextResponse.rewrite(rewritten)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}
