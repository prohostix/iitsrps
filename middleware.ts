import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string, limit: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
    const now = Date.now();
    const key = `rate_limit_${ip}`;
    const record = rateLimitMap.get(key);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
        return true;
    }

    if (record.count >= limit) {
        return false;
    }

    record.count++;
    return true;
}

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    // Apply rate limiting to login attempts
    if (path === '/admin/login' && request.method === 'POST') {
        if (!rateLimit(ip, 5, 15 * 60 * 1000)) { // 5 attempts per 15 minutes
            return NextResponse.json(
                { error: 'Too many login attempts. Please try again later.' },
                { status: 429 }
            );
        }
    }

    // 1. Define routes that require authentication
    const isProtectedPath = path.startsWith('/admin');
    const isLoginPath = path === '/admin/login';

    // 2. Read the session from the cookie
    const cookie = request.cookies.get('session')?.value;
    let session = null;
    if (cookie) {
        try {
            session = await decrypt(cookie);
        } catch {
            // invalid session
        }
    }

    // 3. Redirect logic
    if (path === '/admin') {
        return NextResponse.redirect(new URL(session ? '/admin/dashboard' : '/admin/login', request.nextUrl));
    }

    if (isProtectedPath && !isLoginPath && !session) {
        return NextResponse.redirect(new URL('/admin/login', request.nextUrl));
    }

    if (isLoginPath && session) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
