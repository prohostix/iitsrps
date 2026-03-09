"use strict";
"use client";

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col min-h-screen md:ml-64 transition-all duration-300">
                <TopBar onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                    <div className="max-w-5xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
