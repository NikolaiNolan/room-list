<template>
  <Card
    :photo-src="hotelPhotoSrc"
    :photo-srcset="hotelPhotoSrcSet"
    :href="link"
    icon="mdi-hotel"
    :title="name"
  />
</template>

<script>
import Card from './Card';

export default {
  components: {
    Card,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    link: String,
    photoReference: String,
  },
  computed: {
    hotelPhotoSrc() {
      if (!this.photoReference) return null;
      return `https://maps.googleapis.com/maps/api/place/photo?key=${process.env.googleApi}&photoreference=${this.photoReference}&maxwidth=300`;
    },
    hotelPhotoSrcSet() {
      if (!this.photoReference) return null;
      return `
        https://maps.googleapis.com/maps/api/place/photo?key=${process.env.googleApi}&photoreference=${this.photoReference}&maxwidth=300 300w,
        https://maps.googleapis.com/maps/api/place/photo?key=${process.env.googleApi}&photoreference=${this.photoReference}&maxwidth=400 400w,
        https://maps.googleapis.com/maps/api/place/photo?key=${process.env.googleApi}&photoreference=${this.photoReference}&maxwidth=500 500w,
        https://maps.googleapis.com/maps/api/place/photo?key=${process.env.googleApi}&photoreference=${this.photoReference}&maxwidth=600 600w
      `;
    },
  }
}
</script>
