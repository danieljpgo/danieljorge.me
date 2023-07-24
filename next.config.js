const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: "/css-a-set-of-boundaries-not-hard-rules",
        destination: "/css-boundaries",
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
