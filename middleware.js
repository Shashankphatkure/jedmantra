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
      req.nextUrl.pathname.startsWith("/become-mentor") ||
      req.nextUrl.pathname.startsWith("/admin") ||
      req.nextUrl.pathname.startsWith("/student") ||
      req.nextUrl.pathname.startsWith("/recruiter") ||
      req.nextUrl.pathname.startsWith("/settings")) &&
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
    "/admin/:path*",
    "/admin/",
    "/student/:path*",
    "/student/",
    "/recruiter/:path*",
    "/recruiter/",
    "/settings/",
  ],
};
