/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["images.dog.ceo", "images.unsplash.com", "ssap-kurly.s3.ap-northeast-2.amazonaws.com"],
    },
    swcMinify: true,
};

module.exports = nextConfig;
