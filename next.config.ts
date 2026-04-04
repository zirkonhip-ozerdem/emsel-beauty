import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  images: {
=======
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
>>>>>>> feat/son-islemler
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
