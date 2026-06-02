import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    const redirectsList = [
      {
        source: "/:path*",
        has: [
          {
            type: "host" as const,
            value: "www.teamvulcans-pesmcoe.com",
          },
        ],
        destination: "https://teamvulcans-pesmcoe.com/:path*",
        permanent: true,
      },
    ];

    // Only redirect vercel.app domains in production deployments so that preview URLs in preview environments still work.
    if (process.env.VERCEL_ENV === "production" || !process.env.VERCEL_ENV) {
      redirectsList.push({
        source: "/:path*",
        has: [
          {
            type: "host" as const,
            value: "(?<subdomain>.*)\\.vercel\\.app",
          },
        ],
        destination: "https://teamvulcans-pesmcoe.com/:path*",
        permanent: true,
      });
    }

    return redirectsList;
  },
};

export default nextConfig;
