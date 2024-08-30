import { NextRequest, NextResponse } from "next/server";
// import { JWTValidate } from "./lib/utils";

const protectedRoutes = ["/register", "/register/alumnos"];
const publicRoutes = ["/auth/login", "/signup", "/"];

export default async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();

    const isProtectedRoute = protectedRoutes.includes(url.pathname);
    const isPublicRoute = publicRoutes.includes(url.pathname);

    // console.log(isProtectedRoute);
    // console.log(isPublicRoute);

    //   const session = request.cookies.get("session");

    //   if (isPublicRoute) {
    //     return NextResponse.next();
    //   } else {
    //     if (!session && !isPublicRoute) {
    //       return NextResponse.redirect(new URL("/auth/login", url.origin));
    //     }

    //     if (isProtectedRoute && !session) {
    //       return NextResponse.redirect(new URL("/auth/login", url.origin));
    //     }

    //     if (!session) {
    //       return NextResponse.redirect(new URL("/auth/login", url.origin));
    //     }

    //     try {
    //       const data = await fetch(url.origin + "/api/login/auth", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           token: session.value,
    //         }),
    //       });

    //       const response = await data.json();

    //       if (!response.success) {
    //         request.cookies.delete("session");
    //         throw new Error("Error al validar el token");
    //       }
    //     } catch (error) {
    //       console.log(error);
    //       return NextResponse.redirect(new URL("/auth/login", url.origin));
    //     }

    //     //const verify = JWTValidate(session.value);

    //     console.log("todo piola");
    //   }
    return NextResponse.next();
}