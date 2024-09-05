import { NextRequest, NextResponse } from "next/server";
import { ValidateIDSession } from "./database/serverAuth";

const protectedRoutes = ["/register","/estudiante","/mentor"];
const publicRoutes = ["/login","/"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.clone();

  const isProtectedRoute = protectedRoutes.includes(path.pathname) ;
  const isPublicRoute = publicRoutes.includes(path.pathname);

  if(isPublicRoute){
    return NextResponse.next();
  }

  const token = req.cookies.get("session");
  let tokenverify;

  if (isProtectedRoute && token) {
    tokenverify = await ValidateIDSession(token.value);

    if (!tokenverify) {
      const response = NextResponse.redirect(
        new URL("/auth/login", process.env.NEXT_BASE_URL)
      );
      response.cookies.delete("token");
      return response;
    }
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", process.env.NEXT_BASE_URL));
  } else {
    return NextResponse.next();
  }
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};