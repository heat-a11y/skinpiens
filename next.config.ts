import type { NextConfig } from "next";

const isStaticExport = process.env.EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  ...(isStaticExport ? { output: "export" as const } : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
