<template>
  <Card
    :no-lazy="conIndex <= 1"
    :photo-src="map"
    :href="directionsLink"
    :title="city"
    :subtitle="duration"
  >
    <template v-slot:icon>
      <MapMarkerIcon />
    </template>
  </Card>
</template>

<script>
import formatDistance from 'date-fns/formatDistance';
import nikolaiColors from '~/plugins/nikolaiColors';
import queryString from 'query-string';
import { mapState } from 'vuex';

import Card from './Card';
import MapMarkerIcon from 'vue-material-design-icons/MapMarker.vue';

export default {
  components: {
    Card,
    MapMarkerIcon,
  },
  props: {
    conIndex: {
      type: Number,
      required: true,
    },
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
      directionsService: null,
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
      }).replace(/\bstyle\d+\b/g, 'style')}`
    },
    path() {
      if (!this.route) return;
      return this.route.overview_polyline;
    },
    duration() {
      if (!this.route) return;
      return formatDistance(0, this.route.legs[0].duration.value * 1000).replace(/^about /, '') + ' away';
    },
    directionsLink() {
      return `https://www.google.com/maps/dir/?${queryString.stringify({
        api: 1,
        destination: this.hotelName ? `${this.hotelName} ${this.city}` : this.city,
        destination_place_id: this.hotelPlaceId ? this.hotelPlaceId : null,
      })}`
    }
  },
  asyncComputed: {
    async route() {
      if (!this.location || !this.directionsService) return;
      const response = await new Promise((resolve, reject) => {
        this.directionsService.route({
          origin: `${this.location.lat} ${this.location.lng}`,
          destination: this.hotelName ? `${this.hotelName} ${this.city}` : this.city,
          travelMode: 'DRIVING',
        }, (response, status) => {
          if (status == 'OK') {
            resolve(response);
            return;
          }
          reject(status);
        })
      });
      return response.routes[0];
    },
  },
  async mounted() {
    await this.$gmapApiPromiseLazy();
    this.directionsService = new window.google.maps.DirectionsService();
  },
};
</script>
