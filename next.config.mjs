/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
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
      {
        source: '/logout',
        destination: '/api/auth/logout',
        permanent: false,
      },
    ];
  },
};
export default nextConfig;
 