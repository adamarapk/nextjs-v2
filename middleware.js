import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('auth_token');

  const url = request.nextUrl.clone();

  if (!token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile',
    '/products',
  ],
};