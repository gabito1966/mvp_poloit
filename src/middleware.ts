import { NextRequest, NextResponse } from "next/server";
import { ValidateIDSession } from "./database/serverAuth";

const protectedRoutes = [
  "estudiante",
  "mentor",
  "equipo",
  "ong",
  "tecnologia",
  "empresa",
  "edit",
  "register",
  "card"
];
const publicRoutes = ["/auth/login", "/"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.clone();

  const { pathname } = path;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some(e => e == pathname.split("/")[1]);

  const token = req.cookies.get("session");

  let tokenverify;

  if (token) {
    tokenverify = await ValidateIDSession(token.value);

    if (!tokenverify.success) {
      const response = NextResponse.redirect(
        new URL("/auth/login", process.env.NEXT_BASE_URL)
      );
      response.cookies.delete("session");
      response.cookies.delete("user");
      return response;
    }

    if (
      isPublicRoute &&
      tokenverify.success &&
      req.nextUrl.pathname.startsWith("/auth/login")
    ) {
      return NextResponse.redirect(new URL("/", process.env.NEXT_BASE_URL)); //
    }

    return NextResponse.next();
  }

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (isProtectedRoute) {
  
    const response = NextResponse.redirect(
      new URL(`/auth/login?error=auth_required&url=${pathname.toString()}`, process.env.NEXT_BASE_URL)
    );
 
    return response;
    
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
