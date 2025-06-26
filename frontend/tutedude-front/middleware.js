import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

const AUTH_COOKIE = "token";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  if (!token && request.nextUrl.pathname.startsWith("/u")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && /^\/(login|signup)/.test(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/u", request.url));
  }

  return NextResponse.next(); // ✅ always return a valid response
}
// export const config = {
//   matcher: ["/u/:path*", "/login", "/signup"],
// };
