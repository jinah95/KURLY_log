/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "images.dog.ceo",
            "images.unsplash.com",
            "search.pstatic.net",
            "blog.kakaocdn.net",
            "ssap-kurly.s3.ap-northeast-2.amazonaws.com",
            "recipe1.ezmember.co.kr",
        ],
    },
    swcMinify: true,
};

module.exports = nextConfig;
