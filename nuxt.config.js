import { includePaths } from 'bourbon';

import pkg from './package';

const googleApi = 'AIzaSyAgROM5KySy8S6Yga0rWamQjNzpr7KADk0';

export default {
  mode: 'universal',

  env: {
    googleApi,
  },

  head: {
    title: pkg.description,
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,600,700|Montserrat+Alternates:600,700' },
    ],
  },

  manifest: {
    short_name: 'Room List',
    name: 'Nikolai’s Con Room & Ride List',
    author: 'Nikolai Nolan',
    description: 'Nikolai’s list of convention rooms and rides for friends who want to join the fun.',
    theme_color: '#dd731d',
    background_color: '#dd731d',
    ogHost: 'https://conrooms.com',
    ogImage: {
      path: '/og.png',
      width: 1200,
      height: 626,
    },
    twitterSite: 'Nikolai',
    twitterCreator: 'Nikolai',
    start_url: '/',
    display: 'standalone',
    nativeUI: true,
  },

  loading: false,

  css: [
    '~/assets/stylus/main',
  ],

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

  modules: [
    [
      '@nuxtjs/pwa',
      { icon: false },
    ],
    '@nuxtjs/style-resources',
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

  styleResources: {
    scss: [
      `${includePaths[0]}/*.scss`,
      '~/assets/scss/utils/*.scss',
    ],
  },

  vuetify: {
    iconfont: 'mdi',
  },

  build: {
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
