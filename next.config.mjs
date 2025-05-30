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

  async redirects() {
    return [
      {
        source: '/cars',
        destination: '/luxury-fleet', 
        permanent: true, 
      },
    ];
  },
};
export default nextConfig;
 