<template>
  <header>
    <VImg
      v-if="con.photo"
      aspect-ratio="1.33"
      position="center 25%"
      :src="con.photo[500].url"
      :srcset="`${con.photo[500].url} ${con.photo[500].width}w,
        ${con.photo[640].url} ${con.photo[640].width}w,
        ${con.photo[800].url} ${con.photo[800].width}w,
        ${con.photo[1024].url} ${con.photo[1024].width}w`"
      sizes="285px"
      class="photo"
    />
    <h2 class="display-1">
      <TransformAlternates>{{con.name}}</TransformAlternates>
    </h2>
    <VList>
      <ConDates
        v-if="con.dates && con.dates.start && con.dates.end"
        :start="con.dates.start"
        :end="con.dates.end"
      />
      <ConHotel
        v-if="con.hotel"
        :name="con.hotel.name"
        :link="con.hotel.link"
        :photoReference="con.hotel.photo.reference"
      />
      <ConMap
        v-if="con.city"
        :city="con.city"
        :color="con.color"
        :hotelName="con.hotel && con.hotel.name"
        :hotelPlaceId="con.hotel && con.hotel.placeId"
      />
    </VList>
  </header>
</template>

<script>
import ConDates from './ConDates';
import ConHotel from './ConHotel';
import ConMap from './ConMap';
import TransformAlternates from './TransformAlternates';

export default {
  components: {
    ConDates,
    ConHotel,
    ConMap,
    TransformAlternates,
  },
  props: {
    con: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.photo {
  @media (min-width: 600px) {
    /deep/ .v-responsive__sizer {
      padding-bottom: 100% !important;
    }

    /deep/ .v-image__image {
      background-position: top !important;
    }
  }
}
</style>
