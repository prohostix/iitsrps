"use strict";
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Image, School, Search, LogOut, X, GalleryHorizontal, MessageSquare, Briefcase, FileText, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { logoutAction } from '@/lib/actions';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    const links = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
        { name: 'Jobs', href: '/admin/jobs', icon: Briefcase },
        { name: 'Applications', href: '/admin/applications', icon: FileText },
        { name: 'Images', href: '/admin/images', icon: Image },
        { name: 'Gallery', href: '/admin/gallery', icon: GalleryHorizontal },
        { name: 'Universities', href: '/admin/universities', icon: School },
        { name: 'Subsidiaries', href: '/admin/subsidiaries', icon: Briefcase },
        { name: 'SEO', href: '/admin/seo', icon: Search },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside className={cn(
                "fixed top-0 left-0 z-50 h-screen w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center justify-between p-6 shrink-0">
                    <h1 className="text-xl font-bold tracking-wider text-white">IITS Admin</h1>
                    <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                    isActive
                                        ? "bg-brand-blue text-white"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                )}
                                onClick={() => onClose()} // Close on mobile navigation
                            >
                                <Icon size={20} />
                                <span className="font-medium">{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 mt-auto border-t border-slate-800">
                    <button
                        onClick={() => logoutAction()}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-900/20 text-red-400 hover:text-red-300 w-full transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
