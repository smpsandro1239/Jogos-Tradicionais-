import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Simples verificação de token no lado do cliente via cookie seria melhor para middleware,
  // mas como o token está no localStorage, o middleware do Next.js não tem acesso direto a ele (roda no servidor).
  // Para simplificar agora, faremos a verificação no lado do cliente nos layouts/páginas.

  // Mas podemos redirecionar o "/" para "/dashboard"
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/aldeias/:path*', '/eventos/:path*', '/jogos/:path*'],
}
