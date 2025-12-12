import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Define the list of protected routes
  const protectedRoutes = ['/books', '/profile', '/feed', '/lists', '/communities'];
  
  // Check if the current path starts with any of the protected routes
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Retrieve the token from cookies
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      // Redirect to login if no token is found
      const loginUrl = new URL('/login', request.url);
      // Optional: Add a 'from' query param to redirect back after login
      // loginUrl.searchParams.set('from', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     * - register (register page)
     * - / (landing page, assuming it's public)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login|register|$).*)',
  ],
};
