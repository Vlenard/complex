import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'hu'];
const defaultLocale = 'en';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname has a supported locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Read preferred locale from cookie, or accept-language header
  let locale = request.cookies.get('language')?.value;
  if (!locale || !locales.includes(locale)) {
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage && acceptLanguage.includes('hu')) {
      locale = 'hu';
    } else {
      locale = defaultLocale;
    }
  }

  // Redirect to localized path
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, and static assets with extensions
    '/((?!_next|api|favicon.ico|.*\\..*).*)',
  ],
};
