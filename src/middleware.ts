import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@auth0/nextjs-auth0/edge";

// Add paths that require subscription
const PROTECTED_PATHS = ["/dashboard", "/tasks", "/calendar"];
// Add paths that are public
const PUBLIC_PATHS = ["/", "/landing", "/login", "/pricing", "/api/auth"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check if path requires subscription
  const isProtectedPath = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedPath) {
    try {
      const session = await getSession(request, new NextResponse());

      if (!session?.user) {
        // Redirect to login if not authenticated
        return NextResponse.redirect(
          new URL(
            `/login?returnTo=${encodeURIComponent(pathname)}`,
            request.url
          )
        );
      }

      // Check subscription status
      const response = await fetch(
        `${request.nextUrl.origin}/api/user-subscription?userId=${session.user.sub}`,
        { method: "GET" }
      );

      if (!response.ok || !(await response.json()).subscription?.isActive) {
        // Redirect to landing page pricing section if no active subscription
        return NextResponse.redirect(new URL("/landing#pricing", request.url));
      }
    } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/tasks/:path*", "/calendar/:path*"],
};
