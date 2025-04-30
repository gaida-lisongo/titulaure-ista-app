import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tailadmin.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.tailadmin.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'ista-gm.net',
        port: '',
        pathname: '/public/Views/template/img/profile/**',
      },
    ],
  }
};

export default nextConfig;
