const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.ignoreWarnings = [
      {
        module: /\.\/node_modules\/next\/dist\/pages\/_document\.js/,
      },
    ];
    return config;
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
  },
});
