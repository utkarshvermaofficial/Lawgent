import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    // Handle node modules that pdf-parse requires
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  // Updated config option name for Next.js 15
  serverExternalPackages: ['pdf-parse'],
};

export default nextConfig;
