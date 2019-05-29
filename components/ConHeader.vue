<template>
  <VLayout
    tag="header"
    column
    class="header"
  >
    <VLazyImage
      v-if="con.photo"
      :src-placeholder="$placeholder"
      :src="con.photo[500].url"
      :srcset="`${con.photo[500].url} ${con.photo[500].width}w,
        ${con.photo[640].url} ${con.photo[640].width}w,
        ${(con.photo[800] ? con.photo[800] : con.photo[1024]).url}
          ${(con.photo[800] ? con.photo[800] : con.photo[1024]).width}w,
        ${con.photo[1024].url} ${con.photo[1024].width}w`"
      :sizes="`
        (max-width: ${$vuetify.breakpoint.thresholds.xs - 1}px) calc(100vw - 16px - 16px),
        288px
      `"
      alt
      :intersection-options="$intersectionOptions"
      class="photo d-block mb-2"
    />
    <h2 class="display-1">
      <a
        :href="con.link"
        target="_blank"
        rel="noopener"
        class="heading__link"
      >
        <TransformAlternates>{{conName}}</TransformAlternates>
      </a>
    </h2>
    <VList>
      <ConDates
        v-if="con.dates && con.dates.start && con.dates.end"
        :start="con.dates.start"
        :end="con.dates.end"
        class="mt-1"
      />
      <ConHotel
        v-if="con.hotel"
        :name="con.hotel.name"
        :link="con.hotel.link"
        :photoReference="con.hotel.photo.reference"
        class="mt-3"
      />
      <ConMap
        v-if="con.city"
        :city="con.city"
        :color="con.color"
        :hotelName="con.hotel && con.hotel.name"
        :hotelPlaceId="con.hotel && con.hotel.placeId"
        class="mt-2"
      />
    </VList>
  </VLayout>
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
  computed: {
    conName() {
      if (this.con.name.match(/\S+$/)[0].length > 5) return this.con.name;
      return this.con.name.replace(/\s+(\S+)$/, '&nbsp;$1');
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  @include min-width(sm) {
    padding: 16px;
    box-sizing: content-box;
    width: $header-width;
  }

  @media (min-width: map-get($grid-breakpoints, md)) and (min-height: 700px) {
    padding: 24px;
  }
}

.photo {
  @include object-fit(cover, center 25%);
  width: 100%;
  min-height: 0;
  height: calc((100vw - 16px - 16px) * .75);

  @include min-width(sm) {
    @include size($header-width);
  }
}

.heading__link {
  color: inherit;
  text-decoration: none;
}
</style>
