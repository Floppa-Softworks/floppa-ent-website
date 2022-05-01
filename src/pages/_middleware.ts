import { NextResponse, NextRequest } from 'next/server';
import { INVITE_URL } from '../lib/constants';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === '/invite') {
    return NextResponse.redirect(INVITE_URL);
  }
  return NextResponse.next();
}
