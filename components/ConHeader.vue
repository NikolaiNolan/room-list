<template>
  <header>
    <VImg
      v-if="con.photo && con.photo.medium"
      aspect-ratio="1.33"
      position="center 25%"
      :src="con.photo.medium"
      class="photo"
    />
    <h2 class="display-1">
      <TransformAlternates>{{con.name}}</TransformAlternates>
    </h2>
    <p v-if="this.con.dates && this.con.dates.start && this.con.dates.end">
      <DateRange
        :start="con.dates.start"
        :end="con.dates.end"
      />
      <small>
        <DateDistance :date="con.dates.start" />
      </small>
    </p>
  </header>
</template>

<script>
import DateDistance from './DateDistance';
import DateRange from './DateRange';
import TransformAlternates from './TransformAlternates';

export default {
  components: {
    DateDistance,
    DateRange,
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
