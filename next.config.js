/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [ 'fakestoreapi.com', 'firebasestorage.googleapis.com' ],
  },
}
module.exports = nextConfig
