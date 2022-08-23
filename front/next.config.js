/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "images.dog.ceo",
            "images.unsplash.com",
            "search.pstatic.net",
            "blog.kakaocdn.net",
        ],
    },
    swcMinify: true,
};

module.exports = nextConfig;
