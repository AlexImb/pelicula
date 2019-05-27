import NuxtConfiguration from '@nuxt/config';

const config: NuxtConfiguration = {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Película',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'The ultimate PWA for movie night polls.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   *  Router middleware for routes access control
   */
  router: {
    middleware: 'router-auth'
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#7957d5' },

  /*
   ** Global CSS
   */
  css: ['./assets/scss/theme.scss', './assets/scss/spacing.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/firebase.ts' }, { src: '~/plugins/firestore.ts' }, { src: '~/plugins/fireauth.ts' }],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    '@nuxtjs/pwa',
    // Doc: https://vue-scrollto.netlify.com/docs
    'vue-scrollto/nuxt'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  env: {
    FIREBASE_CLIENT_API_KEY: process.env.FIREBASE_CLIENT_API_KEY || '',
    FIREBASE_CLIENT_AUTH_DOMAIN: process.env.FIREBASE_CLIENT_AUTH_DOMAIN || '',
    FIREBASE_CLIENT_DATABASE_URL: process.env.FIREBASE_CLIENT_DATABASE_URL || '',
    FIREBASE_CLIENT_PROJECT_ID: process.env.FIREBASE_CLIENT_PROJECT_ID || '',
    FIREBASE_CLIENT_STORAGE_BUCKET: process.env.FIREBASE_CLIENT_STORAGE_BUCKET || '',
    TMDB_API_KEY: process.env.TMDB_API_KEY || ''
  },

  /*
   ** Build configuration
   */
  build: {
    // extend(config, ctx) {
    //   if (ctx.isDev && ctx.isClient && config && config.module) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     });
    //   }
    // }
  }
};

export default config;
