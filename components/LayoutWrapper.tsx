"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SiteData } from "@/lib/data";

export function LayoutWrapper({ children, data }: { children: React.ReactNode, data: SiteData }) {
    const pathname = usePathname();
    const isAdminPath = pathname?.startsWith("/admin");

    if (isAdminPath) {
        return <main className="min-h-screen">{children}</main>;
    }

    return (
        <>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer data={data} />
        </>
    );
}
