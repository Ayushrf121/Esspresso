/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // Move it out of experimental directly into a root-level turbopack object
  turbopack: {
    root: '.', 
  },
};

export default nextConfig;