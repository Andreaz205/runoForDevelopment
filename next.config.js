/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  poweredByHeader: false,
  env: {
    APP_URL: process.env.REACT_APP_URL,
    // APP_URL: process.env.APP_SERVER_URL,
    APP_ENV: process.env.REACT_APP_ENV,
    APP_SERVER_URL: process.env.REACT_APP_SERVER_URL

  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:8000/api/:path*`
      },
      {
        source: '/storage/:path*',
        destination: `http://localhost:8000/storage/:path*`
      }
    ]
  }
}

module.exports = nextConfig
