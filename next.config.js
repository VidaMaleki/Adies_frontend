/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
  return config
}
}

module.exports = nextConfig

