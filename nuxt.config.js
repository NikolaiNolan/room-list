import pkg from './package';

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '~/plugins/googleMaps',
      mode: 'client',
    },
    {
      src: '~/plugins/vueFire',
      mode: 'client',
    },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    [
      'nuxt-fire',
      {
        useOnly: ['realtimeDb'],
        config: {
          development: {
            apiKey: 'AIzaSyAgROM5KySy8S6Yga0rWamQjNzpr7KADk0',
            authDomain: 'con-rooms.firebaseapp.com',
            databaseURL: 'https://con-rooms.firebaseio.com',
            projectId: 'con-rooms',
            storageBucket: 'con-rooms.appspot.com',
            messagingSenderId: '904693349598',
          },
          production: {
            apiKey: 'AIzaSyAgROM5KySy8S6Yga0rWamQjNzpr7KADk0',
            authDomain: 'con-rooms.firebaseapp.com',
            databaseURL: 'https://con-rooms.firebaseio.com',
            projectId: 'con-rooms',
            storageBucket: 'con-rooms.appspot.com',
            messagingSenderId: '904693349598',
          },
        },
      },
    ],
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/,
      //   });
      // }
    },
    transpile: [
      /^vue2-google-maps($|\/)/,
    ],
  },
};
