/** @type {import('next').NextConfig} */

// const ContentSecurityPolicy = `
//   default-src 'self';
//   script-src 'self';
//   child-src example.com;
//   style-src 'self' example.com;
//   font-src 'self';
// `

// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   poweredByHeader: false,
//   //Adding policies:
//   // async headers() {
//   //   return [
//   //     {
//   //       source: '/(.*)',
//   //       headers: [
//   //         // {
//   //         //   key: 'Content-Security-Policy',
//   //         //   value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
//   //         // },
//   //         {
//   //           key: 'X-Frame-Options',
//   //           value: 'DENY',
//   //         },
//   //         {
//   //           key: 'X-Content-Type-Options',
//   //           value: 'nosniff',
//   //         },
//   //         {
//   //           key: 'Permissions-Policy',
//   //           value: 'camera=(); battery=(self); microphone=()',
//   //         },
//   //         {
//   //           key: 'Referrer-Policy',
//   //           value: 'origin-when-cross-origin',
//   //         },
//   //       ],
//   //     },
//   //   ]
//   // },
// }

module.exports = {
  reactStrictMode: false,
  swcMinify: false,
  poweredByHeader: false,
}
