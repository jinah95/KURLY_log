/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["images.dog.ceo", "images.unsplash.com"],
    },
    swcMinify: true,
};

module.exports = nextConfig;
