import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  experimental: {},
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
      {
        protocol: "https",
        hostname: "wallpaperaccess.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
};

export default withIntlayer(withContentlayer(nextConfig));
