import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com', // আপনার cloudinary host
      // অন্য কোনো external image host থাকলে এখানে add করতে পারেন
    ],
  },
};

export default nextConfig;
