import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* your existing config options here */

  // ✅ Ignore ESLint errors during production build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
