import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const isLoggedIn = request.cookies.has("access_token");
  const userRole = request.cookies.get("role")?.value;

  // Define protected paths
  const protectedPaths = ["/user", "/admin"];

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(path => currentPath.startsWith(path));

  // Redirect to /login if not logged in and trying to access a protected path
  if (!isLoggedIn && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // Handle redirection based on user role
  if (isLoggedIn) {
    if (currentPath === "/login") {
      if (userRole === "USER") {
        return NextResponse.redirect(new URL("/user/dashboard", request.nextUrl));
      } else if (userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.nextUrl));
      }
    }

    if (userRole === "USER" && currentPath.startsWith("/admin")) {
      // Redirect users with 'USER' role from admin paths to their dashboard
      return NextResponse.redirect(new URL("/user/dashboard", request.nextUrl));
    }

    if (userRole === "ADMIN" && currentPath.startsWith("/user")) {
      // Redirect users with 'ADMIN' role from user paths to their dashboard
      return NextResponse.redirect(new URL("/admin/dashboard", request.nextUrl));
    }
  }

  // Default response if no conditions are met
  return NextResponse.next();
}

// Configure middleware matching
export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/login"],
};
