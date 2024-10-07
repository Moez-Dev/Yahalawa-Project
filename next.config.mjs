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
      images: {
        domains: ['localhost', '176.31.163.243'],
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '176.31.163.243', 
            pathname: '/recipe_img/**', 
          },
          {
            protocol: 'http',
            hostname: '176.31.163.243',
            pathname: '/tips_img/**',
          },
        ],
      },
};

export default nextConfig;
