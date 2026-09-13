import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // এটি সার্ভার অপটিমাইজেশন স্কিপ করবে কিন্তু যেকোনো ইমেজ সোর্স সাপোর্ট করবে
  },
};

export default nextConfig;