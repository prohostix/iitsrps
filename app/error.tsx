'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="text-center px-4 max-w-md">
                <div className="mb-8">
                    <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-brand-blue mb-4">Something went wrong!</h1>
                    <p className="text-slate-600 text-lg mb-2">
                        We encountered an unexpected error. Please try again.
                    </p>
                    {error.digest && (
                        <p className="text-sm text-slate-500 font-mono bg-slate-100 p-2 rounded">
                            Error ID: {error.digest}
                        </p>
                    )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </button>
                    <Link 
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-blue text-brand-blue font-semibold rounded-lg hover:bg-brand-blue hover:text-white transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}