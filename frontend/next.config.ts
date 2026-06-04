import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Docker multi-stage build — produces a self-contained server.js
  output: "standalone",

  // Proxy /api/* → FastAPI backend so the browser never hits a different origin
  // In Docker, NEXT_PUBLIC_API_URL = http://backend:8000 (Docker service name)
  // In local dev, NEXT_PUBLIC_API_URL = http://127.0.0.1:8000
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";
    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
