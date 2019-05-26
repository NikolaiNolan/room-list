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
    {
      src: '~/plugins/googleMaps',
      mode: 'client',
    },
    '~/plugins/lazyImage',
    '~/plugins/materialDesignIcons',
    '~/plugins/vueFire',
  ],

  modules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-28036640-3',
      dev: false,
    }],
    ['nuxt-rfg-icon', {
      masterPicture: 'static/icon.svg',
      force: true,
      rfg: {
        "masterPicture": "TODO: Path to your master picture",
        "iconsPath": "/",
        "design": {
          "ios": {
            "masterPicture": {
              "type": "inline",
              "content": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iODgzLjM0cHgiIGhlaWdodD0iODgzLjM0cHgiIHZpZXdCb3g9Ii0zOTUuNDggLTM0NS42NyA4ODMuMzQgODgzLjM0Ig0KCSBlbmFibGUtYmFja2dyb3VuZD0ibmV3IC0zOTUuNDggLTM0NS42NyA4ODMuMzQgODgzLjM0IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCgkgPHJlY3QgeD0iLTUwJSIgeT0iLTUwJSIgaGVpZ2h0PSIxNTAlIiB3aWR0aD0iMTUwJSIgZmlsbD0iI2RkNzMxZCIgLz4NCjxwb2x5Z29uIGZpbGw9IiNERDczMUQiIHBvaW50cz0iLTIwOC44MTIsLTIxLjc3OCA0Ni4xOSwtMjU3LjMzNSAxNDguMTg2LC0xOTguNDQ2IDI1MC4xOTQsMjcyLjY2NyAtNTUuODA2LDM5MC40NDYNCgktMTU3LjgxNCwzMzEuNTU3ICIvPg0KPHBvbHlnb24gZmlsbD0iI0ZEODcxMyIgcG9pbnRzPSIxNDguMTg2LC0xOTguNDQ2IDI1MC4xOTQsLTEzOS41NTcgMzAxLjE5MiwyNDMuMjIzIDQ2LjE5LDQ0OS4zMzUgLTU1LjgwNiwzOTAuNDQ2IC01NS44MDYsMTU0Ljg4OQ0KCTQ2LjE5LDIxMy43NzggMTk5LjE5NiwzMzEuNTU3IDE0OC4xODYsMTU0Ljg4OSAtNTUuODA2LDM3LjExMSAtMTA2LjgxNiwtMTM5LjU1NyA0Ni4xOSwtMjEuNzc4IDE0OC4xODYsMzcuMTExICIvPg0KPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSItMjU5LjgxLC04MC42NjcgNDYuMTksLTI1Ny4zMzUgNDYuMTksLTIxLjc3OCAtNTUuODA2LC04MC42NjcgLTU1LjgwNiwzNy4xMTEgLTE1Ny44MTQsLTIxLjc3OA0KCS0xNTcuODE0LDMzMS41NTcgLTI1OS44MSwyNzIuNjY3ICIvPg0KPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSIzNTIuMTksMjcyLjY2NyA0Ni4xOSw0NDkuMzM1IDQ2LjE5LDIxMy43NzggMTQ4LjE4NiwyNzIuNjY3IDE0OC4xODYsMTU0Ljg4OSAyNTAuMTk0LDIxMy43NzgNCgkyNTAuMTk0LC0xMzkuNTU3IDM1Mi4xOSwtODAuNjY3ICIvPg0KPC9zdmc+DQo="
            },
            "pictureAspect": "noChange",
            "assets": {
              "ios6AndPriorIcons": false,
              "ios7AndLaterIcons": false,
              "precomposedIcons": false,
              "declareOnlyDefaultIcon": true
            }
          },
          "desktopBrowser": {},
          "windows": {
            "pictureAspect": "noChange",
            "backgroundColor": "#de7317",
            "onConflict": "override",
            "assets": {
              "windows80Ie10Tile": false,
              "windows10Ie11EdgeTiles": {
                "small": false,
                "medium": true,
                "big": false,
                "rectangle": false
              }
            }
          },
          "androidChrome": {
            "masterPicture": {
              "type": "inline",
              "content": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iODgzLjM0cHgiIGhlaWdodD0iODgzLjM0cHgiIHZpZXdCb3g9Ii0zOTUuNDggLTM0NS42NyA4ODMuMzQgODgzLjM0Ig0KCSBlbmFibGUtYmFja2dyb3VuZD0ibmV3IC0zOTUuNDggLTM0NS42NyA4ODMuMzQgODgzLjM0IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCgkgPHJlY3QgeD0iLTUwJSIgeT0iLTUwJSIgaGVpZ2h0PSIxNTAlIiB3aWR0aD0iMTUwJSIgZmlsbD0iI2RkNzMxZCIgLz4NCjxwb2x5Z29uIGZpbGw9IiNERDczMUQiIHBvaW50cz0iLTIwOC44MTIsLTIxLjc3OCA0Ni4xOSwtMjU3LjMzNSAxNDguMTg2LC0xOTguNDQ2IDI1MC4xOTQsMjcyLjY2NyAtNTUuODA2LDM5MC40NDYNCgktMTU3LjgxNCwzMzEuNTU3ICIvPg0KPHBvbHlnb24gZmlsbD0iI0ZEODcxMyIgcG9pbnRzPSIxNDguMTg2LC0xOTguNDQ2IDI1MC4xOTQsLTEzOS41NTcgMzAxLjE5MiwyNDMuMjIzIDQ2LjE5LDQ0OS4zMzUgLTU1LjgwNiwzOTAuNDQ2IC01NS44MDYsMTU0Ljg4OQ0KCTQ2LjE5LDIxMy43NzggMTk5LjE5NiwzMzEuNTU3IDE0OC4xODYsMTU0Ljg4OSAtNTUuODA2LDM3LjExMSAtMTA2LjgxNiwtMTM5LjU1NyA0Ni4xOSwtMjEuNzc4IDE0OC4xODYsMzcuMTExICIvPg0KPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSItMjU5LjgxLC04MC42NjcgNDYuMTksLTI1Ny4zMzUgNDYuMTksLTIxLjc3OCAtNTUuODA2LC04MC42NjcgLTU1LjgwNiwzNy4xMTEgLTE1Ny44MTQsLTIxLjc3OA0KCS0xNTcuODE0LDMzMS41NTcgLTI1OS44MSwyNzIuNjY3ICIvPg0KPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSIzNTIuMTksMjcyLjY2NyA0Ni4xOSw0NDkuMzM1IDQ2LjE5LDIxMy43NzggMTQ4LjE4NiwyNzIuNjY3IDE0OC4xODYsMTU0Ljg4OSAyNTAuMTk0LDIxMy43NzgNCgkyNTAuMTk0LC0xMzkuNTU3IDM1Mi4xOSwtODAuNjY3ICIvPg0KPC9zdmc+DQo="
            },
            "pictureAspect": "noChange",
            "themeColor": "#ffffff",
            "manifest": {
              "display": "standalone",
              "orientation": "notSet",
              "onConflict": "override",
              "declared": true
            },
            "assets": {
              "legacyIcon": false,
              "lowResolutionIcons": false
            }
          },
          "safariPinnedTab": {
            "masterPicture": {
              "type": "inline",
              "content": "CTxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIxNC4xOSA2NCA2NCA2NCI+DQoJPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSIxOC40NzcsODAgNDYuMTksNjQgNDYuMTksODUuMzMzIDM2Ljk1Myw4MCAzNi45NTMsOTAuNjY3IDI3LjcxNCw4NS4zMzMgMjcuNzE0LDExNy4zMzMgMTguNDc3LDExMiIvPg0KCTxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHBvaW50cz0iNzMuOTAzLDExMiA0Ni4xOSwxMjggNDYuMTksMTA2LjY2NyA1NS40MjgsMTEyIDU1LjQyOCwxMDEuMzMzIDY0LjY2NiwxMDYuNjY3IDY0LjY2Niw3NC42NjcgNzMuOTAzLDgwIi8+DQo8L3N2Zz4NCg=="
            },
            "pictureAspect": "silhouette",
            "themeColor": "#5bbad5"
          }
        },
        "settings": {
          "scalingAlgorithm": "Mitchell",
          "errorOnImageTooSmall": false,
          "readmeFile": false,
          "htmlCodeFile": false,
          "usePathAsIs": false
        }
      },
    }],
    ['@nuxtjs/pwa', {
      icon: false
    }],
    '@nuxtjs/style-resources',
    ['@nuxtjs/vuetify', {
      materialIcons: false,
      css: false,
      treeShake: true,
    }],
    ['nuxt-fire', {
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
    }],
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
