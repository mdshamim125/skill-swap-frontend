/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/auth-utils";
import { deleteCookie, getCookie } from "./services/auth/tokenHandlers";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1️⃣ Get access token
  const accessToken = request.cookies.get("accessToken")?.value || null;

  let userRole: UserRole | null = null;

  // 2️⃣ Verify JWT
  if (accessToken) {
    try {
      const verifiedToken: JwtPayload | string = jwt.verify(
        accessToken,
        process.env.JWT_SECRET as string
      );

      if (typeof verifiedToken === "string") throw new Error("Invalid token");

      userRole = verifiedToken.role as UserRole;
    } catch (err) {
      // Token expired or invalid → delete cookies & redirect to login
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const routerOwner = getRouteOwner(pathname);
  const isAuth = isAuthRoute(pathname);

  // 3️⃣ Logged-in user tries to access /login or /register → redirect to dashboard
  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
    );
  }

  // 4️⃣ Public route
  if (routerOwner === null) return NextResponse.next();

  // 5️⃣ Protected route requires login
  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 6️⃣ Common routes allowed for any logged-in user
  if (routerOwner === "COMMON") return NextResponse.next();

  // 7️⃣ Role-based route
  if (
    routerOwner === "ADMIN" ||
    routerOwner === "MENTOR" ||
    routerOwner === "USER"
  ) {
    if (userRole !== routerOwner) {
      // Redirect to the user's default dashboard if they try to access another role's route
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known|__next_action|__next_data|__next_chunk).*)",
  ],
};


// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
//   ],
// };