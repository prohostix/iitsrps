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

            {/* Mobile Nav */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t md:hidden">
                    <div className="flex flex-col p-4 space-y-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-slate-600 hover:text-brand-blue font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
