const nextConfig = {
     async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://api.escuelajs.co/api/v1/:path*'
      },
    ];
  },
};

export default nextConfig;
