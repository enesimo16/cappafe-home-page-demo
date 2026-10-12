import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  allowedDevOrigins: ["192.168.1.102", "192.168.1.102:3002", "localhost:3002"],
};

export default nextConfig;
