const hoistNonReactStatics = require('hoist-non-react-statics')

module.exports = {
  locales: ['es'],
  defaultLocale: 'es',
  localeDetection: false,
  pages: {
    '*': ['common', 'navbar'],
    '/': ['home'],
    '/dashboard': ['home'],
  },
  staticsHoc: hoistNonReactStatics,
}
