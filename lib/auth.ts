import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';


const SECRET_KEY = process.env.JWT_SECRET || (process.env.NODE_ENV === 'development' ? 'dev-secret-key-for-build' : undefined);
if (!SECRET_KEY) {
    throw new Error('JWT_SECRET environment variable is required');
}
const key = new TextEncoder().encode(SECRET_KEY);

export async function encrypt(payload: Record<string, unknown>) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(key);
}

export async function decrypt(input: string): Promise<Record<string, unknown>> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    });
    return payload;
}

export async function login(formData: FormData) {
    // Verify credentials
    const email = formData.get('email');
    const password = formData.get('password');

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        throw new Error('Admin credentials not configured. Please set ADMIN_EMAIL and ADMIN_PASSWORD environment variables.');
    }

    if (email === adminEmail && password === adminPassword) {
        // Create the session
        const session = await encrypt({ user: 'admin', email });

        // Save the session in a cookie
        const cookieStore = await cookies();
        cookieStore.set('session', session, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            path: '/'
        });

        return true;
    }
    return false;
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    if (!session) return null;
    try {
        return await decrypt(session);
    } catch {
        return null;
    }
}
