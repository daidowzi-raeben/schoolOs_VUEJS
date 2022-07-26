// import path from 'path'
import colors from 'vuetify/es5/util/colors'
// import dotenv from 'dotenv'
// import {DIR_CONFIG} from './config/dirConfig'
// import { CONST_ENV_TYPE } from './config/envConfig'

require('dotenv').config()

// {

//   // const env = process.env.NODE_ENV
//   // const device = process.env.DEVICE
//   // const envFile = `.env.${device}`
//   // console.log('[envFile]', envFile)
//   // if (env === CONST_ENV_TYPE.PROD) {
//   //   // PROD
//   //   dotenv.config({ path: path.join(__dirname, envFile) })
//   // }
//   const device = null
//   if(process.env.DEVICE === 'PC') {
//     const device = 'pc'
//   } else {
//     const device = 'mobile'
//   }

// }

console.log('[ENV >>>>> ]', process.env)

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - schoolos',
    title: 'schoolos',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/BootstrapVue.js', ssr: false, mode: 'client' },
    { src: '~plugins/MomentVue.js', ssr: false, mode: 'client' },
    { src: '~plugins/AwesomeSwiper.js', ssr: false, mode: 'client' },
    { src: '~plugins/Vcaledar.js', ssr: false, mode: 'client' },
    { src: '~plugins/HtmlEditor.js', ssr: false, mode: 'client' },
    { src: '~plugins/filters.js', ssr: false, mode: 'client' },
    { src: '~plugins/QrCode.js', ssr: false, mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/device',
    'nuxt-socket-io',
    'vue2-editor/nuxt',
  ],
  io: {
    sockets: [
      {
        name: 'SOS_NODE_SERVER',
        url: process.env.VUE_APP_NODE,
        default: true,
      },
    ],
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    html: {
      minify: {
        collapseWhitespace: true, // as @dario30186 mentioned
        removeComments: true, // 👈 add this line
      },
    },
  },
  server: { port: process.env.PORT, host: '0.0.0.0' },
  dir: {
    assets: 'assets-' + process.env.DEVICE,
    components: 'components-' + process.env.DEVICE,
    pages: 'pages-' + process.env.DEVICE,
    layouts: 'layouts-' + process.env.DEVICE,
  },
  buildDir: '.nuxt-' + process.env.DEVICE,
  ssr: true,
  generate: {
    dir: 'dist-' + process.env.DEVICE,
  },
}
