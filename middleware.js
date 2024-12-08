import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect the profile, settings and messages routes
  if (
    (req.nextUrl.pathname.startsWith("/profile") ||
      req.nextUrl.pathname.startsWith("/settings") ||
      req.nextUrl.pathname.startsWith("/messages") ||
      req.nextUrl.pathname.startsWith("/notifications") ||
      req.nextUrl.pathname.startsWith("/bookmarks") ||
      req.nextUrl.pathname.startsWith("/communities/my") ||
      req.nextUrl.pathname.startsWith("/communities/request") ||
      req.nextUrl.pathname.startsWith("/communities/createpost") ||
      req.nextUrl.pathname.startsWith("/synergies/my") ||
      req.nextUrl.pathname.startsWith("/synergies/create") ||
      req.nextUrl.pathname.startsWith("/spaces/create") ||
      req.nextUrl.pathname.startsWith("/become-mentor") ||
      req.nextUrl.pathname.startsWith("/admin")) &&
    !session
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/settings/:path*",
    "/messages/:path*",
    "/notifications/:path*",
    "/bookmarks/:path*",
    "/become-mentor/:path*",
    "/communities/my/:path*",
    "/communities/request/:path*",
    "/communities/createpost/:path*",
    "/synergies/my/:path*",
    "/synergies/create/:path*",
    "/spaces/create/:path*",
    "/admin/:path*",
    "/admin/",
  ],
};
