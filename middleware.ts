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
        const isDev = process.env.NODE_ENV === 'development';
        const limit = isDev ? 100 : 20; // More lenient in dev, 20 in prod

        if (!rateLimit(ip, limit, 15 * 60 * 1000)) {
            // For form submissions/server actions, redirecting to the login page with an error
            // query param is more robust than returning JSON, which can cause "unexpected response" errors.
            const url = request.nextUrl.clone();
            url.searchParams.set('error', 'rate-limit');
            return NextResponse.redirect(url);
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
        } catch (error) {
            console.error('MIDDLEWARE_AUTH_ERROR: Failed to decrypt session cookie.', error);
        }
    }

    // 3. Redirect logic
    if (path === '/admin') {
        const target = session ? '/admin/dashboard' : '/admin/login';
        return NextResponse.redirect(new URL(target, request.nextUrl));
    }

    if (isProtectedPath && !isLoginPath && !session) {
        console.log(`MIDDLEWARE_AUTH_REDIRECT: Unauthenticated access attempt to ${path}. Redirecting to login.`);
        const url = new URL('/admin/login', request.nextUrl);
        // Avoid query param loops if already on login (redundant here but safe)
        return NextResponse.redirect(url);
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
