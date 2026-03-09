"use strict";
"use client";

import { Menu } from 'lucide-react';

interface TopBarProps {
    onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
    return (
        <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3 md:hidden flex items-center justify-between">
            <span className="font-bold text-slate-900">Admin Dashboard</span>
            <button
                onClick={onMenuClick}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
                <Menu size={24} />
            </button>
        </div>
    );
}
