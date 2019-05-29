<template>
  <Card
    :photo-src="map"
    icon="$vuetify.icons.city"
    :href="directionsLink"
    :title="city"
    :subtitle="duration"
    v-observe-visibility="{
      callback: setVisible,
      intersection: $intersectionOptions,
      once: true,
      throttle: 300,
    }"
  />
</template>

<script>
import formatDistance from 'date-fns/formatDistance';
import nikolaiColors from '~/plugins/nikolaiColors';
import queryString from 'query-string';
import { mapState } from 'vuex';

import Card from './Card';

export default {
  components: {
    Card,
  },
  props: {
    city: {
      type: String,
      required: true,
    },
    color: String,
    hotelName: String,
    hotelPlaceId: String,
  },
  data() {
    return {
      visible: false,
      directionsService: null,
      route: null,
    };
  },
  computed: {
    ...mapState('geolocation', ['location']),
    map() {
      const color = nikolaiColors[this.color] || { primary: '', secondary: '' };
      const destination = this.hotelName ? `${this.hotelName.replace(/'/g, '')} ${this.city}` : this.city;
      return `https://maps.googleapis.com/maps/api/staticmap?${queryString.stringify({
        key: process.env.googleApi,
        markers: `color:0x${color.secondary.slice(1)}|${destination}`,
        path: `weight:1|color:0x${color.primary.slice(1)}ff|enc:${this.path}`,
        zoom: !this.path && 4,
        size: '288x144',
        scale: 2,
        style1: 'visibility:off',
        style2: 'feature:landscape|visibility:on|color:0xeeeeee',
        style3: 'feature:administrative.country|visibility:on|color:0xaaaaaa',
        style4: 'feature:administrative.province|visibility:on|color:0xaaaaaa',
        style5: 'feature:water|visibility:on|color:0xcccccc',
        style6: 'element:labels|visibility:off',
      }).replace(/\bstyle\d+\b/g, 'style')}`;
    },
    path() {
      if (!this.route) return null;
      return this.route.overview_polyline;
    },
    duration() {
      if (!this.route) return null;
      return `${formatDistance(0, this.route.legs[0].duration.value * 1000).replace(/^about /, '')} away`;
    },
    directionsLink() {
      return `https://www.google.com/maps/dir/?${queryString.stringify({
        api: 1,
        destination: this.hotelName ? `${this.hotelName} ${this.city}` : this.city,
        destination_place_id: this.hotelPlaceId ? this.hotelPlaceId : null,
      })}`;
    },
  },
  created() {
    this.$watch(
      vm => [
        vm.visible,
        vm.location,
        vm.directionsService,
      ].join(),
      async () => {
        if (
          this.route
          || !this.visible
          || !this.location
          || !this.directionsService
        ) return;
        const { routes: { 0: route } } = await new Promise((resolve, reject) => {
          this.directionsService.route({
            origin: `${this.location.lat} ${this.location.lng}`,
            destination: this.hotelName ? `${this.hotelName} ${this.city}` : this.city,
            travelMode: 'DRIVING',
          }, (response, status) => {
            if (status === 'OK') {
              resolve(response);
              return;
            }
            reject(status);
          });
        });
        this.route = route;
      },
    );
  },
  async mounted() {
    await this.$gmapApiPromiseLazy();
    this.directionsService = new window.google.maps.DirectionsService();
  },
  methods: {
    async setVisible(visible) {
      this.visible = visible;
    },
  },
};
</script>
