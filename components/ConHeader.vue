<template>
  <header>
    <h2 class="display-1">{{con.name}}</h2>
    <p v-if="datesAvailable">
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
  computed: {
    datesAvailable() {
      return Boolean(this.con.dates && this.con.dates.start && this.con.dates.end);
    },
  }
};
</script>
