/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["http://localhost:4000", "*.my-proxy.com"],
    },
  },
};
// module.exports = {
//   experimental: {
//     serverActions: {
//       allowedOrigins: ["http://localhost:4000", "*.my-proxy.com"],
//     },
//   },
// };
export default nextConfig;
