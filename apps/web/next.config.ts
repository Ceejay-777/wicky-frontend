import type { NextConfig } from "next";
import path from "path";

const API_BASE = process.env.API_BASE ?? "";

const nextConfig: NextConfig = {
    // Next gzips proxied responses, and gzip holds /api/events back until its buffer fills, so the stream looks dead.
    // Compress at the host or CDN instead.
    compress: false,
    // Opening the dev server by its LAN address (the "Network" URL) is a cross-origin request; without this
    // Next blocks its HMR socket, the page never hydrates and every form falls back to a plain submit.
    allowedDevOrigins: ["192.168.*.*"],
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
