import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const public_routes = ["/sign-in", "/sign-up"];

export function isPublicRoute(request: NextRequest) {
  return public_routes.includes(request.nextUrl.pathname);
}

export async function middleware(request: NextRequest) {
  // update user session if he is authenticated

  const { user, response } = await updateSession(request);

  // if route is not public redirect to /sign-in page
  if (!isPublicRoute(request) && !user) {
    const redirectUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(redirectUrl.toString());
  }
  if (user) {
    const path = request.nextUrl.pathname;
    if (public_routes.includes(path)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
