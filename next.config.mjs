/** @type {import('next').NextConfig} */

const nextConfig = {
    async redirects() {
        return [
          {
            source: '/admin',
            destination: '/dashboard/home',
            permanent: true,
          }
        ]
      },
};

export default nextConfig;
