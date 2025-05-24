/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint checks during build
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'production', // Ignore TypeScript errors in production
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bestcarrentaldubai.ae',
        pathname: '/**',
      },
    ],
  },

  // async redirects() {
  //   return [
  //     {
  //       source: '/cars-list-1',
  //       destination: '/luxury-fleet', // 👉 Replace with your new page's path
  //       permanent: true, // 301 redirect
  //     },
  //   ];
  // },
};
export default nextConfig;
