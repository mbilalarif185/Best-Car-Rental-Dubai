/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // Disable ESLint checks during build
    },
    typescript: {
      ignoreBuildErrors: process.env.NODE_ENV === 'production', // Ignore TypeScript errors in production
    },
  };
  
  export default nextConfig;
  