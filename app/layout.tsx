
import { Outfit } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";

import { getSiteData } from "@/lib/data";

const outfit = Outfit({ subsets: ["latin"] });

export async function generateMetadata() {
  const data = await getSiteData();
  return {
    title: data.seo.title,
    description: data.seo.description,
    keywords: data.seo.keywords,
    openGraph: {
      title: data.seo.title,
      description: data.seo.description,
      images: data.seo.ogImage ? [{ url: data.seo.ogImage }] : [],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getSiteData();

  return (
    <html lang="en">
      <body className={outfit.className} suppressHydrationWarning>
        <LayoutWrapper data={data}>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
