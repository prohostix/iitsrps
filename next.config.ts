import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iitsrps.org",
      },
      {
        protocol: "https",
        hostname: "*.iitsrps.org",
      },
      {
        protocol: "https",
        hostname: "cdn.iitsrps.org",
      },
      {
        protocol: "https",
        hostname: "assets.iitsrps.org",
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "iitseducation.org",
      },
      {
        protocol: "https",
        hostname: "*.iitseducation.org",
      },
      {
        protocol: "https",
        hostname: "cdn.iitseducation.org",
      },
      {
        protocol: "https",
        hostname: "assets.iitseducation.org",
      },
      {
        protocol: "https",
        hostname: "www.edtechinnovate.com",
      },
      {
        protocol: "https",
        hostname: "edtechinnovate.com",
      },
      {
        protocol: "https",
        hostname: "*.edtechinnovate.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "www.miu.edu.in",
      },
      {
        protocol: "https",
        hostname: "48237376.fs1.hubspotusercontent-na1.net",
      }
    ],
  },
};

export default nextConfig;
