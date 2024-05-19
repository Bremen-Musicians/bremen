/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'bremen-music.s3.ap-northeast-2.amazonaws.com',
        },
      ],
    },
    reactStrictMode: true,
};

export default nextConfig;
