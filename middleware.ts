import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_ROUTES = ["/auth/login"];

export async function middleware(req:any) {
  const { pathname } = req.nextUrl;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log('tokenmiddleware', token)

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|static).*)"],
};

