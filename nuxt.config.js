import pkg from './package';

const googleApi = 'AIzaSyAgROM5KySy8S6Yga0rWamQjNzpr7KADk0';

export default {
  mode: 'universal',

  env: {
    googleApi,
  },

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
    '~/plugins/asyncComputed',
    '~/plugins/filters',
    {
      src: '~/plugins/googleMaps',
      mode: 'client',
    },
    '~/plugins/materialDesignIcons',
    '~/plugins/vueFire',
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    [
      '@nuxtjs/vuetify',
      {
        materialIcons: false,
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
            apiKey: googleApi,
            authDomain: 'con-rooms.firebaseapp.com',
            databaseURL: 'https://con-rooms.firebaseio.com',
            projectId: 'con-rooms',
            storageBucket: 'con-rooms.appspot.com',
            messagingSenderId: '904693349598',
          },
          production: {
            apiKey: googleApi,
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
    iconfont: 'mdi',
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config) {
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'));
      svgRule.test = /\.(png|jpe?g|gif|webp)$/;
      config.module.rules.push({
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: [
              'vue-loader',
              {
                loader: 'svg-to-vue-component/loader',
                options: {
                  svgoConfig: {
                    plugins: [
                      { removeXMLNS: true },
                      { cleanupNumericValues: { floatPrecision: 2 } },
                    ],
                  },
                },
              },
            ],
          },
          {
            use: [
              {
                loader: 'url-loader',
                options: {
                  name: 'assets/[name].[hash:8].[ext]',
                  limit: 8192,
                },
              },
              {
                loader: 'image-webpack-loader',
                options: {
                  svgo: {
                    cleanupNumericValues: { floatPrecision: 2 },
                  },
                },
              },
            ],
          },
        ],
      });
    },
    transpile: [
      /^vue2-google-maps($|\/)/,
    ],
  },
};
