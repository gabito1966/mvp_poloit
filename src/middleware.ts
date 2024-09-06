import { NextRequest, NextResponse } from "next/server";
import { ValidateIDSession } from "./database/serverAuth";

const protectedRoutes = [
  "/register/estudiantes",
  "/register/mentores",
  "/register/grupos",
  "/estudiante",
  "/mentor",
  "/grupo",
  "/ong",
  "/tecnologia",
  "/edit/estudiante/[id]",
  "/edit/mentor/[id]",
  "/edit/grupo/[id]",
];
const publicRoutes = ["/auth/login", "/"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.clone();

  const isPublicRoute = publicRoutes.includes(path.pathname);
  const isProtectedRoute = protectedRoutes.includes(path.pathname);
  
  const token = req.cookies.get("session");
  
  let tokenverify;
  
  if ( token) {

    tokenverify = await ValidateIDSession(token.value);
    
    if (!tokenverify.success) {
      const response = NextResponse.redirect(
        new URL("/auth/login", process.env.NEXT_BASE_URL)
      );
      response.cookies.delete("session");
      return response;
    }

    if (
      isPublicRoute &&
      tokenverify.success &&
      req.nextUrl.pathname.startsWith('/auth/login')
    ) {
      return NextResponse.redirect(new URL('/', process.env.NEXT_BASE_URL))
    }

    return NextResponse.next();
  }

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    return NextResponse.redirect(
      new URL("/auth/login", process.env.NEXT_BASE_URL)
    );
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
