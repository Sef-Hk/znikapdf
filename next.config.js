// import { withPayload } from '@payloadcms/next/withPayload'

// import redirects from './redirects.js'

// const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
//   ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
//   : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
//         const url = new URL(item)

//         return {
//           hostname: url.hostname,
//           protocol: url.protocol.replace(':', ''),
//         }
//       }),
//     ],
//   },
//   webpack: (webpackConfig) => {
//     webpackConfig.resolve.extensionAlias = {
//       '.cjs': ['.cts', '.cjs'],
//       '.js': ['.ts', '.tsx', '.js', '.jsx'],
//       '.mjs': ['.mts', '.mjs'],
//     }

//     return webpackConfig
//   },
//   reactStrictMode: true,
//   redirects,
// }

// export default withPayload(nextConfig, { devBundleServerPackages: false })
import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: new URL(NEXT_PUBLIC_SERVER_URL).protocol.replace(':', ''),
        hostname: new URL(NEXT_PUBLIC_SERVER_URL).hostname,
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
  // ✅ Skip Payload init during build to avoid "cannot connect to Postgres" error
  disablePayloadInit: process.env.NEXT_PHASE === 'phase-production-build',
})
