"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Subsidiaries", href: "/subsidiaries" },
    { name: "Partner With Us", href: "/partners" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                scrolled
                    ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
                    : "bg-transparent py-8"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    {/* Placeholder for Logo - replacing Image with text for now or simple SVG */}
                    {/* Placeholder for Logo - replacing Image with text for now or simple SVG */}
                    <div className="relative w-64 h-24">
                        <Image
                            src="/logo-custom-final.png"
                            alt="IITS Logo"
                            fill
                            className="object-contain"
                            priority
                            sizes="256px"
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium uppercase tracking-wider transition-colors hover:text-brand-blue",
                                scrolled ? "text-slate-700" : "text-brand-blue"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center">
                    <Link
                        href="/admin"
                        className={cn(
                            "px-6 py-2 rounded-full text-sm font-semibold transition-all border",
                            scrolled
                                ? "bg-brand-blue text-white border-brand-blue hover:bg-blue-900"
                                : "bg-transparent text-brand-blue border-brand-blue hover:bg-brand-blue hover:text-white"
                        )}
                    >
                        LOGIN
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <X className="text-brand-blue" />
                    ) : (
                        <Menu className="text-brand-blue" />
                    )}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <div className={cn(
                "fixed inset-0 bg-white z-[60] flex flex-col transition-all duration-500 ease-in-out md:hidden",
                isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
            )}>
                {/* Mobile Header in Overlay */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <Link href="/" onClick={() => setIsOpen(false)} className="relative w-40 h-12">
                        <Image
                            src="/logo-custom-final.png"
                            alt="IITS Logo"
                            fill
                            className="object-contain"
                            priority
                            sizes="160px"
                        />
                    </Link>
                    <button
                        className="p-2 text-brand-blue"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                    >
                        <X size={28} />
                    </button>
                </div>

                {/* Mobile Links */}
                <nav className="flex-1 overflow-y-auto py-8 px-6 space-y-4">
                    {navigation.map((item, i) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "block text-2xl font-bold text-slate-900 hover:text-brand-blue transition-all duration-300 transform",
                                isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                            )}
                            style={{ transitionDelay: `${i * 50}ms` }}
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="pt-8 border-t border-slate-100">
                        <Link
                            href="/admin"
                            className="inline-block w-full py-4 bg-brand-blue text-white text-center rounded-xl font-bold tracking-widest hover:bg-blue-900 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            LOGIN TO ADMIN
                        </Link>
                    </div>
                </nav>

                {/* Mobile Socials Floor */}
                <div className="p-8 bg-slate-50 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Connect With Us</p>
                    <div className="flex gap-6">
                        <Link href="https://facebook.com/iitseducation.in/" target="_blank" className="text-brand-blue hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </Link>
                        <Link href="https://www.instagram.com/iitsedu" target="_blank" className="text-brand-blue hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </Link>
                        <Link href="https://www.linkedin.com/company/iitsrps/" target="_blank" className="text-brand-blue hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
