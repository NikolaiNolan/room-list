<template>
  <header>
    <VImg
      v-if="con.photo && con.photo.url"
      aspect-ratio="1"
      position="top"
      :src="con.photo.url"
    />
    <h2 class="display-1">{{con.name}}</h2>
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

export default {
  components: {
    DateDistance,
    DateRange,
  },
  props: {
    con: {
      type: Object,
      required: true,
    },
  },
};
</script>
