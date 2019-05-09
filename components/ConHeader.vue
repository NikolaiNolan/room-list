<template>
  <header>
    <h2 class="display-1">{{con.name}}</h2>
    <p v-if="datesAvailable">
      <DateRange
        :start="con.dates.start"
        :end="con.dates.end"
      />
      <small>{{dateDistance}}</small>
    </p>
  </header>
</template>

<script>
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';

import DateRange from './DateRange';

export default {
  components: {
    DateRange,
  },
  props: {
    con: {
      type: Object,
      required: true,
    },
    datesAvailable: Boolean,
  },
  computed: {
    dateDistance() {
      const startDate = this.con.dates.start;
      if (isBefore(startDate, new Date())) return null;
      if (isSameDay(startDate, new Date())) return 'today';
      return formatDistanceStrict(startDate, new Date(), { addSuffix: true });
    },
  },
};
</script>
