import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent server-side bundling of Three.js packages
  serverExternalPackages: [
    'three',
    '@react-three/fiber',
    '@react-three/drei'
  ],

  // Skip type checking and linting during build (can be done separately)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Configure webpack to externalize these packages on server builds
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Don't bundle these packages on the server
      config.externals = [
        ...config.externals,
        'three',
        '@react-three/fiber',
        '@react-three/drei'
      ];
    }

    return config;
  },
};

export default nextConfig;
