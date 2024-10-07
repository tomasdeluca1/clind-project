/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "huev.site",
      },
    ],
  },
};

module.exports = nextConfig;
