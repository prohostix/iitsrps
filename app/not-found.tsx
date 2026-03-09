'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    const handleGoBack = () => {
        if (typeof window !== 'undefined') {
            window.history.back();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="text-center px-4">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-brand-blue mb-4">404</h1>
                    <h2 className="text-3xl font-bold text-brand-blue mb-4">Page Not Found</h2>
                    <p className="text-slate-600 text-lg max-w-md mx-auto">
                        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>
                    <button 
                        onClick={handleGoBack} 
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-blue text-brand-blue font-semibold rounded-lg hover:bg-brand-blue hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}