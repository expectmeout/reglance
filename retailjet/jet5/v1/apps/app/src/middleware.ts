import { updateSession } from "@v1/supabase/middleware";
import { createI18nMiddleware } from "next-international/middleware";
import { type NextRequest, NextResponse } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

export async function middleware(request: NextRequest) {
  // DEVELOPMENT BYPASS - Remove in production
  if (process.env.NODE_ENV === "development") {
    // If we're at the root path or login page in development, redirect to dashboard
    if (request.nextUrl.pathname === "/" || request.nextUrl.pathname.endsWith("/login")) {
      // Assuming your dashboard is at /en/(dashboard)/
      return NextResponse.redirect(new URL("/en/", request.url));
    }
    return NextResponse.next();
  }
  
  const { response, user } = await updateSession(
    request,
    I18nMiddleware(request),
  );
  
  if (!request.nextUrl.pathname.endsWith("/login") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return response;
}
export const config = {
  matcher: [
    "/((?!_next/static|api|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
