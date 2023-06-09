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
      { rel: 'preconnect', href: 'https://www.google-analytics.com' },
      { rel: 'preconnect', href: 'https://maps.googleapis.com' },
    ],
  },

  manifest: {
    short_name: 'Room List',
    name: pkg.description,
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
    '~/assets/stylus/vuetify',
    '~/assets/scss/main',
  ],

  plugins: [
    {
      src: '~/plugins/googleMaps',
      mode: 'client',
    },
    '~/plugins/gtag',
    '~/plugins/imageContext',
    '~/plugins/lazyImage',
    '~/plugins/observeVisibility',
    '~/plugins/vueFire',
    '~/plugins/vuetify',
  ],

  modules: [
    ['nuxt-rfg-icon', {
      masterPicture: 'static/icon.svg',
      force: true,
      rfg: {
        masterPicture: 'TODO: Path to your master picture',
        iconsPath: '/',
        design: {
          ios: {
            masterPicture: {
              type: 'inline',
              content: 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iODgzLjM0cHgiIGhlaWdodD0iODgzLjM0cHgiIHZpZXdCb3g9Ii0zOTUuNDggLTM0NS42NyA4ODMuMzQgODgzLjM0Ig0KCSBlbmFibGUtYmFja2dyb3VuZD0ibmV3IC0zOTUuNDggLTM0NS42NyA4ODMuMzQgODgzLjM0IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCgkgPHJlY3QgeD0iLTUwJSIgeT0iLTUwJSIgaGVpZ2h0PSIxNTAlIiB3aWR0aD0iMTUwJSIgZmlsbD0iI2RkNzMxZCIgLz4NCjxwb2x5Z29uIGZpbGw9IiNERDczMUQiIHBvaW50cz0iLTIwOC44MTIsLTIxLjc3OCA0Ni4xOSwtMjU3LjMzNSAxNDguMTg2LC0xOTguNDQ2IDI1MC4xOTQsMjcyLjY2NyAtNTUuODA2LDM5MC40NDYNCgktMTU3LjgxNCwzMzEuNTU3ICIvPg0KPHBvbHlnb24gZmlsbD0iI0ZEODcxMyIgcG9pbnRzPSIxNDguMTg2LC0xOTguNDQ2IDI1MC4xOTQsLTEzOS41NTcgMzAxLjE5MiwyNDMuMjIzIDQ2LjE5LDQ0OS4zMzUgLTU1LjgwNiwzOTAuNDQ2IC01NS44MDYsMTU0Ljg4OQ0KCTQ2LjE5LDIxMy43NzggMTk5LjE5NiwzMzEuNTU3IDE0OC4xODYsMTU0Ljg4OSAtNTUuODA2LDM3LjExMSAtMTA2LjgxNiwtMTM5LjU1NyA0Ni4xOSwtMjEuNzc4IDE0OC4xODYsMzcuMTExICIvPg0KPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSItMjU5LjgxLC04MC42NjcgNDYuMTksLTI1Ny4zMzUgNDYuMTksLTIxLjc3OCAtNTUuODA2LC04MC42NjcgLTU1LjgwNiwzNy4xMTEgLTE1Ny44MTQsLTIxLjc3OA0KCS0xNTcuODE0LDMzMS41NTcgLTI1OS44MSwyNzIuNjY3ICIvPg0KPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSIzNTIuMTksMjcyLjY2NyA0Ni4xOSw0NDkuMzM1IDQ2LjE5LDIxMy43NzggMTQ4LjE4NiwyNzIuNjY3IDE0OC4xODYsMTU0Ljg4OSAyNTAuMTk0LDIxMy43NzgNCgkyNTAuMTk0LC0xMzkuNTU3IDM1Mi4xOSwtODAuNjY3ICIvPg0KPC9zdmc+DQo=',
            },
            pictureAspect: 'noChange',
            assets: {
              ios6AndPriorIcons: false,
              ios7AndLaterIcons: false,
              precomposedIcons: false,
              declareOnlyDefaultIcon: true,
            },
          },
          desktopBrowser: {},
          windows: {
            pictureAspect: 'noChange',
            backgroundColor: '#de7317',
            onConflict: 'override',
            assets: {
              windows80Ie10Tile: false,
              windows10Ie11EdgeTiles: {
                small: false,
                medium: true,
                big: false,
                rectangle: false,
              },
            },
          },
          androidChrome: {
            masterPicture: {
              type: 'inline',
              content: 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiB2aWV3Qm94PSItMzc1IC0zNzUgNzUwIDc1MCI+DQo8ZGVmcz4NCiAgPG1hc2sgaWQ9Im1hc2sxIiB4PSIwIiB5PSIwIiB3aWR0aD0iNzUwIiBoZWlnaHQ9Ijc1MCIgPg0KCQk8Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iMzc1IiBmaWxsPSJ3aGl0ZSIgLz4NCiAgPC9tYXNrPg0KPC9kZWZzPg0KPGcgc3R5bGU9Im1hc2s6IHVybCgjbWFzazEpIj4NCgk8cmVjdCB4PSItNTAlIiB5PSItNTAlIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIiBmaWxsPSIjZGQ3MzFkIiAvPg0KCTxwb2x5Z29uIHBvaW50cz0iLTQzMy4wMSwtNDAwIDM0Ni40MSwtNDAwIDg2LjYsLTI1MCAtMTczLjIxLC00MDAgLTQzMy4wMSwtMjUwIiBmaWxsPSIjZmQ4NzEzIiAvPg0KCTxwb2x5Z29uIHBvaW50cz0iODYuNiwtMjUwIDI1OS44MSwtMTUwIDQzMy4wMSwtMjUwIDQzMy4wMSwyNTAgMTczLjIxLDQwMCAtODYuNiwyNTAgLTQzMy4wMSw0NTAgLTQzMy4wMSwyNTAgLTI1OS44MSwxNTAgLTg2LjYsMjUwIC04Ni42LDUwIDg2LjYsMTUwIDE3My4yMSwxMDAgLTg2LjYsLTUwIC04Ni42LC0xNTAgODYuNiwtNTAiIGZpbGw9IiNmZDg3MTMiIC8+DQoJPHBvbHlnb24gcG9pbnRzPSItMjU5LjgxLC0xNTAgMCwtMzAwIDAsLTEwMCAtODYuNiwtMTUwIC04Ni42LC01MCAtMTczLjIxLC0xMDAgLTE3My4yMSwyMDAgLTI1OS44MSwxNTAiIGZpbGw9IiNmZmYiIC8+DQoJPHBvbHlnb24gcG9pbnRzPSIyNTkuODEsMTUwIDAsMzAwIDAsMTAwIDg2LjYsMTUwIDg2LjYsNTAgMTczLjIxLDEwMCAxNzMuMjEsLTIwMCAyNTkuODEsLTE1MCIgZmlsbD0iI2ZmZiIgLz4NCgk8L2c+DQo8L3N2Zz4NCg==',
            },
            pictureAspect: 'noChange',
            themeColor: '#dd731d',
            manifest: {
              display: 'standalone',
              orientation: 'notSet',
              onConflict: 'override',
              declared: true,
            },
            assets: {
              legacyIcon: false,
              lowResolutionIcons: false,
            },
          },
          safariPinnedTab: {
            masterPicture: {
              type: 'inline',
              content: 'CTxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIxNC4xOSA2NCA2NCA2NCI+DQoJPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSIxOC40NzcsODAgNDYuMTksNjQgNDYuMTksODUuMzMzIDM2Ljk1Myw4MCAzNi45NTMsOTAuNjY3IDI3LjcxNCw4NS4zMzMgMjcuNzE0LDExNy4zMzMgMTguNDc3LDExMiIvPg0KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iNzMuOTAzLDExMiA0Ni4xOSwxMjggNDYuMTksMTA2LjY2NyA1NS40MjgsMTEyIDU1LjQyOCwxMDEuMzMzIDY0LjY2NiwxMDYuNjY3IDY0LjY2Niw3NC42NjcgNzMuOTAzLDgwIi8+DQo8L3N2Zz4NCg==',
            },
            pictureAspect: 'silhouette',
            themeColor: '#dd731d',
          },
        },
        settings: {
          scalingAlgorithm: 'Mitchell',
          errorOnImageTooSmall: false,
          readmeFile: false,
          htmlCodeFile: false,
          usePathAsIs: false,
        },
      },
    }],
    ['@nuxtjs/pwa', {
      icon: false,
    }],
    '@nuxtjs/style-resources',
    ['nuxt-fire', {
      useOnly: ['auth', 'realtimeDb'],
      config: {
        development: {
          apiKey: googleApi,
          authDomain: 'conrooms.com',
          databaseURL: 'https://con-rooms.firebaseio.com',
          projectId: 'con-rooms',
          storageBucket: 'con-rooms.appspot.com',
          messagingSenderId: '904693349598',
        },
        production: {
          apiKey: googleApi,
          authDomain: 'conrooms.com',
          databaseURL: 'https://con-rooms.firebaseio.com',
          projectId: 'con-rooms',
          storageBucket: 'con-rooms.appspot.com',
          messagingSenderId: '904693349598',
        },
      },
    }],
  ],

  styleResources: {
    scss: [
      `${includePaths[0]}/*.scss`,
      '~/assets/scss/utils/*.scss',
    ],
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
      'vuetify/lib',
      /^vue2-google-maps($|\/)/,
    ],
  },
};
