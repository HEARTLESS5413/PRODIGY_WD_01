import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { authRoutes, protectedRoutes } from "@/lib/constants";

function pathStartsWith(route, pathname) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

export async function updateSession(request) {
  let response = NextResponse.next({
    request
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request
        });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) => pathStartsWith(route, pathname));
  const isAuthRoute = authRoutes.some((route) => pathStartsWith(route, pathname));

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (user && (pathname === "/" || isAuthRoute)) {
    const url = request.nextUrl.clone();
    url.pathname = "/menu";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

