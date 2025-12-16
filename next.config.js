/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  transpilePackages: ["@sanity/vision", "isomorphic-dompurify", "jsdom"],
};

module.exports = nextConfig;
