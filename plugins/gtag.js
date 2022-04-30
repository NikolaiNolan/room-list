import Vue from 'vue'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: {
    id: 'G-YFW2JY2QRE',
  },
  enabled: process.env.NODE_ENV === 'production',
})
