const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   typedRoutes: true,
  // },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/notes/css-a-set-of-boundaries-not-hard-rules",
        destination: "/notes/css-boundaries",
        permanent: true,
      },
      {
        source: "/diagrams/begin-with-low-level-components",
        destination: "/diagrams/begin-low",
        permanent: true,
      },
      {
        source: "/diagrams/co-locate-your-providers-and-stores",
        destination: "/diagrams/colocate-providers",
        permanent: true,
      },
      {
        source: "/diagrams/create-components-through-composition",
        destination: "/diagrams/composition",
        permanent: true,
      },
      {
        source: "/diagrams/url-as-a-way-to-compose-your-interface",
        destination: "/diagrams/url-compose",
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
