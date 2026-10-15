import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Dev only: hosts besides `localhost` that may load the dev server's scripts.
  // 127.0.0.1 = this laptop (Solo Service occupies localhost:3000),
  // 10.0.0.199 = this laptop's Wi-Fi address, for testing on a phone/tablet.
  // Update the IP if the router assigns the laptop a new one.
  allowedDevOrigins: ["127.0.0.1", "10.0.0.199"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
