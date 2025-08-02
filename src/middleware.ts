import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

    export function middleware(request: NextRequest) {
      const token = request.cookies.get("token")?.value;
      const pathname = request.nextUrl.pathname; 

      if (!token && pathname === "/") {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      if (token && pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

              
        const isAuth = token;
        const isAuthRoute = pathname.startsWith('/login');
        const protectedRoutes = ['/dashboard'];
        const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));


        
        if (!isAuth && isProtectedRoute) {
            return NextResponse.redirect(new URL('/login', request.url));

        }
        if (isAuth && isAuthRoute) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        return NextResponse.next(); 

      }
 
export const config = {
  matcher: ['/login' , '/dashboard' , '/'],
}


