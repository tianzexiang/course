const withImages = require('next-images')
const withTM = require('next-transpile-modules')(['antd-mobile'])
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  },
}

module.exports = withTM(withImages(nextConfig))
