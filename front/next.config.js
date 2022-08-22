/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["images.dog.ceo"],
    },
    swcMinify: true,
};

module.exports = nextConfig;
