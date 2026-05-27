import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "robotics-pesmcoe.vercel.app",
          },
        ],
        destination: "https://teamvulcans-pesmcoe.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.teamvulcans-pesmcoe.com",
          },
        ],
        destination: "https://teamvulcans-pesmcoe.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
