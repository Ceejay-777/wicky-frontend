import type { NextConfig } from "next";
import path from "path";

const API_BASE = process.env.API_BASE ?? "";

const nextConfig: NextConfig = {
    turbopack: {
        root: path.join(__dirname, "..", ".."),
      },
    experimental: {
        optimizePackageImports: ['@wicky/types'],
    },
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${API_BASE}/api/:path*`,
            },
        ];
    },
};

export default nextConfig;
