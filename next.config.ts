import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  productionBrowserSourceMaps: false,

  images: {
    // Allow loading images from any domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all HTTPS hosts
      },
      {
        protocol: "http",
        hostname: "**", // allow all HTTP hosts
      },
    ],
    // Optional: disable static image import check
    // dangerouslyAllowSVG: true, // if you want SVGs
  },
};

export default nextConfig;
