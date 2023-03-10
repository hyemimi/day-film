/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://15.165.101.95:8080/:path*", //목적 path
      },
    ];
  },
};

module.exports = nextConfig;
