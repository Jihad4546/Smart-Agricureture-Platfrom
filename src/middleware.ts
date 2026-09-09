import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  // Protect /dashboard and /profile (including subpaths)
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/profile")) {
    if (!session) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If visiting login/register while authenticated, redirect to /dashboard
  if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register")) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/auth/login",
    "/auth/register",
  ],
};
