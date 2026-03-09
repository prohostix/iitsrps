import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://iits.edu';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/api/',
                    '/_next/',
                    '/uploads/',
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}