import type { NextConfig } from "next";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "standalone",
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: 'https', // Or 'http' if applicable, but HTTPS is recommended
        hostname: '**', // This wildcard allows all hostnames
        port: '', // Leave empty to allow any port
        pathname: '**', // This wildcard allows all pathnames
      },
      {
        protocol: 'http', // Or 'http' if applicable, but HTTPS is recommended
        hostname: '**', // This wildcard allows all hostnames
        port: '', // Leave empty to allow any port
        pathname: '**', // This wildcard allows all pathnames
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
