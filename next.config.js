/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/ua",
        destination: "/ua/products",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
