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
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,600,700|Montserrat+Alternates:600,700' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    '~/assets/stylus/main',
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/filters',
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
      '@nuxtjs/vuetify',
      {
        // materialIcons: false,
        css: false,
        treeShake: true,
      }
    ],
    [
      'nuxt-fire',
      {
        useOnly: ['auth', 'realtimeDb'],
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

  vuetify: {
  },

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
