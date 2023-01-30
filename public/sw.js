if (!self.define) {
  let e,
    s = {}
  const a = (a, n) => (
    (a = new URL(a + '.js', n).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;(e.src = a), (e.onload = s), document.head.appendChild(e)
        } else (e = a), importScripts(a), s()
      }).then(() => {
        let e = s[a]
        if (!e) throw new Error(`Module ${a} didn’t register its module`)
        return e
      })
  )
  self.define = (n, c) => {
    const i =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href
    if (s[i]) return
    let t = {}
    const d = (e) => a(e, i),
      r = { module: { uri: i }, exports: t, require: d }
    s[i] = Promise.all(n.map((e) => r[e] || d(e))).then((e) => (c(...e), t))
  }
}
define(['./workbox-588899ac'], function (e) {
  'use strict'
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/71oo6iR-LanzxLOezulPT/_buildManifest.js',
          revision: '534ca7127ef6715ca30ab543413b9262',
        },
        {
          url: '/_next/static/71oo6iR-LanzxLOezulPT/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/0c428ae2-45a2fadbeed6e3d9.js',
          revision: '45a2fadbeed6e3d9',
        },
        {
          url: '/_next/static/chunks/17007de1-db2e36bfa9af2270.js',
          revision: 'db2e36bfa9af2270',
        },
        {
          url: '/_next/static/chunks/1bfc9850-ff0d10b7e72d23f2.js',
          revision: 'ff0d10b7e72d23f2',
        },
        {
          url: '/_next/static/chunks/250-49ec19edc5c15289.js',
          revision: '49ec19edc5c15289',
        },
        {
          url: '/_next/static/chunks/252f366e-1dd0e1bb33debed9.js',
          revision: '1dd0e1bb33debed9',
        },
        {
          url: '/_next/static/chunks/256-65adc1920c594467.js',
          revision: '65adc1920c594467',
        },
        {
          url: '/_next/static/chunks/279-0c43de647e06badd.js',
          revision: '0c43de647e06badd',
        },
        {
          url: '/_next/static/chunks/29-31785d90942a4ad0.js',
          revision: '31785d90942a4ad0',
        },
        {
          url: '/_next/static/chunks/342-340c19888c5a5712.js',
          revision: '340c19888c5a5712',
        },
        {
          url: '/_next/static/chunks/416-3e829b312550c829.js',
          revision: '3e829b312550c829',
        },
        {
          url: '/_next/static/chunks/545f34e4-a7e5ad917773bec0.js',
          revision: 'a7e5ad917773bec0',
        },
        {
          url: '/_next/static/chunks/667-e06345eaa0c0d8f4.js',
          revision: 'e06345eaa0c0d8f4',
        },
        {
          url: '/_next/static/chunks/716-6b3f8cd166cb4c08.js',
          revision: '6b3f8cd166cb4c08',
        },
        {
          url: '/_next/static/chunks/722-1473a42a6a172d7d.js',
          revision: '1473a42a6a172d7d',
        },
        {
          url: '/_next/static/chunks/784-e3cb3f68a2e0831d.js',
          revision: 'e3cb3f68a2e0831d',
        },
        {
          url: '/_next/static/chunks/794-4748271e1300c0b9.js',
          revision: '4748271e1300c0b9',
        },
        {
          url: '/_next/static/chunks/7f0c75c1-6009d05dc8c59d37.js',
          revision: '6009d05dc8c59d37',
        },
        {
          url: '/_next/static/chunks/835-f64245d3d4e0e82d.js',
          revision: 'f64245d3d4e0e82d',
        },
        {
          url: '/_next/static/chunks/95b64a6e-54d66eae6782ca22.js',
          revision: '54d66eae6782ca22',
        },
        {
          url: '/_next/static/chunks/d0c16330-ea50f6afd8247d72.js',
          revision: 'ea50f6afd8247d72',
        },
        {
          url: '/_next/static/chunks/d7eeaac4-fa74e17ddb5682c4.js',
          revision: 'fa74e17ddb5682c4',
        },
        {
          url: '/_next/static/chunks/ef6529d7-e726fdbaea86ed02.js',
          revision: 'e726fdbaea86ed02',
        },
        {
          url: '/_next/static/chunks/framework-4556c45dd113b893.js',
          revision: '4556c45dd113b893',
        },
        {
          url: '/_next/static/chunks/main-e4de5d1a4535be6d.js',
          revision: 'e4de5d1a4535be6d',
        },
        {
          url: '/_next/static/chunks/pages/404-1e35530661261331.js',
          revision: '1e35530661261331',
        },
        {
          url: '/_next/static/chunks/pages/500-49a3c87af13edf3e.js',
          revision: '49a3c87af13edf3e',
        },
        {
          url: '/_next/static/chunks/pages/_app-a8f312cedf772344.js',
          revision: 'a8f312cedf772344',
        },
        {
          url: '/_next/static/chunks/pages/_error-a4ba2246ff8fb532.js',
          revision: 'a4ba2246ff8fb532',
        },
        {
          url: '/_next/static/chunks/pages/auth-e4d3d7e21c86606f.js',
          revision: 'e4d3d7e21c86606f',
        },
        {
          url: '/_next/static/chunks/pages/index-1986875b06a83c96.js',
          revision: '1986875b06a83c96',
        },
        {
          url: '/_next/static/chunks/pages/dashboard-1f5ad089b1b7bb69.js',
          revision: '1f5ad089b1b7bb69',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/faq-7d417cb50ef580cd.js',
          revision: '7d417cb50ef580cd',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/payments-fe0263a8d614d3c3.js',
          revision: 'fe0263a8d614d3c3',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/policies-8beab6235adea893.js',
          revision: '8beab6235adea893',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/policies/%5Bid%5D-1b7aa8830b462038.js',
          revision: '1b7aa8830b462038',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/profile-843551caeda288c7.js',
          revision: '843551caeda288c7',
        },
        {
          url: '/_next/static/chunks/pages/dashboard/siniestro-edd63b4be6918766.js',
          revision: 'edd63b4be6918766',
        },
        {
          url: '/_next/static/chunks/pages/underconstruction-1fe9b4f82c75d7e5.js',
          revision: '1fe9b4f82c75d7e5',
        },
        {
          url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        {
          url: '/_next/static/chunks/webpack-df4cf1c8d23aa877.js',
          revision: 'df4cf1c8d23aa877',
        },
        {
          url: '/_next/static/css/24e8b8557f71f8d2.css',
          revision: '24e8b8557f71f8d2',
        },
        {
          url: '/_next/static/media/404.c4516a0d.svg',
          revision: '1449067394785119d6f28efea4d1deb2',
        },
        {
          url: '/_next/static/media/500.02c947a1.svg',
          revision: '9095a2eccb8a3ce57212fb9c73196d19',
        },
        {
          url: '/_next/static/media/UnderConstruction.e372d6b6.svg',
          revision: '12143d90312f18250e981324f84b40cd',
        },
        {
          url: '/_next/static/media/adinsuranceLogo.c7f7b580.png',
          revision: '21539a8837d5e3b9ff5dfa0a270bab22',
        },
        {
          url: '/_next/static/media/brandLogo.7867f206.png',
          revision: 'ff767304108cae25ff41f19746955912',
        },
        {
          url: '/_next/static/media/england.82942220.png',
          revision: 'aac0dfefc080856931658ea9c760534e',
        },
        {
          url: '/_next/static/media/espana.6a01629a.png',
          revision: '69bf7c3df4b222c445bf6ebffec278e6',
        },
        {
          url: '/_next/static/media/subtitleBg.1467039b.svg',
          revision: 'ff1db6f1f63302b926adf72933350b11',
        },
        {
          url: '/assets/404.svg',
          revision: '1449067394785119d6f28efea4d1deb2',
        },
        {
          url: '/assets/500.svg',
          revision: '9095a2eccb8a3ce57212fb9c73196d19',
        },
        {
          url: '/assets/UnderConstruction.svg',
          revision: '12143d90312f18250e981324f84b40cd',
        },
        {
          url: '/assets/backgroundImages/bgHands.jpg',
          revision: 'c73edb7924ced71599d1649bc1af7ce5',
        },
        {
          url: '/assets/backgroundImages/bgHeroHeader.jpg',
          revision: 'c9e4020f574aba8db05ff6dd7f1a284d',
        },
        {
          url: '/assets/backgroundImages/bgInsuranceHeader.webp',
          revision: '086ba7c8d57e51b186395af65b1e9693',
        },
        {
          url: '/assets/backgroundImages/bgLaptopHeader.jpg',
          revision: 'b26b16529a70527cecb2e7067d7e2bd5',
        },
        {
          url: '/assets/brandImages/bluesubtitleBg.svg',
          revision: 'f60be954283444d8ea0111ee584e9986',
        },
        {
          url: '/assets/brandImages/brandLogo.png',
          revision: 'ff767304108cae25ff41f19746955912',
        },
        {
          url: '/assets/brandImages/sancorbrandLogo.png',
          revision: '6261f589379e811f846101fc5901c80d',
        },
        {
          url: '/assets/brandImages/subtitleBg.svg',
          revision: 'ff1db6f1f63302b926adf72933350b11',
        },
        {
          url: '/assets/client.png',
          revision: '28bbeec9155e16c7828a5c4ffc71a87f',
        },
        {
          url: '/assets/flags/england.png',
          revision: 'aac0dfefc080856931658ea9c760534e',
        },
        {
          url: '/assets/flags/espana.png',
          revision: '69bf7c3df4b222c445bf6ebffec278e6',
        },
        {
          url: '/assets/logos/adinsuranceLogo.png',
          revision: '21539a8837d5e3b9ff5dfa0a270bab22',
        },
        {
          url: '/assets/logos/logoEmmsa.png',
          revision: 'd277ef8c7369e23950b5f3e36669c89d',
        },
        {
          url: '/assets/meridional.png',
          revision: '3c73ad2d215b7d2486e0567f8b3a6a02',
        },
        { url: '/favicon.ico', revision: 'ad5ce6aadd1342d1e3efd85ed9f06450' },
        {
          url: '/fonts/muli.zip',
          revision: '56abd40a23fa7f549bc13785c11092a8',
        },
        {
          url: '/icons/Logo-Meridional_vertical-01.png',
          revision: '6b70c528561bd4741e7b1ef3a3809c67',
        },
        {
          url: '/icons/icon-192x192.png',
          revision: 'b985da5fe2ecdf093224966d190f02c7',
        },
        {
          url: '/icons/icon-256x256.png',
          revision: '49c4eda43ffb592d50cecd48376bfbca',
        },
        {
          url: '/icons/icon-384x384.png',
          revision: '7eae7f63c4a8ce848b62a2a72eabca50',
        },
        {
          url: '/icons/icon-512x512.png',
          revision: '2ceb60c98dc6162cb1bda06df3c4c143',
        },
        { url: '/manifest.json', revision: '9ef4d5ba4e152677022889735cc09823' },
        { url: '/robots.txt', revision: 'a8cfb651e6ded50c9508e737aff10298' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: n,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        const s = e.pathname
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        return !e.pathname.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    )
})
