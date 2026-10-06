import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
