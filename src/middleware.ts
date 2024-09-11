import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const isLoggedIn = request.cookies.has("access_token");
  const userRole = request.cookies.get("role")?.value;

  const protectedPaths = ["/user", "/admin"];

  const isProtectedPath = protectedPaths.some((path) =>
    currentPath.startsWith(path)
  );

  if (!isLoggedIn && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isLoggedIn) {
    if (currentPath === "/login" || currentPath === "/register") {
      if (userRole === "USER") {
        return NextResponse.redirect(
          new URL("/user/dashboard", request.nextUrl)
        );
      } else if (userRole === "ADMIN") {
        return NextResponse.redirect(
          new URL("/admin/dashboard", request.nextUrl)
        );
      }
    }

    if (userRole === "USER" && currentPath.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/user/dashboard", request.nextUrl));
    }

    if (userRole === "ADMIN" && currentPath.startsWith("/user")) {
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.nextUrl)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/login", "/register"],
};
