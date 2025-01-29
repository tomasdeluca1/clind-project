/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    MONGODB_DATABASE: process.env.MONGODB_DATABASE,
    LEMON_SQUEEZY_API_KEY: process.env.LEMON_SQUEEZY_API_KEY,
    LEMON_SQUEEZY_TEST_API_KEY: process.env.LEMON_SQUEEZY_TEST_API_KEY,
    LEMON_SQUEEZY_WEBHOOK_SECRET: process.env.LEMON_SQUEEZY_WEBHOOK_SECRET,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "huev.site",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "clind-site.s3.us-east-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
    ],
  },
};

module.exports = nextConfig;
