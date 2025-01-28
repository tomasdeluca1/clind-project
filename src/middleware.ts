import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedPaths = ["/dashboard", "/calendar", "/settings"];
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedPath && !session) {
    return NextResponse.redirect(new URL("/api/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/calendar/:path*", "/settings/:path*"],
};
