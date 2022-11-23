/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
};

module.exports = {
  nextConfig,

  images: {
    domains: ['ap.rdcpix.com', 'res.cloudinary.com'],
    protocol: 'https',
    hostname: 'res.cloudinary.com',
    port: '',
    pathname: '/dl6zxylrj/image/upload/v1668606905/',
  },
};
