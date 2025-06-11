// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware untuk melindungi halaman login dan dashboard
export function middleware(request: NextRequest) {
  const token = request.cookies.get("sb-access-token")?.value;
  const pathname = request.nextUrl.pathname;

  const isLoginPage = pathname === "/login";
  const isProtectedPage = pathname.startsWith("/dashboard");

  // Jika belum login dan mencoba akses halaman yang dilindungi
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Jika sudah login dan mencoba akses halaman login
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Matcher menentukan path mana yang dilindungi middleware
export const config = {
  matcher: [
    "/dashboard/:path*", // Lindungi semua halaman dashboard
    "/login", // Lindungi akses ke login
  ],
};
